// "use client";
// import SuperAdminSidebar from "@/component/super-admin/sidebar";
// import SuperAdminTopbar from "@/component/super-admin/topbar";
// import ProtectedRoute from "@/lib/ProtectedRoute";

// export default function AdminDashboardLayout({ children }) {
//   return (
//     <div className="dashboard_container" >
//       <SuperAdminSidebar />
//       <div className="dashboard_panel" >
//         <SuperAdminTopbar />
//         <ProtectedRoute>
//           {children}
//         </ProtectedRoute>
//       </div>
//     </div>
//   );
// }



"use client";

import SuperAdminSidebar from "@/component/super-admin/sidebar";
import SuperAdminTopbar from "@/component/super-admin/topbar";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function AdminDashboardLayout({ children }) {
  return (
    <ProtectedRoute allowedRole="superAdmin">
      <div className="dashboard_container">
        <SuperAdminSidebar />
        <div className="dashboard_panel">
          <SuperAdminTopbar />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}

