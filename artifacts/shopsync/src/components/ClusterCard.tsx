import ProductImage from "./ProductImage";
import { generateRedirectUrl, getPlatformName, formatPrice, formatMatchScore } from "../lib/api";
import type { SearchResult } from "../lib/types";

interface ClusterCardProps {
  result: SearchResult;
}

export default function ClusterCard({ result }: ClusterCardProps) {
  const match_score = result?.match_score;
  const group_data = result?.group_data;
  const representative_title = group_data?.representative_title ?? "Product Group";
  const products = group_data?.products ?? [];

  return (
    <div className="cluster-card">
      <div className="cluster-header">
        <h2 className="cluster-title">{representative_title}</h2>
        <span className="match-badge">{formatMatchScore(match_score)}</span>
      </div>
      <div className="product-grid">
        {products.map((product, index) => {
          const key = product?._id ?? `product-${index}`;
          const url = generateRedirectUrl(product?.Platform, product?.asin, product?.title);
          const platformName = getPlatformName(product?.Platform);
          return (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card"
            >
              <div className="product-img-wrap">
                <ProductImage src={product?.image_url ?? undefined} alt={product?.title ?? "Product"} />
                <span className={`platform-badge platform-badge--${platformName.toLowerCase()}`}>
                  {platformName}
                </span>
              </div>
              <div className="product-info">
                <p className="product-title">{product?.title ?? "Untitled Product"}</p>
                <span className="product-price">{formatPrice(product?.price)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
