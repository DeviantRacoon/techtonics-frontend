
import RootLayout from "@/common/components/ui/Layout";
import withPermissionGuard from "@/common/libs/page-permissions";

import { SessionView } from "@/modules/session";

function SessionPage() {
  return (
    <RootLayout>
      <SessionView />
    </RootLayout>
  );
}

export default withPermissionGuard(SessionPage, 'session_list');