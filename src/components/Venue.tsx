import Image from 'next/image';
import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import { Section } from './Section';
import styles from './Venue.module.css';

export function Venue({ c }: { c: Content }) {
  const v = c.venue;
  return (
    <Section id="venue" labelledBy="venue-title">
      <div className={styles.grid}>
        {/* TBC: confirm usage rights for the Red Hall photo (agent kit, photos/redhall.jpg) */}
        <figure className={styles.figure}>
          <Image
            className={styles.photo}
            src="/images/redhall-1650.webp"
            alt={v.photoAlt}
            width={1650}
            height={880}
            sizes="(max-width: 899px) 100vw, 58vw"
          />
          <figcaption className={styles.caption}>{v.photoCaption}</figcaption>
        </figure>

        <div>
          <h2 id="venue-title" className={styles.heading}>
            {v.heading}
          </h2>
          <p className={styles.sub}>{v.sub}</p>

          <dl className={styles.spaces}>
            {v.spaces.map((s) => (
              <div key={s.title} className={styles.space}>
                <dt>{s.title}</dt>
                <dd>{s.text}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.links}>
            <ButtonLink href={SITE.links.venueTwin} variant="secondary" size="small" external newTabLabel={c.a11y.opensNewTab}>
              {v.twin}
            </ButtonLink>
            <ButtonLink href={SITE.links.maps} variant="quiet" size="small" external newTabLabel={c.a11y.opensNewTab}>
              {v.maps}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
