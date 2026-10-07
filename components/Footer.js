import Link from 'next/link';
import { DEFAULTS, igHandle } from '@/lib/contact';
export default function Footer() {
  return (
    <footer className="ftr">
      <p className="ftr-brand">RareLuxe Rentals</p>
      <p>Event management, party equipment, décor and functional décor rentals in Aluva, Pukkattupady, Kochi.</p>
      <p>{DEFAULTS.address}</p>
      <p><a href="tel:+919778473339">{DEFAULTS.phone}</a> · <a href={DEFAULTS.map_url} target="_blank" rel="noopener noreferrer">View on map</a> · <a href={DEFAULTS.instagram} target="_blank" rel="noopener noreferrer">{igHandle(DEFAULTS.instagram)}</a></p>
      <p className="ftr-small"><Link href="/admin">Admin</Link> · © {new Date().getFullYear()} RareLuxe Rentals</p>
    </footer>
  );
}
