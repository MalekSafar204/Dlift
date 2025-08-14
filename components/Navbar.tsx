"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from '../public/noBack.png'
import Image from "next/image";

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      // if we've scrolled past the bottom of the hero
      setIsAtTop(window.scrollY < hero.offsetHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed w-full z-50 p-4 transition-colors duration-300
        ${isAtTop ? "bg-transparent" : "bg-gray-900"}
      `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <span className="font-bold text-2xl text-orange-500">DLift</span>
          <span className="font-light text-xl ml-1 text-white">Crane Rentals</span> */}
          {/* <Image src={Logo} alt="Dlift Logo" /> */}
          <Link href="#home" className="block">
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
          {["home", "cranes", "services", "about", "contact"].map((id) => (
            <Link
              className="hover:text-orange-400 transition-colors text-white"
              key={id}
              href={`#${id}`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </Link>
          ))}
        </div>
        <button className="md:hidden text-white">
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
    </nav>
  );
}
