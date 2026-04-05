export interface Product {
  _id?: string | null;
  Platform?: string | null;
  title?: string | null;
  price?: number | null;
  asin?: string | null;
  description?: string | null;
  attributes?: Record<string, string> | null;
  image_url?: string | null;
}

export interface GroupData {
  group_id?: string | null;
  representative_title?: string | null;
  products?: Product[] | null;
}

export interface SearchResult {
  match_score?: number | null;
  group_data?: GroupData | null;
}

export interface SearchResponse {
  results?: SearchResult[] | null;
}
