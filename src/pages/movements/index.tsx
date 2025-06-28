
import RootLayout from "@/common/components/ui/Layout";
import withPermissionGuard from "@/common/libs/page-permissions";

import { ProductMovementView } from "@/modules/productMovement";

function BusinessUnitPage() {
  return (
    <RootLayout>
      <ProductMovementView />
    </RootLayout>
  );
}

export default withPermissionGuard(BusinessUnitPage, 'product_movement_list');