import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import styles from './SuperNourah.module.css';

export function SuperNourah({ c }: { c: Content }) {
  const s = c.superNourah;
  return (
    <section aria-labelledby="nourah-title" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <p className={styles.time} dir="ltr" aria-hidden="true">
          {s.time}
        </p>
        <div className={styles.copy}>
          <p className={styles.when}>
            <span className="visually-hidden">{s.time}{c.locale === 'ar' ? '، ' : ', '}</span>
            {s.when}
          </p>
          <h2 id="nourah-title" className={styles.heading}>
            {s.heading}
          </h2>
          <p className={styles.body}>{s.body}</p>
          <ButtonLink href={SITE.links.tickets} variant="secondary" className={styles.cta} external newTabLabel={c.a11y.opensNewTab}>
            {s.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
