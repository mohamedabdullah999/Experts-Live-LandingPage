'use client';

import { useEffect, useRef, useState } from 'react';
import type { Content } from '@/content/types';
import { SITE } from '@/lib/site';
import { ButtonLink } from './Button';
import { ElksaChip, PnuLogo } from './Logos';
import styles from './Header.module.css';

export type HeaderCopy = Pick<Content, 'dir' | 'a11y' | 'nav' | 'langSwitch' | 'ctaTicket'>;

export function Header({ c }: { c: HeaderCopy }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);

  // PNU must stay first at the top right in both directions; the ELKSA chip follows to its left.
  const logos = (
    <a href="#top" className={styles.logos} aria-label={c.a11y.homeLink} onClick={close}>
      {c.dir === 'rtl' ? (
        <>
          <PnuLogo alt={c.a11y.pnuLogo} />
          <ElksaChip alt={c.a11y.elksaLogo} />
        </>
      ) : (
        <>
          <ElksaChip alt={c.a11y.elksaLogo} />
          <PnuLogo alt={c.a11y.pnuLogo} />
        </>
      )}
    </a>
  );

  const menuButton = (
    <button
      ref={buttonRef}
      type="button"
      className={styles.menuButton}
      aria-expanded={open}
      aria-controls="site-nav"
      onClick={() => setOpen((v) => !v)}
    >
      <span className={styles.burger} aria-hidden="true" />
      <span className={styles.menuLabel}>{open ? c.a11y.menuClose : c.a11y.menuOpen}</span>
    </button>
  );

  const nav = (
    <nav id="site-nav" aria-label={c.a11y.primaryNav} className={`${styles.nav} ${open ? styles.navOpen : ''}`}>
      <ul className={styles.links}>
        {c.nav.map((item) => (
          <li key={item.href}>
            <a className={styles.link} href={item.href} onClick={close}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <a className={styles.lang} href={c.langSwitch.href} hrefLang={c.langSwitch.lang} lang={c.langSwitch.lang}>
          {c.langSwitch.label}
          <span className="visually-hidden"> — {c.a11y.switchLanguage}</span>
        </a>
        <ButtonLink href={SITE.links.tickets} external newTabLabel={c.a11y.opensNewTab} size="small">
          {c.ctaTicket}
        </ButtonLink>
      </div>
    </nav>
  );

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {c.dir === 'rtl' ? (
          <>
            {logos}
            {nav}
            {menuButton}
          </>
        ) : (
          <>
            {menuButton}
            {nav}
            {logos}
          </>
        )}
      </div>
    </header>
  );
}
