import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ElksaChip, PnuLogo } from './Logos';
import styles from './Footer.module.css';

export function Footer({ c }: { c: Content }) {
  const f = c.footer;
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  const newTab = <span className="visually-hidden"> {c.a11y.opensNewTab}</span>;
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <ul className={styles.links}>
            <li>
              <a href={`mailto:${SITE.contactEmail}`}>
                {f.contact}: <span dir="ltr">{SITE.contactEmail}</span>
              </a>
            </li>
            <li>
              <a href={SITE.links.website} {...ext}>
                {f.website}
                {newTab}
              </a>
            </li>
            <li>
              <a href={SITE.links.registration} {...ext}>
                {f.registration}
                {newTab}
              </a>
            </li>
            <li>
              <a href={c.langSwitch.href} hrefLang={c.langSwitch.lang} lang={c.langSwitch.lang}>
                {c.langSwitch.label}
              </a>
            </li>
          </ul>
          <div className={styles.logos} dir="ltr">
            <ElksaChip alt={c.a11y.elksaLogo} />
            <PnuLogo alt={c.a11y.pnuLogo} />
          </div>
        </div>
        {/* Approved footer line, verbatim (EXPERTS-LIVE-SAUDI.md §2) */}
        <p className={styles.line} lang="en" dir="ltr">
          {f.line}
        </p>
        <p className={styles.rights}>{f.rights}</p>
      </div>
    </footer>
  );
}
