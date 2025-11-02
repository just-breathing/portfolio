"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const socials = [
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
  {
    icon: <FaEnvelope />,
    url: "mailto:sundeep.reddy.n.2000@email.com",
    name: "Email",
  },
];

const SocialLinks = () => {
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      {socials.map((link, index) => (
        <motion.a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.2 }}
          className="text-2xl transition-colors"
          style={{ color: "var(--muted)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "var(--muted)";
          }}
          aria-label={link.name}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
};

export default SocialLinks;
