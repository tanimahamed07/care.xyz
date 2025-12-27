"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

const Navbar = () => {
  const pathname = usePathname();

  const user = {
    email: "user@email.com",
    photoURL: "https://i.pravatar.cc/40",
  };

  const logout = () => {};

  const linkClass = (path) =>
    `relative px-1 transition-all ${
      pathname === path
        ? "text-primary font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary"
        : "text-neutral hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-base-200">
      <Container>
        <div className="navbar  mx-auto">
          {/* Logo */}
          <div className="flex-1">
            <Link href="/" className="text-2xl font-bold text-primary">
              Care<span className="text-accent">.xyz</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
            <Link href="/booking" className={linkClass("/booking")}>
              My Bookings
            </Link>

            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Image
                    width={36}
                    height={36}
                    src={user.photoURL}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border"
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52 space-y-2"
                >
                  <li className="text-sm text-neutral/70 px-2">{user.email}</li>
                  <li>
                    <button
                      onClick={logout}
                      className="btn btn-sm btn-outline btn-primary w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="btn btn-sm btn-primary">
                  Login
                </Link>
                <Link href="/register" className="btn btn-sm btn-outline">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-xl">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-56 space-y-2"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/booking">My Bookings</Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={logout}
                    className="btn btn-sm btn-outline btn-primary mt-2"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
