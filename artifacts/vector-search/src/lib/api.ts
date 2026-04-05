import type { SearchPayload, SearchResponse, Product } from "./types";

const HF_BASE_URL = "https://alihamza852-fyp-project-hnsw.hf.space";

export async function searchProducts(payload: SearchPayload): Promise<SearchResponse> {
  const response = await fetch(`${HF_BASE_URL}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Search API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<SearchResponse>;
}

export function getPlatformName(product: Product): string {
  if (product.Platform) return product.Platform;
  if (product.url) {
    try {
      const hostname = new URL(product.url).hostname.replace("www.", "");
      if (hostname.includes("amazon")) return "Amazon";
      if (hostname.includes("walmart")) return "Walmart";
      if (hostname.includes("ebay")) return "eBay";
      if (hostname.includes("target")) return "Target";
      if (hostname.includes("bestbuy")) return "Best Buy";
      const parts = hostname.split(".");
      return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    } catch {
      return "Store";
    }
  }
  return "Store";
}

export function getPlatformIcon(platform: string): string {
  const p = platform.toLowerCase();
  if (p.includes("amazon")) return "🟠";
  if (p.includes("walmart")) return "🔵";
  if (p.includes("ebay")) return "🟢";
  if (p.includes("target")) return "🔴";
  if (p.includes("bestbuy") || p.includes("best buy")) return "🔵";
  if (p.includes("etsy")) return "🟤";
  return "🛒";
}

export function formatPrice(price?: number | string): string | null {
  if (price === undefined || price === null || price === "") return null;
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return String(price);
  return `$${num.toFixed(2)}`;
}

function titleToDashes(title: string): string {
  return title
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

export function generateRedirectUrl(product: Product): string {
  const platform = getPlatformName(product).toLowerCase();
  const { asin, title, url } = product;

  if (platform.includes("amazon") && asin) {
    return `https://www.amazon.com/dp/${asin}`;
  }

  if (platform.includes("walmart") && asin && title) {
    const dashedTitle = titleToDashes(title);
    return `https://www.walmart.com/ip/${dashedTitle}/${asin}`;
  }

  return url || "#";
}
