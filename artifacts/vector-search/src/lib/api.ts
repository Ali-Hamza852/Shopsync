import type { SearchPayload, SearchResponse } from "./types";

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

export async function fetchProductImage(productUrl: string): Promise<string | null> {
  try {
    const params = new URLSearchParams({ url: productUrl });
    const response = await fetch(`/api/fetch-image?${params.toString()}`);
    if (!response.ok) return null;
    const data = await response.json() as { imageUrl: string | null };
    return data.imageUrl ?? null;
  } catch {
    return null;
  }
}

export function getPlatformName(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    if (hostname.includes("amazon")) return "Amazon";
    if (hostname.includes("walmart")) return "Walmart";
    if (hostname.includes("ebay")) return "eBay";
    if (hostname.includes("target")) return "Target";
    if (hostname.includes("bestbuy")) return "Best Buy";
    if (hostname.includes("costco")) return "Costco";
    if (hostname.includes("etsy")) return "Etsy";
    if (hostname.includes("alibaba")) return "Alibaba";
    if (hostname.includes("aliexpress")) return "AliExpress";
    if (hostname.includes("newegg")) return "Newegg";
    const parts = hostname.split(".");
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  } catch {
    return "Store";
  }
}

export function getPlatformIcon(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    if (hostname.includes("amazon")) return "🟠";
    if (hostname.includes("walmart")) return "🔵";
    if (hostname.includes("ebay")) return "🟢";
    if (hostname.includes("target")) return "🔴";
    if (hostname.includes("bestbuy")) return "🔵";
    if (hostname.includes("etsy")) return "🟤";
    return "🛒";
  } catch {
    return "🛒";
  }
}
