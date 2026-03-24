"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCartCount, useCartStore } from "@/lib/store/cartStore";
import styles from "@/components/AppHeader/AppHeader.module.css";

const isActive = (pathname: string, href: string): boolean => {
  return pathname === href;
};

export const AppHeader = () => {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => getCartCount(state.items));

  return (
    <header className={styles.header}>
      <div className={styles.brandWrap}>
        <Link href="/shop" className={styles.brandLink}>
          <p className={styles.brand}>Food Flow</p>
        </Link>
        <p className={styles.tagline}>
          Fast food ordering across your favorite shops
        </p>
      </div>
      <nav className={styles.nav}>
        <Link
          href="/shop"
          className={`${styles.link} ${isActive(pathname, "/shop") ? styles.linkActive : ""}`}
        >
          Shop
        </Link>
        <Link
          href="/cart"
          className={`${styles.link} ${isActive(pathname, "/cart") ? styles.linkActive : ""}`}
        >
          Shopping Cart
          <span className={styles.badge}>{cartCount}</span>
        </Link>
      </nav>
    </header>
  );
};
