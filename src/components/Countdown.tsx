'use client';

import { useEffect, useState } from 'react';
import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';

const DAY = 86_400_000;

/** Whole days until Day 1, counted in Riyadh calendar days. Static text: no ticking. */
function riyadhDayNumber(ms: number) {
  return Math.floor((ms + 3 * 3_600_000) / DAY); // Riyadh is UTC+3 all year
}

export function Countdown({ copy, className }: { copy: Content['countdown']; className?: string }) {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const now = Date.now();
    const start = Date.parse(SITE.eventStart);
    const end = Date.parse(SITE.eventEnd);
    if (now > end) setText(copy.over);
    else if (now >= start) setText(copy.live);
    else {
      const n = Math.max(1, riyadhDayNumber(start) - riyadhDayNumber(now));
      const f = copy.daysToGo;
      const template = n === 1 ? f.one : n === 2 && f.two ? f.two : n <= 10 && f.few ? f.few : f.many;
      setText(template.replace('{n}', String(n)));
    }
  }, [copy]);

  return (
    <span className={className} aria-live="off">
      {text ?? ' '}
    </span>
  );
}
