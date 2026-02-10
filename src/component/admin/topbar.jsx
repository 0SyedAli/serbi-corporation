"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const adminPageTitles = {
  "/admin/dashboard/users": "User Management",
  "/admin/dashboard/service": "Service Requests",
  "/admin/dashboard/category": "All Categories",
  "/admin/dashboard/propertytype": "All Property Types",
  "/admin/dashboard/severity": "All Severities",
};
export default function Topbar() {
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
      {/* <div className="topbar-search">
      </div> */}
      <div className="serbi-um-title mb-0">{heading}</div>

      <div className="topbar-actions">

        <div className="topbar-user">
          <div className="text-end">
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


