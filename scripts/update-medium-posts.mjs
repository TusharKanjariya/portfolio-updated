import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const FEED_URL =
  process.env.MEDIUM_FEED_URL ??
  "https://medium.com/feed/@TusharKanjariya";
const MAX_POSTS = Number.parseInt(process.env.MEDIUM_POST_COUNT ?? "3", 10);
const MAX_FEED_SIZE = 1_000_000;
const REQUEST_TIMEOUT_MS = 20_000;
const START_MARKER = "<!-- MEDIUM_POSTS:START -->";
const END_MARKER = "<!-- MEDIUM_POSTS:END -->";

const indexPath = fileURLToPath(new URL("../index.html", import.meta.url));
const sitemapPath = fileURLToPath(new URL("../sitemap.xml", import.meta.url));

if (!Number.isInteger(MAX_POSTS) || MAX_POSTS < 1 || MAX_POSTS > 6) {
  throw new Error("MEDIUM_POST_COUNT must be an integer between 1 and 6.");
}

const response = await fetch(FEED_URL, {
  headers: {
    Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
    "User-Agent": "tusharkanjariya.me Medium feed updater",
  },
  redirect: "follow",
  signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
});

if (!response.ok) {
  throw new Error(`Medium feed request failed with HTTP ${response.status}.`);
}

const feed = await response.text();

if (feed.length > MAX_FEED_SIZE) {
  throw new Error("Medium feed exceeded the expected one-megabyte limit.");
}

const posts = parseFeed(feed).slice(0, MAX_POSTS);

if (posts.length < MAX_POSTS) {
  throw new Error(
    `Medium feed returned ${posts.length} valid posts; expected ${MAX_POSTS}.`,
  );
}

const originalHtml = await readFile(indexPath, "utf8");
const currentCards = readMarkedContent(
  originalHtml,
  START_MARKER,
  END_MARKER,
);
const generatedCards = posts.map(renderCard).join("\n");
const cardsChanged = normalizeNewlines(currentCards).trim() !== generatedCards.trim();

let updatedHtml = replaceMarkedContent(
  originalHtml,
  START_MARKER,
  END_MARKER,
  generatedCards,
);

const schemaMatch = updatedHtml.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
);

if (!schemaMatch) {
  throw new Error("Could not find the profile JSON-LD block in index.html.");
}

const schema = JSON.parse(schemaMatch[1]);
const profilePage = schema["@graph"]?.find(
  (entry) => entry["@type"] === "ProfilePage",
);

if (!profilePage) {
  throw new Error("Could not find ProfilePage data in the JSON-LD graph.");
}

const generatedArticles = posts.map((post) => ({
  "@type": "Article",
  headline: post.title,
  description: post.excerpt,
  url: post.url,
  datePublished: post.date.toISOString(),
  ...(post.categories.length
    ? { keywords: post.categories.join(", ") }
    : {}),
  author: { "@id": "https://tusharkanjariya.me/#person" },
}));

const schemaChanged =
  JSON.stringify(profilePage.hasPart ?? []) !==
  JSON.stringify(generatedArticles);
const contentChanged = cardsChanged || schemaChanged;

profilePage.hasPart = generatedArticles;

if (contentChanged) {
  profilePage.dateModified = new Date().toISOString().slice(0, 10);
}

const serializedSchema = JSON.stringify(schema, null, 2)
  .replace(/</g, "\\u003c")
  .replace(/>/g, "\\u003e")
  .replace(/&/g, "\\u0026");
const indentedSchema = serializedSchema
  .split("\n")
  .map((line) => `      ${line}`)
  .join("\n");

updatedHtml = updatedHtml.replace(
  schemaMatch[0],
  `<script type="application/ld+json">\n${indentedSchema}\n    </script>`,
);

const originalSitemap = await readFile(sitemapPath, "utf8");
let updatedSitemap = originalSitemap;

if (contentChanged) {
  if (!/<lastmod>[^<]+<\/lastmod>/.test(originalSitemap)) {
    throw new Error("Could not find <lastmod> in sitemap.xml.");
  }

  const lastModified = new Date().toISOString().slice(0, 10);
  updatedSitemap = originalSitemap.replace(
    /<lastmod>[^<]+<\/lastmod>/,
    `<lastmod>${lastModified}</lastmod>`,
  );
}

if (updatedHtml !== originalHtml) {
  await writeFile(indexPath, updatedHtml, "utf8");
}

if (updatedSitemap !== originalSitemap) {
  await writeFile(sitemapPath, updatedSitemap, "utf8");
}

console.log(
  contentChanged
    ? `Updated ${posts.length} Medium posts in index.html and sitemap.xml.`
    : `The latest ${posts.length} Medium posts are already current.`,
);

function parseFeed(xml) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)];
  const parsedPosts = [];
  const seenUrls = new Set();

  for (const [, item] of items) {
    const title = cleanText(readElement(item, "title"));
    const link = normalizeMediumUrl(cleanText(readElement(item, "link")));
    const publishedValue = cleanText(readElement(item, "pubDate"));
    const date = new Date(publishedValue);
    const categories = [...item.matchAll(/<category(?:\s[^>]*)?>([\s\S]*?)<\/category>/gi)]
      .map((match) => cleanText(match[1]))
      .filter(Boolean);
    const description = unwrapCdata(readElement(item, "description"));
    const snippetMatch = description.match(
      /<p[^>]*class=["'][^"']*\bmedium-feed-snippet\b[^"']*["'][^>]*>([\s\S]*?)<\/p>/i,
    );
    const excerpt = truncate(
      stripHtml(snippetMatch?.[1] ?? description),
      118,
    );

    if (
      !title ||
      !link ||
      Number.isNaN(date.getTime()) ||
      !excerpt ||
      seenUrls.has(link)
    ) {
      continue;
    }

    seenUrls.add(link);
    parsedPosts.push({ title, url: link, date, categories, excerpt });
  }

  return parsedPosts.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function readElement(xml, tagName) {
  const escapedName = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (
    xml.match(
      new RegExp(
        `<${escapedName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedName}>`,
        "i",
      ),
    )?.[1] ?? ""
  );
}

function unwrapCdata(value) {
  return value
    .trim()
    .replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, "$1");
}

function decodeEntities(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|apos|gt|lt|nbsp|quot);/gi,
    (entity, code) => {
      if (code[0] !== "#") {
        return named[code.toLowerCase()] ?? entity;
      }

      const numericValue =
        code[1].toLowerCase() === "x"
          ? Number.parseInt(code.slice(2), 16)
          : Number.parseInt(code.slice(1), 10);

      return Number.isFinite(numericValue)
        ? String.fromCodePoint(numericValue)
        : entity;
    },
  );
}

function cleanText(value) {
  return decodeEntities(unwrapCdata(value))
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(value) {
  return decodeEntities(
    unwrapCdata(value)
      .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<(br|\/p|\/div|\/li)\b[^>]*>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .replace(/Continue reading on Medium\s*»?/gi, "")
    .trim();
}

function normalizeMediumUrl(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    if (
      url.protocol !== "https:" ||
      (hostname !== "medium.com" && !hostname.endsWith(".medium.com"))
    ) {
      return "";
    }

    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function truncate(value, maximumLength) {
  if (value.length <= maximumLength) {
    return value;
  }

  const shortened = value.slice(0, maximumLength - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, Math.max(lastSpace, maximumLength - 24))}…`;
}

function renderCard(post) {
  const category = formatCategory(post.categories[0] ?? "Technology");
  const machineDate = post.date.toISOString().slice(0, 10);
  const date = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(post.date);

  return [
    `          <a class="blog-card reveal" href="${escapeHtml(post.url)}" target="_blank" rel="noreferrer">`,
    `            <p>${escapeHtml(category)} · <time datetime="${machineDate}">${escapeHtml(date)}</time></p>`,
    `            <h3>${escapeHtml(post.title)}</h3>`,
    `            <div><span>${escapeHtml(post.excerpt)}</span><strong aria-hidden="true">↗</strong></div>`,
    "          </a>",
  ].join("\n");
}

function formatCategory(value) {
  const normalized = value.trim().toLowerCase();
  const knownNames = new Map([
    ["ai", "AI"],
    ["api", "API"],
    ["css", "CSS"],
    ["html", "HTML"],
    ["javascript", "JavaScript"],
    ["nodejs", "Node.js"],
    ["npm", "npm"],
    ["typescript", "TypeScript"],
    ["ui-ux", "UI/UX"],
  ]);

  if (knownNames.has(normalized)) {
    return knownNames.get(normalized);
  }

  return normalized
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function readMarkedContent(source, startMarker, endMarker) {
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Medium post markers are missing or out of order.");
  }

  const contentStart = source.indexOf("\n", startIndex) + 1;
  const contentEnd = source.lastIndexOf("\n", endIndex);

  if (contentStart === 0 || contentEnd < contentStart) {
    throw new Error("Medium post markers must each appear on their own line.");
  }

  return source.slice(contentStart, contentEnd);
}

function replaceMarkedContent(source, startMarker, endMarker, replacement) {
  const startIndex = source.indexOf(startMarker);
  const endIndex = source.indexOf(endMarker);
  const contentStart = source.indexOf("\n", startIndex) + 1;
  const contentEnd = source.lastIndexOf("\n", endIndex);

  return `${source.slice(0, contentStart)}${replacement}\n${source.slice(contentEnd + 1)}`;
}

function normalizeNewlines(value) {
  return value.replace(/\r\n/g, "\n");
}
