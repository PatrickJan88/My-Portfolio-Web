/* eslint-disable react/no-unknown-property */
import * as THREE from 'three';
import { useRef, useState, useEffect, memo } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import {
  useFBO,
  Scroll,
  Preload,
  ScrollControls,
  MeshTransmissionMaterial,
  Text
} from '@react-three/drei';
import { easing } from 'maath';

export default function FluidGlass({ mode = 'lens', lensProps = {}, barProps = {}, cubeProps = {} }: any) {
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
    <Canvas 
      camera={{ position: [0, 0, 20], fov: 15 }} 
      gl={{ alpha: true }} 
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      eventSource={typeof window !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
    >
      <ScrollControls damping={0.2} pages={1} distance={0.4}>
        <Wrapper modeProps={modeProps}>
          <Preload />
        </Wrapper>
      </ScrollControls>
    </Canvas>
  );
}

const ModeWrapper = memo(function ModeWrapper({
  children,
  geometryType = 'lens',
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  ...props
}: any) {
  const ref = useRef<THREE.Mesh>(null);
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    // mock width
    geoWidthRef.current = geometryType === 'lens' ? 2 : 1;
  }, [geometryType]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : followPointer ? (pointer.y * v.height) / 2 : 0;
    
    if (ref.current) {
        easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

        if (modeProps.scale == null) {
          const maxWorld = v.width * 0.9;
          const desired = maxWorld / geoWidthRef.current;
          ref.current.scale.setScalar(Math.min(2, desired * 0.5));
        } else {
            ref.current.scale.setScalar(modeProps.scale);
        }
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    // Make transparent so it overlays on our UI
    gl.setClearColor(0x000000, 0);
  });

  const { scale, ior, thickness, anisotropy, chromaticAberration, ...extraMat } = modeProps;

  return (
    <>
      {createPortal(children as any, scene)}
      
      <mesh ref={ref} rotation-x={Math.PI / 2} {...props}>
        {geometryType === 'lens' ? (
             <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
        ) : geometryType === 'cube' ? (
             <boxGeometry args={[2, 2, 2]} />
        ) : (
             <boxGeometry args={[4, 1, 1]} />
        )}
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          transmission={1}
          roughness={0}
          clearcoat={1}
          {...extraMat}
        />
      </mesh>
    </>
  );
});

function Lens({ modeProps, ...p }: any) {
  return <ModeWrapper geometryType="lens" followPointer modeProps={modeProps} {...p} />;
}

function Cube({ modeProps, ...p }: any) {
  return <ModeWrapper geometryType="cube" followPointer modeProps={modeProps} {...p} />;
}

function Bar({ modeProps = {}, ...p }: any) {
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
      geometryType="bar"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      {...p}
    />
  );
}
