import * as THREE from "three";

export interface AnimatedTextureResult {
  texture: THREE.Texture;
  update: (time: number) => void;
  dispose: () => void;
}

/**
 * Creates and loads a texture for GPU shader fluid simulation with progressive LOD support.
 * Loads low-res placeholder first (if provided) for instant display, then smoothly upgrades to high-res.
 */
export function createAnimatedTexture(
  src: string,
  lowResSrc?: string,
  onLoaded?: () => void
): AnimatedTextureResult {
  const loader = new THREE.TextureLoader();

  // Create empty texture with optimal filtering settings
  const texture = new THREE.Texture();
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  let isHighResLoaded = false;
  let isDisposed = false;

  const configureTexture = (img: HTMLImageElement) => {
    texture.image = img;
    texture.needsUpdate = true;
  };

  // If lowResSrc is provided, load it first for near-instant rendering
  if (lowResSrc) {
    loader.load(
      lowResSrc,
      (lowTex) => {
        if (!isDisposed && !isHighResLoaded && lowTex.image) {
          configureTexture(lowTex.image as HTMLImageElement);
          onLoaded?.();
        }
      },
      undefined,
      (err) => {
        console.warn("Low-res texture load notice:", lowResSrc, err);
      }
    );
  }

  // Load high-res texture in background
  loader.load(
    src,
    (highTex) => {
      if (!isDisposed && highTex.image) {
        isHighResLoaded = true;
        configureTexture(highTex.image as HTMLImageElement);
        onLoaded?.();
      }
    },
    undefined,
    (err) => {
      console.warn("Failed to load fluid image texture:", src, err);
    }
  );

  return {
    texture,
    update: () => {
      // Static image textures don't require per-frame canvas redraws
    },
    dispose: () => {
      isDisposed = true;
      texture.dispose();
    },
  };
}

