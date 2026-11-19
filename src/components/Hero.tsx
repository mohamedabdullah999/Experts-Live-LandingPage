import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import { Countdown } from './Countdown';
import styles from './Hero.module.css';

interface Props {
  c: Content;
  en: Content;
  ar: Content;
}

function Side({ content, primary }: { content: Content; primary: boolean }) {
  const isAr = content.locale === 'ar';
  const Title = primary ? 'h1' : 'p';
  return (
    <div
      className={[styles.side, isAr ? styles.ar : styles.en, primary ? styles.primarySide : styles.secondarySide].join(' ')}
      lang={content.locale}
      dir={content.dir}
      // The other language repeats the headline for sighted visitors only
      aria-hidden={primary ? undefined : true}
    >
      <span className={styles.kicker}>{content.hero.kicker}</span>
      <Title className={styles.title}>
        <span className={styles.line}>{content.hero.titleLines[0]}</span>
        <span className={styles.line}>{content.hero.titleLines[1]}</span>
      </Title>
      <span className={styles.tagline}>{content.hero.tagline}</span>
    </div>
  );
}

export function Hero({ c, en, ar }: Props) {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.beam} />
        <div className={styles.floor} />
      </div>

      <div className="container">
        {/* English left, Arabic right on every page (brand rule); the split is forced LTR so sides never swap. */}
        <div className={styles.split} dir="ltr">
          <Side content={en} primary={c.locale === 'en'} />
          <div className={styles.axis} aria-hidden="true" />
          <Side content={ar} primary={c.locale === 'ar'} />
        </div>

        <div className={styles.below}>
          <p className={styles.lead}>{c.hero.lead}</p>

          <dl className={styles.meta}>
            <div className={styles.metaItem}>
              <dt>{c.hero.dateLabel}</dt>
              <dd className="tabular">
                {c.hero.date}
                <span className={styles.metaSub}>{c.hero.days}</span>
              </dd>
            </div>
            <div className={styles.metaItem}>
              <dt>{c.hero.venueLabel}</dt>
              <dd>
                {c.hero.venue}
                <Countdown copy={c.countdown} className={`${styles.metaSub} ${styles.countdown}`} />
              </dd>
            </div>
          </dl>

          <div className={styles.ctas}>
            <ButtonLink href={SITE.links.tickets} external newTabLabel={c.a11y.opensNewTab}>
              {c.ctaTicket}
            </ButtonLink>
            <ButtonLink href="#demo-day" variant="secondary" data-form="startup">
              {c.hero.ctaSecondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
