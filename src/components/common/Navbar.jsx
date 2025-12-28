"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import NavLink from "../home/NavLink";

const Navbar = () => {
  const pathname = usePathname();

  const user = {
    email: "user@email.com",
    photoURL: "https://i.pravatar.cc/40",
  };

  const logout = () => {
    console.log("Logout clicked");
  };

  // Modern link logic with subtle animation
  const linkClass = (path) =>
    `relative py-2 text-sm font-medium transition-all duration-300 ${
      pathname === path
        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
        : "text-base-content/70 hover:text-primary"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-base-100/70 backdrop-blur-md border-b border-base-200">
      <Container>
        <div className="navbar px-0 h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-1">
            <Link href="/" className="group flex items-center gap-1">
              <span className="text-2xl font-black tracking-tighter text-primary group-hover:opacity-80 transition">
                Care<span className="text-accent">.xyz</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <NavLink href="/" className={linkClass("/")}>
                Home
              </NavLink>
              <NavLink href="/services" className={linkClass("/services")}>
                Services
              </NavLink>
              <NavLink href="/booking" className={linkClass("/booking")}>
                My Bookings
              </NavLink>
            </nav>

            <div className="h-6 w-[1px] bg-base-300 mx-2"></div>

            {user ? (
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border-2 border-transparent hover:border-primary/30 transition-all p-0.5"
                >
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Image
                      width={40}
                      height={40}
                      src={user.photoURL}
                      alt="profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content mt-4 p-2 shadow-2xl bg-base-100 rounded-2xl w-64 border border-base-200"
                >
                  <div className="px-4 py-3 border-b border-base-100 mb-2">
                    <p className="text-xs font-semibold text-base-content/50 uppercase tracking-wider">Account</p>
                    <p className="text-sm font-medium truncate">{user.email}</p>
                  </div>
                  <li>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-primary/5 hover:text-primary transition font-medium"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="p-2">
                    <button
                      onClick={logout}
                      className="btn btn-primary btn-outline btn-sm w-full rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="btn btn-ghost btn-sm font-bold">
                  Login
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm px-6 rounded-full shadow-lg shadow-primary/20">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-md dropdown-content mt-4 p-4 shadow-2xl bg-base-100 rounded-2xl w-72 border border-base-200 z-[1]"
              >
                <li className="menu-title text-primary">Menu</li>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/booking">My Bookings</Link></li>
                
                <div className="divider my-2"></div>
                
                {user ? (
                  <>
                    <li><Link href="/dashboard" className="font-bold">Dashboard</Link></li>
                    <li>
                      <button onClick={logout} className="btn btn-primary btn-sm text-white mt-2">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
                    <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;