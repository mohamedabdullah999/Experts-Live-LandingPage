/** Facts and links shared by both languages. Source: EXPERTS-LIVE-SAUDI.md and BRIEF.md. */
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://expertslive.sa',
  name: 'Experts Live Saudi 2026',
  // Day 1 opens 09:30 Riyadh time (UTC+3). Day 2 end time is not published.
  eventStart: '2026-11-29T09:30:00+03:00',
  eventEnd: '2026-11-30T23:59:00+03:00',
  links: {
    // Deep link to the ticket shop, format from BRIEF.md (without a promo code)
    tickets: 'https://elksa26.expertslive.sa/ExpertsLiveSaudi2026CloudAIConference#/buyTickets',
    registration: 'https://elksa26.expertslive.sa',
    website: 'https://expertslive.sa',
    speakers: 'https://expertslive.sa/speakers',
    venueTwin: 'https://d.zat.vc/ELKSA/v6',
    sponsorProfile: 'https://d.zat.vc/ELKSA/ppt/profile-Main/',
    maps: 'https://www.google.com/maps/search/?api=1&query=Princess+Nourah+bint+Abdulrahman+University+Conference+Center+Riyadh',
  },
  contactEmail: 'hany@expertslive.sa',
} as const;

export const LOCALES = ['en', 'ar'] as const;
export type SiteLocale = (typeof LOCALES)[number];
export const isLocale = (v: string): v is SiteLocale => (LOCALES as readonly string[]).includes(v);
