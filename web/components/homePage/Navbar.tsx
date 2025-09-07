"use client";
import React from "react";
import { Logo } from "../Logo";
import { navBarItems } from "@/constants/layoutContant";
import Link from "next/link";
import { Button } from "antd";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isUserLogedIn, setIsUserLogedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token.length > 0) setIsUserLogedIn(true);
  }, []);
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && openMenu) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openMenu]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (openMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openMenu]);

  return (
    <>
      <div
        className={`flex h-20 items-center justify-between px-6 lg:px-8  top-0 z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-black/5"
            : "bg-secondary"
        }`}
      >
        {/* Logo with hover effect */}
        <div className="transform transition-transform duration-200 hover:scale-105">
          <Logo />
        </div>

        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="gap-8 hidden md:flex">
            {navBarItems.map((elem, index) => (
              <Link
                className="relative text-black/80 hover:text-primary font-medium text-sm tracking-wide transition-all duration-300 group"
                key={index}
                href={elem.link}
              >
                {elem.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="gap-4 hidden md:flex">
            {!isUserLogedIn ? (
              <>
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="text-primary font-semibold border-2 border-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 px-6 py-2 h-auto rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/signup")}
                  className="bg-primary font-semibold text-white border-2 border-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto rounded-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/matches")}
                  className="bg-primary font-semibold text-white border-2 border-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto rounded-lg transform hover:-translate-y-0.5"
                >
                  Go To Matches
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div
            onClick={() => setOpenMenu((prev) => !prev)}
            className="md:hidden cursor-pointer p-3 rounded-lg hover:bg-black/5 transition-colors duration-200 group"
          >
            <div className="transform transition-transform duration-300 group-hover:scale-110">
              {openMenu ? (
                <X
                  size={24}
                  className="text-black transition-colors duration-200"
                />
              ) : (
                <Menu
                  size={24}
                  className="text-black transition-colors duration-200"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 md:hidden ${
          openMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpenMenu(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out md:hidden ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button Header */}
          <div className="flex justify-between items-center p-6 border-b border-black/10">
            <div className="text-lg font-semibold text-black">Menu</div>
            <button
              onClick={() => setOpenMenu(false)}
              className="p-2 rounded-lg hover:bg-black/5 transition-colors duration-200 group"
            >
              <X
                size={24}
                className="text-black/70 group-hover:text-black transition-colors duration-200"
              />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col mt-8 px-6">
            {navBarItems.map((elem, index) => (
              <Link
                className="relative text-black/80 hover:text-primary font-medium text-lg py-4 px-4 rounded-lg hover:bg-primary/5 transition-all duration-300 group border-b border-transparent hover:border-primary/20"
                key={index}
                href={elem.link}
                onClick={() => setOpenMenu(false)}
              >
                <span className="relative z-10">{elem.name}</span>
                <div className="absolute left-0 top-0 h-full w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r"></div>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex flex-col mt-auto mb-8 px-6 space-y-4">
            {!isUserLogedIn ? (
              <>
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="text-primary font-semibold border-2 border-primary bg-transparent hover:bg-primary hover:text-white transition-all duration-300 px-6 py-2 h-auto rounded-lg shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/auth/signup")}
                  className="bg-primary font-semibold text-white border-2 border-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto rounded-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/matches")}
                  className="bg-primary font-semibold text-white border-2 border-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 px-6 py-2 h-auto rounded-lg transform hover:-translate-y-0.5"
                >
                  Go To Matches
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
