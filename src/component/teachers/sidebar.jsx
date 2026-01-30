"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { LuCalendarCheck } from "react-icons/lu";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineDevicesOther } from "react-icons/md";
import { PiSlidersDuotone } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { TbNotification } from "react-icons/tb";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import Image from "next/image";

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      icon: <AiOutlineHome size={17} />,
      label: "Dashboard",
      path: "/teacher/dashboard",
    },
    {
      icon: <AiOutlineHome size={17} />,
      label: "Class Entry",
      path: "/teacher/dashboard/class-entry",
    },
    {
      icon: <MdOutlineDevicesOther size={17} />,
      label: "Attendance Management",
      path: "/teacher/dashboard/attendance-management",
    },
    {
      icon: <BsCalendarEvent size={17} />,
      label: "Student Behavior Notes",
      path: "/teacher/dashboard/student-behavior-notes",
    },
    {
      icon: <LuCalendarCheck size={17} />,
      label: "Device Management",
      path: "/teacher/dashboard/device-management",
    },
    {
      icon: <PiSlidersDuotone size={17} />,
      label: "Parent Communication",
      path: "#!",
    },
    {
      icon: <TbNotification size={17} />,
      label: "Emergency Response",
      path: "/teacher/dashboard/emergency-response",
    },
    {
      icon: <HiOutlinePaintBrush size={17} />,
      label: "Customize Landing",
      path: "/teacher/dashboard/customize-landing",
    },
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

    router.replace("/admin/auth/login");
  };
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