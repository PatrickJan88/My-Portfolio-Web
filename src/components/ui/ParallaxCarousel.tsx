import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const IMAGES = [
  'https://picsum.photos/800/450?random=1',
  'https://picsum.photos/800/450?random=2',
  'https://picsum.photos/800/450?random=3',
  'https://picsum.photos/800/450?random=4',
  'https://picsum.photos/800/450?random=5',
  'https://picsum.photos/800/450?random=6',
];

export function ParallaxCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.config({ nullTargetWarn: false });

    const track = trackRef.current;
    const viewport = viewportRef.current;

    if (!track || !viewport) return;

    let cards = Array.from(track.children) as HTMLElement[];
    const originalCount = cards.length;

    // Function to clone the original cards multiple times for infinite scrolling illusion
    function ensureClones() {
      const originals = Array.from(track!.querySelectorAll('.carousel-card')).slice(0, originalCount);
      track!.innerHTML = '';

      const cloneCount = 3; // How many times to repeat the originals
      for (let i = 0; i < cloneCount; i++) {
        originals.forEach(c => track!.appendChild(c.cloneNode(true)));
      }
    }

    ensureClones();
    cards = Array.from(track.children) as HTMLElement[];

    function getItemWidth() {
      if (!cards[0]) return 0;
      const style = getComputedStyle(cards[0]);
      return cards[0].offsetWidth + parseFloat(style.marginRight || '0');
    }

    let itemW = getItemWidth();
    let totalWidth = itemW * cards.length;
    let visibleCenterX = window.innerWidth / 2;

    let position = 0;
    let velocity = 0;
    let smoothPos = 0;

    const friction = 0.91;
    const wheelMultiplier = 0.1;
    const lerpSpeed = 0.14;

    const handleWheel = (e: WheelEvent) => {
      // Don't prevent default, allow page to scroll normally, 
      // but also use the delta to move the carousel slightly if needed.
      // For a better UX we can just let it scroll based on mousewheel if hovering.
      // e.preventDefault(); 
      velocity += e.deltaY * wheelMultiplier;
    };

    let touchStartX: number | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartX === null) return;
      const dx = e.touches[0].clientX - touchStartX;
      position -= dx;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      touchStartX = null;
    };

    let isDragging = false;
    let lastX = 0;
    let dragStartTime = 0;
    let dragStartX = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
      dragStartX = e.clientX;
      dragStartTime = performance.now();
      velocity = 0;
      viewport.classList.add('cursor-grabbing');
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDragging) {
        viewport.classList.remove('cursor-grabbing');
        isDragging = false;

        const dx = e.clientX - dragStartX;
        const dt = (performance.now() - dragStartTime) / 1000;

        if (dt > 0) {
          let v = -(dx / dt) * 0.03;
          const maxVelocity = 30;
          velocity = Math.max(Math.min(v, maxVelocity), -maxVelocity);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      position -= dx * 0.8;
      lastX = e.clientX;
    };

    // To prevent scrolling the page when moving the carousel via touch:
    const handleTouchMoveNonPassive = (e: TouchEvent) => {
       if (touchStartX !== null) {
         e.preventDefault();
       }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: true });
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMoveNonPassive, { passive: false });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: true });
    viewport.addEventListener('touchend', handleTouchEnd);
    viewport.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    viewport.addEventListener('mousemove', handleMouseMove);

    function wrap(x: number) {
      if (totalWidth === 0) return 0;
      return ((x % totalWidth) + totalWidth) % totalWidth;
    }

    function easeScale(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    const tick = () => {
      if (!isDragging) {
        position += velocity;
        velocity *= friction;
      }

      smoothPos += (position - smoothPos) * lerpSpeed;

      for (let i = 0; i < cards.length; i++) {
        let baseX = i * itemW - smoothPos;
        baseX = wrap(baseX);

        const finalX = baseX - totalWidth / 2 + visibleCenterX;
        const cardCenterX = finalX + itemW / 2;
        const MathDist = Math.abs(cardCenterX - visibleCenterX);

        let t = gsap.utils.clamp(0, 1, MathDist / Math.max(window.innerWidth, 900));
        t = easeScale(t);

        const scale = gsap.utils.mapRange(0, 1, 1, 0.65, t);
        const blurNum = gsap.utils.mapRange(0, 1, 0, 6, t);
        const brightness = gsap.utils.mapRange(0, 1, 1, 0.6, t);

        gsap.set(cards[i], {
          x: finalX,
          y: 0,
          scaleX: scale,
          scaleY: scale,
          rotationY: 0,
          rotationX: 0,
          z: 0,
          filter: `blur(${blurNum}px) brightness(${brightness})`,
          transformOrigin: 'center center',
          position: 'absolute',
        });

        const parallaxRange = 40;
        const parallaxX = gsap.utils.mapRange(
          -window.innerWidth / 2,
          window.innerWidth / 2,
          parallaxRange,
          -parallaxRange,
          cardCenterX - visibleCenterX
        );
        const parallaxY = gsap.utils.mapRange(
          -window.innerWidth / 2,
          window.innerWidth / 2,
          -10,
          10,
          cardCenterX - visibleCenterX
        );

        const img = cards[i].querySelector('img');
        if (img) {
          gsap.to(img, {
            x: parallaxX,
            y: parallaxY,
            duration: 0.45,
            ease: 'power2.out',
          });
        }
      }
    };

    gsap.ticker.add(tick);

    const handleResize = () => {
      itemW = getItemWidth();
      totalWidth = itemW * cards.length;
      visibleCenterX = window.innerWidth / 2;
    };
    window.addEventListener('resize', handleResize);

    setTimeout(handleResize, 100);

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchmove', handleTouchMoveNonPassive);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
      viewport.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      viewport.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="w-full mt-16 max-w-[100vw] overflow-hidden flex items-end justify-center">
      <div 
        ref={viewportRef} 
        className="w-full h-[33vh] min-h-[300px] overflow-visible flex items-end justify-start relative cursor-grab active:cursor-grabbing"
      >
        <div ref={trackRef} className="absolute bottom-4 left-0 h-full will-change-transform">
          {IMAGES.map((src, index) => (
            <div 
              key={index} 
              className="carousel-card w-[clamp(260px,30vw,400px)] aspect-video mr-12 overflow-hidden bg-transparent absolute bottom-0"
            >
              <div className="w-full h-full overflow-hidden will-change-transform rounded-2xl">
                <img 
                  src={src} 
                  alt={`Placeholder ${index + 1}`} 
                  className="w-[120%] h-[120%] object-cover block select-none pointer-events-none translate-z-0 will-change-transform"
                  style={{ WebkitUserDrag: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
