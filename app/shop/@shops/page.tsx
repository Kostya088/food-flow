import { Suspense } from "react";

import { ShopSidebar } from "@/components/ShopSidebar/ShopSidebar";

export default function ShopsSlotPage() {
  return (
    <Suspense fallback={<aside>Loading shops...</aside>}>
      <ShopSidebar />
    </Suspense>
  );
}
