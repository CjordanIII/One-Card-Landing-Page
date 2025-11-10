import { NextResponse } from "next/server";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function generateSiteMap() {
  const now = new Date().toISOString();
  const pages = [
    { url: "/", lastmod: now, priority: "1.0", changefreq: "weekly" },
    { url: "/#features", lastmod: now, priority: "0.9", changefreq: "weekly" },
    { url: "/#how", lastmod: now, priority: "0.9", changefreq: "weekly" },
    { url: "/#security", lastmod: now, priority: "0.8", changefreq: "monthly" },
    { url: "/#demo", lastmod: now, priority: "0.95", changefreq: "weekly" },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${siteUrl.replace(/\/$/, "")}${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return sitemap;
}

export async function GET() {
  const sitemap = generateSiteMap();
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
