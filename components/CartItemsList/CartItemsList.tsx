import Image from "next/image";

import type { CartItem } from "@/types/cart";
import styles from "@/components/CartItemsList/CartItemsList.module.css";

type CartItemsListProps = {
  items: CartItem[];
  onChangeQuantity: (
    shopId: string,
    name: string,
    quantity: number,
    category?: string,
  ) => void;
  onRemove: (shopId: string, name: string, category?: string) => void;
};

export const CartItemsList = ({
  items,
  onChangeQuantity,
  onRemove,
}: CartItemsListProps) => {
  if (items.length === 0) {
    return (
      <p className={styles.empty}>
        Your cart is empty. Add products from the Shop page.
      </p>
    );
  }

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li
          className={styles.item}
          key={`${item.shopId}-${item.name}-${item.category ?? "uncategorized"}`}
        >
          <div className={styles.imageWrap}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>
          <div className={styles.content}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.price}>{item.price} UAH</p>
            <div className={styles.controls}>
              <label
                className={styles.qtyLabel}
                htmlFor={`${item.shopId}-${item.name}-${item.category ?? "uncategorized"}`}
              >
                Qty
              </label>
              <input
                id={`${item.shopId}-${item.name}-${item.category ?? "uncategorized"}`}
                className={styles.qtyInput}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) =>
                  onChangeQuantity(
                    item.shopId,
                    item.name,
                    Number(event.target.value),
                    item.category,
                  )
                }
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => onRemove(item.shopId, item.name, item.category)}
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
