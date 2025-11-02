"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Github } from "lucide-react";

export function GitHubStatsCard({ username }: { username: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme-specific colors
  const isDark = resolvedTheme === "dark";

  const themeColors = {
    // Background colors
    bgColor: isDark ? "0f172a" : "f8fafc",
    cardBg: isDark ? "1e293b" : "ffffff",

    // Primary colors
    titleColor: isDark ? "60a5fa" : "2563eb",
    iconColor: isDark ? "60a5fa" : "2563eb",

    // Text colors
    textColor: isDark ? "f1f5f9" : "0f172a",

    // Accent colors (for streaks)
    ringColor: isDark ? "60a5fa" : "2563eb",
    fireColor: isDark ? "fbbf24" : "f59e0b",
    currStreakColor: isDark ? "60a5fa" : "2563eb",
  };

  // Show skeleton while loading
  if (!mounted) {
    return (
      <section
        id="github"
        className="border rounded-lg p-4 mt-[30px] md:mt-[100px]"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-4 flex items-center"
          style={{ color: "var(--primary)" }}
        >
          <Github className="w-5 h-5 mr-2" />
          GitHub Activity
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-self-center">
          <div
            className="h-48 rounded-lg animate-pulse"
            style={{ backgroundColor: "var(--card-border)" }}
          />
          <div
            className="h-48 rounded-lg animate-pulse"
            style={{ backgroundColor: "var(--card-border)" }}
          />
          <div
            className="h-48 rounded-lg animate-pulse"
            style={{ backgroundColor: "var(--card-border)" }}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      id="github"
      className="border rounded-lg p-4 mt-[30px] md:mt-[100px]"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-4 flex items-center"
        style={{ color: "var(--primary)" }}
      >
        <Github className="w-5 h-5 mr-2" />
        GitHub Activity
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-self-center">
        {/* Stats Card */}
        <div
          className="p-3 rounded-lg transition-colors duration-300"
          style={{ backgroundColor: "var(--background)" }}
        >
          <Image
            key={`stats-${isDark}`}
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&bg_color=${themeColors.bgColor}&title_color=${themeColors.titleColor}&text_color=${themeColors.textColor}&icon_color=${themeColors.iconColor}&hide_border=true&border_radius=8`}
            alt={`GitHub stats for ${username}`}
            width={500}
            height={500}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Languages Card - Full width below */}
        <div
          className="p-3 rounded-lg transition-colors duration-300"
          style={{ backgroundColor: "var(--background)" }}
        >
          <Image
            key={`langs-${isDark}`}
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&bg_color=${themeColors.bgColor}&title_color=${themeColors.titleColor}&text_color=${themeColors.textColor}&hide_border=true&border_radius=8`}
            alt={`Top languages for ${username}`}
            width={500}
            height={500}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Streak Card */}
        <div
          className="p-3 rounded-lg transition-colors duration-300 md:col-span-2"
          style={{ backgroundColor: "var(--background)" }}
        >
          <Image
            key={`streak-${isDark}`}
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&background=${themeColors.bgColor}&stroke=${themeColors.bgColor}&ring=${themeColors.ringColor}&fire=${themeColors.fireColor}&currStreakLabel=${themeColors.currStreakColor}&sideLabels=${themeColors.textColor}&currStreakNum=${themeColors.textColor}&dates=${themeColors.textColor}&sideNums=${themeColors.textColor}&hide_border=true&border_radius=8`}
            alt={`GitHub streak for ${username}`}
            width={500}
            height={500}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>

      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm hover:underline transition-colors"
        style={{ color: "var(--primary)" }}
      >
        View Full Profile →
      </a>
    </section>
  );
}
