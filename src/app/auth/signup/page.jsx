"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthInput from "@/components/form/AuthInput";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useAdminAuthRedirect } from "@/lib/AuthRedirectHandler";

export default function AdminSignupPage() {
  useAdminAuthRedirect(); // default: auth page logic

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg || "Admin signup failed");
      }

      if (data?.data) {
        localStorage.setItem("admin", JSON.stringify(data?.data));
      }
      showSuccessToast(data?.msg || "Super Admin registered successfully!");
      // ✅ success → redirect to admin dashboard or login
      router.push("/admin/dashboard/users");
    } catch (error) {
      showErrorToast(
        error?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-content">
      <h1 className="auth-title">Admin Sign up</h1>
      <p className="auth-subtitle">
        Create your admin account
      </p>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

        {/* EMAIL */}
        <AuthInput
          label="Email"
          type="email"
          placeholder="Enter admin email"
          name="email"
          register={register}
          error={errors.email?.message}
        />

        {/* PASSWORD */}
        <AuthInput
          label="Password"
          type="password"
          placeholder="Create password"
          name="password"
          register={register}
          error={errors.password?.message}
        />

        <button
          type="submit"
          className="btn auth-primary-btn w-100 mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating admin..." : "Create Admin"}
        </button>
      </form>

      <p className="auth-switch mt-4 mb-0 text-center">
        Already have an admin account?{" "}
        <Link href="/auth/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
