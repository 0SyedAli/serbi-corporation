"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { LuCalendarCheck } from "react-icons/lu";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineDevicesOther } from "react-icons/md";
import { PiSlidersDuotone } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = (router) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // (safe even if not exists)
    }

    router.replace("/admin/auth/login");
  };
  const menuItems = [
    {
      icon: <AiOutlineHome size={17} />,
      label: "Class Entry",
      path: "/student/dashboard",
    },
    {
      icon: <MdOutlineDevicesOther size={17} />,
      label: "Restricted Mode",
      path: "/student/dashboard/restricted-device-mode",
    },
    {
      icon: <BsCalendarEvent size={17} />,
      label: "Schedule & Events",
      path: "/student/dashboard/schedule-events",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Class Transition",
      path: "/student/dashboard/class-transition",
    },
    {
      icon: <PiSlidersDuotone size={17} />,
      label: "Customize Landing",
      path: "/student/dashboard/customize-landing",
    },
  ];

  const userMenuItems = [
    { icon: <IoLogOutOutline size={17} />, label: "Log out", path: "#!" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="sidebar-container px-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Image src="/images/logo.png" width={100} height={50} className="img-fluid" alt="" />
        </div>
      </div>

      <div className="sidebar-title">MENU</div>

      <ul className="list-unstyled">
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

      <div className="sidebar-title mt-4">OTHER</div>
      <ul className="list-unstyled">
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


