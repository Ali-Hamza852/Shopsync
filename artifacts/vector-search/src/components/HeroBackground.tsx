import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="bg-grid absolute inset-0 opacity-100" />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(224, 76%, 50%) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(270, 60%, 45%) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.14, 0.08],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(192, 80%, 45%) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "easeInOut",
          }}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0
              ? "hsl(224, 76%, 65%)"
              : i % 3 === 1
              ? "hsl(270, 60%, 65%)"
              : "hsl(192, 80%, 60%)",
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}
