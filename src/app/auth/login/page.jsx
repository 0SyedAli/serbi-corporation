"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    // TODO: wire up real auth API later
    // For now we just log so the UI is fully client-side.
    console.log("login", values);
  };
  const router = useRouter();

  return (
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
            {...register("email")}
          />
        </div>

        <div className="mb-3">
          <label className="auth-label">Password</label>
          <input
            type="password"
            className="form-control auth-input"
            placeholder="Enter password"
            {...register("password")}
          />
        </div>

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
          <button
            type="button"
            className="btn btn-link p-0 auth-link small text-decoration-none"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="btn auth-primary-btn w-100"
          disabled={isSubmitting}
          onClick={() => router.push("/admin/dashboard")}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
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


