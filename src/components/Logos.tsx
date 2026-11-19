import Image from 'next/image';
import styles from './Logos.module.css';

export function ElksaChip({ alt, className }: { alt: string; className?: string }) {
  return (
    <span className={[styles.elksaChip, className].filter(Boolean).join(' ')}>
      <Image src="/logos/elksa-logo.png" alt={alt} width={900} height={201} priority />
    </span>
  );
}

// TBC: replace with the PNU 2026 official logo (assets/logos/pnu-2026/PNU-logo-official-white.png) once received.
export function PnuLogo({ alt, className }: { alt: string; className?: string }) {
  return (
    <Image
      className={[styles.pnu, className].filter(Boolean).join(' ')}
      src="/logos/pnu-white.png"
      alt={alt}
      width={900}
      height={256}
      priority
    />
  );
}
