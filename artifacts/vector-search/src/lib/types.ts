export interface Product {
  _id?: string;
  Platform?: string;
  title: string;
  description?: string;
  url?: string;
  price?: number | string;
  image_url?: string;
  asin?: string;
  attributes?: Record<string, string>;
}

export interface GroupData {
  group_id: string;
  representative_title: string;
  products: Product[];
}

export interface SearchResult {
  match_score: number;
  group_data: GroupData;
}

export interface SearchResponse {
  results: SearchResult[];
}

export interface SearchPayload {
  query: string;
  top_k: number;
  threshold: number;
}
