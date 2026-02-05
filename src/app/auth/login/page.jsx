"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthInput from "@/components/form/AuthInput";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export default function AdminLoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg || "Admin login failed");
      }

      if (data?.data) {
        localStorage.setItem("admin", JSON.stringify(data?.data));
      }
      showSuccessToast(data?.msg || "Super Admin registered successfully!");
      // ✅ success → redirect to admin dashboard or login
      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error)
      showErrorToast(
        error?.message ||
        "Something went wrong"
      );
    }
  };
  return (
    <div className="auth-content">
      <h1 className="auth-title">Sign in</h1>
      <p className="auth-subtitle">
        Enter your account details to login
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember"
              {...register("remember")}
            />
            <label className="form-check-label small" htmlFor="remember">
              Remember Me
            </label>
          </div>
          <Link href="/auth/forgot" className="btn btn-link p-0 auth-link small text-decoration-none">
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="btn auth-primary-btn w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating admin..." : "Login"}
        </button>
      </form>

      <p className="auth-switch mt-4 mb-0 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" className="auth-link">
          Create one
        </Link>
      </p>
    </div>
  );
}
