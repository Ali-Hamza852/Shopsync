import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Github, AlertCircle } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ClusterCard } from "@/components/ClusterCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { HeroBackground } from "@/components/HeroBackground";
import { searchProducts } from "@/lib/api";
import type { SearchResult } from "@/lib/types";

export function SearchPage() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setResults([]);
    setLastQuery(query);
    setHasSearched(true);

    try {
      const data = await searchProducts({ query, top_k: 10, threshold: 0.90 });
      setResults(data.results ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: "hsl(222, 47%, 5%)" }}>
      <HeroBackground />

      <div className="relative z-10">
        <header className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(224, 76%, 60%) 0%, hsl(270, 60%, 55%) 100%)",
              }}
            >
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              VectorSearch<span style={{ color: "hsl(224, 76%, 60%)" }}>.ai</span>
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "hsl(142, 72%, 50%)", boxShadow: "0 0 6px hsl(142, 72%, 50%)" }}
            />
            Powered by HNSW Vector Search
          </div>
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
                className="flex flex-col items-center justify-center text-center py-24 sm:py-32"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(96, 130, 255, 0.1)",
                      border: "1px solid rgba(96, 130, 255, 0.2)",
                      color: "hsl(224, 76%, 70%)",
                    }}
                  >
                    <Zap className="w-3 h-3" />
                    AI-Powered Semantic Product Discovery
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
                >
                  Find products with
                  <br />
                  <span className="text-gradient-blue">natural language</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed"
                >
                  Describe what you're looking for in plain English. Our vector search engine finds the
                  best matching products from across the web and groups identical items together.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-full"
                >
                  <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-10 flex items-center gap-8 text-xs text-muted-foreground"
                >
                  {[
                    { label: "Semantic matching", color: "hsl(224, 76%, 60%)" },
                    { label: "Multi-platform", color: "hsl(270, 60%, 55%)" },
                    { label: "Price comparison", color: "hsl(192, 80%, 52%)" },
                  ].map(({ label, color }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      {label}
                    </div>
                  ))}
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
                          style={{ borderColor: "rgba(96, 130, 255, 0.3)", borderTopColor: "hsl(224, 76%, 60%)" }}
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
                        Try a different query or adjust your search terms. Our AI works best with descriptive phrases.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex items-center justify-between mb-6">
                        <p className="text-sm text-muted-foreground" data-testid="text-results-count">
                          Found{" "}
                          <span className="font-semibold text-foreground">{results.length}</span>{" "}
                          product groups matching{" "}
                          <span
                            className="font-medium"
                            style={{ color: "hsl(224, 76%, 65%)" }}
                          >
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

        {!hasSearched && (
          <footer className="relative z-10 text-center py-8 text-xs text-muted-foreground/40">
            Built with HNSW vector search · Powered by Hugging Face
          </footer>
        )}
      </div>
    </div>
  );
}
