import { useEffect, useRef, useState } from 'react';

export function useInView(
  options: IntersectionObserverInit = {
    threshold: 0,
    rootMargin: '-220px 0px 0px 0px', // trigger slightly before top
  }
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // ❌ Desktop → do nothing
    if (window.matchMedia('(min-width: 768px)').matches) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect(); // 🔒 trigger once
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]); // add options as dependency

  return { ref, inView };
}
