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

  if (mounted) return <>{children}</>;

  return (
    <div
      ref={ref}
      style={{ minHeight: fallbackHeight }}
      aria-hidden="true"
    />
  );
});
