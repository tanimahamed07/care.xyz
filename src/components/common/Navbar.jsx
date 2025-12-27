"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const pathname = usePathname();
  //   const { user, logout } = useAuth();
  const logout = () => {};
  const user = true;

  const navLinks = (
    <>
      <Link
        href="/"
        className={pathname === "/" ? "text-primary font-semibold" : ""}
      >
        Home
      </Link>

      <Link
        href="/my-bookings"
        className={
          pathname === "/my-bookings" ? "text-primary font-semibold" : ""
        }
      >
        My Bookings
      </Link>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-6">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="text-xl font-bold text-primary">
          Care<span className="text-accent">.xyz</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">
        {navLinks}

        {user ? (
          <>
            <span className="text-sm text-neutral/70">{user.email}</span>
            <button
              onClick={logout}
              className="btn btn-sm btn-outline btn-primary"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-sm btn-primary">
              Login
            </Link>
            <Link href="/register" className="btn btn-sm btn-outline">
              Register
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost">
          ☰
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-52 space-y-2"
        >
          {navLinks}
          {user ? (
            <button onClick={logout} className="btn btn-sm btn-outline">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
