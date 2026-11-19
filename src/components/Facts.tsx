import type { Content } from '@/content/types';
import styles from './Facts.module.css';

export function Facts({ c }: { c: Content }) {
  return (
    <section className={styles.facts} aria-label={c.locale === 'ar' ? 'أرقام المؤتمر' : 'The conference in numbers'}>
      <div className="container">
        <dl className={styles.list}>
          {c.facts.map((f) => (
            <div key={f.label} className={styles.item}>
              <dt className={styles.label}>{f.label}</dt>
              <dd className={styles.value} dir="ltr">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
