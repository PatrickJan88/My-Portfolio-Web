import * as THREE from 'three';
import { useRef, useState, useEffect, useLayoutEffect, useMemo, memo, Suspense, type ReactNode } from 'react';
import { Canvas, createPortal, useFrame, useThree, type ThreeElements } from '@react-three/fiber';
import {
  useFBO,
  useGLTF,
  useScroll,
  useTexture,
  Image,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

try {
  useGLTF.preload('/assets/3d/lens.glb');
  useGLTF.preload('/assets/3d/cube.glb');
  useGLTF.preload('/assets/3d/bar.glb');
  useTexture.preload('/seekr/company report.webp');
} catch {
  // Graceful preload fallback
}

const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1783394327207-acf441e37dda?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzR8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MzZ8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1782094002386-7d9ae1f49f50?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDB8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1781242629922-6f39cc3671cd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1779684474703-5c0519bcf7e8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NTJ8fHxlbnwwfHx8fHw%3D'
];

type Mode = 'lens' | 'bar' | 'cube';

interface NavItem {
  label: string;
  link: string;
}

type ModeProps = Record<string, unknown>;

export interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;
  backgroundColor?: string;
  textColor?: string;
  imageSrc?: string;
  imageFit?: 'fill' | 'cover' | 'contain';
  imageZoom?: number;
  imageAlign?: 'top' | 'center';
  overlayMode?: boolean;
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function CrispCoverImage({
  url,
  fit = 'fill',
  zoom = 1.0,
  align = 'top',
}: {
  url: string;
  fit?: 'fill' | 'cover' | 'contain';
  zoom?: number;
  align?: 'top' | 'center';
}) {
  const { viewport, gl } = useThree();
  const safeUrl = url.includes(' ') ? encodeURI(url) : url;
  const texture = useTexture(safeUrl);

  useEffect(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      const maxAniso = gl.capabilities?.getMaxAnisotropy?.() || 16;
      texture.anisotropy = Math.min(16, maxAniso);
      texture.needsUpdate = true;
    }
  }, [texture, gl]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uVpSize: { value: new THREE.Vector2(viewport.width, viewport.height) },
      uImgSize: { value: new THREE.Vector2(3416, 1612) },
      uFit: { value: fit === 'fill' ? 0 : fit === 'cover' ? 1 : 2 },
      uZoom: { value: zoom },
      uAlignTop: { value: align === 'top' ? 1.0 : 0.0 },
    }),
    [texture, viewport.width, viewport.height, fit, zoom, align]
  );

  useEffect(() => {
    uniforms.uTexture.value = texture;
    uniforms.uVpSize.value.set(viewport.width, viewport.height);
    uniforms.uFit.value = fit === 'fill' ? 0 : fit === 'cover' ? 1 : 2;
    uniforms.uZoom.value = zoom;
    uniforms.uAlignTop.value = align === 'top' ? 1.0 : 0.0;
  }, [uniforms, texture, viewport.width, viewport.height, fit, zoom, align]);

  return (
    <mesh position={[0, 0, 0]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform sampler2D uTexture;
          uniform vec2 uVpSize;
          uniform vec2 uImgSize;
          uniform int uFit;
          uniform float uZoom;
          uniform float uAlignTop;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;

            if (uFit == 1) { // cover
              float vpAspect = uVpSize.x / uVpSize.y;
              float imgAspect = uImgSize.x / uImgSize.y;
              if (vpAspect > imgAspect) {
                float s = imgAspect / vpAspect;
                uv.y = uAlignTop > 0.5 ? uv.y * s + (1.0 - s) : (uv.y - 0.5) * s + 0.5;
              } else {
                float s = vpAspect / imgAspect;
                uv.x = (uv.x - 0.5) * s + 0.5;
              }
            } else if (uFit == 2) { // contain
              float vpAspect = uVpSize.x / uVpSize.y;
              float imgAspect = uImgSize.x / uImgSize.y;
              if (vpAspect > imgAspect) {
                float s = vpAspect / imgAspect;
                uv.x = (uv.x - 0.5) * s + 0.5;
              } else {
                float s = imgAspect / vpAspect;
                uv.y = uAlignTop > 0.5 ? uv.y * s + (1.0 - s) : (uv.y - 0.5) * s + 0.5;
              }
            }

            // Apply zoom scaling around top-center or center
            vec2 center = vec2(0.5, uAlignTop > 0.5 ? 1.0 : 0.5);
            uv = (uv - center) / max(uZoom, 0.01) + center;

            if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
              gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
            } else {
              gl_FragColor = texture2D(uTexture, uv);
            }
          }
        `}
        toneMapped={false}
      />
    </mesh>
  );
}

export function FluidGlass({
  mode = 'lens',
  lensProps = {},
  barProps = {},
  cubeProps = {},
  backgroundColor = '#120F17',
  textColor = '#ffffff',
  imageSrc,
  imageFit = 'fill',
  imageZoom = 1.0,
  imageAlign = 'top',
  overlayMode = false,
  children,
  className,
  style
}: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const rawOverrides = mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  const {
    navItems = [
      { label: 'Home', link: '' },
      { label: 'About', link: '' },
      { label: 'Contact', link: '' }
    ],
    ...modeProps
  } = rawOverrides;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className ?? ''}`} style={style}>
      <Canvas
        dpr={[1, 3]}
        camera={{ position: [0, 0, 20], fov: 15 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.NoToneMapping
        }}
        style={{ backgroundColor: overlayMode ? 'transparent' : backgroundColor, width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {imageSrc || children ? (
            <Wrapper modeProps={modeProps} backgroundColor={backgroundColor} overlayMode={overlayMode}>
              {imageSrc ? (
                <CrispCoverImage
                  url={imageSrc}
                  fit={imageFit}
                  zoom={imageZoom}
                  align={imageAlign}
                />
              ) : (
                children
              )}
              <Preload all />
            </Wrapper>
          ) : (
            <ScrollControls damping={0.2} pages={3} distance={0.4}>
              {mode === 'bar' && <NavItems items={navItems as NavItem[]} textColor={textColor} />}
              <Wrapper modeProps={modeProps} backgroundColor={backgroundColor} overlayMode={overlayMode}>
                <Scroll>
                  <Typography textColor={textColor} />
                  <Images />
                </Scroll>
                <Scroll html />
                <Preload all />
              </Wrapper>
            </ScrollControls>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default FluidGlass;

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
  backgroundColor?: string;
  overlayMode?: boolean;
}

type ModeComponentProps = Omit<ModeWrapperProps, 'glb' | 'geometryKey'>;

interface ZoomMaterial extends THREE.Material {
  zoom: number;
}

interface ZoomMesh extends THREE.Mesh<THREE.BufferGeometry, ZoomMaterial> {}

type ZoomGroup = THREE.Group & { children: ZoomMesh[] };

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  backgroundColor = '#120F17',
  overlayMode = false,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF(glb);
  const { viewport: vp } = useThree();
  const buffer = useFBO(1024, 1024, {
    samples: 4,
    generateMipmaps: true,
  });
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        geoWidthRef.current = geo.boundingBox.max.x - geo.boundingBox.min.x || 1;
      }
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const isHovered = Math.abs(pointer.x) > 0.001 || Math.abs(pointer.y) > 0.001;
    const idleX = Math.sin(state.clock.elapsedTime * 1.1) * 0.12 * v.width;
    const idleY = Math.cos(state.clock.elapsedTime * 0.85) * 0.08 * v.height;

    const targetX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const targetY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;

    const destX = isHovered ? targetX : idleX;
    const destY = isHovered ? targetY : idleY;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setClearColor(0x000000, 0);
    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(
        <>
          <mesh position={[0, 0, -5]} scale={[vp.width * 2, vp.height * 2, 1]}>
            <planeGeometry />
            <meshBasicMaterial color={backgroundColor} toneMapped={false} />
          </mesh>
          {children}
        </>,
        scene
      )}
      {!overlayMode && (
        <mesh scale={[vp.width, vp.height, 1]}>
          <planeGeometry />
          <meshBasicMaterial map={buffer.texture} transparent toneMapped={false} />
        </mesh>
      )}
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes[geometryKey] as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: ModeComponentProps) {
  return <ModeWrapper glb="/assets/3d/lens.glb" geometryKey="Cylinder" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: ModeComponentProps) {
  return <ModeWrapper glb="/assets/3d/cube.glb" geometryKey="Cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: ModeComponentProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}

function NavItems({ items, textColor }: { items: NavItem[]; textColor: string }) {
  const group = useRef<THREE.Group>(null!);
  const { viewport, camera } = useThree();

  const DEVICE = {
    mobile: { max: 639, spacing: 0.2, fontSize: 0.035 },
    tablet: { max: 1023, spacing: 0.24, fontSize: 0.045 },
    desktop: { max: Infinity, spacing: 0.3, fontSize: 0.045 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= DEVICE.mobile.max ? 'mobile' : w <= DEVICE.tablet.max ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { spacing, fontSize } = DEVICE[device];

  useFrame(() => {
    if (!group.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    group.current.position.set(0, -v.height / 2 + 0.2, 15.1);

    group.current.children.forEach((child, i) => {
      child.position.x = (i - (items.length - 1) / 2) * spacing;
    });
  });

  const handleNavigate = (link: string) => {
    if (!link) return;
    link.startsWith('#') ? (window.location.hash = link) : (window.location.href = link);
  };

  return (
    <group ref={group} renderOrder={10}>
      {items.map(({ label, link }) => (
        <Text
          key={label}
          fontSize={fontSize}
          color={textColor}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0}
          outlineBlur="20%"
          outlineColor="#000"
          outlineOpacity={0.5}
          renderOrder={10}
          onClick={e => {
            e.stopPropagation();
            handleNavigate(link);
          }}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {label}
        </Text>
      ))}
    </group>
  );
}

function Images() {
  const group = useRef<ZoomGroup>(null!);
  const data = useScroll();
  const { height } = useThree(s => s.viewport);

  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[3, height / 1.1]} url={IMAGE_URLS[0]} />
      <Image position={[2, 0, 3]} scale={3} url={IMAGE_URLS[1]} />
      <Image position={[-2.05, -height, 6]} scale={[1, 3]} url={IMAGE_URLS[2]} />
      <Image position={[-0.6, -height, 9]} scale={[1, 2]} url={IMAGE_URLS[3]} />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url={IMAGE_URLS[4]} />
    </group>
  );
}

function Typography({ textColor }: { textColor: string }) {
  const DEVICE = {
    mobile: { fontSize: 0.2 },
    tablet: { fontSize: 0.4 },
    desktop: { fontSize: 0.6 }
  };
  const getDevice = () => {
    const w = window.innerWidth;
    return w <= 639 ? 'mobile' : w <= 1023 ? 'tablet' : 'desktop';
  };

  const [device, setDevice] = useState<keyof typeof DEVICE>(getDevice());

  useEffect(() => {
    const onResize = () => setDevice(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const { fontSize } = DEVICE[device];

  return (
    <Text
      position={[0, 0, 12]}
      fontSize={fontSize}
      letterSpacing={-0.05}
      outlineWidth={0}
      outlineBlur="20%"
      outlineColor="#000"
      outlineOpacity={0.5}
      color={textColor}
      anchorX="center"
      anchorY="middle"
    >
      React Bits
    </Text>
  );
}
