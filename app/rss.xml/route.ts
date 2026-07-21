import { NextResponse } from 'next/server';
import { ARTICLES } from '@/lib/mockData';

export async function GET() {
  const baseUrl = 'https://litterpaper.kr';

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>리터페이퍼 LITTER PAPER - 대한민국 프리미엄 고양이 미디어</title>
    <link>${baseUrl}</link>
    <description>신뢰받는 수의학 저널리즘, 고양이 건강, 행동학 및 브랜드 검증 프리미엄 미디어 플랫폼</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${ARTICLES.map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/article/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/article/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${article.summary}]]></description>
      <category><![CDATA[${article.categoryName}]]></category>
      <author><![CDATA[${article.author.name}]]></author>
    </item>`
    ).join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
