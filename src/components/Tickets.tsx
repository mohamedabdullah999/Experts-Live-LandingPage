import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import { Section, SectionHead } from './Section';
import styles from './Tickets.module.css';

export function Tickets({ c }: { c: Content }) {
  const t = c.tickets;
  return (
    <Section id="tickets" labelledBy="tickets-title" alt>
      <SectionHead id="tickets-title" heading={t.heading} intro={t.intro} />

      <ul className={styles.tiers}>
        {t.tiers.map((tier) => (
          <li key={tier.name} className={styles.tier}>
            <h3 className={styles.name}>
              {tier.name}
              {tier.note ? <span className={styles.note}>{tier.note}</span> : null}
            </h3>
            <p className={styles.price}>
              <span dir="ltr">{tier.price}</span>
              <span className={styles.currency}>{t.currency}</span>
            </p>
            <ButtonLink
              href={SITE.links.tickets}
              external
              newTabLabel={c.a11y.opensNewTab}
              size="small"
              block
              className={styles.button}
            >
              {t.book.replace('{tier}', tier.name)}
            </ButtonLink>
          </li>
        ))}
      </ul>

      <p className={styles.student}>{t.student}</p>
    </Section>
  );
}
