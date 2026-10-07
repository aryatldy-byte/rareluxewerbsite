# RareLuxe Rentals

Next.js 14 (App Router) + Supabase, deployable on Vercel. Premium ivory, ink and gold design with photo hero slideshow (replace public/hero/*.jpg with your full-resolution photos).

## Setup
1. Supabase > SQL Editor: run `supabase/update_contact.sql` once if you already ran the earlier schema; otherwise run `supabase/schema.sql` (creates `gallery`, `contact_info`, RLS policies, `gallery` storage bucket).
2. Supabase > Authentication: add your admin user (Users > Add user) and turn OFF public sign-ups.
3. Edit `.env.local`: set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, with country code). It can also be changed later in Admin > Contact details.
4. `npm install && npm run dev`, then open http://localhost:3000. Admin is at `/admin`.

## Deploy to Vercel
Import the repo (or run `vercel`), then add the three variables from `.env.example` under Project Settings > Environment Variables. Do not commit `.env.local`.

## Notes
- Bookings are not stored. The popup opens a pre-filled WhatsApp chat (wa.me click-to-chat) to the company number; the client taps Send there.
- Any user in Supabase Auth counts as admin, so keep sign-ups disabled.

## SEO
Set `NEXT_PUBLIC_SITE_URL` (in `.env.local` and Vercel) to your live domain. The site ships with page titles/descriptions, Open Graph, LocalBusiness + FAQ structured data, `/sitemap.xml` and `/robots.txt`. After deploying: submit the sitemap in Google Search Console and claim your Google Business Profile.
