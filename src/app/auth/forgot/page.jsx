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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/forgetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();

      // ✅ HANDLE API-LEVEL FAILURE
      if (!data.success) {
        throw new Error(data.msg || "No account found");
      }

      if (data?.data) {
        localStorage.setItem("admin", JSON.stringify(data?.data));
      }
      // ✅ SUCCESS FLOW ONLY
      showSuccessToast(
        data?.msg || "OTP sent to your email address successfully"
      );

      router.push("/auth/otp");

    } catch (error) {
      showErrorToast(error.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-content">
      <h1 className="auth-title">Forgot password?</h1>
      <p className="auth-subtitle">
        Enter your email address to reset your password
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

        <button
          type="submit"
          className="btn auth-primary-btn w-100 mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading" : "Forgot"}
        </button>
      </form>

      <p className="auth-switch mt-4 mb-0 text-center">
        Back to {" "}
        <Link href="/auth/login" className="auth-link">
          Login
        </Link>
      </p>
    </div>
  );
}
