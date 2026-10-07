export const DEFAULTS = {
  phone: '+91 97784 73339',
  whatsapp: '919778473339',
  email: '',
  address: '395Q+HWQ, Meadows Ln, Pukkattupady, Kerala 683561, India',
  location: '395R+C6 Pukkattupady, Keralam',
  map_url: 'https://maps.app.goo.gl/Tmv6gbNPzPtsqrPa7',
  hours: 'Daily, 9 AM – 8 PM',
  instagram: 'https://www.instagram.com/rareluxe_rentals',
};
export const igHandle = (u) => '@' + (String(u).replace(/[?#].*$/, '').replace(/\/+$/, '').split('/').pop() || 'rareluxe_rentals');
const PLACEHOLDER = /X{3}|00000|hello@rareluxe\.com|^Kochi, Kerala, India$/i;
// Fill missing or placeholder values from the database row with the real defaults.
export function mergeContact(row) {
  const out = { ...DEFAULTS };
  if (row) for (const k of Object.keys(DEFAULTS)) {
    const v = row[k];
    if (v && String(v).trim() && !PLACEHOLDER.test(v)) out[k] = v;
  }
  return out;
}
export const MAP_EMBED = 'https://maps.google.com/maps?q=395R%2BC6+Pukkattupady+Kerala&z=16&output=embed';
