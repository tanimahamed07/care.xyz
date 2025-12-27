"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative px-1 py-1 transition-colors duration-300
        ${isActive
          ? "text-primary font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-primary after:rounded-full"
          : "text-neutral hover:text-primary"}
      `}
    >
      {children}
    </Link>
  );
};

export default NavLink;
