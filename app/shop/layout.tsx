import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader/AppHeader";
import styles from "@/app/shop/layout.module.css";

export const metadata: Metadata = {
  title: "Shop | Food Flow",
  description: "Browse shops and menu items on Food Flow.",
};

type ShopLayoutProps = {
  children: React.ReactNode;
  shops: React.ReactNode;
  products: React.ReactNode;
};

export default function ShopLayout({
  children,
  shops,
  products,
}: ShopLayoutProps) {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main className={styles.main}>
        {children}
        <div className={styles.sidebar}>{shops}</div>
        <div className={styles.products}>{products}</div>
      </main>
    </div>
  );
}
