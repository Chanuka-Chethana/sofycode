"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll Spy for Home Page sections
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = ["services", "expertise", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -50% 0px", // Treat intersection when section is in top half of screen
        threshold: 0,
      }
    );

    // Initial delay to allow Next.js route transitions and DOM rendering
    const timeoutId = setTimeout(() => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);


  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const navLinks = [
    { label: "Services", href: "/#services" },
    { label: "Expertise", href: "/#expertise" },
    { label: "Contact", href: "/#contact" },
    { label: "Pricing", href: "/pricing" },
    { label: "Work", href: "/work" },
  ];

  return (
    <nav className="fixed top-0 w-full py-4 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors" role="navigation" aria-label="Main navigation" ref={menuRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Sofycode Home">
          <div className="relative h-10 w-[140px] md:h-12 md:w-[180px] transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo_light_fixed_v3.png"
              alt="SOFYCODE Logo"
              fill
              className="object-contain object-left dark:hidden"
              priority
            />
            <Image
              src="/logo_dark_transparent_v2.png"
              alt="SOFYCODE Logo"
              fill
              className="object-contain object-left hidden dark:block"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) =>
            link.label === "About" ? null : (
              <Link
                key={link.label}
                href={link.href}
                className={`font-medium transition-colors ${
                  (link.href.startsWith('/#') && activeSection === link.href.split('#')[1]) || pathname === link.href
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            href="/about"
            className={`font-medium transition-colors cursor-pointer select-none ${
              pathname === "/about"
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            About
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ml-4 border-none"
          >
            Start a Project
          </Link>

          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors w-[36px] h-[36px] flex items-center justify-center"
            aria-label="Toggle Dark Mode"
            suppressHydrationWarning
          >
            {mounted ? (currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-[20px] h-[20px]" />}
          </button>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors w-[36px] h-[36px] flex items-center justify-center"
            aria-label="Toggle Dark Mode"
            suppressHydrationWarning
          >
            {mounted ? (currentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors w-[36px] h-[36px] flex items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-full left-0 right-0 bg-white/98 dark:bg-gray-900/98 border-b border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                document.body.style.overflow = "";
                setMenuOpen(false);
              }}
              className={`py-3 px-4 rounded-xl font-medium text-lg transition-colors ${
                (link.href.startsWith('/#') && activeSection === link.href.split('#')[1]) || pathname === link.href
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={() => {
              document.body.style.overflow = "";
              setMenuOpen(false);
            }}
            className={`py-3 px-4 rounded-xl font-medium text-lg transition-colors cursor-pointer ${
              pathname === "/about"
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-slate-700 dark:text-gray-200 hover:bg-slate-100 dark:hover:bg-gray-800"
            }`}
          >
            About
          </Link>
          <div className="pt-4 mt-2 border-t border-slate-200 dark:border-gray-800">
            <Link
              href="/#contact"
              onClick={() => {
                document.body.style.overflow = "";
                setMenuOpen(false);
              }}
              className="flex items-center justify-center w-full py-3.5 rounded-full font-bold text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-md hover:shadow-lg transition-all"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
