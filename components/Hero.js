'use client';
import { useEffect, useState } from 'react';
import { useBooking } from './BookingProvider';

const slides = ['/hero/hero-1.jpg', '/hero/hero-2.jpg'];

export default function Hero() {
  const [i, setI] = useState(0);
  const { open } = useBooking();
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      {slides.map((s, n) => (
        <div key={s} className={`slide ${n === i ? 'on' : ''}`} style={{ backgroundImage: `url(${s})` }} />
      ))}
      <div className="hero-shade" />
      <div className="hero-in">
        <h1 className="hero-title">RareLuxe Rentals<span className="sr"> — event management, party equipment and décor rental in Aluva, Kochi</span></h1>
        <p className="hero-sub">Event management, décor and party rentals for the days you remember.</p>
        <div className="row center">
          <button className="btn" onClick={open}>Book your date</button>
          <a className="btn ghost light" href="/gallery">View gallery</a>
        </div>
      </div>
    </section>
  );
}
