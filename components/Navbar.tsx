"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../public/noBack.png";
import Image from "next/image";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(window.location.href.endsWith("/"));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (window.location.href.endsWith("/")) {
      const home = document.getElementById("home");
      const handleScroll = () => {
        if (!home) return;
        // if we've scrolled past the bottom of the home
        setIsAtTop(window.scrollY < home.offsetHeight - 150);
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // initialize
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();

      if (window.location.href.endsWith("/")) {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        window.location.href = "/";
      }
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className={`
        fixed w-full z-50 px-4 transition-colors duration-300
        ${isAtTop ? "bg-transparent" : "bg-gray-900"}
      `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <span className="font-bold text-2xl text-orange-500">DLift</span>
          <span className="font-light text-xl ml-1 text-white">Crane Rentals</span> */}
          {/* <Image src={Logo} alt="Dlift Logo" /> */}
          <Link
            href="#home"
            className="block"
            onClick={(e) => handleNavClick("#home", e)}
          >
            <Image
              src={Logo}
              alt="DLift Crane Rentals logo"
              width={190}
              height={70}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {["#home", "/cranes", "#services", "#about", "#contact"].map((id) => (
            <Link
              className="hover:text-orange-400 transition-colors text-white"
              key={id}
              href={id.startsWith("/") ? id : id}
              onClick={(e) => handleNavClick(id, e)}
            >
              {id.startsWith("/")
                ? "Cranes"
                : id.charAt(1).toUpperCase() + id.slice(2)}
            </Link>
          ))}
        </div>
        <button
          className="mobile-menu-button md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Mobile Menu Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          {/* Semi-transparent black overlay */}
          <div
            className="mobile-menu md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu dropdown */}
          <div className="mobile-menu md:hidden absolute top-full left-0 w-full bg-gray-900 shadow-lg z-50">
            <div className="px-4 py-6 space-y-4">
              {["#home", "#cranes", "#services", "#about", "#contact"].map(
                (id) => (
                  <Link
                    key={id}
                    href={id}
                    className="block text-white hover:text-orange-400 transition-colors py-2 text-lg"
                    onClick={(e) => handleNavClick(id, e)}
                  >
                    {id.startsWith("/")
                      ? "Cranes"
                      : id.charAt(1).toUpperCase() + id.slice(2)}
                  </Link>
                )
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
