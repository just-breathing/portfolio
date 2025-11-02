"use client";

import { motion } from "framer-motion";
import SocialLinks from "./socialLinks";

const aboutMe = [
  "I'm a detail-oriented software engineer with hands-on experience building scalable, high-performance web and mobile applications using React, Next.js, TypeScript, and Expo.",
  "I enjoy crafting intuitive, accessible user interfaces that prioritize performance, usability, and thoughtful design across both web and mobile platforms.",
  "With a strong foundation in full-stack development and a passion for frontend and mobile engineering, I bring a user-centric mindset and a drive for continuous improvement to every project.",
];

export const AnimatedString = ({ name }: { name: string }) => {
  const words = name.split(" ");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <span
      className="inline-flex flex-wrap justify-center"
      style={{ color: "var(--primary)" }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-2 last:mr-0 whitespace-nowrap"
          style={{ lineHeight: "1.2" }}
          initial="hidden"
          animate="visible"
        >
          {word.split("").map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              custom={letterIndex}
              variants={{
                hidden: { opacity: 0, y: -100 },
                visible: () => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    delay:
                      (alphabet.indexOf(letter.toLocaleUpperCase()) + 1) *
                      0.075,
                    duration: 0.25,
                    damping: 10,
                    stiffness: 100,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }),
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </span>
  );
};
export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center px-4 relative overflow-hidden"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1
            className="text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Hi, I &apos;m <AnimatedString name="Sundeep Reddy Nallamilli" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-3"
            style={{
              background:
                "linear-gradient(135deg, var(--secondary) 0%, var(--accent) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "bold",
            }}
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto"
        >
          <ul
            className="ml-1 md:ml-2 text-lg md:text-xl leading-relaxed mb-8 list-disc list"
            style={{ color: "var(--muted)" }}
          >
            {aboutMe.map((item, index) => (
              <li
                key={index}
                className="text-lg md:text-xl leading-relaxed text-justify"
              >
                {item}
              </li>
            ))}
          </ul>
          <SocialLinks />
        </motion.div>
      </div>
    </section>
  );
}
