import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import styles from './PartnerCta.module.css';

export function PartnerCta({ c }: { c: Content }) {
  const p = c.partnerCta;
  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(p.mailSubject)}`;
  return (
    <section aria-labelledby="partner-cta-title" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="partner-cta-title" className={styles.heading}>
            {p.heading}
          </h2>
          <p className={styles.body}>{p.body}</p>
        </div>
        <div>
          <ul className={styles.points}>
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
          <div className={styles.ctas}>
            <ButtonLink href={mailto}>{p.primary}</ButtonLink>
            <ButtonLink href={SITE.links.sponsorProfile} variant="quiet" external newTabLabel={c.a11y.opensNewTab}>
              {p.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
