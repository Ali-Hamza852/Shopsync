import ProductImage from "./ProductImage";
import { generateRedirectUrl, getPlatformName, formatPrice, formatMatchScore } from "../lib/api";
import type { SearchResult } from "../lib/types";

interface ClusterCardProps {
  result: SearchResult;
}

export default function ClusterCard({ result }: ClusterCardProps) {
  const { match_score, group_data } = result;
  const { representative_title, products } = group_data;

  return (
    <div className="cluster-card">
      <div className="cluster-header">
        <h2 className="cluster-title">{representative_title}</h2>
        <span className="match-badge">{formatMatchScore(match_score)}</span>
      </div>
      <div className="product-grid">
        {products.map((product) => {
          const url = generateRedirectUrl(product.Platform, product.asin, product.title);
          const platformName = getPlatformName(product.Platform);
          return (
            <a
              key={product._id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card"
            >
              <div className="product-img-wrap">
                <ProductImage src={product.image_url} alt={product.title} />
                <span className={`platform-badge platform-badge--${platformName.toLowerCase()}`}>
                  {platformName}
                </span>
              </div>
              <div className="product-info">
                <p className="product-title">{product.title}</p>
                <span className="product-price">{formatPrice(product.price)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
