"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const offset = 200; // scroll balandroq joyda o‘tishi uchun

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - navbarHeight - offset;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
          link.classList.add("active");
        }
      });
    };

    // 🔹 Nav link bosilganda smooth scroll va active holatni o‘zgartirish
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          const targetPosition = target.offsetTop - navbarHeight - 45; // navbarni hisobga olish
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }

        // avvalgi active ni olib tashlaymiz
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active"); // bosilgan linkni aktiv qilamiz
      });
    });

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="nav-container">
      <nav className="navbar fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="logo flex items-center gap-2">
          <svg className="logo-svg w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5 5L19 19M5 19L19 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="logo-text font-semibold">ATT Kafedrasi</span>
        </div>

        <ul className="nav-menu flex gap-6">
          <li>
            <Link href="#home" className="nav-link active">
              Bosh sahifa
            </Link>
          </li>
          <li>
            <Link href="#about-university" className="nav-link">
              Universitet
            </Link>
          </li>
          <li>
            <Link href="#about-department" className="nav-link">
              Kafedra
            </Link>
          </li>
          <li>
            <Link href="#staff" className="nav-link">
              O‘qituvchilar
            </Link>
          </li>
          <li>
            <Link href="#contact" className="nav-link">
              Bog‘lanish
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
