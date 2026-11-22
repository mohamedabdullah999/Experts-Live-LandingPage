import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import styles from './PartnerCta.module.css';

export function PartnerCta({ c }: { c: Content }) {
  const p = c.partnerCta;
  return (
    <section aria-labelledby="partner-cta-title" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="partner-cta-title" className={styles.heading}>
            {p.heading}
          </h2>
          <p className={styles.body}>{p.body}</p>
        </div>
        <div className={styles.ctas}>
          <ButtonLink href={SITE.links.freeTicket} external newTabLabel={c.a11y.opensNewTab}>
            {p.freeTicket}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
