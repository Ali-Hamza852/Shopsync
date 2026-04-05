import type { SearchResponse } from "./types";

const API_URL = "https://alihamza852-fyp-project-hnsw.hf.space/search";

export async function searchProducts(query: string): Promise<SearchResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, top_k: 10, threshold: 0.75 }),
  });
  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }
  return res.json();
}

export function getPlatformName(platform: string): string {
  const p = platform.toLowerCase();
  if (p.includes("amazon")) return "Amazon";
  if (p.includes("walmart")) return "Walmart";
  return platform;
}

export function generateRedirectUrl(platform: string, asin: string, title: string): string {
  const p = getPlatformName(platform);
  if (p === "Walmart") {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return `https://www.walmart.com/ip/${slug}/${asin}`;
  }
  return `https://www.amazon.com/dp/${asin}`;
}

export function formatPrice(price: number | null | undefined): string {
  if (price == null || isNaN(price)) return "Price N/A";
  return `$${price.toFixed(2)}`;
}

export function formatMatchScore(score: number): string {
  return `${Math.round(score * 100)}% match`;
}
