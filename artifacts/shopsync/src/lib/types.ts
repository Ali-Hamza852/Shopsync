export interface Product {
  _id: string;
  Platform: string;
  title: string;
  price: number;
  asin: string;
  description?: string;
  attributes?: Record<string, string>;
  image_url?: string;
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
