import { createClient } from '@supabase/supabase-js';
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919778473339';
// Uses the given number if it looks real (10+ digits), otherwise the default company number.
export const waLink = (num, text) => {
  const d = String(num || '').replace(/\D/g, '');
  const n = d.length >= 10 ? d : WA_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${n}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};
