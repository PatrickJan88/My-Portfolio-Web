import * as THREE from "three";

export interface AnimatedTextureResult {
  texture: THREE.Texture;
  update: (time: number) => void;
  dispose: () => void;
}

/**
 * Creates and loads a texture for GPU shader fluid simulation with progressive LOD support.
 * Loads low-res placeholder first (if provided) for instant display, then seamlessly swaps to high-res.
 */
export function createAnimatedTexture(
  src: string,
  lowResSrc?: string,
  onLoaded?: () => void
): AnimatedTextureResult {
  // Create texture container with optimal filtering settings
  const texture = new THREE.Texture();
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  let isHighResLoaded = false;
  let isDisposed = false;

  const setImg = (img: HTMLImageElement) => {
    if (isDisposed) return;
    texture.image = img;
    texture.needsUpdate = true;
    onLoaded?.();
  };

  // 1. If lowResSrc is provided, load preview immediately for zero delay
  if (lowResSrc) {
    const lowImg = new Image();
    lowImg.crossOrigin = "anonymous";
    lowImg.onload = () => {
      if (!isDisposed && !isHighResLoaded) {
        setImg(lowImg);
      }
    };
    lowImg.src = lowResSrc;
  }

  // 2. Load the full high-res texture
  const highImg = new Image();
  highImg.crossOrigin = "anonymous";
  highImg.onload = () => {
    if (!isDisposed) {
      isHighResLoaded = true;
      setImg(highImg);
    }
  };
  highImg.onerror = (e) => {
    console.warn("Failed to load high-res texture:", src, e);
  };
  highImg.src = src;

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

