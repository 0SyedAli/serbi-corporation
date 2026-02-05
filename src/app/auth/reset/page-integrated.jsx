"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      // ✅ API body mapping (IMPORTANT)
      const payload = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phone,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/registerSuperAdmin`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = res.data;

      if (!result?.success) {
        throw new Error(result?.message || "Signup failed");
      }

      showSuccessToast("Super Admin registered successfully!");

      // ✅ Redirect after success
      router.push("/auth/login");

    } catch (err) {
      showErrorToast(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-content">
      <h1 className="auth-title">Super Admin Sign up</h1>
      <p className="auth-subtitle">
        Create your Super Admin account
      </p>

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="auth-label">Full Name</label>
          <input
            className="form-control auth-input"
            placeholder="Enter full name"
            {...register("fullName", { required: true })}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="auth-label">Email</label>
          <input
            type="email"
            className="form-control auth-input"
            placeholder="Enter email"
            {...register("email", { required: true })}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="auth-label">Password</label>
          <input
            type="password"
            className="form-control auth-input"
            placeholder="Create password"
            {...register("password", { required: true })}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="auth-label">Phone Number</label>
          <input
            className="form-control auth-input"
            placeholder="Phone number"
            {...register("phone", { required: true })}
          />
        </div>

        <button
          type="submit"
          className="btn auth-primary-btn w-100"
          disabled={loading || isSubmitting}
        >
          {loading ? "Creating account..." : "Get Started"}
        </button>
      </form>

      <p className="auth-switch mt-4 mb-0 text-center">
        Already have an account?{" "}
        <Link href="/auth/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
}
