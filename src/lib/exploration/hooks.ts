import { useEffect, useRef } from "react";

const SESSION_KEY_EXIT_TRIGGERED = "exploration_exit_triggered";
const SESSION_KEY_SCROLL_TRIGGERED = "exploration_scroll_triggered";

export function useExitIntent(onTrigger: () => void, enabled: boolean = true) {
  const triggeredRef = useRef(false);
  const onTriggerRef = useRef(onTrigger);
  
  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    
    if (sessionStorage.getItem(SESSION_KEY_EXIT_TRIGGERED)) {
      triggeredRef.current = true;
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggeredRef.current) return;
      if (e.clientY <= 0) {
        triggeredRef.current = true;
        sessionStorage.setItem(SESSION_KEY_EXIT_TRIGGERED, "true");
        onTriggerRef.current();
      }
    };

    const handleVisibilityChange = () => {
      if (triggeredRef.current) return;
      if (document.hidden) {
        triggeredRef.current = true;
        sessionStorage.setItem(SESSION_KEY_EXIT_TRIGGERED, "true");
        onTriggerRef.current();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled]);
}

export function useScrollTrigger(
  onTrigger: () => void,
  threshold: number = 0.4,
  enabled: boolean = true
) {
  const triggeredRef = useRef(false);
  const onTriggerRef = useRef(onTrigger);
  
  useEffect(() => {
    onTriggerRef.current = onTrigger;
  }, [onTrigger]);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    
    if (sessionStorage.getItem(SESSION_KEY_SCROLL_TRIGGERED)) {
      triggeredRef.current = true;
      return;
    }

    const handleScroll = () => {
      if (triggeredRef.current) return;
      
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = scrollHeight - viewportHeight;
      
      if (scrollableDistance <= 0) return;
      
      const scrollPercentage = window.scrollY / scrollableDistance;
      
      if (scrollPercentage >= threshold) {
        triggeredRef.current = true;
        sessionStorage.setItem(SESSION_KEY_SCROLL_TRIGGERED, "true");
        onTriggerRef.current();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, threshold]);
}

export function resetTriggerFlags() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY_EXIT_TRIGGERED);
  sessionStorage.removeItem(SESSION_KEY_SCROLL_TRIGGERED);
}
