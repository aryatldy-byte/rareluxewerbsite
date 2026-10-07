import { SITE_URL } from '@/lib/site';
export default function sitemap() {
  const now = new Date();
  return [
    ['', 1], ['/about', 0.8], ['/gallery', 0.8], ['/contact', 0.9],
  ].map(([p, priority]) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: 'weekly', priority }));
}
