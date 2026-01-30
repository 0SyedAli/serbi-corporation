"use client";

import AuthRedirectHandler from "@/lib/AuthRedirectHandler";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <>
      {/* <AuthRedirectHandler /> */}

      <div className="auth-body">
        <div className="auth-wrapper">
          <div className="auth-card shadow-sm">
            <div className="auth-brand ">
              <div className="sidebar-logo">
                <Image src="/images/logo.png" width={100} height={50} className="img-fluid" alt="" />
              </div>
              <span className="auth-tagline">Serbi Corporation</span>
            </div>
            {children}
            {/* <div className="auth-footer text-center mt-4">
            <small className="text-muted">
              © {new Date().getFullYear()} SOS • Terms of Use • Privacy Policy
            </small>
          </div> */}
          </div>
          <div className="auth-illustration d-none d-lg-flex">
            <div className="auth-hero-panel">
              <div className="auth-hero-image" />
              <div className="auth-hero-footer">
                <div className="sidebar-logo mb-2">
                  <Image src="/images/logo-white.png" width={100} height={50} className="img-fluid" alt="" />
                </div>
                <div className="auth-hero-text">
                  <h3>Serbi Experts at Your Doorstep!</h3>
                  <p>
                    Lorem ipsum simply dummy text is for using pricing or
                    printing. Solor sit amet lorem ipsum sit simply dummy text
                    is for using printing or pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


