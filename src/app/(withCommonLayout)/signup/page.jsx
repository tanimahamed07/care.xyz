"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaPhone,
  FaGoogle,
} from "react-icons/fa";
import Container from "@/components/common/Container";
import { signup } from "@/services/users.service";
import Google from "next-auth/providers/google";
import GoogleButton from "@/components/auth/GoogleButton";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    const form = e.target;
    const fullName = form.fullName.value;
    const nidNumber = form.nidNumber.value;
    const email = form.email.value;
    const contact = form.contact.value;
    const password = form.password.value;

    // --- Simple Password Validation ---
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!isLongEnough) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!hasUpperCase) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!hasLowerCase) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    const formData = {
      fullName,
      nidNumber,
      email,
      contact,
      password,
      role: "user",
    };
    const res = await signup(formData);
    if (res?.status !== 201) {
      setError("Failed to register user");
    }
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center py-12">
      <Container>
        <div className="max-w-5xl mx-auto bg-base-200 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-base-300">
          {/* Left Side: Illustration & Text */}
          <div className="md:w-5/12 bg-primary p-12 text-primary-content flex flex-col justify-center">
            <h2 className="text-4xl font-black mb-6 leading-tight">
              Join Our <br /> <span className="text-accent italic">Care</span>{" "}
              Community
            </h2>
            <p className="text-primary-content/80 text-lg mb-8">
              Start your journey with us and get access to the best caregivers
              in the country.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <span>Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="md:w-7/12 p-8 md:p-12 bg-base-100">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-neutral">
                Create Account
              </h3>
              <p className="text-neutral/60">
                Fill in the details to get started
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Error Alert Box */}
              {error && (
                <div className="alert alert-error shadow-sm rounded-xl py-2 text-sm font-medium mb-4">
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label text-xs font-bold uppercase text-neutral/50">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                      <FaUser />
                    </span>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-bold uppercase text-neutral/50">
                    NID Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                      <FaIdCard />
                    </span>
                    <input
                      name="nidNumber"
                      type="text"
                      placeholder="1234567890"
                      className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-neutral/50">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="email@care.xyz"
                    className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-neutral/50">
                  Contact Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-primary">
                    <FaPhone />
                  </span>
                  <input
                    name="contact"
                    type="text"
                    placeholder="+880 1XXX-XXXXXX"
                    className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl"
                    required
                  />
                </div>
              </div>

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
                    className="input input-bordered w-full pl-10 bg-base-200 focus:border-primary border-transparent rounded-xl"
                    required
                  />
                </div>
                <label className="label">
                  <span
                    className={`label-text-alt italic ${
                      error ? "text-error font-bold" : "text-neutral/40"
                    }`}
                  >
                    Min 6 chars, 1 uppercase, 1 lowercase
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg h-14 shadow-primary/20"
              >
                Register Now
              </button>
            </form>

            <div className="divider text-neutral/30 my-6 text-sm uppercase">
              Or Continue with
            </div>

            <GoogleButton />

            <p className="mt-8 text-center text-neutral/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RegisterPage;
