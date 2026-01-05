"use client";

import React from "react";
import { useSession } from "next-auth/react";
import {
  FaCalendarCheck,
  FaClock,
  FaWallet,
  FaHandHoldingHeart,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

const UserOverview = () => {

  const stats = [
    {
      id: 1,
      label: "Total Bookings",
      value: "12",
      icon: <FaCalendarCheck />,
      color: "bg-primary",
    },
    {
      id: 2,
      label: "Pending Care",
      value: "02",
      icon: <FaClock />,
      color: "bg-accent",
    },
    {
      id: 3,
      label: "Total Spent",
      value: "৳8,450",
      icon: <FaWallet />,
      color: "bg-success",
    },
    {
      id: 4,
      label: "Active Services",
      value: "01",
      icon: <FaHandHoldingHeart />,
      color: "bg-info",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Welcome Hero Section */}
      <div className="relative overflow-hidden bg-neutral rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-neutral/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              Hello,{" "}
              <span className="text-primary italic">
                {session?.user?.name || "User"}!
              </span>
            </h1>
            <p className="text-neutral-content/70 max-w-md text-lg">
              Your loved ones are in safe hands. Check your upcoming schedules
              and care progress here.
            </p>
            <div className="pt-2">
              <Link
                href="/services"
                className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/30 border-none"
              >
                Book New Service
              </Link>
            </div>
          </div>

          {/* Decorative Stats inside Hero */}
          <div className="hidden lg:flex gap-4">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center w-32">
              <span className="block text-3xl font-black text-primary">05</span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                Reviews
              </span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center w-32 mt-8">
              <span className="block text-3xl font-black text-accent">4.9</span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                Avg Rating
              </span>
            </div>
          </div>
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-base-100 p-6 rounded-[2rem] border border-base-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-inner group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-neutral/40 uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-black text-neutral">
                  {stat.value}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Content: Recent Bookings & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings List */}
        <div className="lg:col-span-2 bg-base-100 rounded-[2.5rem] border border-base-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-neutral">
              Recent <span className="text-primary italic">Bookings</span>
            </h2>
            <Link
              href="/dashboard/my-bookings"
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              View All <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="space-y-4">
            {/* Single Booking Item */}
            {[1, 2].map((item) => (
              <div
                key={item}
                className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-base-200/50 border border-transparent hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <FaHandHoldingHeart className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral">
                      Early Childhood Care
                    </h4>
                    <p className="text-xs text-neutral/50">
                      Scheduled for: 24 Dec, 2025
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="badge badge-warning badge-sm font-bold p-3">
                    PENDING
                  </span>
                  <span className="font-black text-primary">৳882</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips / Support Card */}
        <div className="bg-accent/5 rounded-[2.5rem] border border-accent/10 p-8">
          <h3 className="text-xl font-black text-neutral mb-4">
            Quick <span className="text-accent italic">Support</span>
          </h3>
          <p className="text-sm text-neutral/60 mb-6">
            Need help with your booking or have questions about a caregiver?
          </p>

          <div className="space-y-3">
            <button className="btn btn-outline btn-accent w-full rounded-xl justify-start gap-3 lowercase">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping"></span>
              Live Chat Support
            </button>
            <button className="btn btn-ghost bg-white w-full rounded-xl justify-start gap-3 border border-base-200 shadow-sm">
              📜 Emergency Guidelines
            </button>
            <button className="btn btn-ghost bg-white w-full rounded-xl justify-start gap-3 border border-base-200 shadow-sm">
              📞 Call Helpline
            </button>
          </div>

          <div className="mt-8 p-4 bg-white rounded-2xl border border-accent/20">
            <p className="text-[10px] uppercase font-black text-accent tracking-tighter mb-1">
              Safety Note
            </p>
            <p className="text-xs text-neutral/70 italic">
              "Always verify the NID of the caregiver upon arrival."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
