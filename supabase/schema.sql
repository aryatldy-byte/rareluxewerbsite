-- Run in Supabase Dashboard > SQL Editor
-- Admin users live in Supabase Auth (auth.users). Create the admin in
-- Authentication > Users > Add user, and DISABLE public sign-ups
-- (Authentication > Providers > Email > turn off "Allow new users to sign up").

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  storage_path text,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.contact_info (
  id int primary key default 1 check (id = 1),
  phone text, whatsapp text, email text, address text, location text, map_url text, hours text, instagram text,
  updated_at timestamptz not null default now()
);
insert into public.contact_info (id, phone, whatsapp, email, address, location, map_url, hours, instagram)
values (1, '+91 97784 73339', '919778473339', '', '395Q+HWQ, Meadows Ln, Pukkattupady, Kerala 683561, India',
        '395R+C6 Pukkattupady, Keralam', 'https://maps.app.goo.gl/Tmv6gbNPzPtsqrPa7', 'Daily, 9 AM – 8 PM', 'https://www.instagram.com/rareluxe_rentals')
on conflict (id) do nothing;

alter table public.gallery enable row level security;
alter table public.contact_info enable row level security;

create policy "gallery public read" on public.gallery for select using (true);
create policy "gallery admin insert" on public.gallery for insert to authenticated with check (true);
create policy "gallery admin delete" on public.gallery for delete to authenticated using (true);
create policy "contact public read" on public.contact_info for select using (true);
create policy "contact admin insert" on public.contact_info for insert to authenticated with check (true);
create policy "contact admin update" on public.contact_info for update to authenticated using (true) with check (true);

-- Storage bucket for photos
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict (id) do nothing;
create policy "gallery files public read" on storage.objects for select using (bucket_id = 'gallery');
create policy "gallery files admin upload" on storage.objects for insert to authenticated with check (bucket_id = 'gallery');
create policy "gallery files admin delete" on storage.objects for delete to authenticated using (bucket_id = 'gallery');
