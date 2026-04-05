import { useState } from "react";

interface ProductImageProps {
  src?: string;
  alt: string;
}

export default function ProductImage({ src, alt }: ProductImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="product-image-fallback">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="product-image"
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
