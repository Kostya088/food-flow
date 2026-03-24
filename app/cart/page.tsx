import { AppHeader } from "@/components/AppHeader/AppHeader";
import { CartPage } from "@/components/CartPage/CartPage";
import styles from "@/app/cart/page.module.css";

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
