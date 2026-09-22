"use client";

import { useState } from "react";
import AdminSidebar from "@/component/admin/sidebar";
import AdminTopbar from "@/component/admin/topbar";
import { useAdminAuthRedirect } from "@/lib/AuthRedirectHandler";

export default function AdminDashboardLayout({ children }) {
  useAdminAuthRedirect({ protectedRoute: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard_container">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div className="sidebar-backdrop d-lg-none" onClick={closeSidebar} />
      )}

      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="dashboard_panel">
        <AdminTopbar onToggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
}
