"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ allowedRole, children }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const userRaw = localStorage.getItem("user");
    if (!userRaw) {
      router.replace("/auth/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(userRaw);
    } catch {
      router.replace("/auth/login");
      return;
    }

    if (!user?.token || !user?.role) {
      router.replace("/auth/login");
      return;
    }

    // 🔐 NORMALIZE ROLE
    const userRole = user.role.toLowerCase();
    const allowed = allowedRole?.toLowerCase();

    // ❌ Role mismatch
    if (allowed && userRole !== allowed) {
      router.replace("/auth/login");
      return;
    }
  }, [allowedRole, router]);

  return children;
}
