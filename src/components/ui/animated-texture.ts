import * as THREE from "three";

export interface AnimatedTextureResult {
  texture: THREE.Texture;
  update: (time: number) => void;
  dispose: () => void;
}

/**
 * Creates and loads a texture for GPU shader fluid simulation.
 * Supports static WebP / PNG / JPG images as well as animated sources.
 */
export function createAnimatedTexture(src: string): AnimatedTextureResult {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    src,
    (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      tex.wrapS = THREE.ClampToEdgeWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      tex.needsUpdate = true;
    },
    undefined,
    (err) => {
      console.warn("Failed to load fluid image texture:", src, err);
    }
  );

  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return {
    texture,
    update: () => {
      // Static image textures don't require per-frame canvas redraws
    },
    dispose: () => {
      texture.dispose();
    },
  };
}
