import { notFound } from 'next/navigation';
import { getContent } from '@/content';
import { isLocale, SITE } from '@/lib/site';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Facts } from '@/components/Facts';
import { Why } from '@/components/Why';
import { Paths } from '@/components/Paths';
import { DemoDay } from '@/components/DemoDay';
import { SuperNourah } from '@/components/SuperNourah';
import { Programme } from '@/components/Programme';
import { Speakers } from '@/components/Speakers';
import { Venue } from '@/components/Venue';
import { Tickets } from '@/components/Tickets';
import { Partners } from '@/components/Partners';
import { PartnerCta } from '@/components/PartnerCta';
import { Footer } from '@/components/Footer';
import { MobileBar } from '@/components/MobileBar';

function eventJsonLd(locale: 'en' | 'ar') {
  const c = getContent(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Experts Live Saudi 2026',
    description: c.meta.description,
    inLanguage: locale,
    startDate: SITE.eventStart,
    endDate: '2026-11-30',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: `${SITE.url}/${locale}`,
    location: {
      '@type': 'Place',
      name: 'PNU Conference & Convention Center',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressCountry: 'SA',
        streetAddress: 'Princess Nourah bint Abdulrahman University',
      },
    },
    organizer: { '@type': 'Organization', name: 'Experts Live Saudi', url: SITE.links.website },
    offers: [
      ['Early Bird', '99'],
      ['Standard', '399.90'],
      ['VIP', '1299.90'],
      ['Team (5 people)', '1499.90'],
    ].map(([name, price]) => ({
      '@type': 'Offer',
      name,
      price,
      priceCurrency: 'SAR',
      url: SITE.links.tickets,
    })),
  };
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getContent(locale);

  return (
    <>
      <Header c={{ dir: c.dir, a11y: c.a11y, nav: c.nav, langSwitch: c.langSwitch, ctaTicket: c.ctaTicket }} />
      <main id="main" tabIndex={-1}>
        <Hero c={c} en={getContent('en')} ar={getContent('ar')} />
        <Facts c={c} />
        <Why c={c} />
        <Paths c={{ dir: c.dir, paths: c.paths }} />
        <DemoDay c={c} />
        <SuperNourah c={c} />
        <Programme c={c} />
        <Speakers c={c} />
        <Venue c={c} />
        <Tickets c={c} />
        <Partners c={c} />
        <PartnerCta c={c} />
      </main>
      <Footer c={c} />
      <MobileBar c={{ a11y: c.a11y, mobileBar: c.mobileBar, ctaTicket: c.ctaTicket }} />
      <script
        type="application/ld+json"
        // Static, server-built JSON; no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(locale)).replace(/</g, '\\u003c') }}
      />
    </>
  );
}
