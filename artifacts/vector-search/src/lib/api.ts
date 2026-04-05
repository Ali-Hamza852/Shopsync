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

function titleToDashes(title: string): string {
  return title
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-");
}

export function generateRedirectUrl(product: Product): string {
  const { url, asin, title } = product;

  try {
    const hostname = new URL(url).hostname.replace("www.", "");

    if (hostname.includes("amazon") && asin) {
      return `https://www.amazon.com/dp/${asin}`;
    }

    if (hostname.includes("walmart") && asin && title) {
      const dashedTitle = titleToDashes(title);
      return `https://www.walmart.com/ip/${dashedTitle}/${asin}`;
    }
  } catch {
  }

  return url;
}
