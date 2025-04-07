"use client";

import { ExperienceItem, experiences } from "@/data";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.3 });
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const bodyRef = useRef<HTMLBodyElement | null>(null);

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
      { threshold: 0.3 }
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

  // Handle scroll to close modal
  useEffect(() => {
    const handleScroll = () => {
      if (selectedExperience) {
        handleCloseModal();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedExperience]);

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

    if (selectedExperience) {
      document.addEventListener("mousedown", handleClickOutside);
      bodyRef.current?.style.setProperty("overflow", "hidden");
    } else {
      bodyRef.current?.style.removeProperty("overflow");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      bodyRef.current?.style.removeProperty("overflow");
    };
  }, [selectedExperience]);

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (duration: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration * 0.02,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const handleCardClick = (exp: ExperienceItem) => {
    setActiveCardId(exp.id);
    setSelectedExperience(exp);
  };

  const handleCloseModal = () => {
    setSelectedExperience(null);
    setTimeout(() => setActiveCardId(null), 300);
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="min-h-screen py-10 relative bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={
            isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-16 text-center text-white"
        >
          My Journey
        </motion.h2>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isSectionInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            variants={lineVariants}
            className="absolute left-1/2 top-0 h-full w-1 bg-blue-400 transform -translate-x-1/2 origin-top hidden md:block"
          />

          <div className="space-y-4 md:space-y-24">
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

              return (
                <motion.div
                  key={exp.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  custom={exp.duration}
                  initial="hidden"
                  animate={inViewCards[index] ? "visible" : "hidden"}
                  variants={itemVariants}
                  className={`relative flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-8`}
                >
                  <div className="w-full md:w-1/2">
                    <motion.div
                      layoutId={`card-${exp.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCardClick(exp)}
                      className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-blue-400">
                            {exp.title}
                          </h3>
                          <p className="text-gray-300 font-medium">
                            {exp.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-sm">
                            {exp.positionType}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {exp.location}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">
                        {durationText} ({exp.duration} months)
                      </p>
                      <p className="text-gray-300 line-clamp-2">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {selectedExperience && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <motion.div
                ref={modalRef}
                layoutId={`card-${activeCardId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-800 rounded-xl max-w-2xl w-full p-6 border border-gray-700 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3 className="text-2xl font-bold text-blue-400">
                      {selectedExperience.title}
                    </motion.h3>
                    <motion.p className="text-gray-300 font-medium">
                      {selectedExperience.company}
                    </motion.p>
                    <div className="flex gap-4 mt-2">
                      <motion.p className="text-gray-400 text-sm bg-gray-700 px-2 py-1 rounded">
                        {selectedExperience.positionType}
                      </motion.p>
                      <motion.p className="text-gray-400 text-sm bg-gray-700 px-2 py-1 rounded">
                        {selectedExperience.location}
                      </motion.p>
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <motion.p className="text-gray-400 text-sm mb-4">
                  {selectedExperience.startDate.toLocaleDateString("default", {
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  -
                  {selectedExperience.endDate
                    ? selectedExperience.endDate.toLocaleDateString("default", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present"}
                  ({selectedExperience.duration} months)
                </motion.p>

                <motion.p className="text-gray-300 mb-6">
                  {selectedExperience.description}
                </motion.p>

                {selectedExperience.productLinks?.map((product, i) => (
                  <div
                    key={i}
                    className="mb-6 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-900">
                      <h5 className="text-blue-400 font-medium">
                        {product.name}
                      </h5>
                      <p className="text-gray-400 text-sm mt-1">
                        {product.description}
                      </p>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-sm text-blue-400 hover:underline"
                      >
                        Visit Website →
                      </a>
                    </div>

                    {/* Responsive iframe container */}
                    <div
                      className="relative"
                      style={{ paddingBottom: "56.25%" }}
                    >
                      {" "}
                      {/* 16:9 aspect ratio */}
                      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
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
                        <div className="absolute inset-0 pointer-events-none border-4 border-gray-900 rounded-b-lg" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    </div>
                  </div>
                ))}

                {selectedExperience.responsibilities && (
                  <motion.div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">
                      Worked On:
                    </h4>
                    <ul className="space-y-2">
                      {selectedExperience.responsibilities.map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {selectedExperience.skills && (
                  <motion.div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-200 mb-2">
                      Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-gray-300 bg-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCloseModal}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Close
                </motion.button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
