import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import SplitText from './SplitText';

gsap.registerPlugin(Draggable);

interface Work {
  id: string;
  title: string;
  category: string;
  image: string;
}

export function FeaturedSlider({ works }: { works: Work[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const totalRef = useRef<HTMLHeadingElement>(null);
  const stepRef = useRef<HTMLHeadingElement>(null);
  const stepsParentRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!containerRef.current || !listRef.current || !stepsParentRef.current) return;
    
    const wrapper = listRef.current;
    const slides = gsap.utils.toArray('[data-slider="slide"]', wrapper) as HTMLElement[];
    const nextButton = nextBtnRef.current;
    const prevButton = prevBtnRef.current;
    
    const totalElement = totalRef.current;
    const stepElement = stepRef.current;
    const stepsParent = stepsParentRef.current;
    
    if (!totalElement || !stepElement || !stepsParent) return;

    let activeElement: HTMLElement | null = null;
    const totalSlides = slides.length;

    totalElement.textContent = totalSlides < 10 ? `0${totalSlides}` : `${totalSlides}`;

    stepsParent.innerHTML = ''; 
    slides.forEach((_, index) => {
      const stepClone = stepElement.cloneNode(true) as HTMLElement;
      stepClone.textContent = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
      stepClone.style.display = 'block';
      stepsParent.appendChild(stepClone);
    });

    const allSteps = stepsParent.querySelectorAll('[data-slide-count="step"]');
    
    const loop = horizontalLoop(slides, {
      paused: true, 
      draggable: true, 
      center: false,
      onChange: (element, index) => { 
        if (activeElement) {
          activeElement.classList.remove("active");
        }
        // Osmo offset design
        const nextSibling = (element.nextElementSibling as HTMLElement) || slides[0]; 
        nextSibling.classList.add("active");
        activeElement = nextSibling;
        
        gsap.to(allSteps, { y: `${-100 * index}%`, ease: "power3", duration: 0.45 });
      }
    });
    
    // Handle click on slides
    const slideClickHandlers = slides.map((slide, i) => {
      const handler = () => loop.toIndex(i - 1, {ease:"power3",duration: 0.725});
      slide.addEventListener("click", handler);
      return { slide, handler };
    });
    
    const onNext = () => loop.next({ease:"power3", duration: 0.725});
    const onPrev = () => loop.previous({ease:"power3", duration: 0.725});

    if (nextButton) nextButton.addEventListener("click", onNext);
    if (prevButton) prevButton.addEventListener("click", onPrev);

    return () => {
      slideClickHandlers.forEach(({slide, handler}) => slide.removeEventListener("click", handler));
      if (nextButton) nextButton.removeEventListener("click", onNext);
      if (prevButton) prevButton.removeEventListener("click", onPrev);
      loop?.kill();
    };
  }, [works]);

  function horizontalLoop(items: HTMLElement[], config: any) {
    let timeline: any;
    items = gsap.utils.toArray(items);
    config = config || {};
    gsap.context(() => { 
      let onChange = config.onChange,
        lastIndex = 0,
        tl = gsap.timeline({
          repeat: config.repeat, 
          onUpdate: onChange && function() {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          }, 
          paused: config.paused, 
          defaults: {ease: "none"}, 
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
        }) as any,
        length = items.length,
        startX = items[0].offsetLeft,
        times: number[] = [],
        widths: number[] = [],
        spaceBefore: number[] = [],
        xPercents: number[] = [],
        curIndex = 0,
        indexIsDirty = false,
        center = config.center,
        pixelsPerSecond = (config.speed || 1) * 100,
        snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1), 
        timeOffset = 0,
        container = center === true ? items[0].parentNode as HTMLElement : (gsap.utils.toArray(center)[0] as HTMLElement) || items[0].parentNode as HTMLElement,
        totalWidth: number,
        getTotalWidth = () => items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + spaceBefore[0] + items[length-1].offsetWidth * Number(gsap.getProperty(items[length-1], "scaleX")) + (parseFloat(config.paddingRight) || 0),
        populateWidths = () => {
          let b1 = container.getBoundingClientRect(), b2;
          items.forEach((el, i) => {
            widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
            xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i] * 100 + Number(gsap.getProperty(el, "xPercent")));
            b2 = el.getBoundingClientRect();
            spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
            b1 = b2;
          });
          gsap.set(items, { 
            xPercent: i => xPercents[i]
          });
          totalWidth = getTotalWidth();
        },
        timeWrap: any,
        populateOffsets = () => {
          timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalWidth : 0;
          center && times.forEach((t, i) => {
            times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * widths[i] / 2 / totalWidth - timeOffset);
          });
        },
        getClosest = (values: number[], value: number, wrap: number) => {
          let i = values.length,
            closest = 1e10,
            index = 0, d;
          while (i--) {
            d = Math.abs(values[i] - value);
            if (d > wrap / 2) {
              d = wrap - d;
            }
            if (d < closest) {
              closest = d;
              index = i;
            }
          }
          return index;
        },
        populateTimeline = () => {
          let i, item, curX, distanceToStart, distanceToLoop;
          tl.clear();
          for (i = 0; i < length; i++) {
            item = items[i];
            curX = xPercents[i] / 100 * widths[i];
            distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
            distanceToLoop = distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"));
            tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
              .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
              .add("label" + i, distanceToStart / pixelsPerSecond);
            times[i] = distanceToStart / pixelsPerSecond;
          }
          timeWrap = gsap.utils.wrap(0, tl.duration());
        },
        refresh = (deep: boolean) => {
          let progress = tl.progress();
          tl.progress(0, true);
          populateWidths();
          deep && populateTimeline();
          populateOffsets();
          deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
        },
        onResize = () => refresh(true),
        proxy: any;
      
      gsap.set(items, {x: 0});
      populateWidths();
      populateTimeline();
      populateOffsets();
      window.addEventListener("resize", onResize);
      
      function toIndex(index: number, vars: any) {
        vars = vars || {};
        (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); 
        let newIndex = gsap.utils.wrap(0, length, index),
          time = times[newIndex];
        if (time > tl.time() !== index > curIndex && index !== curIndex) { 
          time += tl.duration() * (index > curIndex ? 1 : -1);
        }
        if (time < 0 || time > tl.duration()) {
          vars.modifiers = {time: timeWrap};
        }
        curIndex = newIndex;
        vars.overwrite = true;
        gsap.killTweensOf(proxy);    
        return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars);
      }
      
      tl.toIndex = (index: number, vars: any) => toIndex(index, vars);
      tl.closestIndex = (setCurrent: boolean) => {
        let index = getClosest(times, tl.time(), tl.duration());
        if (setCurrent) {
          curIndex = index;
          indexIsDirty = false;
        }
        return index;
      };
      tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex;
      tl.next = (vars: any) => toIndex(tl.current()+1, vars);
      tl.previous = (vars: any) => toIndex(tl.current()-1, vars);
      tl.times = times;
      tl.progress(1, true).progress(0, true); 
      
      if (config.reversed) {
        tl.vars.onReverseComplete();
        tl.reverse();
      }
      
      if (config.draggable && typeof(Draggable) === "function") {
        proxy = document.createElement("div")
        let wrap = gsap.utils.wrap(0, 1),
          ratio: number, startProgress: number, draggable: any, lastSnap: number, initChangeX: number, wasPlaying: boolean,
          align = () => tl.progress(wrap(startProgress + (draggable.startX - draggable.x) * ratio)),
          syncIndex = () => tl.closestIndex(true);
        
        draggable = Draggable.create(proxy, {
          trigger: items[0].parentNode as Element,
          type: "x",
          onPressInit() {
            let x = this.x;
            gsap.killTweensOf(tl);
            wasPlaying = !tl.paused();
            tl.pause();
            startProgress = tl.progress();
            refresh(false);
            ratio = 1 / totalWidth;
            initChangeX = (startProgress / -ratio) - x;
            gsap.set(proxy, {x: startProgress / -ratio});
          },
          onDrag: align,
          onThrowUpdate: align,
          overshootTolerance: 0,
          inertia: false, 
          onRelease() {
            syncIndex();
            draggable.isThrowing && (indexIsDirty = true);
          },
          onThrowComplete: () => {
            syncIndex();
            wasPlaying && tl.play();
          }
        })[0];
        tl.draggable = draggable;
      }
      tl.closestIndex(true);
      lastIndex = curIndex;
      onChange && onChange(items[curIndex], curIndex);
      timeline = tl;
      return () => window.removeEventListener("resize", onResize); 
    });
    return timeline;
  }

  return (
    <div className="w-full flex flex-col items-center" ref={containerRef}>
      
      {/* Headings Row */}
      <div className="max-w-[1400px] w-full mx-auto flex justify-between items-start mb-12 px-6 md:px-12">
        <div>
          <SplitText
            text="Selected Cases"
            tag="h2"
            className="text-6xl font-bold tracking-tighter text-neutral-900 uppercase leading-none mb-6 inline-block"
            delay={50}
            duration={1}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
          
          {/* Numbers Counter */}
          <div className="mt-6 flex items-center gap-1 font-bold text-6xl tracking-tight text-neutral-900" style={{ fontFamily: 'Impact, sans-serif' }}>
            <div className="h-[1em] overflow-hidden">
              <div ref={stepsParentRef} className="flex flex-col">
                <h2 data-slide-count="step" ref={stepRef} className="m-0 leading-none h-[1em]" style={{ display: 'none' }}>01</h2>
              </div>
            </div>
            <div className="w-[2px] h-[0.75em] bg-neutral-900 rotate-12 mx-2"></div>
            <div className="h-[1em] overflow-hidden">
              <h2 data-slide-count="total" ref={totalRef} className="m-0 leading-none h-[1em]">04</h2>
            </div>
          </div>
        </div>
        <Link to="/projects" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold bg-neutral-900 text-white uppercase tracking-widest transition-transform hover:scale-105">
          View All
        </Link>
      </div>

      {/* Main Slider Area */}
      <div className="osmo-slider-container w-full relative text-neutral-900 overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="w-full flex items-center justify-start">
          <div data-slider="list" ref={listRef} className="flex relative items-stretch py-12">
            {works.map((work, index) => (
              <div 
                key={work.id} 
                data-slider="slide" 
                className="slider-slide flex-none w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] shrink-0 px-4 relative opacity-40 transition-opacity duration-400 [&.active]:opacity-100 cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-2xl relative overflow-hidden group">
                  <Link to={`/projects/${work.id}`} className="w-full h-full block">
                    <img 
                      src={work.image} 
                      alt={work.title} 
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />
                    <div className="absolute top-6 left-3 z-[2] bg-white text-neutral-900 rounded-md flex items-center py-1.5 px-3.5 gap-2 transform -translate-x-[25%] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 group-[.active]:opacity-100 group-[.active]:translate-x-0">
                      <div className="w-2 h-2 rounded-full bg-neutral-900 shrink-0"></div>
                      <p className="m-0 text-xs font-semibold uppercase tracking-wider">{work.title}</p>
                    </div>
                    <div className="absolute bottom-6 right-6 z-[2] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transform translate-y-[25%] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:bg-white/20 group-hover:scale-110 group-[.active]:opacity-100 group-[.active]:translate-y-0">
                      <ArrowUpRight className="w-5 h-5 ml-[-1px] mt-[1px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons Centered */}
      <div className="flex gap-4 justify-center items-center mt-4 mb-4 px-6 w-full">
        <button 
          data-slider="button-prev" 
          ref={prevBtnRef}
          className="osmo-btn flex items-center justify-center w-12 h-12 rounded-full bg-transparent border border-neutral-900/30 text-neutral-900 relative hover:scale-95 hover:border-neutral-900 transition-all duration-300 group"
          aria-label="previous slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button 
          data-slider="button-next" 
          ref={nextBtnRef}
          className="osmo-btn flex items-center justify-center w-12 h-12 rounded-full bg-transparent border border-neutral-900/30 text-neutral-900 relative hover:scale-95 hover:border-neutral-900 transition-all duration-300 group"
          aria-label="next slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-12 sm:hidden flex justify-center px-6 w-full">
        <Link to="/projects" className="inline-flex items-center justify-center w-full px-6 py-2.5 rounded-full text-sm font-bold bg-neutral-900 text-white uppercase tracking-widest transition-transform hover:scale-105">
          View All
        </Link>
      </div>
    </div>
  );
}
