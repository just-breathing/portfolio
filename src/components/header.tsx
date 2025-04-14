"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedString } from "./home";

const navItems = ["home", "experience", "github"];

export default function Header() {
  return (
    <header className="fixed w-full bg-gray-900/90 shadow-sm z-50 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-blue-400 uppercase"
        >
          <AnimatedString name="SN" />
        </motion.div>

        <ul className="flex space-x-4 md:space-x-8">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Link
                href={`/#${item}`}
                scroll={false}
                className="hover:text-blue-400 hover:tracking-widest transition-colors text-xs md:text-base uppercase"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(item);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.li>
          ))}
          <motion.li
            key={4}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <a
              href="/portfolio/documents/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="hover:text-blue-400 hover:tracking-widest transition-colors text-xs md:text-base uppercase ">
                Resume
              </p>
            </a>
          </motion.li>
        </ul>
      </nav>
    </header>
  );
}
