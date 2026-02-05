"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OtpInput from "react-otp-input";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import Link from "next/link";

export default function Otp() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔹 Get admin email from localhost
  const admin =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("admin") || "{}")
      : {};

  const email = admin?.email;
  const adminId = admin?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminId) {
      showErrorToast("Admin email not found. Please retry forgot password.");
      return;
    }

    if (code.length !== 4) {
      showErrorToast("Please enter valid 4-digit OTP");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/verifyOTP`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adminId,
            Otp: Number(code),
          }),
        }
      );

      const data = await res.json();

      // ✅ API-level failure check
      if (!data.success) {
        throw new Error(data.msg || "Invalid OTP");
      }

      showSuccessToast(data.msg || "OTP verified successfully");

      // ✅ Redirect to reset password page
      router.push("/auth/reset");

    } catch (error) {
      showErrorToast(error.message || "OTP verification failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-content">
      <h1 className="auth-title">Verify OTP</h1>
      <p className="auth-subtitle">
        Enter the 4-digit code sent to <b>{email}</b>
      </p>

      <form className="auth_otp" onSubmit={handleSubmit}>
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={4}
          isInputNum
          shouldAutoFocus
          separator={<span style={{ width: "8px" }} />}
          renderInput={(props) => (
            <input
              {...props}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                  e.preventDefault();
                }
              }}
            />
          )}
          inputStyle={{
            border: "1px solid #F7C845",
            borderRadius: "8px",
            width: "64px",
            height: "64px",
            fontSize: "25px",
            color: "#000000bd",
            fontWeight: "400",
            caretColor: "#ccc",
          }}
          focusStyle={{
            border: "1px solid #CFD3DB",
            outline: "none",
          }}
        />

        <button
          type="submit"
          className="btn auth-primary-btn w-100 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>

        <p className="auth-switch mt-4 mb-0 text-center">
          Code didn’t receive?{" "}
          <Link href="/auth/forgot" className="auth-link">
            Resend Code
          </Link>
        </p>
      </form>
    </div>
  );
}
