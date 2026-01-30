"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  AiOutlineHome,
} from "react-icons/ai";

import {
  PiStudentBold,
  PiChatCircleTextLight,
} from "react-icons/pi";

import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineBarChart } from "react-icons/md";
import { BsCalendarEvent } from "react-icons/bs";
import { IoNotificationsOutline, IoLogOutOutline } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import Image from "next/image";
export default function Sidebar() {
  const pathname = usePathname(); // ← Get current URL
  const router = useRouter();

  // NOTE:
  // Parent dashboard routes live under `/parent/dashboard/*` in the app router.
  // Keeping all sidebar links scoped to that base path ensures navigation works
  // both now and when backend auth/role logic is added later.
  const menuItems = [
    { icon: <AiOutlineHome size={17} />, label: "Dashboard", path: "/parent/dashboard" },
    { icon: <PiStudentBold size={17} />, label: "Student Enrollment", path: "/parent/dashboard/student-enrollment" },
    { icon: <LuCalendarCheck size={17} />, label: "Daily Attendance", path: "/parent/dashboard/attendance" },
    { icon: <MdOutlineBarChart size={17} />, label: "Behavior & Performance", path: "/parent/dashboard/behavior-performance" },
    { icon: <PiChatCircleTextLight size={17} />, label: "Teacher Communication", path: "/parent/dashboard#!" },
    { icon: <BsCalendarEvent size={17} />, label: "Schedule & Events", path: "/parent/dashboard/schedule-events" },
    { icon: <IoNotificationsOutline size={17} />, label: "Emergency Notifications", path: "/parent/dashboard/emergency-notifications" },
    { icon: <PiSlidersDuotone size={17} />, label: "Manage App", path: "/parent/dashboard/manage-app" },
  ];

  const userMenuItems = [
    // { icon: <AiOutlineUser size={20} />, label: "Profile", path: "/profile" },
    // { icon: <AiOutlineSetting size={20} />, label: "Setting", path: "/settings" },
    { icon: <IoLogOutOutline size={17} />, label: "Log out", path: "#!" },
  ];

  // Function checks if current route matches item path
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

      {/* LOGO */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Image src="/images/logo.png" width={100} height={50} className="img-fluid" alt="" />
        </div>
      </div>

      {/* MENU TITLE */}
      <div className="sidebar-title">MENU</div>

      {/* MAIN MENU */}
      <ul className="list-unstyled">
        {menuItems.map((item, index) => (
          <li key={index}>
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

      {/* OTHER MENU */}
      <div className="sidebar-title mt-4">OTHER</div>

      <ul className="list-unstyled">
        {userMenuItems.map((item, index) => (
          <li key={index}>
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
