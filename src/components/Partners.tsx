import Image from 'next/image';
import type { Content } from '@/content/types';
import { ORGANISER_LOGOS } from '@/lib/organisers';
import { Section, SectionHead } from './Section';
import styles from './Partners.module.css';

export function Partners({ c }: { c: Content }) {
  const p = c.partners;
  return (
    <Section id="partners" labelledBy="partners-title">
      <SectionHead id="partners-title" heading={p.heading} />
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>{p.groupTitle}</h3>
        <ul className={styles.tiles} lang="en">
          {ORGANISER_LOGOS.map((logo) => (
            <li key={logo.src} className={styles.tile}>
              <Image src={logo.src} alt={logo.name} width={logo.width} height={logo.height} sizes="176px" />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
