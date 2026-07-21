import { NextResponse } from 'next/server';
import { ARTICLES, CATEGORIES } from '@/lib/mockData';

export async function GET() {
  const baseUrl = 'https://litterpaper.kr';
  const currentDate = new Date().toISOString();

  const staticPages = [
    '',
    '/veterinary',
    '/breeds',
    '/search',
    '/bookmarks',
    '/newsletter',
    '/about',
    '/privacy',
    '/terms',
  ];

  const categoryPages = CATEGORIES.map((c) => `/category/${c.slug}`);
  const articlePages = ARTICLES.map((a) => `/article/${a.slug}`);

  const allUrls = [...staticPages, ...categoryPages, ...articlePages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls
    .map(
      (url) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${url === '' ? '1.0' : url.startsWith('/article') ? '0.8' : '0.6'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
