import { DEFAULTS } from './contact';
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://rareluxerentals.com').replace(/\/$/, '');

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'EventPlanner'],
  '@id': `${SITE_URL}/#business`,
  name: 'RareLuxe Rentals',
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/logo.png`,
  description: 'Event management, party equipment rental, party décor rental and functional décor rental in Aluva, Pukkattupady, Kochi.',
  telephone: '+919778473339',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Meadows Ln',
    addressLocality: 'Pukkattupady',
    addressRegion: 'Kerala',
    postalCode: '683561',
    addressCountry: 'IN',
  },
  hasMap: DEFAULTS.map_url,
  sameAs: [DEFAULTS.instagram],
  areaServed: ['Aluva', 'Pukkattupady', 'Kochi', 'Ernakulam'],
  makesOffer: ['Event management', 'Party equipment rental', 'Party décor rental', 'Functional décor rental', 'Wedding décor', 'Birthday party décor', 'Corporate event setup']
    .map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
};
