import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Zap, Sun, Moon } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ClusterCard } from "@/components/ClusterCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { HeroBackground } from "@/components/HeroBackground";
import { searchProducts } from "@/lib/api";
import { useTheme } from "@/hooks/use-theme";
import type { SearchResult } from "@/lib/types";
import shopsyncLogo from "@assets/Profile1_1775390001168.jpeg";

export function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleSearch = useCallback(async (query: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setResults([]);
    setLastQuery(query);
    setHasSearched(true);

    try {
      const data = await searchProducts({ query, top_k: 10, threshold: 0.75 });
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleHomeReset = useCallback(() => {
    setHasSearched(false);
    setResults([]);
    setError(null);
    setLastQuery(null);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "var(--t-page-bg)" }}
    >
      <HeroBackground />

      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <button
            onClick={handleHomeReset}
            data-testid="button-home-logo"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Go to homepage"
          >
            <img
              src={shopsyncLogo}
              alt="Shopsync logo"
              className="h-9 w-auto rounded-lg"
            />
          </button>

          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-theme-toggle"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
            style={{
              background: "var(--t-toggle-bg)",
              border: "1px solid var(--t-toggle-border)",
              color: "var(--t-toggle-icon)",
            }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <Sun className="w-4 h-4" />
                  <span className="hidden sm:block">Light</span>
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <Moon className="w-4 h-4" />
                  <span className="hidden sm:block">Dark</span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {!hasSearched ? (
              <motion.section
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center text-center py-20 sm:py-28"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-3"
                >
                  <h1
                    className="text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "var(--t-hero-text)",
                    }}
                  >
                    <span className="font-black">Shop</span>
                    <span className="font-normal">sync</span>
                  </h1>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base sm:text-lg font-medium mb-12"
                  style={{ color: "var(--t-tagline)" }}
                >
                  Smarter search. Better shopping.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full"
                >
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </motion.div>
              </motion.section>
            ) : (
              <motion.section
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="pt-8 pb-16"
              >
                <div className="mb-8">
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </div>

                <AnimatePresence mode="wait">
                  {error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      data-testid="text-error-message"
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)" }}
                      >
                        <AlertCircle className="w-8 h-8 text-destructive" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Search failed</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">{error}</p>
                    </motion.div>
                  ) : isLoading ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div
                        className="flex items-center gap-2 mb-6 text-sm text-muted-foreground"
                        data-testid="text-loading-state"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 rounded-full"
                          style={{
                            borderColor: "var(--t-loading-ring)",
                            borderTopColor: "var(--t-loading-top)",
                          }}
                        />
                        Searching across product catalog...
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <SkeletonCard key={i} index={i} />
                        ))}
                      </div>
                    </motion.div>
                  ) : results.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      data-testid="text-no-results"
                      className="flex flex-col items-center justify-center py-20 text-center"
                    >
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(96, 130, 255, 0.08)", border: "1px solid rgba(96, 130, 255, 0.15)" }}
                      >
                        <Zap className="w-8 h-8" style={{ color: "hsl(224, 76%, 60%)" }} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        Try a different query or adjust your search terms.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results-grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                          Found{" "}
                          <span className="font-semibold text-foreground">{results.length}</span>{" "}
                          product groups matching{" "}
                          <span className="font-medium" style={{ color: "var(--t-tagline)" }}>
                            "{lastQuery}"
                          </span>
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {results.map((result, i) => (
                          <ClusterCard
                            key={result.group_data.group_id}
                            result={result}
                            index={i}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
