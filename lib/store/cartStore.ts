import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/shop";

type CartState = {
  items: CartItem[];
  addItem: (shopId: string, product: Product) => void;
  removeItem: (shopId: string, name: string, category?: string) => void;
  setQuantity: (
    shopId: string,
    name: string,
    quantity: number,
    category?: string,
  ) => void;
  clearCart: () => void;
};

const normalizeCategory = (category?: string): string => {
  return category ?? "uncategorized";
};

const findIndex = (
  items: CartItem[],
  shopId: string,
  name: string,
  category?: string,
): number => {
  return items.findIndex(
    (item) =>
      item.shopId === shopId &&
      item.name === name &&
      normalizeCategory(item.category) === normalizeCategory(category),
  );
};

export const getCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (shopId, product) => {
        set((state) => {
          const index = findIndex(
            state.items,
            shopId,
            product.name,
            product.category,
          );

          if (index === -1) {
            return {
              items: [
                ...state.items,
                {
                  shopId,
                  name: product.name,
                  category: product.category,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                },
              ],
            };
          }

          return {
            items: state.items.map((item, itemIndex) => {
              if (itemIndex !== index) {
                return item;
              }

              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }),
          };
        });
      },
      removeItem: (shopId, name, category) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.shopId === shopId &&
                item.name === name &&
                normalizeCategory(item.category) === normalizeCategory(category)
              ),
          ),
        }));
      },
      setQuantity: (shopId, name, quantity, category) => {
        const safeQuantity = Math.max(1, Math.floor(quantity));

        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.shopId !== shopId ||
              item.name !== name ||
              normalizeCategory(item.category) !== normalizeCategory(category)
            ) {
              return item;
            }

            return {
              ...item,
              quantity: safeQuantity,
            };
          }),
        }));
      },
      clearCart: () => {
        set({ items: [] });
      },
    }),
    {
      name: "food-flow-cart",
    },
  ),
);
