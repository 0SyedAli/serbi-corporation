"use client";
import Image from "next/image";

export default function StudentTopbar() {
  return (
    <div className="topbar">
      <div className="topbar-search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="topbar-actions">
        <div className="topbar-icon">
          <Image
            src="/images/mes-icon.png"
            width={20}
            height={20}
            alt="Messages"
          />
        </div>
        <div className="topbar-icon">
          <Image
            src="/images/noti-icon.png"
            width={20}
            height={20}
            alt="Notifications"
          />
        </div>
        <div className="topbar-user">
          <div className="text-end">
            <div className="topbar-user-name">Mia Williams</div>
            <small style={{ color: "#999", fontSize: "12px" }}>Teacher</small>
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


