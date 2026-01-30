"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSettings, FiShield, FiBell, FiBox, FiCloud, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: <FiSettings />,
      label: "General Settings",
      path: "/admin/dashboard/settings",
    },
    {
      icon: <FiShield />,
      label: "Security",
      path: "/admin/dashboard/settings/security",
    },
    {
      icon: <FiBell />,
      label: "Notifications",
      path: "/admin/dashboard/settings/notifications",
    },
    {
      icon: <FiBox />,
      label: "Integrations",
      path: "/admin/dashboard/settings/integrations",
    },
    {
      icon: <FiCloud />,
      label: "Backup & Restore",
      path: "/admin/dashboard/settings/backupRestore",
    },
    {
      icon: <FiLogOut />,
      label: "Audit Logs",
      path: "/admin/dashboard/settings/auditLogs",
    },
  ];
  const isActive = (path) => pathname === path;

  return (
    <div className="sos-sidebar">
      <ul>
        {menuItems.map((item) => (
          <li className={`side-list ${isActive(item.path) ? "active" : ""}`} key={item.path}>
            <Link href={item.path}>{item.icon} {item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
