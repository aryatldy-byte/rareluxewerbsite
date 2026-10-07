'use client';
import { useEffect, useState } from 'react';
import { supabase, waLink } from '@/lib/supabase';
import { mergeContact, igHandle, MAP_EMBED } from '@/lib/contact';

export default function Contact() {
  const [c, setC] = useState(mergeContact(null));
  useEffect(() => {
    supabase.from('contact_info').select('*').eq('id', 1).maybeSingle().then(({ data }) => setC(mergeContact(data)));
  }, []);
  const tel = c.phone.replace(/[^\d+]/g, '');
  const rows = [['Phone', c.phone, `tel:${tel}`], ['Email', c.email, c.email && `mailto:${c.email}`], ['Address', c.address], ['Plus code', c.location], ['Hours', c.hours], ['Instagram', c.instagram && igHandle(c.instagram), c.instagram]];
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/hero/hero-1.jpg)' }}>
        <div className="hero-shade" />
        <h1>Contact us</h1>
      </section>
      <section className="sec narrow">
        <dl className="info">
          {rows.filter((r) => r[1]).map(([k, v, href]) => (
            <div key={k}><dt>{k}</dt><dd>{href ? <a href={href}>{v}</a> : v}</dd></div>
          ))}
        </dl>
        <div className="row">
          <a className="btn wa" href={waLink(c.whatsapp, 'Hello RareLuxe Rentals! I would like to book.')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp Business</a>
          {c.instagram && <a className="btn ghost" href={c.instagram} target="_blank" rel="noopener noreferrer">Follow on Instagram</a>}
          <a className="btn ghost" href={c.map_url} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
        <div className="map"><iframe title="RareLuxe Rentals location" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>
    </>
  );
}
