import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, Tag, Sparkles } from "lucide-react";
import type { SearchResult } from "@/lib/types";
import { ProductImage } from "./ProductImage";
import { getPlatformName, getPlatformIcon, generateRedirectUrl, formatPrice } from "@/lib/api";

interface ClusterCardProps {
  result: SearchResult;
  index: number;
}

function getScoreColor(score: number): string {
  if (score >= 0.95) return "hsl(142, 72%, 50%)";
  if (score >= 0.90) return "hsl(224, 76%, 60%)";
  if (score >= 0.85) return "hsl(270, 60%, 55%)";
  return "hsl(38, 90%, 55%)";
}

function getScoreBg(score: number): string {
  if (score >= 0.95) return "rgba(74, 222, 128, 0.12)";
  if (score >= 0.90) return "rgba(96, 130, 255, 0.12)";
  if (score >= 0.85) return "rgba(147, 102, 230, 0.12)";
  return "rgba(251, 191, 36, 0.12)";
}

function openProductLink(product: Parameters<typeof generateRedirectUrl>[0]) {
  const redirectUrl = generateRedirectUrl(product);
  if (redirectUrl && redirectUrl !== "#") {
    window.open(redirectUrl, "_blank", "noopener,noreferrer");
  }
}

export function ClusterCard({ result, index }: ClusterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { match_score, group_data } = result;
  const { representative_title, products, group_id } = group_data;

  const scorePercent = Math.round(match_score * 100);
  const primaryProduct = products[0];
  const scoreColor = getScoreColor(match_score);
  const scoreBg = getScoreBg(match_score);

  const primaryPlatform = primaryProduct ? getPlatformName(primaryProduct) : "Store";
  const primaryPrice = primaryProduct ? formatPrice(primaryProduct.price) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
      data-testid={`card-product-${group_id}`}
      className="rounded-2xl overflow-hidden card-hover"
      style={{
        background: "linear-gradient(160deg, rgba(30, 38, 60, 0.9) 0%, rgba(18, 24, 40, 0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        className="relative h-40 overflow-hidden"
        style={{ background: "rgba(12, 16, 30, 0.8)" }}
      >
        {primaryProduct && (
          <ProductImage imageUrl={primaryProduct.image_url} title={representative_title} />
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2.5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.07 + 0.2, type: "spring", stiffness: 200 }}
            data-testid={`badge-match-score-${group_id}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
            style={{
              background: scoreBg,
              border: `1px solid ${scoreColor}40`,
              color: scoreColor,
            }}
          >
            <Sparkles className="w-3 h-3" />
            {scorePercent}% Match
          </motion.div>
          {products.length > 1 && (
            <div
              className="px-2 py-0.5 rounded-lg text-xs font-medium"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {products.length} stores
            </div>
          )}
        </div>

        <h3
          className="font-semibold text-sm leading-snug line-clamp-2 text-foreground mb-3"
          data-testid={`text-product-title-${group_id}`}
        >
          {representative_title}
        </h3>

        {primaryPrice && (
          <div className="flex items-center gap-1.5 mb-3">
            <Tag className="w-3.5 h-3.5 text-primary" />
            <span
              className="text-sm font-bold"
              style={{ color: "hsl(192, 80%, 52%)" }}
              data-testid={`text-price-${group_id}`}
            >
              {primaryPrice}
            </span>
            {primaryPlatform !== "Store" && (
              <span className="text-xs text-muted-foreground">
                on {primaryPlatform}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap mb-3">
          {products.slice(0, 3).map((p, i) => {
            const platform = getPlatformName(p);
            const price = formatPrice(p.price);
            return (
              <button
                key={i}
                onClick={() => openProductLink(p)}
                data-testid={`link-product-${group_id}-${i}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <span>{getPlatformIcon(platform)}</span>
                <span>{platform}</span>
                {price && <span className="text-primary/80">· {price}</span>}
              </button>
            );
          })}
        </div>

        {products.length > 0 && (
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid={`button-expand-${group_id}`}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
            }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          >
            <span>View all {products.length} listings</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </motion.button>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-3 space-y-2">
                {products.map((p, i) => {
                  const platform = getPlatformName(p);
                  const price = formatPrice(p.price);
                  return (
                    <motion.button
                      key={i}
                      onClick={() => openProductLink(p)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      data-testid={`link-product-full-${group_id}-${i}`}
                      className="w-full flex items-start justify-between gap-2 p-2.5 rounded-lg transition-all group text-left cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="flex items-start gap-2 min-w-0">
                        <span className="text-base mt-0.5">{getPlatformIcon(platform)}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-foreground/80 line-clamp-2 group-hover:text-foreground transition-colors">
                            {p.title || representative_title}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">{platform}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {price && (
                          <span className="text-xs font-semibold" style={{ color: "hsl(192, 80%, 52%)" }}>
                            {price}
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
