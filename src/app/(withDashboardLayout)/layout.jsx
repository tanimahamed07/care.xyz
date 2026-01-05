"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  FaHome,
  FaCalendarCheck,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaBell,
  FaUsers,
  FaPlusSquare,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import Image from "next/image";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session?.user?.role);

  const isAdmin = session?.user?.role === "admin";
  console.log(isAdmin);

  const userMenuItems = [
    {
      name: "Overview",
      icon: <FaHome className="text-2xl" />,
      path: "/dashboard",
    },
    {
      name: "My Bookings",
      icon: <FaCalendarCheck className="text-2xl" />,
      path: "/dashboard/my-bookings",
    },
    {
      name: "Profile",
      icon: <FaUserCircle className="text-2xl" />,
      path: "/dashboard/profile",
    },
  ];

  const adminMenuItems = [
    {
      name: "Admin Overview",
      icon: <FaHome className="text-2xl" />,
      path: "/dashboard",
    },
    {
      name: "Manage Bookings",
      icon: <FaTasks className="text-2xl" />,
      path: "/dashboard/manage-bookings",
    },
    {
      name: "Manage Users",
      icon: <FaUsers className="text-2xl" />,
      path: "/dashboard/manage-users",
    },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Header Section */}
        <header className="sticky top-0 z-30 w-full bg-base-100/70 backdrop-blur-md border-b border-base-200 px-6 py-5">
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <div className="lg:hidden">
                <label
                  htmlFor="dashboard-drawer"
                  className="btn btn-ghost btn-circle text-primary"
                >
                  <FaBars className="text-2xl" />
                </label>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-xl font-bold text-neutral">
                  Welcome back,{" "}
                  <span className="text-primary italic">
                    {session?.user?.name?.split(" ")[0] || "User"}!
                  </span>
                  {isAdmin && (
                    <span className="ml-2 badge badge-primary badge-sm font-bold uppercase">
                      Admin
                    </span>
                  )}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="btn btn-ghost btn-circle relative">
                <FaBell className="text-xl text-neutral/70" />
                <span className="absolute top-2 right-2 badge badge-xs badge-accent animate-pulse"></span>
              </button>
              <div className="h-6 w-[1px] bg-base-300 mx-1"></div>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-primary/30 transition-all p-0.5"
                >
                  <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden bg-base-200">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="profile"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser className="w-6 h-6 text-base-content/60" />
                      </div>
                    )}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-4 p-2 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200 z-[1]"
                >
                  <div className="px-4 py-3 border-b border-base-100 mb-2">
                    <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">
                      Account ({isAdmin ? "Admin" : "User"})
                    </p>
                    <p className="text-sm font-medium truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                  <li>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition font-medium"
                    >
                      Profile Settings
                    </Link>
                  </li>
                  <li className="p-2">
                    <button
                      onClick={() => signOut()}
                      className="btn btn-primary btn-outline btn-sm w-full rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-base-50/30">
          <div className="max-w-7xl mx-auto p-6 md:p-8">{children}</div>
        </main>
      </div>

      {/* Sidebar Section */}
      <div className="drawer-side z-40">
        <label
          htmlFor="dashboard-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <aside className="w-80 bg-base-100 min-h-full border-r border-base-200 flex flex-col">
          <div className="p-8 border-b border-base-100">
            <Link href="/" className="group flex items-center gap-1">
              <span className="text-3xl font-black tracking-tighter text-primary">
                Care<span className="text-accent">.xyz</span>
              </span>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isAdmin ? "bg-accent" : "bg-success"
                }`}
              ></span>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral/40">
                {isAdmin ? "Admin Control Panel" : "Dashboard Panel"}
              </p>
            </div>
          </div>

          <nav className="flex-1 p-4 mt-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-semibold transition-all duration-200 group ${
                        isActive
                          ? "bg-primary text-primary-content shadow-lg shadow-primary/20"
                          : "text-base-content/70 hover:bg-base-200 hover:text-primary"
                      }`}
                    >
                      <span
                        className={`${
                          isActive
                            ? "text-white"
                            : "text-primary/70 group-hover:text-primary"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 border-t border-base-200">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-error/5 text-error font-bold rounded-xl hover:bg-error hover:text-white transition-all duration-300"
            >
              <FaSignOutAlt />
              Logout Account
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
