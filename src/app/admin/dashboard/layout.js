"use client";

import AdminSidebar from "@/component/admin/sidebar";
import AdminTopbar from "@/component/admin/topbar";

export default function AdminDashboardLayout({ children }) {

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

