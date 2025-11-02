"use client";

import { ExperienceItem, experiences, formatDuration } from "@/data";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Briefcase, Wrench, Link as LinkIcon, ArrowRight } from "lucide-react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.2 });
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const bodyRef = useRef<HTMLBodyElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track in-view state for each card
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inViewCards, setInViewCards] = useState<boolean[]>([]);

  useEffect(() => {
    bodyRef.current = document.body as HTMLBodyElement;
    setInViewCards(new Array(experiences.length).fill(false));
  }, []);

  // Set up intersection observers for each card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (index !== -1) {
            setInViewCards((prev) => {
              const newState = [...prev];
              newState[index] = entry.isIntersecting;
              return newState;
            });
          }
        });
      },
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Track scroll progress for timeline animation
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionHeight = rect.height;

        if (rect.top < windowHeight && rect.bottom > 0) {
          // More responsive calculation - starts earlier
          const scrollStart = rect.top - windowHeight + 200;
          const scrollRange = sectionHeight + windowHeight - 200;
          const progress = Math.max(0, Math.min(1, -scrollStart / scrollRange));
          setScrollProgress(progress);
        } else if (rect.bottom <= 0) {
          setScrollProgress(1);
        } else {
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleCloseModal();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    if (selectedExperience) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      bodyRef.current?.style.setProperty("overflow", "hidden");
    } else {
      bodyRef.current?.style.removeProperty("overflow");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      bodyRef.current?.style.removeProperty("overflow");
    };
  }, [selectedExperience]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const dotVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.15 + 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.3, 1],
      opacity: [0.7, 0.3, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const handleCardClick = (exp: ExperienceItem) => {
    setSelectedExperience(exp);
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, var(--card-bg) 50%, var(--background) 100%)",
      }}
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            My Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg"
            style={{ color: "var(--muted)" }}
          >
            Building innovative solutions across the tech landscape
          </motion.p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Static background line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 transform -translate-x-1/2"
            style={{ background: "var(--border)" }}
          />

          {/* Animated timeline line with gradient */}
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2 origin-top"
            style={{
              background: `linear-gradient(180deg, var(--primary) 0%, var(--accent) 50%, var(--secondary) 100%)`,
              scaleY: scrollProgress,
              boxShadow: `0 0 20px var(--primary)`,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />

          <div className="space-y-16 md:space-y-32">
            {experiences.map((exp, index) => {
              const durationText = exp.endDate
                ? `${exp.startDate.toLocaleDateString("default", {
                    month: "short",
                    year: "numeric",
                  })} - ${exp.endDate.toLocaleDateString("default", {
                    month: "short",
                    year: "numeric",
                  })}`
                : `${exp.startDate.toLocaleDateString("default", {
                    month: "short",
                    year: "numeric",
                  })} - Present`;

              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  custom={index}
                  initial="hidden"
                  animate={inViewCards[index] ? "visible" : "hidden"}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline node with animated rings */}
                  <div
                    className={`absolute left-6 md:left-1/2 top-8 transform -translate-x-1/2 z-20`}
                  >
                    <motion.div
                      custom={index}
                      variants={dotVariants}
                      className="relative"
                    >
                      {/* Outer pulse ring */}
                      <motion.div
                        variants={pulseVariants}
                        animate={inViewCards[index] ? "pulse" : ""}
                        className="absolute inset-0 -m-3 rounded-full border-2"
                        style={{ borderColor: "var(--primary)" }}
                      />
                      {/* Middle ring */}
                      <motion.div
                        className="absolute inset-0 -m-2 rounded-full"
                        style={{
                          backgroundColor: "var(--primary)",
                          opacity: 0.2,
                        }}
                        initial={{ scale: 0 }}
                        animate={
                          inViewCards[index] ? { scale: 1 } : { scale: 0 }
                        }
                        transition={{
                          delay: index * 0.15 + 0.4,
                          duration: 0.4,
                        }}
                      />
                      {/* Center dot */}
                      <div
                        className="w-6 h-6 rounded-full shadow-lg border-2"
                        style={{
                          background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
                          borderColor: "var(--card-bg)",
                          boxShadow: `0 0 20px var(--primary)`,
                        }}
                      />

                      {/* Date label */}
                      <motion.div
                        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                        animate={
                          inViewCards[index]
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: isLeft ? 20 : -20 }
                        }
                        transition={{
                          delay: index * 0.15 + 0.5,
                          duration: 0.5,
                        }}
                        className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap ${
                          isLeft
                            ? "left-12 md:left-auto md:right-12"
                            : "left-12"
                        } text-xs font-mono px-2 py-1 rounded backdrop-blur-sm hidden md:block`}
                        style={{
                          color: "var(--primary)",
                          backgroundColor: "var(--card-bg)",
                          opacity: 0.9,
                        }}
                      >
                        {exp.startDate.toLocaleDateString("default", {
                          month: "short",
                          year: "numeric",
                        })}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Experience card */}
                  <div
                    className={`flex ${
                      isLeft
                        ? "flex-row md:justify-start"
                        : "flex-row md:justify-end"
                    }`}
                  >
                    <div
                      className={`w-full ml-16 md:ml-0 md:w-5/12 ${
                        !isLeft && "md:mr-0"
                      }`}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          y: -5,
                          transition: {
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1] as const,
                          },
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCardClick(exp)}
                        className="group relative p-6 rounded-xl shadow-2xl cursor-pointer overflow-hidden transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, var(--card-bg) 0%, var(--card-bg) 100%)`,
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor: "var(--card-border)",
                        }}
                      >
                        {/* Animated gradient overlay */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg, transparent 0%, var(--primary) 100%)`,
                            opacity: 0.05,
                          }}
                        />

                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div
                            className="absolute inset-0 -skew-x-12 animate-shine"
                            style={{
                              background:
                                "linear-gradient(to right, transparent, rgba(255, 255, 255, 0.1), transparent)",
                            }}
                          />
                        </div>

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <motion.h3
                                className="text-xl md:text-2xl font-bold mb-1"
                                style={{
                                  background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                              >
                                {exp.title}
                              </motion.h3>
                              <p
                                className="font-semibold text-lg"
                                style={{ color: "var(--foreground)" }}
                              >
                                {exp.company}
                              </p>
                            </div>
                            <motion.div
                              whileHover={{ rotate: 45, scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                              className="w-10 h-10 rounded-full flex items-center justify-center ml-2"
                              style={{
                                backgroundColor: "var(--card-border)",
                                color: "var(--primary)",
                              }}
                            >
                              <ArrowRight
                                className="w-5 h-5"
                                strokeWidth={2.5}
                              />
                            </motion.div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <span
                              className="text-xs font-medium px-3 py-1 rounded-full border"
                              style={{
                                backgroundColor: "var(--primary)",
                                color: "white",
                                opacity: 0.9,
                                borderColor: "var(--primary)",
                              }}
                            >
                              {exp.positionType}
                            </span>
                            <span
                              className="text-xs font-medium px-3 py-1 rounded-full"
                              style={{
                                backgroundColor: "var(--card-border)",
                                color: "var(--foreground)",
                              }}
                            >
                              📍 {exp.location}
                            </span>
                          </div>

                          <p
                            className="text-sm mb-4 font-mono"
                            style={{ color: "var(--muted)" }}
                          >
                            {durationText}{" "}
                            <span style={{ color: "var(--primary)" }}>
                              • {exp.duration && formatDuration(exp.duration)}
                            </span>
                          </p>

                          <p
                            className="leading-relaxed line-clamp-3"
                            style={{ color: "var(--foreground)" }}
                          >
                            {exp.description}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {exp.skills?.slice(0, 3).map((skill, i) => (
                              <span
                                key={i}
                                className="text-xs px-2 py-1 rounded"
                                style={{
                                  backgroundColor: "var(--card-border)",
                                  color: "var(--muted)",
                                }}
                              >
                                {skill}
                              </span>
                            ))}
                            {exp.skills && exp.skills.length > 3 && (
                              <span
                                className="text-xs px-2 py-1 rounded"
                                style={{
                                  backgroundColor: "var(--primary)",
                                  color: "white",
                                  opacity: 0.9,
                                }}
                              >
                                +{exp.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End marker */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={
              isSectionInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0 }
            }
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-16 relative h-4"
          >
            <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div
                className="w-4 h-4 rounded-full shadow-lg"
                style={{
                  background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
                  boxShadow: `0 0 20px var(--primary)`,
                }}
              />
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedExperience && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop with blur */}
              <motion.div
                className="absolute inset-0 backdrop-blur-md"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleCloseModal}
              />

              {/* Modal content */}
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  scale: 0.95,
                  opacity: 0,
                  y: 20,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative rounded-2xl max-w-4xl w-full mx-4 md:mx-0 max-h-[90vh] overflow-hidden shadow-2xl border"
                style={{
                  background: `linear-gradient(135deg, var(--card-bg) 0%, var(--card-bg) 100%)`,
                  borderColor: "var(--card-border)",
                }}
              >
                {/* Header with gradient */}
                <div
                  className="sticky top-0 z-10 backdrop-blur-lg border-b p-6"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    opacity: 0.98,
                    borderColor: "var(--card-border)",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-3xl font-bold mb-2"
                        style={{
                          background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {selectedExperience.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="font-semibold text-lg md:text-xl"
                        style={{ color: "var(--foreground)" }}
                      >
                        {selectedExperience.company}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap gap-2 mt-3"
                      >
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full border"
                          style={{
                            backgroundColor: "var(--primary)",
                            color: "white",
                            opacity: 0.9,
                            borderColor: "var(--primary)",
                          }}
                        >
                          {selectedExperience.positionType}
                        </span>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: "var(--card-border)",
                            color: "var(--foreground)",
                          }}
                        >
                          📍 {selectedExperience.location}
                        </span>
                        <span
                          className="text-xs font-medium px-3 py-1 rounded-full font-mono"
                          style={{
                            backgroundColor: "var(--card-border)",
                            color: "var(--foreground)",
                          }}
                        >
                          {selectedExperience.startDate.toLocaleDateString(
                            "default",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                          {" - "}
                          {selectedExperience.endDate
                            ? selectedExperience.endDate.toLocaleDateString(
                                "default",
                                {
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Present"}
                          {" • "}
                          <span style={{ color: "var(--primary)" }}>
                            {selectedExperience.duration &&
                              formatDuration(selectedExperience.duration)}
                          </span>
                        </span>
                      </motion.div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCloseModal}
                      className="ml-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        backgroundColor: "var(--card-border)",
                        color: "var(--muted)",
                      }}
                    >
                      ✕
                    </motion.button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(90vh-220px)] custom-scrollbar">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="p-6 pb-24"
                  >
                    <p
                      className="leading-relaxed mb-8 text-lg"
                      style={{ color: "var(--foreground)" }}
                    >
                      {selectedExperience.description}
                    </p>

                    {selectedExperience.productLinks &&
                      selectedExperience.productLinks.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="mb-8"
                        >
                          <h4
                            className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2"
                            style={{ color: "var(--foreground)" }}
                          >
                            <LinkIcon
                              className="w-5 h-5"
                              style={{ color: "var(--primary)" }}
                            />
                            Projects & Products
                          </h4>
                          <div className="space-y-4">
                            {selectedExperience.productLinks.map(
                              (product, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.35 + i * 0.1 }}
                                  className="group border rounded-xl overflow-hidden transition-all duration-300"
                                  style={{
                                    borderColor: "var(--card-border)",
                                  }}
                                >
                                  <div
                                    className="p-5"
                                    style={{
                                      backgroundColor: "var(--card-bg)",
                                    }}
                                  >
                                    <h5
                                      className="text-lg font-semibold mb-2"
                                      style={{ color: "var(--primary)" }}
                                    >
                                      {product.name}
                                    </h5>
                                    <p
                                      className="text-sm leading-relaxed mb-3"
                                      style={{ color: "var(--muted)" }}
                                    >
                                      {product.description}
                                    </p>
                                    <a
                                      href={product.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm transition-colors"
                                      style={{ color: "var(--primary)" }}
                                    >
                                      Visit Website
                                      <motion.span
                                        whileHover={{ x: 5 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        →
                                      </motion.span>
                                    </a>
                                  </div>

                                  {/* Website Preview Iframe */}
                                  <div
                                    className="relative"
                                    style={{ paddingBottom: "56.25%" }}
                                  >
                                    <div
                                      className="absolute inset-0 flex items-center justify-center"
                                      style={{
                                        backgroundColor: "var(--background)",
                                      }}
                                    >
                                      <iframe
                                        src={product.link}
                                        title={`Preview of ${product.name}`}
                                        className="absolute top-0 left-0 w-full h-full"
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        style={{
                                          transform: "scale(0.5)",
                                          transformOrigin: "0 0",
                                          width: "200%",
                                          height: "200%",
                                        }}
                                      />
                                      <div
                                        className="absolute inset-0 pointer-events-none border-4 rounded-b-lg"
                                        style={{
                                          borderColor: "var(--card-border)",
                                        }}
                                      />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                  </div>
                                </motion.div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}

                    {selectedExperience.responsibilities && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                      >
                        <h4
                          className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2"
                          style={{ color: "var(--foreground)" }}
                        >
                          <Briefcase
                            className="w-5 h-5"
                            style={{ color: "var(--primary)" }}
                          />
                          Key Achievements
                        </h4>
                        <ul className="space-y-3">
                          {selectedExperience.responsibilities.map(
                            (item, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.45 + i * 0.05 }}
                                className="flex items-start group"
                                style={{ color: "var(--foreground)" }}
                              >
                                <span
                                  className="mr-3 mt-1 group-hover:scale-125 transition-transform"
                                  style={{ color: "var(--primary)" }}
                                >
                                  •
                                </span>
                                <span className="leading-relaxed">{item}</span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </motion.div>
                    )}

                    {selectedExperience.skills && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-6"
                      >
                        <h4
                          className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2"
                          style={{ color: "var(--foreground)" }}
                        >
                          <Wrench
                            className="w-5 h-5"
                            style={{ color: "var(--primary)" }}
                          />
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedExperience.skills.map((skill, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.55 + i * 0.02 }}
                              whileHover={{
                                scale: 1.1,
                                transition: { duration: 0.2 },
                              }}
                              className="text-sm px-4 py-2 rounded-full cursor-default transition-colors"
                              style={{
                                backgroundColor: "var(--card-border)",
                                color: "var(--foreground)",
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>

                {/* Footer */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 pt-12"
                  style={{
                    background: `linear-gradient(to top, var(--card-bg) 0%, transparent 100%)`,
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCloseModal}
                    className="w-full px-6 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300"
                    style={{
                      background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
                      color: "white",
                      boxShadow: `0 10px 30px var(--primary)`,
                      opacity: 0.9,
                    }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
