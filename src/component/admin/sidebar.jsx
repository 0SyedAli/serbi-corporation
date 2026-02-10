"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { LuCalendarCheck, LuUserRound } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      icon: <AiOutlineHome size={17} />,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <LuUserRound size={17} />,
      label: "User Management",
      path: "/admin/dashboard/users",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Service Requests",
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
    // {
    //   icon: <TbNotification size={17} />,
    //   label: "Technician Management",
    //   path: "/admin/dashboard/technician",
    // },
    // {
    //   icon: <MdOutlineAnalytics size={17} />,
    //   label: "Payments & Billing",
    //   path: "/admin/dashboard/payment",
    // },
    // {
    //   icon: <MdOutlineAnalytics size={17} />,
    //   label: "Reports & Analytics",
    //   path: "/admin/dashboard/reports",
    // },
    // {
    //   icon: <MdOutlineAnalytics size={17} />,
    //   label: "Pest Types Management",
    //   path: "/admin/dashboard/pest-types",
    // },
    // {
    //   icon: <MdOutlineAnalytics size={17} />,
    //   label: "Settings",
    //   path: "/admin/dashboard/setting",
    // },
    // {
    //   icon: <MdOutlineAnalytics size={17} />,
    //   label: "Support / Complaints",
    //   path: "/admin/dashboard/support",
    // },
  ];

  const userMenuItems = [
    { icon: <IoLogOutOutline size={17} />, label: "Log out", path: "#!" },
  ];

  const isActive = (path) => pathname === path;
  const logout = (router) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // (safe even if not exists)
    }

    router.replace("/auth/login");
  };
  return (
    <div className="sidebar-container px-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Image src="/images/logo.png" width={100} height={50} className="img-fluid" alt="" />
        </div>
      </div>

      <ul className="list-unstyled list-unstyled2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-title mt-2">OTHER</div>
      <ul className="list-unstyled ">
        {userMenuItems.map((item) => (
          <li key={item.path}>
            {/* <Link
              href={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <span className="menu-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link> */}

            <div
              className={`menu-item`}
              onClick={() => logout(router)}

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