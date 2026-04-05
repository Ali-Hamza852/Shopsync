import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { fetchProductImage } from "@/lib/api";

interface ProductImageProps {
  productUrl: string;
  title: string;
}

export function ProductImage({ productUrl, title }: ProductImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setImageUrl(null);
    setHasError(false);

    fetchProductImage(productUrl).then((url) => {
      if (cancelled) return;
      setImageUrl(url);
      setIsLoading(false);
    }).catch(() => {
      if (cancelled) return;
      setHasError(true);
      setIsLoading(false);
    });

    return () => { cancelled = true; };
  }, [productUrl]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-full h-full rounded-t-xl"
          style={{ background: "linear-gradient(135deg, rgba(96, 130, 255, 0.08) 0%, rgba(147, 102, 230, 0.08) 100%)" }}
        />
      </div>
    );
  }

  if (hasError || !imageUrl) {
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
      onError={() => {
        setImageUrl(null);
        setHasError(true);
      }}
      data-testid="img-product"
    />
  );
}
