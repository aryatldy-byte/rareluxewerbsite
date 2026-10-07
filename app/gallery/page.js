'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Gallery() {
  const [items, setItems] = useState(null);
  const [big, setBig] = useState(null);
  useEffect(() => {
    supabase.from('gallery').select('*').order('uploaded_at', { ascending: false })
      .then(({ data }) => setItems(data || []));
  }, []);
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/hero/hero-2.jpg)' }}>
        <div className="hero-shade" />
        <h1>Gallery</h1>
      </section>
      <section className="sec">
        {items === null && <p className="muted">Loading photos…</p>}
        {items?.length === 0 && <p className="muted center-t">New photos are on their way. Please check back soon.</p>}
        <div className="masonry">
          {items?.map((p) => (
            <button key={p.id} className="tile" onClick={() => setBig(p)} aria-label={`View ${p.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.image_url} alt={p.title} loading="lazy" />
              <span className="cap">{p.title}</span>
            </button>
          ))}
        </div>
        {big && (
          <div className="overlay" onClick={() => setBig(null)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lightbox" src={big.image_url} alt={big.title} />
          </div>
        )}
      </section>
    </>
  );
}
