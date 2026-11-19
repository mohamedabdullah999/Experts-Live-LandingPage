import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type Variant = 'primary' | 'secondary' | 'quiet' | 'onLight';

interface Common {
  variant?: Variant;
  size?: 'small' | 'default';
  block?: boolean;
  children: ReactNode;
  className?: string;
}

function cx(variant: Variant, size: Common['size'], block?: boolean, extra?: string) {
  return [styles.button, styles[variant], size === 'small' && styles.small, block && styles.block, extra]
    .filter(Boolean)
    .join(' ');
}

export function ButtonLink({
  variant = 'primary',
  size,
  block,
  className,
  children,
  external,
  newTabLabel,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean; newTabLabel?: string }) {
  return (
    <a
      className={cx(variant, size, block, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && newTabLabel ? <span className="visually-hidden"> {newTabLabel}</span> : null}
    </a>
  );
}

export function Button({
  variant = 'primary',
  size,
  block,
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cx(variant, size, block, className)} {...rest}>
      {children}
    </button>
  );
}
