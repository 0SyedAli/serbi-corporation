"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useAdminAuthRedirect({ protectedRoute = false } = {}) {
  // Handled by Next.js Middleware now to prevent flashing
  return;
}
