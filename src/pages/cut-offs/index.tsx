
import RootLayout from "@/common/components/ui/Layout";
import withPermissionGuard from "@/common/libs/page-permissions";

import { CutOffView } from "@/modules/cutOff"; 

function BusinessUnitPage() {
  return (
    <RootLayout>
      <CutOffView />
    </RootLayout>
  );
}

export default withPermissionGuard(BusinessUnitPage, 'cut_off_list');