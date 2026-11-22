import type { CSSProperties } from 'react';
import type { Content } from '@/content/types';
import { SPONSOR_BASE, SPONSOR_GROUPS, type SponsorLogo } from '@/lib/sponsors';
import { Section, SectionHead } from './Section';
import styles from './Partners.module.css';

/**
 * Crops the transparent padding baked into each file: the wrapper takes the aspect ratio of the
 * visible artwork, and the image is scaled and offset so only that area shows.
 */
function Logo({ logo }: { logo: SponsorLogo }) {
  const box = { '--ar': logo.bw / logo.bh } as CSSProperties;
  const img: CSSProperties = {
    width: `${(logo.w / logo.bw) * 100}%`,
    left: `${(-logo.x / logo.bw) * 100}%`,
    top: `${(-logo.y / logo.bh) * 100}%`,
  };
  return (
    <span className={styles.logo} style={box}>
      {/* eslint-disable-next-line @next/next/no-img-element -- served by expertslive.sa, cropped via CSS */}
      <img
        src={SPONSOR_BASE + encodeURI(logo.src)}
        alt={logo.name}
        width={logo.w}
        height={logo.h}
        style={img}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </span>
  );
}

export function Partners({ c }: { c: Content }) {
  const p = c.partners;
  return (
    <Section id="partners" labelledBy="partners-title">
      <SectionHead id="partners-title" heading={p.heading} />
      <div className={styles.groups}>
        {SPONSOR_GROUPS.map((g) => (
          <div key={g.id} className={`${styles.group} ${g.id === 'powered' ? styles.lead : ''}`}>
            <h3 className={styles.groupTitle}>{p.groupTitles[g.id]}</h3>
            <ul className={styles.tiles} lang="en">
              {g.logos.map((logo) => (
                <li key={logo.src} className={styles.tile}>
                  <Logo logo={logo} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
