"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AnimatedString } from "./home";
import ThemeToggle from "./themeToggle";
import { Menu, X, FileText } from "lucide-react";
import { useState } from "react";

const navItems = ["home", "experience", "github"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (item: string) => {
    const element = document.getElementById(item);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  return (
    <header
      className="fixed w-full z-50 backdrop-blur-sm"
      style={{
        backgroundColor: "var(--card-bg)",
        opacity: 0.95,
        borderBottom: "1px solid var(--card-border)",
        boxShadow: "-10px -10px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold uppercase"
          style={{ color: "var(--primary)" }}
        >
          <AnimatedString name="SN" />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <ul className="flex space-x-4 md:space-x-8">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
              >
                <button
                  onClick={() => handleNavClick(item)}
                  className="hover:tracking-widest transition-all text-base uppercase cursor-pointer"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = "var(--primary)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = "var(--foreground)";
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              </motion.li>
            ))}
            <motion.li
              key={4}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.2 },
              }}
            >
              <a
                href="/portfolio/documents/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:tracking-widest transition-all text-base uppercase"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--foreground)";
                }}
              >
                <FileText className="w-5 h-5" />
                <span>Resume</span>
              </a>
            </motion.li>
          </ul>

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: mobileMenuOpen
                ? "var(--primary)"
                : "var(--card-border)",
              color: mobileMenuOpen ? "white" : "var(--foreground)",
            }}
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
            style={{
              backgroundColor: "var(--card-bg)",
              borderTop: "1px solid var(--card-border)",
            }}
          >
            <motion.ul
              className="container mx-auto px-4 py-4 space-y-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={index}
                  variants={{
                    open: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        y: { stiffness: 1000, velocity: -100 },
                      },
                    },
                    closed: {
                      y: 50,
                      opacity: 0,
                      transition: {
                        y: { stiffness: 1000 },
                      },
                    },
                  }}
                  className="border-b pb-3"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className="w-full text-left py-2 px-4 rounded-lg uppercase font-semibold transition-all hover:translate-x-2"
                    style={{ color: "var(--foreground)" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = "var(--primary)";
                      (e.target as HTMLElement).style.backgroundColor =
                        "var(--card-border)";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color =
                        "var(--foreground)";
                      (e.target as HTMLElement).style.backgroundColor =
                        "transparent";
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  open: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      y: { stiffness: 1000, velocity: -100 },
                    },
                  },
                  closed: {
                    y: 50,
                    opacity: 0,
                    transition: {
                      y: { stiffness: 1000 },
                    },
                  },
                }}
              >
                <a
                  href="/portfolio/documents/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 py-2 px-4 rounded-lg uppercase font-semibold transition-all hover:translate-x-2"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--primary)";
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "var(--card-border)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--foreground)";
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "transparent";
                  }}
                >
                  <FileText className="w-5 h-5" />
                  <span>Resume</span>
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
