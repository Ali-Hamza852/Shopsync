import { useState } from "react";
import { searchProducts } from "../lib/api";
import type { SearchResult } from "../lib/types";
import { useTheme } from "../hooks/use-theme";
import SearchBar from "../components/SearchBar";
import ClusterCard from "../components/ClusterCard";
import SkeletonCard from "../components/SkeletonCard";
import HeroBackground from "../components/HeroBackground";
import logoUrl from "@assets/Profile1_1775390001168.jpeg";

export default function SearchPage() {
  const { theme, toggleTheme } = useTheme();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  function handleHome() {
    setSearched(false);
    setResults([]);
    setError(null);
  }

  async function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const data = await searchProducts(query);
      setResults(data.results || []);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <HeroBackground />

      <header className="site-header">
        <div className="header-inner">
          <button className="logo-wrap" onClick={handleHome} aria-label="Go to homepage">
            <img src={logoUrl} alt="Shopsync logo" className="logo-img" />
            <span className="logo-text">
              <strong>Shop</strong>sync
            </span>
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <main className="main-content">
        {!searched && (
          <div className="hero-section">
            <h1 className="hero-title">
              <strong>Shop</strong>sync
            </h1>
            <p className="hero-tagline">Smarter search. Better shopping.</p>
          </div>
        )}

        <div className={`search-section ${searched ? "search-section--compact" : ""}`}>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {loading && (
          <div className="results-grid">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!loading && searched && results.length === 0 && !error && (
          <div className="no-results">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p>No products found. Try a different search term.</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="results-grid">
            {results.map((result, index) => (
              <ClusterCard key={result?.group_data?.group_id ?? `result-${index}`} result={result} />
            ))}
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>Powered by AI vector search &mdash; © {new Date().getFullYear()} Shopsync</p>
      </footer>
    </div>
  );
}
