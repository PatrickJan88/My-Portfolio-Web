'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

export type FluidOrbProps = React.ComponentProps<'div'> & {
  size?: number
  color?: string
}

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_color;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.6;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float dist = distance(uv, vec2(0.5));

  // Clean edge transition that meets the 1px border seamlessly
  float pixelSize = 1.25 / max(u_resolution.x, u_resolution.y);
  float edge = clamp((0.505 - dist) / pixelSize, 0.0, 1.0);

  if (edge <= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float t = u_time * 0.22;

  vec2 drift = vec2(
    sin(t) + 0.6 * sin(t * 1.7 + 1.3),
    cos(t * 0.8) + 0.6 * cos(t * 1.3 + 2.1)
  );

  vec2 p = vec2(uv.x * 1.8, uv.y * 1.0) + drift * 0.7;

  vec2 q = vec2(fbm(p + drift), fbm(p + vec2(3.2, 1.5) - drift));
  float f = fbm(p + 1.2 * q);

  float g = clamp(1.0 - uv.y, 0.0, 1.0);
  float anchor = smoothstep(0.0, 0.35, uv.y);
  float shade = clamp(g + (f - 0.5) * 0.85 * anchor, 0.0, 1.0);

  // Exact reference palette: Luminous white top, soft middle fluid transition, rich team base
  vec3 white = vec3(0.99, 1.0, 1.0);
  vec3 light = mix(white, u_color, 0.48);
  vec3 dark = u_color;

  vec3 col = white;
  col = mix(col, light, smoothstep(0.32, 0.54, shade));
  col = mix(col, dark, smoothstep(0.56, 0.86, shade));

  gl_FragColor = vec4(col * edge, edge);
}
`

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  }
  const n = parseInt(h, 16)
  if (h.length !== 6 || Number.isNaN(n)) return [0.1, 0.45, 0.95]
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export const FluidOrb = ({
  size,
  color = '#1A73F2',
  className,
  style,
  ...props
}: FluidOrbProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Supersampled internal canvas buffer (minimum 160px for razor-sharp downscaling)
    const dpr = Math.max(window.devicePixelRatio || 1, 2)
    const getTargetPx = () => {
      const rect = canvas.getBoundingClientRect()
      const effectiveSize = rect.width > 0 ? rect.width : (size ?? 36)
      return Math.max(160, Math.round(effectiveSize * dpr * 2))
    }

    let px = getTargetPx()
    canvas.width = px
    canvas.height = px

    const rgb = hexToRgb(color)

    // Try WebGL
    let gl: WebGLRenderingContext | null = null
    try {
      gl =
        canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: true }) ||
        (canvas.getContext('experimental-webgl', {
          antialias: true,
          alpha: true,
          premultipliedAlpha: true,
        }) as WebGLRenderingContext | null)
    } catch {
      gl = null
    }

    // 2D Canvas Fallback matching the reference wave
    if (!gl) {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      let raf = 0
      const start = performance.now()
      const r = Math.round(rgb[0] * 255)
      const g = Math.round(rgb[1] * 255)
      const b = Math.round(rgb[2] * 255)

      const render2d = (now: number) => {
        const t = (now - start) * 0.002
        ctx.clearRect(0, 0, px, px)
        const radius = px * 0.5
        const cx = px * 0.5
        const cy = px * 0.5

        ctx.save()
        ctx.beginPath()
        ctx.arc(cx, cy, radius - 0.75, 0, Math.PI * 2)
        ctx.clip()

        // Base color (bottom)
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.fillRect(0, 0, px, px)

        // Wave gradient (white top -> wave -> base color)
        const waveOffset = Math.sin(t) * radius * 0.1
        const grad = ctx.createLinearGradient(0, 0, 0, px + waveOffset)
        grad.addColorStop(0, '#ffffff')
        grad.addColorStop(0.38, '#ffffff')
        grad.addColorStop(
          0.54,
          `rgba(${Math.min(255, Math.round(255 * 0.52 + r * 0.48))}, ${Math.min(255, Math.round(255 * 0.52 + g * 0.48))}, ${Math.min(255, Math.round(255 * 0.52 + b * 0.48))}, 1)`
        )
        grad.addColorStop(0.78, `rgb(${r}, ${g}, ${b})`)
        grad.addColorStop(1, `rgb(${r}, ${g}, ${b})`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, px, px)

        ctx.restore()
        raf = requestAnimationFrame(render2d)
      }
      render2d(performance.now())
      return () => cancelAnimationFrame(raf)
    }

    // WebGL Pipeline
    const program = gl.createProgram()
    const vert = compile(gl, gl.VERTEX_SHADER, VERT)
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!program || !vert || !frag) return

    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    )
    const aPos = gl.getAttribLocation(program, 'a_pos')

    const uResolution = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uColorLoc = gl.getUniformLocation(program, 'u_color')

    const updateSize = () => {
      const nextPx = getTargetPx()
      if (nextPx > 0 && nextPx !== px) {
        px = nextPx
        canvas.width = px
        canvas.height = px
      }
    }

    const ro = new ResizeObserver(updateSize)
    ro.observe(canvas)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = performance.now()
    let raf = 0

    const render = (now: number) => {
      if (!gl) return
      gl.useProgram(program)
      gl.viewport(0, 0, px, px)
      gl.uniform2f(uResolution, px, px)
      gl.uniform3f(uColorLoc, rgb[0], rgb[1], rgb[2])
      gl.uniform1f(uTime, reduce ? 0 : (now - start) / 1000)

      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.enableVertexAttribArray(aPos)
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (!reduce) raf = requestAnimationFrame(render)
    }
    render(start)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (gl) {
        gl.deleteProgram(program)
        gl.deleteShader(vert)
        gl.deleteShader(frag)
        gl.deleteBuffer(buffer)
      }
    }
  }, [size, color])

  return (
    <div
      data-slot="fluid-orb"
      className={cn(
        'relative overflow-hidden rounded-full shrink-0 select-none',
        className
      )}
      style={{
        ...(size !== undefined ? { width: size, height: size } : {}),
        ...style,
      }}
      {...props}
    >
      <canvas ref={canvasRef} className="h-full w-full block rounded-full" />
    </div>
  )
}

export default FluidOrb
