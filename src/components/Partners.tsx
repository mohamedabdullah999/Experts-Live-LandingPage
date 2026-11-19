import Image from 'next/image';
import type { Content } from '@/content/types';
import { LOGOS } from '@/lib/logos';
import { Section, SectionHead } from './Section';
import styles from './Partners.module.css';

export function Partners({ c }: { c: Content }) {
  const p = c.partners;
  const lastGroup = p.groups.length - 1;
  return (
    <Section id="partners" labelledBy="partners-title">
      <SectionHead id="partners-title" heading={p.heading} />
      <div className={styles.groups}>
        {p.groups.map((g, gi) => (
          <div key={g.title} className={styles.group}>
            <h3 className={styles.groupTitle}>{g.title}</h3>
            <ul className={styles.tiles}>
              {g.names.map((name) => {
                const logo = LOGOS[name];
                if (!logo) {
                  return (
                    <li key={name} className={`${styles.tile} ${styles.textTile}`} lang="en">
                      {name}
                    </li>
                  );
                }
                const cls = [styles.tile, logo.mono && styles.mono, logo.keepOnDark && styles.dark]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <li key={name} className={cls}>
                    <Image src={logo.src} alt={name} width={logo.width} height={logo.height} sizes="152px" />
                  </li>
                );
              })}
              {gi === lastGroup ? <li className={styles.more}>{p.more}</li> : null}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
