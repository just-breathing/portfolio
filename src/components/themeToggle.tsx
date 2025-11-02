"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="p-2 rounded-full flex items-center justify-center text-xl"
        style={{
          backgroundColor: "var(--card-border)",
          width: "40px",
          height: "40px",
        }}
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getIcon = () => {
    if (theme === "light") {
      return <Sun className="w-5 h-5" />;
    }
    if (theme === "dark") {
      return <Moon className="w-5 h-5" />;
    }
    return <Monitor className="w-5 h-5" />;
  };

  const getLabel = () => {
    if (theme === "light") return "Switch to Dark Mode";
    if (theme === "dark") return "Switch to System Mode";
    return "Switch to Light Mode";
  };

  return (
    <motion.button
      onClick={cycleTheme}
      className="p-2 rounded-full flex items-center justify-center text-xl transition-colors"
      style={{
        backgroundColor: "var(--card-border)",
        color: "var(--foreground)",
      }}
      whileHover={{
        scale: 1.1,
        backgroundColor: "var(--primary)",
        color: "white",
      }}
      whileTap={{ scale: 0.9 }}
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </motion.button>
  );
}
