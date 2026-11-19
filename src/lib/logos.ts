/**
 * Partner logos available in the agent kit (assets/logos, assets/logos/partners).
 * `mono: true` marks white artwork; on white chips it gets CSS brightness(0), as BRAND.md allows.
 * Partners without a usable file (SVG not exported, or missing: JOFOUZ, Companyx, Cloudative, Linx)
 * render as text until the files arrive.
 */
export interface LogoFile {
  src: string;
  width: number;
  height: number;
  mono?: boolean;
  /** Never recolour (PNU brand guidelines) — shown on a dark chip instead. */
  keepOnDark?: boolean;
}

export const LOGOS: Record<string, LogoFile> = {
  PNU: { src: '/logos/pnu-white.png', width: 900, height: 256, keepOnDark: true },
  'AI in Healthcare Chair': { src: '/logos/ai-healthcare-chair.png', width: 736, height: 343 },
  'Cloud Mechanics': { src: '/logos/cloud-mechanics-white.png', width: 676, height: 177, mono: true },
  'Smart Code': { src: '/logos/smart-code.png', width: 278, height: 156 },
  Microsoft: { src: '/logos/microsoft-white.png', width: 590, height: 128, mono: true },
  MCIT: { src: '/logos/mcit.png', width: 461, height: 126 },
  'Saudi Digital Academy': { src: '/logos/sda.png', width: 900, height: 108 },
  'SDA thehub': { src: '/logos/sda-thehub-white.png', width: 700, height: 437, mono: true },
  BLEND: { src: '/logos/blend.png', width: 900, height: 272 },
  CapNest: { src: '/logos/capnest.png', width: 882, height: 325 },
  STF: { src: '/logos/stf-white.png', width: 800, height: 496, mono: true },
  Tabby: { src: '/logos/tabby.png', width: 559, height: 156 },
  HyperPay: { src: '/logos/hyperpay.png', width: 141, height: 50 },
  Tawwaq: { src: '/logos/tawwaq.png', width: 373, height: 137 },
  Beetleware: { src: '/logos/beetleware-white.png', width: 600, height: 114, mono: true },
  Alfia: { src: '/logos/alfia.png', width: 365, height: 115 },
  AYEN: { src: '/logos/ayen.png', width: 451, height: 452 },
  Plus: { src: '/logos/plus.png', width: 519, height: 262 },
  Raseel: { src: '/logos/raseel-white.png', width: 197, height: 65, mono: true },
};
