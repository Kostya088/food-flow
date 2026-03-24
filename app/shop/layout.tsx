import { AppHeader } from "@/components/AppHeader/AppHeader";
import styles from "@/app/shop/layout.module.css";

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
