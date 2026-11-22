/**
 * Shape of all page copy. Every fact in en.ts / ar.ts must come from the official
 * agent kit (EXPERTS-LIVE-SAUDI.md, BRAND.md). Anything not confirmed is listed in
 * docs/OPEN-ITEMS.md and marked with a `// TBC:` comment where it is used.
 */
export type Locale = 'en' | 'ar';

export type PersonaId =
  | 'founder'
  | 'investor'
  | 'tech-leader'
  | 'executive'
  | 'government'
  | 'it-pro'
  | 'educator'
  | 'graduate';

export type FormKind = 'startup' | 'investor';

export interface Option {
  value: string;
  label: string;
}

export interface Persona {
  id: PersonaId;
  label: string;
  examples: string;
  start: string;
  meet: string;
  leave: string;
  cta: { label: string; href: string; form?: FormKind };
}

export interface Track {
  name: string;
  topics: string;
}

export interface Item {
  title: string;
  text: string;
}

export interface Speaker {
  name: string;
  role: string;
}

export interface Tier {
  name: string;
  price: string;
  note?: string;
}

export interface FieldCopy {
  label: string;
  hint?: string;
  placeholder?: string;
}

export interface Content {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  meta: { title: string; description: string; ogLocale: string };
  a11y: {
    skip: string;
    menuOpen: string;
    menuClose: string;
    primaryNav: string;
    switchLanguage: string;
    opensNewTab: string;
    pnuLogo: string;
    elksaLogo: string;
    homeLink: string;
  };
  nav: { label: string; href: string }[];
  langSwitch: { label: string; href: string; lang: Locale };
  ctaTicket: string;
  hero: {
    kicker: string;
    titleLines: [string, string];
    lead: string;
    tagline: string;
    dateLabel: string;
    date: string;
    days: string;
    venueLabel: string;
    venue: string;
    ctaSecondary: string;
  };
  countdown: {
    live: string;
    over: string;
    /** {n} is replaced with the number of days. Arabic uses all four forms. */
    daysToGo: { one: string; two?: string; few?: string; many: string };
  };
  facts: { value: string; label: string }[];
  paths: {
    heading: string;
    intro: string;
    listLabel: string;
    steps: { start: string; meet: string; leave: string };
    personas: Persona[];
  };
  demoDay: {
    heading: string;
    intro: string;
    facts: { term: string; detail: string }[];
    stepsHeading: string;
    steps: string[];
  };
  form: {
    heading: string;
    switchLabel: string;
    kinds: Record<FormKind, { tab: string; intro: string; submit: string; successTitle: string }>;
    fields: {
      fullName: FieldCopy;
      email: FieldCopy;
      phone: FieldCopy;
      startupName: FieldCopy;
      website: FieldCopy;
      sector: FieldCopy;
      stage: FieldCopy;
      pitch: FieldCopy;
      organisation: FieldCopy;
      role: FieldCopy;
      investorType: FieldCopy;
      consent: FieldCopy;
    };
    selectPlaceholder: string;
    optional: string;
    sectors: Option[];
    stages: Option[];
    investorTypes: Option[];
    sending: string;
    /** {email} is replaced with the address the person entered */
    successBody: string;
    sendAnother: string;
    privacyNote: string;
    errors: {
      required: string;
      email: string;
      phone: string;
      url: string;
      /** {max} is replaced with the character limit */
      tooLong: string;
      consent: string;
      chooseOne: string;
      summary: string;
      network: string;
      rateLimited: string;
      server: string;
    };
  };
  superNourah: {
    time: string;
    when: string;
    heading: string;
    body: string;
    cta: string;
  };
  programme: {
    heading: string;
    intro: string;
    tracks: Track[];
  };
  speakers: {
    heading: string;
    intro: string;
    hostLabel: string;
    mcLabel: string;
    mc: string;
    list: Speaker[];
    all: string;
  };
  partners: {
    heading: string;
    /** Logos and their order live in src/lib/organisers.ts */
    groupTitle: string;
  };
  partnerCta: {
    heading: string;
    body: string;
    freeTicket: string;
  };
  footer: {
    line: string;
    contact: string;
    website: string;
    registration: string;
    rights: string;
  };
  mobileBar: { text: string };
  notFound: { heading: string; body: string; back: string };
}
