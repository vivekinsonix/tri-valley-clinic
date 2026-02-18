'use client';

import { Avatar } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

interface CardItem {
  id: number;
  label: string;
  image?: {
    url?: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
}

const ITEMS_PER_DOT = 4;
const AUTOPLAY_DELAY = 3500;
const AUTOPLAY_RESUME_DELAY = 1200;

export default function CardSlider({ data = [] }: { data: CardItem[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  const [currentGroup, setCurrentGroup] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  // ← NEW: flag to ignore scroll events during programmatic scrolling
  const isProgrammaticScroll = useRef(false);

  const TOTAL = data.length;
  const dotsCount = Math.ceil(TOTAL / ITEMS_PER_DOT);

  // Measure slide width
  useEffect(() => {
    if (!sliderRef.current || TOTAL === 0) return;

    const first = sliderRef.current.children[0] as HTMLElement;
    if (!first) return;

    const style = window.getComputedStyle(sliderRef.current);
    const gap = parseFloat(style.gap || '0');
    setSlideWidth(first.offsetWidth + gap);
  }, [data, TOTAL]);

  // Autoplay
  useEffect(() => {
    if (paused || slideWidth === 0 || dotsCount <= 1) {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
      return;
    }

    autoplayTimer.current = setInterval(() => {
      setCurrentGroup((prev) => (prev + 1) % dotsCount);
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [paused, slideWidth, dotsCount]);

  // Sync scroll when currentGroup changes
  useEffect(() => {
    if (!sliderRef.current || slideWidth === 0) return;

    isProgrammaticScroll.current = true; // ← block scroll event handling

    sliderRef.current.scrollTo({
      left: currentGroup * slideWidth * ITEMS_PER_DOT,
      behavior: 'smooth',
    });

    // Re-enable scroll handling after the animation finishes (≈600ms is safe)
    const timer = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);

    return () => clearTimeout(timer);
  }, [currentGroup, slideWidth]);

  const updateGroupFromScroll = () => {
    if (!sliderRef.current || slideWidth === 0) return;

    const scrollLeft = sliderRef.current.scrollLeft;
    const group = Math.round(scrollLeft / (slideWidth * ITEMS_PER_DOT));
    setCurrentGroup(Math.min(Math.max(group, 0), dotsCount - 1));
  };

  const handleScroll = () => {
    // ← Ignore scroll events while we are programmatically scrolling
    if (isProgrammaticScroll.current) return;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(updateGroupFromScroll, 80);
  };

  const handleMouseEnter = () => {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  const handleMouseLeave = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), AUTOPLAY_RESUME_DELAY);
  };

  const handleTouchStart = () => {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), AUTOPLAY_RESUME_DELAY);
  };

  const getImageUrl = (card: CardItem) => card.image?.formats?.thumbnail?.url || card.image?.formats?.small?.url || card.image?.url || '';

  if (TOTAL === 0) return null;

  return (
    <section className="relative mx-auto mt-10 outline-none" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Featured items carousel">
      <div ref={sliderRef} onScroll={handleScroll} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="flex overflow-x-hidden snap-x snap-mandatory gap-4 pb-6 scrollbar-hide scroll-smooth">
        {data.map((card) => (
          <div key={card.id} className="snap-start shrink-0 w-[320px] p-4 rounded-lg bg-white shadow-lg flex flex-col items-center">
            <Avatar img={getImageUrl(card)} size="xl" rounded={false} className="grayscale-50 w-44 cursor-pointer  hover:grayscale-0 transition" />
            <p className="mt-5 font-semibold text-center">{card.label}</p>
          </div>
        ))}
      </div>

      {dotsCount > 1 && (
        <div className="mt-4 flex justify-center gap-2.5">
          {Array.from({ length: dotsCount }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPaused(true);
                if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
                setCurrentGroup(idx); // ← this now works reliably
              }}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${idx === currentGroup ? 'bg-gray-800 scale-125' : 'bg-gray-300 hover:bg-gray-500'}`}
              aria-label={`View group ${idx + 1} of ${dotsCount}`}
              aria-current={idx === currentGroup ? 'true' : 'false'}
            />
          ))}
        </div>
      )}
    </section>
  );
}
