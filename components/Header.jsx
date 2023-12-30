"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggler from "./ThemeToggler";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";

const Header = () => {
  const [header, setHeader] = useState(false);

  const pathname = usePathname();
  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 50 ? setHeader(true) : setHeader(false);
    });
    return () => window.removeEventListener("scroll", scrollYPos);
  });
  return (
    <header
      className={`${
        header
          ? "py-4 bg-white shadow-lg dark:bg-accent"
          : "py-4 dark:bg-transparent"
      } sticky top-0 z-30 transition-all ${pathname  && "bg-white"}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src="/To-Dologo.svg" className=" dark:hidden" width={150} height={150} priority alt="" />
            <Image src="/To-Dologodark.svg" className=" hidden dark:flex" width={150} height={150} priority alt="" />
            {/* <h1 className="">Todo APP</h1> */}
          </Link>
          <div className="flex items-center gap-x-6 ">
            <Nav
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative hover:text-primary transition-all"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <ThemeToggler />

            <div className="xl:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
