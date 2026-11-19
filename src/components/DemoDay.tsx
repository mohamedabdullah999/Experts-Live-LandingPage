import type { Content } from '@/content/types';
import { ApplicationForm } from './ApplicationForm';
import styles from './DemoDay.module.css';

export function DemoDay({ c }: { c: Content }) {
  const d = c.demoDay;
  return (
    <section id="demo-day" aria-labelledby="demo-title" className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.label}>{c.locale === 'ar' ? 'يوم العروض (Demo Day)' : 'Demo Day'}</p>
          <h2 id="demo-title" className={styles.heading}>
            {d.heading}
          </h2>
          <p className={styles.intro}>{d.intro}</p>

          <dl className={styles.facts}>
            {d.facts.map((f) => (
              <div key={f.term} className={styles.fact}>
                <dt>{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>

          <div>
            <h3 className={styles.stepsHeading}>{d.stepsHeading}</h3>
            <ol className={styles.steps}>
              {d.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.formCol}>
          <ApplicationForm c={{ locale: c.locale, form: c.form }} />
        </div>
      </div>
    </section>
  );
}
