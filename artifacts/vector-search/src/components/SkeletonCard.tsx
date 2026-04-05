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
        background: "linear-gradient(160deg, rgba(30, 38, 60, 0.9) 0%, rgba(18, 24, 40, 0.95) 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 }}
        className="h-52 w-full"
        style={{ background: "linear-gradient(135deg, rgba(96, 130, 255, 0.07) 0%, rgba(147, 102, 230, 0.07) 100%)" }}
      />
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.1 }}
            className="h-3 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", width: "85%" }}
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.15 }}
            className="h-3 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)", width: "65%" }}
          />
        </div>
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.2 }}
          className="h-4 w-20 rounded-lg"
          style={{ background: "rgba(96, 130, 255, 0.1)" }}
        />
        <div className="flex gap-2">
          {[60, 80, 70].map((w, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.25 + i * 0.05 }}
              className="h-6 rounded-lg"
              style={{ background: "rgba(255,255,255,0.04)", width: `${w}px` }}
            />
          ))}
        </div>
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.1 + 0.3 }}
          className="h-8 rounded-xl w-full"
          style={{ background: "rgba(255,255,255,0.04)" }}
        />
      </div>
    </motion.div>
  );
}
