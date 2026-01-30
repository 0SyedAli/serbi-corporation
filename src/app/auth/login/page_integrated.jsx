"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import AuthRedirectHandler from "@/lib/AuthRedirectHandler";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      // ✅ EXACT API BODY (NO EXTRA FIELDS)
      const payload = {
        email: values.email,
        password: values.password,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/loginSuperAdmin`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data;

      // ❌ No assumptions
      if (!result || result.success !== true) {
        throw new Error(result?.message || "Login failed");
      }

      // ✅ Store in localStorage ONLY if exists
      if (typeof window !== "undefined") {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        if (result.data) {
          localStorage.setItem("user", JSON.stringify(result.data));
        }
      }

      showSuccessToast(result?.message || "Login successful");

      // 🚫 NO redirect here (as requested)
      router.push("/super-admin/dashboard");

      // Redirect logic will be handled separately

    } catch (err) {
      showErrorToast(
        err?.response?.data?.message ||
        err?.message ||
        "Login error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-content">
        <h1 className="auth-title">Sign in</h1>
        <p className="auth-subtitle">Enter your account details to login</p>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="form-control auth-input"
              placeholder="name@school.edu"
              {...register("email", { required: true })}
            />
          </div>

          <div className="mb-3">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Enter password"
              {...register("password", { required: true })}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />
              <label className="form-check-label small" htmlFor="remember">
                Remember Me
              </label>
            </div>
            {/* <button
              type="button"
              className="btn btn-link p-0 auth-link small text-decoration-none"
            >
              Forgot password?
            </button> */}
          </div>

          <button
            type="submit"
            className="btn auth-primary-btn w-100"
            onClick={()=> router.push("/admin/dashboard")}
            disabled={loading || isSubmitting}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-switch mt-4 mb-0 text-center">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </>
  );
}
