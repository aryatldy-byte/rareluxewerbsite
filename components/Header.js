'use client';
import Link from 'next/link';
import { useState } from 'react';

const links = [['/', 'Home'], ['/about', 'About'], ['/gallery', 'Gallery'], ['/contact', 'Contact']];

export default function Header() {
  const [menu, setMenu] = useState(false);
  return (
    <header className="hdr">
      <Link href="/" className="brand" onClick={() => setMenu(false)} aria-label="RareLuxe Rentals home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="RareLuxe Rentals" className="logo" />
      </Link>
      <button className="burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? '✕' : '☰'}</button>
      <nav className={menu ? 'nav show' : 'nav'}>
        {links.map(([h, l]) => <Link key={h} href={h} onClick={() => setMenu(false)}>{l}</Link>)}
      </nav>
    </header>
  );
}
