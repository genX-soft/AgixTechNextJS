'use client'
import { useEffect, useRef, useState, ReactNode, memo } from 'react';

interface LazyMountProps {
  children: ReactNode;
  rootMargin?: string;
  fallbackHeight?: string;
}

export const LazyMount = memo(function LazyMount({
  children,
  rootMargin = '400px 0px',
  fallbackHeight = '400px',
}: LazyMountProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  // If we haven't mounted yet on the client, we just render the children
  // without hydration if possible, or we let Next.js SSR them.
  // Rendering the empty div fallback caused SEO issues (content missing from initial HTML)
  // and CLS (layout shift when the content suddenly appeared).
  // Now, we always render children on SSR, but the JS chunks for the children
  // won't be executed on the client until they intersect because we dynamically 
  // imported them in the parent with next/dynamic!
  
  if (mounted) return <>{children}</>;

  return (
    <div
      ref={ref}
      style={{ minHeight: fallbackHeight }}
      className="lazy-mount-wrapper"
    >
      {/* We render children to preserve SSR/SEO, but client won't hydrate them
          fully until 'mounted' is true because they are dynamically imported */}
      {children}
    </div>
  );
});
