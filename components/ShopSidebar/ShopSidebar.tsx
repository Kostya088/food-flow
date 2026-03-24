"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { fetchShops } from "@/lib/api/client/shops";
import { getShopId } from "@/types/shop";
import styles from "@/components/ShopSidebar/ShopSidebar.module.css";

type RatingFilter = "all" | "4-5" | "3-4" | "2-3" | "1-2";

const ratingFilterOptions: Array<{ value: RatingFilter; label: string }> = [
  { value: "all", label: "All ratings" },
  { value: "4-5", label: "4.0 - 5.0" },
  { value: "3-4", label: "3.0 - 4.0" },
  { value: "2-3", label: "2.0 - 3.0" },
  { value: "1-2", label: "1.0 - 2.0" },
];

const matchesRatingFilter = (rating: number, filter: RatingFilter): boolean => {
  if (filter === "all") {
    return true;
  }

  if (filter === "4-5") {
    return rating >= 4 && rating <= 5;
  }

  if (filter === "3-4") {
    return rating >= 3 && rating < 4;
  }

  if (filter === "2-3") {
    return rating >= 2 && rating < 3;
  }

  return rating >= 1 && rating < 2;
};

export const ShopSidebar = () => {
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedShopId = searchParams.get("shop");

  const {
    data: shops,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shops"],
    queryFn: fetchShops,
  });

  const filteredShops = useMemo(() => {
    if (!shops) {
      return [];
    }

    return shops.filter((shop) =>
      matchesRatingFilter(shop.rating, ratingFilter),
    );
  }, [ratingFilter, shops]);

  const firstFilteredShopId = filteredShops[0]
    ? getShopId(filteredShops[0]._id)
    : "";

  useEffect(() => {
    if (!filteredShops.length) {
      return;
    }

    const hasSelectedVisibleShop = selectedShopId
      ? filteredShops.some((shop) => getShopId(shop._id) === selectedShopId)
      : false;

    if (selectedShopId && hasSelectedVisibleShop) {
      return;
    }

    if (!selectedShopId && firstFilteredShopId) {
      router.replace(`/shop?shop=${firstFilteredShopId}`);
      return;
    }

    if (selectedShopId && !hasSelectedVisibleShop && firstFilteredShopId) {
      router.replace(`/shop?shop=${firstFilteredShopId}`);
    }
  }, [filteredShops, firstFilteredShopId, router, selectedShopId]);

  if (isLoading) {
    return <aside className={styles.panel}>Loading shops...</aside>;
  }

  if (isError || !shops) {
    return <aside className={styles.panel}>Failed to load shops.</aside>;
  }

  return (
    <aside className={styles.panel}>
      <div className={styles.filterBlock}>
        <label className={styles.filterLabel} htmlFor="shop-rating-filter">
          Filter by rating
        </label>
        <select
          id="shop-rating-filter"
          name="shop-rating-filter"
          className={styles.filterSelect}
          value={ratingFilter}
          onChange={(event) =>
            setRatingFilter(event.target.value as RatingFilter)
          }
        >
          {ratingFilterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={() => setIsMobileListOpen((prev) => !prev)}
      >
        <span className={styles.title}>Shops</span>
        <span
          className={`${styles.mobileArrow} ${isMobileListOpen ? styles.mobileArrowOpen : ""}`}
        >
          v
        </span>
      </button>
      <ul
        className={`${styles.list} ${isMobileListOpen ? styles.listOpen : ""}`}
      >
        {filteredShops.map((shop) => {
          const shopId = getShopId(shop._id);
          const isActive = selectedShopId
            ? selectedShopId === shopId
            : firstFilteredShopId === shopId;

          return (
            <li key={shopId}>
              <Link
                href={`/shop?shop=${shopId}`}
                onClick={() => setIsMobileListOpen(false)}
                className={`${styles.shopButton} ${isActive ? styles.shopButtonActive : ""}`}
              >
                <span>{shop.name}</span>
                <span className={styles.ratingBadge}>
                  {shop.rating.toFixed(1)}
                </span>
              </Link>
            </li>
          );
        })}
        {filteredShops.length === 0 && (
          <li className={styles.emptyState}>
            No shops match this rating range.
          </li>
        )}
      </ul>
      <h2 className={styles.desktopTitle}>Shops</h2>
      <ul className={styles.desktopList}>
        {filteredShops.map((shop) => {
          const shopId = getShopId(shop._id);
          const isActive = selectedShopId
            ? selectedShopId === shopId
            : firstFilteredShopId === shopId;

          return (
            <li key={`desktop-${shopId}`}>
              <Link
                href={`/shop?shop=${shopId}`}
                className={`${styles.shopButton} ${isActive ? styles.shopButtonActive : ""}`}
              >
                <span>{shop.name}</span>
                <span className={styles.ratingBadge}>
                  {shop.rating.toFixed(1)}
                </span>
              </Link>
            </li>
          );
        })}
        {filteredShops.length === 0 && (
          <li className={styles.emptyState}>
            No shops match this rating range.
          </li>
        )}
      </ul>
    </aside>
  );
};
