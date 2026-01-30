"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthRedirectHandler() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isPublicRoute =
            pathname.startsWith("/auth/login") ||
            pathname.startsWith("/auth/signup");

        if (!isPublicRoute) return;

        if (typeof window === "undefined") return;

        const userRaw = localStorage.getItem("user");
        if (!userRaw) return;

        let user;
        try {
            user = JSON.parse(userRaw);
        } catch {
            return;
        }

        if (!user?.token || !user?.role) return;

        if (!user?.token || !user?.role) return;

        const role = user.role.toLowerCase();

        console.log("Redirecting role:", role);

        switch (role) {
            case "superadmin":
                console.log("Matched superAdmin");
                router.replace("/super-admin/dashboard");
                break;

            case "admin":
                router.replace("/admin/dashboard");
                break;

            case "parent":
                router.replace("/parent/dashboard");
                break;

            case "teacher":
                router.replace("/teacher/dashboard");
                break;

            case "student":
                router.replace("/student/dashboard");
                break;
        }
    }, [pathname, router]);

    return null;
}
