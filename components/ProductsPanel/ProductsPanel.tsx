"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { fetchShops } from "@/lib/api/client/shops";
import { useCartStore } from "@/lib/store/cartStore";
import { getShopId } from "@/types/shop";
import styles from "@/components/ProductsPanel/ProductsPanel.module.css";

const formatCategoryLabel = (category: string): string => {
  if (!category) {
    return "Other";
  }

  return category.charAt(0).toUpperCase() + category.slice(1);
};

type SortOption = "price-asc" | "price-desc" | "name-asc";

const PRIORITIZED_PRODUCT_IMAGE_COUNT = 6;

export const ProductsPanel = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedShopId = searchParams.get("shop");
  const addItem = useCartStore((state) => state.addItem);
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");
  const [selectedCategoriesByShop, setSelectedCategoriesByShop] = useState<
    Record<string, string[]>
  >({});

  const {
    data: shops,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: fetchShops,
  });

  const activeShop = useMemo(() => {
    if (!shops || shops.length === 0) {
      return undefined;
    }

    if (!selectedShopId) {
      return shops[0];
    }

    return (
      shops.find((shop) => getShopId(shop._id) === selectedShopId) ?? shops[0]
    );
  }, [selectedShopId, shops]);

  useEffect(() => {
    if (!shops || shops.length === 0 || selectedShopId) {
      return;
    }

    const firstShopId = getShopId(shops[0]._id);
    router.replace(`/shop?shop=${firstShopId}`);
  }, [router, selectedShopId, shops]);

  const activeShopId = activeShop ? getShopId(activeShop._id) : undefined;
  const selectedCategories = useMemo(() => {
    if (!activeShopId) {
      return [];
    }

    return selectedCategoriesByShop[activeShopId] ?? [];
  }, [activeShopId, selectedCategoriesByShop]);

  const availableCategories = useMemo(() => {
    if (!activeShop) {
      return [];
    }

    const categories = new Set(
      activeShop.products.map((product) => product.category),
    );
    return Array.from(categories).sort((a, b) => a.localeCompare(b));
  }, [activeShop]);

  const filteredProducts = useMemo(() => {
    if (!activeShop) {
      return [];
    }

    if (selectedCategories.length === 0) {
      return activeShop.products;
    }

    return activeShop.products.filter((product) =>
      selectedCategories.includes(product.category),
    );
  }, [activeShop, selectedCategories]);

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    if (sortOption === "price-asc") {
      return products.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-desc") {
      return products.sort((a, b) => b.price - a.price);
    }

    return products.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredProducts, sortOption]);

  const toggleCategory = (category: string) => {
    if (!activeShopId) {
      return;
    }

    setSelectedCategoriesByShop((currentState) => {
      const currentCategories = currentState[activeShopId] ?? [];
      const nextCategories = currentCategories.includes(category)
        ? currentCategories.filter((value) => value !== category)
        : [...currentCategories, category];

      return {
        ...currentState,
        [activeShopId]: nextCategories,
      };
    });
  };

  if (isLoading) {
    return <section className={styles.panel}>Loading products...</section>;
  }

  if (isError || !shops || !activeShop) {
    return <section className={styles.panel}>Failed to load products.</section>;
  }

  const resolvedActiveShopId = getShopId(activeShop._id);

  return (
    <section className={styles.panel}>
      <div className={styles.headingWrap}>
        <h2 className={styles.title}>{activeShop.name}</h2>
        <p className={styles.subtitle}>
          Pick products and add them to your cart
        </p>
        <div className={styles.controls}>
          <div className={styles.filters}>
            {availableCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  className={`${styles.filterChip} ${isSelected ? styles.filterChipActive : ""}`}
                  onClick={() => toggleCategory(category)}
                  aria-pressed={isSelected}
                >
                  {formatCategoryLabel(category)}
                </button>
              );
            })}
          </div>
          <label className={styles.sortWrap}>
            <span className={styles.sortLabel} id="product-sort-label">
              Sort by
            </span>
            <select
              id="product-sort"
              name="product-sort"
              aria-labelledby="product-sort-label"
              className={styles.sortSelect}
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as SortOption)
              }
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
            </select>
          </label>
        </div>
      </div>
      <div className={styles.grid}>
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={`${resolvedActiveShopId}-${product.name}`}
            product={product}
            onAddToCart={() => addItem(resolvedActiveShopId, product)}
            prioritizeImage={index < PRIORITIZED_PRODUCT_IMAGE_COUNT}
          />
        ))}
      </div>
      {sortedProducts.length === 0 && (
        <p className={styles.emptyState}>
          No products match the selected categories.
        </p>
      )}
    </section>
  );
};
