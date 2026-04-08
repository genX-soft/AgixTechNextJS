'use client';

import { useState } from 'react';
import { Testimonial, TestimonialService } from '@/lib/data/testimonials';
import TestimonialCard from './TestimonialCard';

const FILTERS: Array<TestimonialService | 'All'> = [
  'All',
  'AI Consulting',
  'AI Development',
  'Automation',
  'Voice AI',
  'Industry Solutions',
];

interface TestimonialFilterProps {
  testimonials: Testimonial[];
}

export default function TestimonialFilter({ testimonials }: TestimonialFilterProps) {
  const [active, setActive] = useState<TestimonialService | 'All'>('All');

  const filtered =
    active === 'All'
      ? testimonials
      : testimonials.filter((t) => t.service === active);

  return (
    <div className="space-y-8">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Filter testimonials by service">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            role="tab"
            aria-selected={active === filter}
            onClick={() => setActive(filter)}
            data-testid={`button-filter-${filter.toLowerCase().replace(/\s+/g, '-')}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              active === filter
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-transparent text-muted-foreground border-border/50 hover:border-primary/50 hover:text-foreground'
            }`}
          >
            {filter}
            <span className="ml-1.5 text-xs opacity-70">
              ({filter === 'All' ? testimonials.length : testimonials.filter((t) => t.service === filter).length})
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No testimonials found for this filter.</p>
      )}
    </div>
  );
}
