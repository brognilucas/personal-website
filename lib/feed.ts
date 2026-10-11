import { blogFeedUrls } from "./content";

export type FeedPost = {
  title: string;
  url: string;
  publishedAt: string | null;
  summary: string;
};

const FETCH_TIMEOUT_MS = 5000;

function decodeEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/g, "&");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function tag(block: string, name: string): string | null {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return match ? decodeEntities(match[1]).trim() : null;
}

function atomLink(block: string): string | null {
  const alternate = block.match(/<link[^>]*rel=["']alternate["'][^>]*href=["']([^"']+)["']/i);
  const any = block.match(/<link[^>]*href=["']([^"']+)["']/i);
  return (alternate ?? any)?.[1] ?? null;
}

function toIsoDate(raw: string | null): string | null {
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function parseFeed(xml: string): FeedPost[] {
  const rssItems = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) ?? [];
  const atomEntries = xml.match(/<entry[\s>][\s\S]*?<\/entry>/gi) ?? [];

  const fromRss = rssItems.map((item) => ({
    title: tag(item, "title") ?? "",
    url: tag(item, "link") ?? "",
    publishedAt: toIsoDate(tag(item, "pubDate") ?? tag(item, "dc:date")),
    summary: truncate(stripHtml(tag(item, "description") ?? ""), 180),
  }));

  const fromAtom = atomEntries.map((entry) => ({
    title: stripHtml(tag(entry, "title") ?? ""),
    url: atomLink(entry) ?? "",
    publishedAt: toIsoDate(tag(entry, "published") ?? tag(entry, "updated")),
    summary: truncate(stripHtml(tag(entry, "summary") ?? tag(entry, "content") ?? ""), 180),
  }));

  return [...fromRss, ...fromAtom]
    .filter((post) => post.title && post.url)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

async function fetchText(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml" } });
    if (!res.ok) return null;
    const body = await res.text();
    return /<(rss|feed)[\s>]/i.test(body) ? body : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Returns the newest posts from the blog, or an empty list if no feed is reachable.
export async function getLatestPosts(limit = 4): Promise<FeedPost[]> {
  for (const url of blogFeedUrls) {
    const xml = await fetchText(url);
    if (xml) return parseFeed(xml).slice(0, limit);
  }
  return [];
}
