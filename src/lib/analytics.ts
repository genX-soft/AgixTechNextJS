import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export type ConversionEvent = 
  | 'lead_form_submit'
  | 'lead_form_start'
  | 'cta_click'
  | 'case_study_view'
  | 'roi_calculator_use'
  | 'section_view'
  | 'faq_expand'
  | 'readiness_explorer'
  | 'readiness_explorer_complete'
  | 'autonomy_spectrum_change'
  | 'workflow_simulator_template'
  | 'workflow_simulator_step'
  | 'workflow_simulator_play'
  | 'suitability_quiz_answer'
  | 'suitability_quiz_complete';

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: ConversionEvent, params?: EventParams): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: params?.event_category || 'engagement',
      event_label: params?.event_label,
      value: params?.value,
      ...params,
    });
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, params);
  }
}

export function trackPageView(path: string, title?: string): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  }
}

export function trackConversion(conversionId: string, value?: number): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: 'USD',
    });
  }
}

export function trackScrollDepth(percentage: number): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_depth', {
      percent_scrolled: percentage,
    });
  }
}

type ABTestVariant = 'A' | 'B';

interface ABTest {
  name: string;
  variants: {
    A: unknown;
    B: unknown;
  };
}

const AB_TESTS: Record<string, ABTest> = {
  hero_cta: {
    name: 'Hero CTA Button Text',
    variants: {
      A: 'Request an Automation Assessment',
      B: 'Get Your Free Automation Roadmap',
    },
  },
  final_cta: {
    name: 'Final CTA Button Text',
    variants: {
      A: 'Request Your AI Automation Roadmap',
      B: 'Start Automating Today',
    },
  },
  form_heading: {
    name: 'Lead Form Heading',
    variants: {
      A: 'Get Your Automation Roadmap',
      B: 'See What You Can Automate',
    },
  },
};

function getStoredVariant(testName: string): ABTestVariant | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(`ab_test_${testName}`);
  if (stored === 'A' || stored === 'B') return stored;
  return null;
}

function setStoredVariant(testName: string, variant: ABTestVariant): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`ab_test_${testName}`, variant);
  }
}

export function getABTestVariant(testName: keyof typeof AB_TESTS): ABTestVariant {
  // Return default variant during SSR to ensure consistent hydration
  if (typeof window === 'undefined') return 'A';
  
  const stored = getStoredVariant(testName);
  if (stored) return stored;
  
  const variant: ABTestVariant = Math.random() < 0.5 ? 'A' : 'B';
  setStoredVariant(testName, variant);
  
  trackEvent('cta_click', {
    event_category: 'ab_test',
    event_label: `${testName}_assigned_${variant}`,
  });
  
  return variant;
}

export function getABTestValue<T>(testName: keyof typeof AB_TESTS): T {
  const test = AB_TESTS[testName];
  if (!test) return '' as T;
  
  const variant = getABTestVariant(testName);
  return test.variants[variant] as T;
}

export function trackABConversion(testName: string, variant: ABTestVariant): void {
  trackEvent('cta_click', {
    event_category: 'ab_test_conversion',
    event_label: `${testName}_${variant}_converted`,
  });
}

export function useABTest<T>(testName: keyof typeof AB_TESTS): { variant: ABTestVariant; value: T } {
  const [variant, setVariant] = useState<ABTestVariant>('A');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedVariant = getABTestVariant(testName);
    setVariant(storedVariant);
  }, [testName]);

  const test = AB_TESTS[testName];
  // During SSR and initial hydration, return variant A to ensure consistent rendering
  const effectiveVariant = mounted ? variant : 'A';
  const value = test ? (test.variants[effectiveVariant] as T) : ('' as T);
  return { variant: effectiveVariant, value };
}
