import * as THREE from "three";

export interface AnimatedTextureResult {
  texture: THREE.Texture;
  update: (time: number) => void;
  dispose: () => void;
}

/**
 * Checks if the user is on a severely limited internet connection (Save-Data enabled or 2G).
 */
function isLimitedConnection(): boolean {
  if (typeof navigator === "undefined") return false;
  // @ts-expect-error NetworkInformation API check
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (conn) {
    if (conn.saveData) return true;
    if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") return true;
  }
  return false;
}

/**
 * Creates and loads a texture for GPU shader fluid simulation.
 * Always prioritizes and renders high quality texture by default.
 * Low quality placeholder only appears when the user encounters very limited network speed.
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
  let fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  const setImg = (img: HTMLImageElement, isHigh: boolean) => {
    if (isDisposed) return;
    texture.image = img;
    texture.needsUpdate = true;
    if (isHigh) {
      isHighResLoaded = true;
    }
    onLoaded?.();
  };

  // 1. Primary: Load the full high-res texture immediately with top priority
  const highImg = new Image();
  highImg.crossOrigin = "anonymous";
  (highImg as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";

  highImg.onload = () => {
    if (fallbackTimer) clearTimeout(fallbackTimer);
    if (!isDisposed) {
      setImg(highImg, true);
    }
  };

  highImg.onerror = (e) => {
    console.warn("Failed to load high-res texture:", src, e);
    // If high-res fails, fallback to low-res
    if (lowResSrc && !isHighResLoaded && !isDisposed) {
      const lowImg = new Image();
      lowImg.crossOrigin = "anonymous";
      lowImg.onload = () => {
        if (!isDisposed && !isHighResLoaded) setImg(lowImg, false);
      };
      lowImg.src = lowResSrc;
    }
  };

  highImg.src = src;

  // If high-res is already cached and available, apply immediately
  if (highImg.complete && highImg.naturalWidth > 0) {
    setImg(highImg, true);
  } else if (lowResSrc) {
    // Only load low quality placeholder if the user is on a severely limited connection
    if (isLimitedConnection()) {
      const lowImg = new Image();
      lowImg.crossOrigin = "anonymous";
      lowImg.onload = () => {
        if (!isDisposed && !isHighResLoaded) {
          setImg(lowImg, false);
        }
      };
      lowImg.src = lowResSrc;
    } else {
      // On normal connections, only fallback if high-res takes excessively long (>1.5s)
      fallbackTimer = setTimeout(() => {
        if (!isDisposed && !isHighResLoaded && lowResSrc) {
          const lowImg = new Image();
          lowImg.crossOrigin = "anonymous";
          lowImg.onload = () => {
            if (!isDisposed && !isHighResLoaded) {
              setImg(lowImg, false);
            }
          };
          lowImg.src = lowResSrc;
        }
      }, 1500);
    }
  }

  return {
    texture,
    update: () => {
      // Static image textures don't require per-frame canvas redraws
    },
    dispose: () => {
      isDisposed = true;
      if (fallbackTimer) clearTimeout(fallbackTimer);
      texture.dispose();
    },
  };
}


