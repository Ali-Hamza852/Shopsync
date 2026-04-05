import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface ProductImageProps {
  imageUrl?: string | null;
  title: string;
}

export function ProductImage({ imageUrl, title }: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!imageUrl || hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2"
        style={{ background: "linear-gradient(135deg, rgba(30, 38, 60, 0.8) 0%, rgba(22, 28, 48, 0.8) 100%)" }}
      >
        <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
        <p className="text-xs text-muted-foreground/40 text-center px-4 line-clamp-2">{title}</p>
      </div>
    );
  }

  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      src={imageUrl}
      alt={title}
      className="w-full h-full object-contain p-3"
      onError={() => setHasError(true)}
      data-testid="img-product"
    />
  );
}
