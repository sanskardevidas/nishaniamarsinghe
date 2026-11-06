import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scrolls to the top on page changes and to #hash targets (smoothly, via CSS scroll-behavior). */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView();
    }, 0);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
