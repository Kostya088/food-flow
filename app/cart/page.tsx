import type { Metadata } from "next";

import { AppHeader } from "@/components/AppHeader/AppHeader";
import { CartPage } from "@/components/CartPage/CartPage";
import styles from "@/app/cart/page.module.css";

export const metadata: Metadata = {
  title: "Cart | Food Flow",
  description: "Review items in your cart and place your Food Flow order.",
};

export default function CartRoutePage() {
  return (
    <div className={styles.page}>
      <AppHeader />
      <main>
        <CartPage />
      </main>
    </div>
  );
}
