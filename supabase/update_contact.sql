-- Run this ONCE if you already ran the earlier schema.sql
alter table public.contact_info add column if not exists location text;
alter table public.contact_info add column if not exists map_url text;
update public.contact_info set
  phone = '+91 97784 73339',
  whatsapp = '919778473339',
  email = '',
  address = '395Q+HWQ, Meadows Ln, Pukkattupady, Kerala 683561, India',
  location = '395R+C6 Pukkattupady, Keralam',
  map_url = 'https://maps.app.goo.gl/Tmv6gbNPzPtsqrPa7',
  instagram = 'https://www.instagram.com/rareluxe_rentals'
where id = 1;
