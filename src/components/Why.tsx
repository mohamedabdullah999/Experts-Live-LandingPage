import type { Content } from '@/content/types';
import { Section } from './Section';
import styles from './Why.module.css';

export function Why({ c }: { c: Content }) {
  return (
    <Section id="why" labelledBy="why-title">
      <div className={styles.grid}>
        <div className={styles.head}>
          <h2 id="why-title" className={styles.heading}>
            {c.why.heading}
          </h2>
          <p className={styles.intro}>{c.why.intro}</p>
        </div>
        <ul className={styles.list}>
          {c.why.pillars.map((p) => (
            <li key={p.title} className={styles.pillar}>
              <span className={styles.fact}>{p.fact}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.text}>{p.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
