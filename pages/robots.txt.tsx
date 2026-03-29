import type { GetServerSideProps } from "next";
import { getSiteUrl } from "../lib/site";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const base = getSiteUrl();
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.write(`User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`);
  res.end();
  return { props: {} };
};

export default function RobotsTxt() {
  return null;
}
