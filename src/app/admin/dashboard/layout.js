"use client";

import AdminSidebar from "@/component/admin/sidebar";
import AdminTopbar from "@/component/admin/topbar";
import { useAdminAuthRedirect } from "@/lib/AuthRedirectHandler";

export default function AdminDashboardLayout({ children }) {
  useAdminAuthRedirect({ protectedRoute: true });

  return (
    <div className="dashboard_container" >
      <AdminSidebar />

      <div className="dashboard_panel" >

        <AdminTopbar />
        {children}
      </div>
    </div>
  );
}

