import Image from "next/image";

import type { Product } from "@/types/shop";
import styles from "@/components/ProductCard/ProductCard.module.css";

type ProductCardProps = {
  product: Product;
  onAddToCart: () => void;
  prioritizeImage?: boolean;
};

export const ProductCard = ({
  product,
  onAddToCart,
  prioritizeImage = false,
}: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          priority={prioritizeImage}
          loading={prioritizeImage ? "eager" : "lazy"}
        />
      </div>
      <div className={styles.content}>
        <p className={styles.name}>{product.name}</p>
        <p className={styles.price}>{product.price} UAH</p>
        <button type="button" className={styles.button} onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};
