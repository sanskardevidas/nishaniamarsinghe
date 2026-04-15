import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
            elements.forEach((el) => {
              el.classList.add('visible');
            });
            if (entry.target.classList.contains('reveal') ||
                entry.target.classList.contains('reveal-left') ||
                entry.target.classList.contains('reveal-right') ||
                entry.target.classList.contains('reveal-scale')) {
              entry.target.classList.add('visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const container = ref.current;
    if (container) {
      observer.observe(container);
      const elements = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useElementAnimation(className = 'reveal') {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const el = ref.current;
    if (el) {
      el.classList.add(className);
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [className]);

  return ref;
}
