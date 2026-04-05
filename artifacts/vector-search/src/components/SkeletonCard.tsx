import { motion } from "framer-motion";

interface SkeletonCardProps {
  index: number;
}

export function SkeletonCard({ index }: SkeletonCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg, var(--t-card-bg-start) 0%, var(--t-card-bg-end) 100%)",
        border: "1px solid var(--t-card-border)",
      }}
    >
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 }}
        className="h-40 w-full"
        style={{ background: "linear-gradient(135deg, var(--t-skeleton-accent) 0%, var(--t-skeleton-accent) 100%)" }}
      />
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 }}
            className="h-5 w-20 rounded-lg"
            style={{ background: "var(--t-skeleton-accent)" }}
          />
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 }}
            className="h-5 w-14 rounded-lg"
            style={{ background: "var(--t-skeleton-chip)" }}
          />
        </div>
        <div className="space-y-2">
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.1 }}
            className="h-3 rounded-full"
            style={{ background: "var(--t-skeleton-line)", width: "85%" }}
          />
          <motion.div
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.15 }}
            className="h-3 rounded-full"
            style={{ background: "var(--t-skeleton-line)", width: "65%" }}
          />
        </div>
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.2 }}
          className="h-4 w-20 rounded-lg"
          style={{ background: "var(--t-skeleton-accent)" }}
        />
        <div className="flex gap-2">
          {[60, 80, 70].map((w, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.25 + i * 0.05 }}
              className="h-6 rounded-lg"
              style={{ background: "var(--t-skeleton-chip)", width: `${w}px` }}
            />
          ))}
        </div>
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.3 }}
          className="h-8 rounded-xl w-full"
          style={{ background: "var(--t-skeleton-chip)" }}
        />
      </div>
    </motion.div>
  );
}
