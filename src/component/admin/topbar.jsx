"use client";
import Image from "next/image";

export default function StudentTopbar() {
  return (
    <div className="topbar">
      <div className="topbar-search">
      </div>
      <div className="topbar-actions">
     
        <div className="topbar-user">
          <div className="text-end">
            <div className="topbar-user-name">Admin User</div>
            <small style={{ color: "#999", fontSize: "12px" }}>admin@serbicorporation.com</small>
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


