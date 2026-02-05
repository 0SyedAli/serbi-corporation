"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthInput from "@/components/form/AuthInput";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export default function AdminResetPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // 🔹 Get admin email from localStorage
  const admin =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("admin") || "{}")
      : {};

  const email = admin?.email;
  const adminId = admin?._id;
  const newPassword = watch("newPassword");

  const onSubmit = async (values) => {
    if (!adminId) {
      showErrorToast("Session expired. Please restart forgot password flow.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId,
            newPassword: values.newPassword,
          }),
        }
      );

      const data = await res.json();

      // ✅ API-level failure handling
      if (!data.success) {
        throw new Error(data.msg || "Password reset failed");
      }

      showSuccessToast(data.msg || "Password reset successfully");

      // ✅ Clear temp admin session
      localStorage.removeItem("admin");

      // ✅ Redirect to login
      router.push("/auth/login");

    } catch (error) {
      showErrorToast(error.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-content">
      <h1 className="auth-title">Reset Password</h1>
      <p className="auth-subtitle">
        Create a new password for <b>{email}</b>
      </p>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* NEW PASSWORD */}
        <AuthInput
          label="New Password"
          type="password"
          placeholder="Enter new password"
          name="newPassword"
          register={register}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={errors.newPassword?.message}
        />

        {/* CONFIRM PASSWORD */}
        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          name="confirmPassword"
          register={register}
          rules={{
            required: "Confirm your password",
            validate: (value) =>
              value === newPassword || "Passwords do not match",
          }}
          error={errors.confirmPassword?.message}
        />

        <button
          type="submit"
          className="btn auth-primary-btn w-100 mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <p className="auth-switch mt-4 mb-0 text-center">
        Remember your password?{" "}
        <Link href="/auth/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
