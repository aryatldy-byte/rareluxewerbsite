'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, waLink } from '@/lib/supabase';
import { DEFAULTS } from '@/lib/contact';

const Ctx = createContext({ open: () => {} });
export const useBooking = () => useContext(Ctx);

const TYPES = ['Birthday', 'Anniversary', 'Bride-to-be', 'Groom-to-be', 'Retirement', 'Baby shower', 'Engagement', 'Wedding', 'Corporate event', 'Other'];

export function BookingProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: '', type: TYPES[0], date: '', notes: '' });
  const [waNumber, setWaNumber] = useState('');

  useEffect(() => {
    supabase.from('contact_info').select('whatsapp').eq('id', 1).maybeSingle()
      .then(({ data }) => data?.whatsapp && setWaNumber(data.whatsapp));
  }, []);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const open = () => { setSent(false); setOpen(true); };
  const close = () => setOpen(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const msg = `Hello RareLuxe Rentals! I'd like to enquire about a booking.\n\nName: ${f.name}\nFunction: ${f.type}\nDate: ${f.date}\nNotes: ${f.notes || '-'}`;
    window.open(waLink(waNumber, msg), '_blank', 'noopener');
    setSent(true);
    setF({ name: '', type: TYPES[0], date: '', notes: '' });
  };

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <button className="fab" onClick={open} aria-label="Book now">Book now</button>
      <nav className="mbar" aria-label="Quick actions">
        <a href="tel:+919778473339"><span aria-hidden="true">📞</span>Call</a>
        <a href={waLink(waNumber, 'Hello RareLuxe Rentals!')} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">💬</span>WhatsApp</a>
        <button className="mbar-book" onClick={open}><span aria-hidden="true">📅</span>Book</button>
      </nav>
      {isOpen && (
        <div className="overlay" onClick={close}>
          <div className="modal" role="dialog" aria-modal="true" aria-label="Book an event" onClick={(e) => e.stopPropagation()}>
            <button className="x" onClick={close} aria-label="Close">✕</button>
            {sent ? (
              <div className="done">
                <svg className="check" viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23" /><path d="M15 27l8 8 15-17" /></svg>
                <h2>Thank you!</h2>
                <p>Your details are ready in WhatsApp. Hit send there and our team will confirm your booking shortly.</p>
                <button className="btn" onClick={close}>Close</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2>Book your celebration</h2>
                <p className="muted">Share a few details and we will continue on WhatsApp.</p>
                <label>Your name<input required value={f.name} onChange={set('name')} /></label>
                <label>Function type
                  <select value={f.type} onChange={set('type')}>{TYPES.map((t) => <option key={t}>{t}</option>)}</select>
                </label>
                <label>Date<input required type="date" min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={set('date')} /></label>
                <label>Notes<textarea rows="3" value={f.notes} onChange={set('notes')} placeholder="Guests, venue, décor or event ideas…" /></label>
                <button className="btn" type="submit">Send on WhatsApp</button>
              </form>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
