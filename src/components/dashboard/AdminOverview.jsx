"use client";

import React from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaWallet,
  FaCheckCircle,
  FaArrowRight,
  FaUsers,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const AdminOverview = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  const stats = [
    {
      id: 1,
      label: "Total Bookings",
      value: data?.stats?.totalBookings || 0,
      icon: <FaCalendarCheck />,
      color: "bg-primary",
    },
    {
      id: 2,
      label: "Pending Request",
      value: data?.stats?.pendingBookings || 0,
      icon: <FaClock />,
      color: "bg-accent",
    },
    {
      id: 3,
      label: "Total Revenue",
      value: `৳${data?.stats?.totalRevenue?.toLocaleString() || 0}`,
      icon: <FaWallet />,
      color: "bg-success",
    },
    {
      id: 4,
      label: "Completed",
      value: data?.stats?.completedBookings || 0,
      icon: <FaCheckCircle />,
      color: "bg-info",
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Admin Hero Section */}
      <div className="relative overflow-hidden bg-neutral rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-neutral/20">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-5xl font-black leading-tight">
              Admin <span className="text-primary italic">Control Panel</span>
            </h1>
            <p className="text-neutral-content/70 max-w-md text-lg">
              Manage all services, monitor revenue, and oversee user bookings from one central hub.
            </p>
            <div className="pt-2 flex gap-3 justify-center md:justify-start">
              <Link
                href="/dashboard/manage-bookings"
                className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/30 border-none"
              >
                Manage Bookings
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex gap-4">
             <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 text-center w-32">
              <span className="block text-3xl font-black text-primary">
                {data?.stats?.confirmedBookings || 0}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">
                Active
              </span>
            </div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
      </div>

      {/* 2. Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-base-100 p-6 rounded-[2rem] border border-base-200 shadow-sm hover:shadow-md transition-all group flex items-center gap-4"
          >
            <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl shadow-inner group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-neutral/40 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-neutral">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Recent Activity & Sticky Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-base-100 rounded-[2.5rem] border border-base-200 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black text-neutral">
              All Recent <span className="text-primary italic">Activity</span>
            </h2>
            <Link
              href="/dashboard/manage-bookings"
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              All Bookings <FaArrowRight className="text-xs" />
            </Link>
          </div>

          <div className="space-y-4">
            {data?.recentBookings?.length > 0 ? (
              data.recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-base-200/50 border border-transparent hover:border-primary/20 transition-all gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <Image
                        fill
                        src={booking.image}
                        className="rounded-full object-cover border border-white shadow-sm"
                        alt={booking.serviceName}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral leading-tight">
                        {booking.serviceName}
                      </h4>
                      <p className="text-xs text-neutral/50 truncate max-w-[150px] sm:max-w-none">
                        User: {booking.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-none pt-3 sm:pt-0">
                    <div className="w-24 text-center">
                      <span className={`badge badge-sm font-bold py-3 w-full uppercase ${
                        booking.status === 'confirmed' ? 'badge-success text-white' : 'badge-warning'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <span className="font-black text-primary text-lg min-w-[80px] text-right">
                      ৳{booking.totalCost}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 opacity-50">No activity found.</p>
            )}
          </div>
        </div>

        {/* Sticky Quick Actions Card */}
        <div className="sticky top-24 bg-primary/5 rounded-[2.5rem] border border-primary/10 p-8 h-auto">
          <h3 className="text-xl font-black text-neutral mb-4">
            System <span className="text-primary italic">Actions</span>
          </h3>
          <div className="space-y-3">
            <button className="btn btn-neutral w-full rounded-xl justify-start gap-3 border-none hover:bg-neutral/90">
              <FaUsers className="text-primary" /> User Management
            </button>
            <button className="btn btn-ghost bg-white w-full rounded-xl justify-start gap-3 border border-base-200 shadow-sm hover:bg-gray-50">
              📊 Generate Report
            </button>
            <button className="btn btn-ghost bg-white w-full rounded-xl justify-start gap-3 border border-base-200 shadow-sm hover:bg-gray-50">
              ⚙️ System Settings
            </button>
          </div>
          <div className="mt-8 p-4 bg-white/50 rounded-2xl border border-dashed border-primary/20">
             <p className="text-[10px] uppercase font-bold text-primary tracking-widest mb-1">Admin Note</p>
             <p className="text-xs text-neutral/60 italic">Review pending requests daily to maintain service quality.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;