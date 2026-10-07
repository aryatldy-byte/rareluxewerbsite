import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '@/components/BookingProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL, localBusinessJsonLd } from '@/lib/site';

const display = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--f-display', display: 'swap' });
const body = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--f-body', display: 'swap' });

const title = 'RareLuxe Rentals | Event Management, Party Décor & Equipment Rental in Aluva, Kochi';
const description = 'RareLuxe Rentals offers event management, party equipment rental (chairs, tables, lighting, sound) and décor for weddings, birthdays, anniversaries and corporate events in Aluva, Pukkattupady, Kochi. Call 97784 73339.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: '%s | RareLuxe Rentals' },
  description,
  keywords: [
    'event management Aluva', 'event management Kochi', 'party equipment rental Kochi', 'party decor rental Aluva',
    'wedding decoration Kochi', 'birthday decoration Aluva', 'rental service Pukkattupady', 'functional decor rental',
    'chair table rental Kochi', 'sound system rental Kochi', 'corporate event setup Kochi', 'bride to be party decor', 'RareLuxe Rentals',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', siteName: 'RareLuxe Rentals', locale: 'en_IN', url: '/', title, description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'RareLuxe Rentals event venue décor' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  icons: { icon: '/logo.png', apple: '/logo.png' },
};
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0c1014' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <BookingProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
