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
              key={item}
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
                className="hover:text-blue-400 transition-colors text-sm md:text-base uppercase"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
