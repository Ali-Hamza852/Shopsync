export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-line skeleton-title" />
        <div className="skeleton-badge" />
      </div>
      <div className="skeleton-products">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton-product">
            <div className="skeleton-img" />
            <div className="skeleton-info">
              <div className="skeleton-line skeleton-name" />
              <div className="skeleton-line skeleton-price" />
              <div className="skeleton-line skeleton-platform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
