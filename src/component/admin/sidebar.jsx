"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuCalendarCheck, LuUserRound } from "react-icons/lu";
import { IoLogOutOutline, IoCloseOutline } from "react-icons/io5";
import Image from "next/image";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      icon: <LuUserRound size={17} />,
      label: "User Management",
      path: "/admin/dashboard/users",
    },
    {
      icon: <LuUserRound size={17} />,
      label: "Technician Management",
      path: "/admin/dashboard/technicians",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Service Requests",
      path: "/admin/dashboard/servicerequest",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Discussion Requests",
      path: "/admin/dashboard/discussionrequest",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Service Management",
      path: "/admin/dashboard/service",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Pest Type Categories",
      path: "/admin/dashboard/category",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Property Type",
      path: "/admin/dashboard/propertytype",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Severity",
      path: "/admin/dashboard/severity",
    },
  ];

  const userMenuItems = [
    { icon: <IoLogOutOutline size={17} />, label: "Log out", path: "#!" },
  ];

  const isActive = (path) => pathname === path;
  const logout = (router) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin");
      document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
    router.replace("/auth/login");
  };

  return (
    <div className={`sidebar-container px-2 ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header d-flex justify-content-between align-items-center">
        <div className="sidebar-logo">
          <Image src="/images/logo.png" width={100} height={50} className="img-fluid" alt="Logo" />
        </div>
        {/* Close button for mobile */}
        <button
          className="sidebar-close-btn d-lg-none"
          onClick={onClose}
          aria-label="Close Navigation"
        >
          <IoCloseOutline size={26} />
        </button>
      </div>

      <ul className="list-unstyled list-unstyled2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              onClick={() => onClose?.()}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-title mt-2">OTHER</div>
      <ul className="list-unstyled">
        {userMenuItems.map((item) => (
          <li key={item.path}>
            <div
              className={`menu-item`}
              onClick={() => {
                onClose?.();
                logout(router);
              }}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}