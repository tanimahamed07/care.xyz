"use client";

import React, { use } from "react";
import Link from "next/link";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import Container from "@/components/common/Container";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import GoogleButton from "@/components/auth/GoogleButton";
import { signup } from "@/services/users.service";

const LoginPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callBack = params.get("callback") || "/";
  console.log("=========>", params);

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!result?.error) {
      router.push(callBack);
    } else {
      Swal.fire("Error", "Invalid credentials", "error");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center py-12">
      <Container>
        <div className="max-w-5xl mx-auto bg-base-200 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-base-300">
          {/* Left Side: Information & Branding (Matching Register Page) */}
          <div className="md:w-5/12 bg-primary p-12 text-primary-content flex flex-col justify-center relative overflow-hidden">
            {/* Decorative element to match the style */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl"></div>

            <h2 className="text-4xl font-black mb-6 leading-tight relative z-10">
              Welcome <br /> Back to{" "}
              <span className="text-accent italic">Care</span>
            </h2>
            <p className="text-primary-content/80 text-lg mb-8 relative z-10">
              Log in to manage your bookings and find the best caregivers for
              your loved ones.
            </p>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  ✓
                </div>
                <span>Easy Service Management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
                  ✓
                </div>
                <span>24/7 Support Access</span>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-7/12 p-8 md:p-12 bg-base-100">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral">Login Account</h3>
              <p className="text-neutral/60">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Address */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-neutral/50">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                    <FaEnvelope />
                  </span>
                  <input
                    name="email"
                    type="email"
                    placeholder="email@care.xyz"
                    className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl h-14 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-neutral/50">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                    <FaLock />
                  </span>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl h-14 transition-all"
                    required
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <a
                    href="#"
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/20 h-14">
                Sign In
              </button>
            </form>

            <div className="divider text-neutral/30 my-8 text-sm uppercase">
              Or Continue with
            </div>

            <GoogleButton />

            <p className="mt-10 text-center text-neutral/60">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-primary font-bold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
