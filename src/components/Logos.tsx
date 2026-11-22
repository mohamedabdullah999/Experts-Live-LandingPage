import Image from 'next/image';
import styles from './Logos.module.css';

export function ElksaChip({ alt, className }: { alt: string; className?: string }) {
  return (
    <span className={[styles.elksaChip, className].filter(Boolean).join(' ')}>
      <Image src="/logos/elksa-logo.png" alt={alt} width={900} height={201} sizes="140px" priority />
    </span>
  );
}

