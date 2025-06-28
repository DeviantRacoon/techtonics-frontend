
import RootLayout from "@/common/components/ui/Layout";
import withPermissionGuard from "@/common/libs/page-permissions";

import { ProductView } from "@/modules/product";

function ProductPage() {
  return (
    <RootLayout>
      <ProductView />
    </RootLayout>
  );
}

export default withPermissionGuard(ProductPage, 'product_list');