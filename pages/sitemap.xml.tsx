import type { GetServerSideProps } from "next";
import { getSiteUrl } from "../lib/site";

function buildSitemapXml(): string {
  const base = getSiteUrl();
  const lastmod = new Date().toISOString().split("T")[0];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.write(buildSitemapXml());
  res.end();
  return { props: {} };
};

export default function SitemapXml() {
  return null;
}
