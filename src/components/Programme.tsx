import type { Content } from '@/content/types';
import { Section, SectionHead } from './Section';
import styles from './Programme.module.css';

export function Programme({ c }: { c: Content }) {
  const p = c.programme;
  return (
    <Section id="programme" labelledBy="programme-title">
      <SectionHead id="programme-title" heading={p.heading} intro={p.intro} />

      <ul className={styles.tracks}>
        {p.tracks.map((t) => (
          <li key={t.name} className={styles.track}>
            <h3 className={styles.trackName}>{t.name}</h3>
            <p className={styles.topics}>{t.topics}</p>
          </li>
        ))}
      </ul>

      <div className={styles.more}>
        <h3 className={styles.moreHeading}>{p.moreHeading}</h3>
        <dl className={styles.moreList}>
          {p.more.map((m) => (
            <div key={m.title} className={styles.moreItem}>
              <dt>{m.title}</dt>
              <dd>{m.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
