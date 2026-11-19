'use client';

import { useEffect, useState } from 'react';
import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import styles from './MobileBar.module.css';

/** Ticket CTA that slides in on small screens once the hero CTAs are out of view. */
export function MobileBar({ c }: { c: Pick<Content, 'a11y' | 'mobileBar' | 'ctaTicket'> }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const form = document.getElementById('demo-day');
    if (!hero) return;
    let heroOut = false;
    let formIn = false;
    const update = () => setVisible(heroOut && !formIn);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroOut = !e.isIntersecting;
        if (e.target === form) formIn = e.isIntersecting;
      }
      update();
    });
    io.observe(hero);
    if (form) io.observe(form);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ''}`} aria-hidden={!visible} inert={!visible}>
      <span className={styles.text}>{c.mobileBar.text}</span>
      <ButtonLink href={SITE.links.tickets} external newTabLabel={c.a11y.opensNewTab} size="small">
        {c.ctaTicket}
      </ButtonLink>
    </div>
  );
}
