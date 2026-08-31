"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export interface GlitchOptions {
  /** Overall strength of the glitch (0 to 2). */
  intensity?: number;
  /** Seconds between glitch bursts. 0 keeps the glitch running constantly. -1 or null disables auto recurring bursts. */
  interval?: number;
  /** How long each burst lasts in seconds. */
  duration?: number;
  /** Number of horizontal slices the tear snaps to. Lower is chunkier. */
  slices?: number;
  /** How far the torn slices shift sideways, in CSS pixels. */
  shift?: number;
  /** Chromatic RGB split during bursts, in CSS pixels. */
  rgbShift?: number;
  /** Amount of corrupted block artifacts during bursts (0 to 1). */
  blocks?: number;
  /** Analog noise and scanline flicker during bursts (0 to 1). */
  noise?: number;
}

export interface GlitchElements {
  /** Canvas with layoutsubtree or 2D source that hosts the content. */
  source: HTMLCanvasElement;
  /** The element inside the source canvas that gets captured. */
  content: HTMLElement;
  /** Canvas the WebGL effect renders to. */
  output: HTMLCanvasElement;
  /** Optional custom paint callback for rendering content into source canvas */
  onCustomPaint?: (ctx: CanvasRenderingContext2D, width: number, height: number) => void;
}

export interface GlitchInstance {
  /** Update effect options live. */
  setOptions: (options: GlitchOptions) => void;
  /** Fire a glitch burst right now. */
  burst: () => void;
  /** Re-read canvas size. Call when the element is resized. */
  resize: () => void;
  /** Stop the loop and release all GPU resources. */
  destroy: () => void;
}

const DEFAULTS: Required<GlitchOptions> = {
  intensity: 1.2,
  interval: 0, // default single burst controlled externally or static
  duration: 0.55,
  slices: 26,
  shift: 35,
  rgbShift: 6,
  blocks: 0.45,
  noise: 0.35,
};

type PaintableCanvas = HTMLCanvasElement & {
  onpaint?: (() => void) | null;
  requestPaint?: () => void;
};

type ElementImageContext = CanvasRenderingContext2D & {
  drawElementImage?: (element: Element, x: number, y: number) => void;
};

const VERT = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main () {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uContent;
uniform vec2 uResolution;
uniform float uSeed;
uniform float uAmp;
uniform float uSlices;
uniform float uShift;
uniform float uRgbShift;
uniform float uBlocks;
uniform float uNoise;
uniform float uMaxX;

float hash12 (vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec4 page (vec2 p) {
  p.x = clamp(p.x, 0.0005, uMaxX - 0.0005);
  p.y = clamp(p.y, 0.0005, 0.9995);
  return texture(uContent, vec2(p.x, 1.0 - p.y));
}

void main () {
  vec2 uv = vUv;
  if (uv.x > uMaxX) {
    outColor = vec4(0.0);
    return;
  }

  float e = uAmp;
  vec2 guv = uv;

  if (e > 0.001) {
    float band = floor(uv.y * uSlices);
    float pick = hash12(vec2(band, uSeed));
    float tear = step(1.0 - 0.3 * min(e, 1.0), pick);
    float dir = hash12(vec2(band, uSeed + 13.0)) * 2.0 - 1.0;
    guv.x += tear * dir * e * uShift / uResolution.x;

    float sub = floor(uv.y * uSlices * 7.0);
    float micro = hash12(vec2(sub, uSeed + 29.0));
    guv.x += (micro - 0.5) * e * uNoise * 3.0 / uResolution.x;

    vec2 cell = floor(guv * vec2(10.0, uSlices * 0.5));
    float br = hash12(cell + uSeed * 0.0173);
    if (br > 1.0 - 0.14 * uBlocks * min(e, 1.0)) {
      vec2 jump = vec2(
        hash12(cell + uSeed + 3.1) - 0.5,
        hash12(cell + uSeed + 7.7) - 0.5
      );
      guv += jump * vec2(0.08, 0.02) * e;
    }
  }

  float split = uRgbShift * e / uResolution.x;
  vec4 c = page(guv);
  float r = page(guv + vec2(split, 0.0)).r;
  float b = page(guv - vec2(split, 0.0)).b;
  vec4 col = vec4(r, c.g, b, c.a);

  if (e > 0.001 && uNoise > 0.001) {
    float grain = hash12(vUv * uResolution + uSeed * 5.3) - 0.5;
    float row = floor(vUv.y * uResolution.y);
    float flicker = hash12(vec2(row, uSeed + 41.0));
    float lines = step(0.985 - 0.01 * uNoise * e, flicker);
    col.rgb += (grain * 0.22 + lines * 0.35) * uNoise * min(e, 1.0) * col.a;
  }

  outColor = vec4(clamp(col.rgb, 0.0, 1.0) * col.a, col.a);
}`;

export function supportsHtmlInCanvas(): boolean {
  if (typeof document === "undefined") return false;
  const probe = document.createElement("canvas") as PaintableCanvas;
  const ctx = probe.getContext("2d") as ElementImageContext | null;
  return Boolean(
    ctx &&
    typeof ctx.drawElementImage === "function" &&
    typeof probe.requestPaint === "function",
  );
}

export function createGlitch(
  elements: GlitchElements,
  options: GlitchOptions = {},
): GlitchInstance | null {
  const config = { ...DEFAULTS, ...options };
  const { source, content, output, onCustomPaint } = elements;

  const gl = output.getContext("webgl2", {
    alpha: true,
    depth: false,
    stencil: false,
    antialias: false,
    premultipliedAlpha: true,
  });
  if (!gl || gl.isContextLost()) return null;

  const sourceCtx = source.getContext("2d") as ElementImageContext | null;
  const paintable = source as PaintableCanvas;
  const htmlInCanvas = Boolean(
    sourceCtx &&
    typeof sourceCtx.drawElementImage === "function" &&
    typeof paintable.requestPaint === "function",
  );

  let contentDirty = true;
  let wake = () => {};

  if (htmlInCanvas) {
    paintable.onpaint = () => {
      try {
        sourceCtx!.reset();
        sourceCtx!.drawElementImage!(content, 0, 0);
        contentDirty = true;
        wake();
      } catch {}
    };
  }

  function compile(type: number, text: string): WebGLShader {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, text);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.error("Glitch shader error:", gl!.getShaderInfoLog(shader));
    }
    return shader;
  }

  const vertexShader = compile(gl.VERTEX_SHADER, VERT);
  const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const uniforms: Record<string, WebGLUniformLocation> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i)!;
    uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
  }

  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const contentTexture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, contentTexture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    1,
    1,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 0]),
  );

  let contentMaxX = 1;

  function syncCanvasSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(output.clientWidth * dpr));
    const height = Math.max(1, Math.round(output.clientHeight * dpr));
    if (output.width !== width || output.height !== height) {
      output.width = width;
      output.height = height;
    }
    contentMaxX = Math.min(
      1,
      Math.max(0.05, content.clientWidth / Math.max(output.clientWidth, 1)),
    );

    const cssWidth = Math.max(1, Math.round(source.clientWidth || output.clientWidth));
    const cssHeight = Math.max(1, Math.round(source.clientHeight || output.clientHeight));
    if (source.width !== cssWidth * dpr || source.height !== cssHeight * dpr) {
      source.width = cssWidth * dpr;
      source.height = cssHeight * dpr;
    }

    if (htmlInCanvas && paintable.requestPaint) {
      paintable.requestPaint();
    } else if (onCustomPaint && sourceCtx) {
      onCustomPaint(sourceCtx, source.width, source.height);
      contentDirty = true;
    }
  }

  syncCanvasSize();

  function uploadContent() {
    if (!contentDirty) return;
    if (onCustomPaint && sourceCtx && !htmlInCanvas) {
      onCustomPaint(sourceCtx, source.width, source.height);
    }
    contentDirty = false;
    gl!.bindTexture(gl!.TEXTURE_2D, contentTexture);
    gl!.texImage2D(
      gl!.TEXTURE_2D,
      0,
      gl!.RGBA,
      gl!.RGBA,
      gl!.UNSIGNED_BYTE,
      source,
    );
  }

  let time = 0;
  let burstAt = 0;
  let burstSeed = Math.floor(Math.random() * 1000);
  let envelope = 0;

  function advanceTimeline(delta: number) {
    time += delta;
    if (config.interval && config.interval > 0) {
      const sinceBurst = time - burstAt;
      const duration = Math.max(config.duration, 0.05);
      if (sinceBurst >= 0 && sinceBurst < duration) {
        const tail = 1 - Math.pow(sinceBurst / duration, 2);
        envelope = tail * (0.7 + 0.3 * hash(burstSeed + Math.floor(time * 24)));
      } else {
        envelope = 0;
        if (sinceBurst >= duration) {
          burstAt = time + Math.max(config.interval, 0.3) * (0.75 + 0.5 * Math.random());
          burstSeed = Math.floor(Math.random() * 1000);
        }
      }
    } else {
      // Manual bursts or single burst
      const sinceBurst = time - burstAt;
      const duration = Math.max(config.duration, 0.05);
      if (sinceBurst >= 0 && sinceBurst < duration) {
        const tail = 1 - Math.pow(sinceBurst / duration, 2);
        envelope = tail * (0.7 + 0.3 * hash(burstSeed + Math.floor(time * 24)));
      } else {
        envelope = 0;
      }
    }
  }

  function hash(n: number) {
    const s = Math.sin(n * 127.1) * 43758.5453;
    return s - Math.floor(s);
  }

  function render() {
    uploadContent();
    const dpr = output.width / Math.max(output.clientWidth, 1);
    const amp = envelope * Math.max(config.intensity, 0);

    gl!.useProgram(program);
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, contentTexture);
    gl!.uniform1i(uniforms.uContent, 0);
    gl!.uniform2f(uniforms.uResolution, output.width, output.height);
    gl!.uniform1f(uniforms.uSeed, Math.floor(time * 24) + burstSeed);
    gl!.uniform1f(uniforms.uAmp, amp);
    gl!.uniform1f(uniforms.uSlices, Math.max(config.slices, 3));
    gl!.uniform1f(uniforms.uShift, Math.max(config.shift, 0) * dpr);
    gl!.uniform1f(uniforms.uRgbShift, Math.max(config.rgbShift, 0) * dpr);
    gl!.uniform1f(uniforms.uBlocks, Math.min(Math.max(config.blocks, 0), 1));
    gl!.uniform1f(uniforms.uNoise, Math.min(Math.max(config.noise, 0), 1));
    gl!.uniform1f(uniforms.uMaxX, contentMaxX);
    gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
    gl!.viewport(0, 0, output.width, output.height);
    gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
  }

  let raf = 0;
  let lastTime = performance.now();
  let destroyed = false;
  let running = false;
  let visible = true;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let reducedMotion = motionQuery.matches;

  function frame(now: number) {
    if (destroyed) return;
    if (!visible) {
      running = false;
      return;
    }
    const delta = Math.min(Math.max((now - lastTime) / 1000, 0), 1 / 30);
    lastTime = now;
    const wasActive = envelope > 0;
    if (!reducedMotion) advanceTimeline(delta);
    else envelope = 0;
    if (envelope > 0 || wasActive || contentDirty) render();
    
    // If not active and not continuously running, pause loop to save CPU
    if (envelope <= 0 && !wasActive && !contentDirty && (!config.interval || config.interval <= 0)) {
      running = false;
      return;
    }

    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (destroyed || running || !visible) return;
    running = true;
    lastTime = performance.now();
    raf = requestAnimationFrame(frame);
  }

  wake = start;
  start();

  function onMotionChange() {
    reducedMotion = motionQuery.matches;
    start();
  }
  motionQuery.addEventListener("change", onMotionChange);

  const observer = new ResizeObserver(() => {
    syncCanvasSize();
    contentDirty = true;
    start();
  });
  observer.observe(output);
  observer.observe(content);

  const intersection = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1]?.isIntersecting ?? true;
    if (visible) start();
  });
  intersection.observe(output);

  return {
    setOptions(next) {
      if (
        !Object.entries(next).some(
          ([key, value]) => config[key as keyof GlitchOptions] !== value,
        )
      )
        return;
      Object.assign(config, next);
      start();
    },
    burst() {
      burstAt = time;
      burstSeed = Math.floor(Math.random() * 1000);
      contentDirty = true;
      start();
    },
    resize() {
      syncCanvasSize();
      contentDirty = true;
      start();
    },
    destroy() {
      destroyed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      gl!.deleteTexture(contentTexture);
      gl!.deleteProgram(program);
      gl!.deleteShader(vertexShader);
      gl!.deleteShader(fragmentShader);
      gl!.deleteBuffer(quad);
      if (htmlInCanvas) paintable.onpaint = null;
    },
  };
}

export interface GlitchProps extends GlitchOptions {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** If true, fires a burst on mount or navigation */
  triggerOnMount?: boolean;
}

const emptySubscribe = () => () => {};

export function Glitch({ children, className, style, triggerOnMount = false, ...options }: GlitchProps) {
  const sourceRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<GlitchInstance | null>(null);
  const [initialOptions] = useState(options);
  const [failed, setFailed] = useState(false);

  const supported = useSyncExternalStore(
    emptySubscribe,
    supportsHtmlInCanvas,
    () => false,
  );
  const native = supported && !failed;

  useEffect(() => {
    const source = sourceRef.current;
    const content = contentRef.current;
    const output = outputRef.current;
    if (!source || !content || !output) return;
    instanceRef.current = createGlitch(
      { source, content, output },
      initialOptions,
    );
    if (native && !instanceRef.current) setFailed(true);

    if (triggerOnMount && instanceRef.current) {
      setTimeout(() => {
        instanceRef.current?.burst();
      }, 50);
    }

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [initialOptions, native, triggerOnMount]);

  useEffect(() => {
    instanceRef.current?.setOptions(options);
  });

  return (
    <div className={className} style={{ position: "relative", ...style }}>
      <canvas
        ref={sourceRef}
        // @ts-expect-error experimental html-in-canvas attribute
        layoutsubtree="true"
        suppressHydrationWarning
        style={
          native
            ? { position: "absolute", inset: 0, width: "100%", height: "100%" }
            : { display: "none" }
        }
      >
        {native ? (
          <div
            ref={contentRef}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {children}
          </div>
        ) : null}
      </canvas>
      {!native ? (
        <div
          ref={contentRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {children}
        </div>
      ) : null}
      <canvas
        ref={outputRef}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/**
 * High-performance WebGL Glitch Hero Title (Powered by @canvas-ui/glitch-react shader)
 * Renders typography with 100% fidelity onto WebGL2 canvas and triggers a glitch burst on entry & hover.
 */
export interface GlitchHeroTitleProps extends GlitchOptions {
  text: string;
  className?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: number;
  letterSpacing?: string;
  onHoverBurst?: boolean;
}

export function GlitchHeroTitle({
  text = "POFEI",
  className = "",
  textColor = "#e4e6ea",
  onHoverBurst = true,
  ...options
}: GlitchHeroTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLCanvasElement>(null);
  const outputRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<GlitchInstance | null>(null);
  const [glitchActive, setGlitchActive] = useState(true);

  const drawTextToCanvas = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Responsive font calculation matching Space Grotesk
    const fontSizePx = Math.min(width * 0.22, height * 0.85);
    ctx.font = `800 ${fontSizePx}px 'Space Grotesk', system-ui, -apple-system, sans-serif`;
    
    // Slight letter spacing simulation
    ctx.fillText(text, width / 2, height / 2);
  }, [text, textColor]);

  useEffect(() => {
    const source = sourceRef.current;
    const output = outputRef.current;
    const container = containerRef.current;
    if (!source || !output || !container) return;

    const glitch = createGlitch(
      {
        source,
        content: container,
        output,
        onCustomPaint: drawTextToCanvas,
      },
      {
        intensity: options.intensity ?? 1.3,
        duration: options.duration ?? 0.65,
        slices: options.slices ?? 28,
        shift: options.shift ?? 38,
        rgbShift: options.rgbShift ?? 6,
        blocks: options.blocks ?? 0.5,
        noise: options.noise ?? 0.35,
        interval: 0, // single entry burst
      }
    );

    if (glitch) {
      instanceRef.current = glitch;
      setGlitchActive(true);
      // Play glitch burst once immediately upon entering the page!
      glitch.burst();
      const settleTimer = setTimeout(() => {
        setGlitchActive(false);
      }, (options.duration ?? 0.65) * 1000 + 100);

      return () => {
        clearTimeout(settleTimer);
        glitch.destroy();
        instanceRef.current = null;
      };
    }
  }, [drawTextToCanvas, options.duration, options.intensity, options.slices, options.shift, options.rgbShift, options.blocks, options.noise]);

  const handleMouseEnter = () => {
    if (onHoverBurst && instanceRef.current) {
      setGlitchActive(true);
      instanceRef.current.burst();
      setTimeout(() => {
        setGlitchActive(false);
      }, (options.duration ?? 0.65) * 1000 + 100);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`relative flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      {/* Hidden offscreen 2D source canvas */}
      <canvas ref={sourceRef} className="hidden" aria-hidden="true" />

      {/* Crisp HTML display typography */}
      <h1
        className={`font-['Space_Grotesk'] font-extrabold tracking-[-0.03em] leading-none text-[#e4e6ea] drop-shadow-[0_4px_36px_rgba(0,0,0,0.9)] transition-all duration-300 hover:scale-[1.02] ${
          glitchActive ? "opacity-90" : "opacity-100"
        }`}
        style={{
          fontSize: "clamp(4.5rem, 14vw, 10rem)",
        }}
      >
        {text}
      </h1>

      {/* WebGL2 Glitch Overlay Canvas executing @canvas-ui/glitch-react shader */}
      <canvas
        ref={outputRef}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150 ${
          glitchActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default Glitch;
