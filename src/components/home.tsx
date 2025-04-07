"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const aboutMe = [
  "I'm a detail-oriented software engineer with hands-on experience building scalable, high-performance web and mobile applications using React, Next.js, TypeScript, and Expo.",
  "I enjoy crafting intuitive, accessible user interfaces that prioritize performance, usability, and thoughtful design across both web and mobile platforms.",
  "With a strong foundation in full-stack development and a passion for frontend and mobile engineering, I bring a user-centric mindset and a drive for continuous improvement to every project.",
];

export const AnimatedString = ({ name }: { name: string }) => {
  const words = name.split(" ");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return (
    <span className="text-blue-400 inline-flex flex-wrap justify-center">
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
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay:
                      (alphabet.indexOf(letter.toLocaleUpperCase()) + 1) * 0.1,
                    duration: 0.5,
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
  const socialLinks = [
    {
      icon: <FaGithub />,
      url: "https://github.com/just-breathing",
      name: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/in/sundeepreddyn/",
      name: "LinkedIn",
    },
    // { icon: <FaTwitter />, url: 'https://twitter.com/yourhandle', name: 'Twitter' },
    {
      icon: <FaEnvelope />,
      url: "mailto:sundeep.reddy.n.2000@email.com",
      name: "Email",
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center bg-gray-900 px-4"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl font-bold mb-4 text-white">
            Hi, I'm <AnimatedString name="Sundeep Reddy Nallamilli" />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-5 md:mt-7"
        >
          <ul className="text-lg md:text-xl leading-relaxed text-gray-300 mb-8 text-clip ">
            {aboutMe.map((item, index) => (
              <li
                key={index}
                className="text-lg md:text-xl leading-relaxed text-gray-300 "
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="flex  gap-4  justify-center md:justify-start">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.2, color: "#60A5FA" }}
                className="text-2xl text-gray-400 hover:text-blue-400 transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
