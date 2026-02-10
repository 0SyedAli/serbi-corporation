"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useAdminAuthRedirect({ protectedRoute = false } = {}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedAdmin = localStorage.getItem("admin");
    const admin = storedAdmin ? JSON.parse(storedAdmin) : null;

    const isValidAdmin = admin && admin._id;

    // 🔐 Protected routes (admin dashboard etc.)
    if (protectedRoute) {
      if (!isValidAdmin) {
        router.replace("/auth/login");
      }
      return;
    }

    // 🔓 Auth routes (login / signup)
    if (isValidAdmin) {
      router.replace("/admin/dashboard");
    }
  }, [router, pathname, protectedRoute]);
}
