"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";

const adminPageTitles = {
  "/admin/dashboard/users": "User Management",
  "/admin/dashboard/technicians": "Technician Management",
  "/admin/dashboard/servicerequest": "Service Requests",
  "/admin/dashboard/discussionrequest": "Discussion Requests",
  "/admin/dashboard/service": "Service Management",
  "/admin/dashboard/category": "All Categories",
  "/admin/dashboard/propertytype": "All Property Types",
  "/admin/dashboard/severity": "All Severities",
};

export default function Topbar({ onToggleSidebar }) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    setEmail(admin?.email || "");
  }, []);

  const pathname = usePathname();

  const heading =
    adminPageTitles[pathname] ||
    pathname.split("/").pop()?.replace("-", " ")?.toUpperCase();

  return (
    <div className="topbar">
      <div className="d-flex align-items-center gap-3">
        {/* Mobile Hamburger Toggle Button */}
        <button
          className="sidebar-toggle-btn d-lg-none"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation"
        >
          <FiMenu size={24} />
        </button>

        <div className="serbi-um-title mb-0">{heading}</div>
      </div>

      <div className="topbar-actions">
        <div className="topbar-user">
          <div className="text-end d-none d-sm-block">
            <div className="topbar-user-name">Admin User</div>
            <small style={{ color: "#999", fontSize: "12px" }}>{email || ""}</small>
          </div>
          <div className="user-avatar">
            <Image
              src="/images/profile-avatar.png"
              width={40}
              height={40}
              className="pa_icon"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
