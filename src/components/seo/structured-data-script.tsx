'use client';

import { useEffect } from 'react';

interface StructuredDataScriptProps {
  data: object;
  id?: string;
}

export function StructuredDataScript({ data, id = 'structured-data' }: StructuredDataScriptProps) {
  useEffect(() => {
    let script = document.querySelector(`script[data-id="${id}"]`);
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-id', id);
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
    
    return () => {
      script?.remove();
    };
  }, [data, id]);

  return null;
}
