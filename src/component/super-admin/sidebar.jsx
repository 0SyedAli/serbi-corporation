"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuUserRound } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

export default function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const userMenuItems = [
    { icon: <IoLogOutOutline size={17} />, label: "Log out", path: "1" },
  ];

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

      {/* <div className="sidebar-title">Super Admin</div>

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

      <div className="sidebar-title mt-4">OTHER</div> */}
      <ul className="list-unstyled">
        {userMenuItems.map((item) => (
          <li key={item.path}>
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