import { Suspense } from "react";

import { ProductsPanel } from "@/components/ProductsPanel/ProductsPanel";

export default function ProductsSlotPage() {
  return (
    <Suspense fallback={<section>Loading products...</section>}>
      <ProductsPanel />
    </Suspense>
  );
}
