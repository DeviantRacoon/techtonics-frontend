
import RootLayout from "@/common/components/ui/Layout";
import withPermissionGuard from "@/common/libs/page-permissions";

import { BusinessUnitView } from "@/modules/businessUnit";

function BusinessUnitPage() {
  return (
    <RootLayout>
      <BusinessUnitView />
    </RootLayout>
  );
}

export default withPermissionGuard(BusinessUnitPage, 'role_list');