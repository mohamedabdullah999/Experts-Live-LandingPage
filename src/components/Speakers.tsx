import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import { Section } from './Section';
import styles from './Speakers.module.css';

export function Speakers({ c }: { c: Content }) {
  const s = c.speakers;
  const [host, ...rest] = s.list;
  return (
    <Section id="speakers" labelledBy="speakers-title" alt>
      <div className={styles.top}>
        <div className={styles.head}>
          <h2 id="speakers-title" className={styles.heading}>
            {s.heading}
          </h2>
          <p>{s.intro}</p>
        </div>
        <ButtonLink href={SITE.links.speakers} variant="quiet" external newTabLabel={c.a11y.opensNewTab}>
          {s.all}
        </ButtonLink>
      </div>

      {/* Host and MC have named roles for the whole event, so they lead */}
      <dl className={styles.leads}>
        <div className={styles.lead}>
          <dt className={styles.tag}>{s.hostLabel}</dt>
          <dd lang="en" dir="ltr">
            <span className={styles.name}>{host.name}</span>
            <span className={styles.role}>{host.role}</span>
          </dd>
        </div>
        <div className={styles.lead}>
          <dt className={styles.tag}>{s.mcLabel}</dt>
          <dd>
            <span className={styles.name}>{s.mc}</span>
          </dd>
        </div>
      </dl>

      <ul className={styles.list}>
        {rest.map((sp) => (
          <li key={sp.name} className={styles.speaker} lang="en" dir="ltr">
            <span className={styles.name}>{sp.name}</span>
            <span className={styles.role}>{sp.role}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
