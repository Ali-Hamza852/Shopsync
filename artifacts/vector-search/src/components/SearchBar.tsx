import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SUGGESTIONS = [
  "wireless noise cancelling headphones",
  "gaming mechanical keyboard RGB",
  "standing desk electric adjustable",
  "ultrawide curved monitor 34 inch",
  "ergonomic office chair lumbar support",
  "smart home security camera outdoor",
  "running shoes lightweight breathable",
  "coffee maker with grinder built-in",
];

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    onSearch(trimmed);
  }, [query, isLoading, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleSuggestion = (s: string) => {
    setQuery(s);
    onSearch(s);
    inputRef.current?.blur();
  };

  const clearQuery = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 0 1px rgba(96, 130, 255, 0.5), 0 0 30px rgba(96, 130, 255, 0.2), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.2 }}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(30, 38, 60, 0.9) 0%, rgba(22, 28, 48, 0.95) 100%)",
        }}
      >
        <div className="flex items-center gap-3 px-5 py-4">
          <motion.div
            animate={{ 
              color: isFocused ? "hsl(224, 76%, 65%)" : "hsl(215, 20%, 45%)",
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <Search className="w-5 h-5 shrink-0" />
          </motion.div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for any product using natural language..."
            className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-muted-foreground font-sans"
            data-testid="input-search-query"
            disabled={isLoading}
          />

          <AnimatePresence>
            {query && !isLoading && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={clearQuery}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                data-testid="button-clear-search"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={!query.trim() || isLoading}
            data-testid="button-search-submit"
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{
              background: query.trim() && !isLoading
                ? "linear-gradient(135deg, hsl(224, 76%, 60%) 0%, hsl(270, 60%, 55%) 100%)"
                : "rgba(255,255,255,0.07)",
              color: query.trim() && !isLoading ? "white" : "hsl(215, 20%, 50%)",
            }}
          >
            {isLoading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                <span className="hidden sm:block">Searching...</span>
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:block">Search</span>
              </>
            )}
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFocused && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
            style={{
              background: "rgba(18, 24, 40, 0.98)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="px-4 pt-3 pb-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-primary" />
                Popular Searches
              </div>
            </div>
            {SUGGESTIONS.map((s, i) => (
              <motion.button
                key={s}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                onMouseDown={() => handleSuggestion(s)}
                data-testid={`button-suggestion-${i}`}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
              >
                <Search className="w-3.5 h-3.5 shrink-0 text-muted-foreground/50" />
                {s}
              </motion.button>
            ))}
            <div className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
