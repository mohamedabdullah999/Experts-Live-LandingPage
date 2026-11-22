'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import { Section, SectionHead } from './Section';
import styles from './Paths.module.css';

export function Paths({ c }: { c: Pick<Content, 'dir' | 'paths' | 'a11y'> }) {
  const personas = c.paths.personas;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const persona = personas[active];

  const select = (i: number) => {
    const next = (i + personas.length) % personas.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const rtl = c.dir === 'rtl';
    const map: Record<string, number> = {
      ArrowDown: 1,
      ArrowUp: -1,
      ArrowRight: rtl ? -1 : 1,
      ArrowLeft: rtl ? 1 : -1,
    };
    if (e.key in map) {
      e.preventDefault();
      select(active + map[e.key]);
    } else if (e.key === 'Home') {
      e.preventDefault();
      select(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      select(personas.length - 1);
    }
  };

  return (
    <Section id="paths" labelledBy="paths-title" alt>
      <SectionHead id="paths-title" heading={c.paths.heading} intro={c.paths.intro} />

      <div className={styles.layout}>
        <div>
          <p className={styles.listLabel} id={`${baseId}-label`}>
            {c.paths.listLabel}
          </p>
          <div
            role="tablist"
            aria-labelledby={`${baseId}-label`}
            aria-orientation="vertical"
            className={styles.tabs}
            onKeyDown={onKeyDown}
          >
            {personas.map((p, i) => (
              <button
                key={p.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${p.id}`}
                aria-selected={i === active}
                aria-controls={`${baseId}-panel`}
                tabIndex={i === active ? 0 : -1}
                className={styles.tab}
                onClick={() => setActive(i)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div
          key={persona.id}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${persona.id}`}
          className={styles.panel}
          tabIndex={0}
        >
          <h3 className={styles.panelTitle}>{persona.label}</h3>
          <p className={styles.examples}>{persona.examples}</p>

          <ol className={styles.steps}>
            <li className={styles.step}>
              <span className={styles.stepLabel}>{c.paths.steps.start}</span>
              <span className={styles.stepText}>{persona.start}</span>
            </li>
            <li className={styles.step}>
              <span className={styles.stepLabel}>{c.paths.steps.meet}</span>
              <span className={styles.stepText}>{persona.meet}</span>
            </li>
            <li className={styles.step}>
              <span className={styles.stepLabel}>{c.paths.steps.leave}</span>
              <span className={styles.stepText}>{persona.leave}</span>
            </li>
          </ol>

          {persona.cta.form ? (
            <ButtonLink href={persona.cta.href} data-form={persona.cta.form}>
              {persona.cta.label}
            </ButtonLink>
          ) : (
            <ButtonLink href={SITE.links.tickets} external newTabLabel={c.a11y.opensNewTab}>
              {persona.cta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </Section>
  );
}
