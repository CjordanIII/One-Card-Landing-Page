import { NextResponse } from "next/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function GET() {
  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /
Disallow: /_next
Disallow: /api

# Sitemap
Sitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml

# Crawl delay (optional, in seconds)
Crawl-delay: 0

# Request rate (optional, requests per second)
Request-rate: 1/10

# Comment: Allow Google, Bing, etc. to crawl all public pages
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /
`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
