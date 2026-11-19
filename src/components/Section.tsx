import type { ReactNode } from 'react';
import styles from './Section.module.css';

export function Section({
  id,
  alt,
  className,
  children,
  labelledBy,
}: {
  id?: string;
  alt?: boolean;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={[styles.section, alt && styles.alt, className].filter(Boolean).join(' ')}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHead({ id, heading, intro }: { id: string; heading: string; intro?: string }) {
  return (
    <div className={styles.head}>
      <h2 id={id} className={styles.heading}>
        {heading}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
