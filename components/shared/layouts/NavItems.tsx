"use client";

import { headerLinks } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const isAuthenticated = isSignedIn;

  const filteredLinks = headerLinks.filter((link) => {
    if (link.isAuth === undefined) return true;
    if (link.isAuth === false) return true; // Always show links with isAuth === false
    return link.isAuth === isAuthenticated;
  });

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-5 md:flex-row">
      {filteredLinks.map((link) => (
        <li
          key={link.label}
          className={`${
            pathname === link.route
              ? "text-white font-bold"
              : "text-white opacity-70 font-medium"
          } flex-center whitespace-nowrap hover:text-white hover:font-bold transition`}
        >
          <Link href={link.route}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
