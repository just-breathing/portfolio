type positionType = "Hybrid" | "Remote" | "Onsite";
export type ExperienceItem = {
  id: number;
  title: string;
  company: string;
  productLinks?: { name: string; link: string; description: string }[];
  location: string;
  positionType: positionType;
  startDate: Date;
  endDate: Date | null;
  description: string;
  responsibilities?: string[];
  duration?: number;
  skills?: string[];
};
const calculateDuration = (start: Date, end: Date | null) => {
  const endDate = end || new Date();
  const months = (endDate.getFullYear() - start.getFullYear()) * 12;
  return months + (endDate.getMonth() - start.getMonth());
};

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Blockhouse",
    startDate: new Date(2024, 8, 17),
    endDate: null,
    positionType: "Remote" as positionType,
    productLinks: [
      {
        name: "Blockhouse",
        link: "https://www.blockhouse.app/",
        description: "Optimize Trade Execution With Predictive Analytics",
      },
      {
        name: "Moonport",
        link: "https://www.moonport.io/",
        description:
          "A mobile investing platform that empowers you to build a personalized portfolio tailored to your financial goals and values. ",
      },
      {
        name: "Blockhouse Dashboard",
        link: "https://dev-dashboard.blockhouse.app/",
        description:
          "Advanced trading and analytics platform for institutional investors",
      },
    ],
    location: "NYC",
    description:
      "Developed and deployed full-stack web applications using  Next.js, Typescript, Tailwind CSS, Next Auth, Prisma, MongoDB, and Amplify",
    responsibilities: [
      "Developed reusable and scalable components for pages and dashboards using Next.js (v14) to enhance maintainability and performance.",
      "Integrated Next.js APIs and server actions to optimize data handling and improve application responsiveness.",
      "Implemented dynamic rendering strategies, leveraging Client and Server Components to enhance user experience.",
      "Utilized various rendering techniques, including Server-side Rendering (SSR), Client-side Rendering (CSR), Static Site Generation (SSG) to optimize performance and SEO.",
      "Designed responsive and consistent user interfaces using Tailwind CSS for an improved UI/UX experience.",
      "Implemented authentication and authorization mechanisms with NextAuth (v5 beta), incorporating middleware for secure access control.",
      "Managed database interactions using Prisma ORM with MongoDB, enabling efficient CRUD operations.",
      "Integrated Sentry for real-time error monitoring, with automated alerts sent to teams via Slack for rapid issue resolution.",
      "Configured and maintained a monorepo (Turborepo) and set up GitHub Actions for automated build tests, ensuring code quality before deployment to production and key branches.",
      "Used version control using Git, creating and reviewing pull requests via GitHub.",
      "Conducted comprehensive end-to-end testing with Cypress, ensuring application stability and reliability.",
      "Developed cross-platform mobile applications using React Native (Expo) for Android and iOS, utilizing EAS for streamlined deployment to the App Store and Google Play.",
      "Tested native applications using Android emulators, iOS simulators, and physical iOS devices with Xcode, leveraging a personal Apple developer account.",
      "Implemented an email invitation feature for password recovery and initial account creation, improving user onboarding and security.",
      "Leveraged AWS Amplify to manage environment variables across multiple deployment branches, ensuring consistency across environments.",
    ],
    skills: [
      "Next.js (v14) - Middleware, SSR, CSR, SSG, ISR, Server Actions",
      "Typescript",
      "Tailwind CSS",
      "React Native (Expo)",
      "Shad CN",
      "Prisma ORM",
      "MongoDB",
      "NextAuth (v5 beta)",

      "Cypress",
      "Sentry",
      "Git",
      "GitHub",
      "AWS Amplify",
    ],
  },
  {
    id: 2,
    title: "Software Engineer Intern",
    company: "Data Sense",
    location: "Portland, OR",
    positionType: "Remote" as positionType,
    productLinks: [
      {
        name: "Main Website",
        link: "https://datasenseit.com/",
        description:
          " IT consulting and staffing firm  whose mission is shaping technological solutions that drive businesses forward",
      },
    ],
    startDate: new Date(2024, 1),
    endDate: new Date(2024, 8),
    description:
      "Developed  full-stack web applications using  Next.js, Typescript, Tailwind CSS, Next Auth, Prisma, PostgreSQL, Node.js APIS, ",
    responsibilities: [
      "Worked with React, Tailwind CSS, and ShadCN to build modern, responsive web interfaces.",
      "Built reusable components to streamline development and improve code maintainability.",
      "Utilized React Context API for state management, allowing data sharing across multiple components.",
      "Implemented CRUD operations using Prisma ORM with a PostgreSQL database for efficient data management.",
      "Developed backend services using Node.js and implemented microservice architecture for scalable and decoupled systems.",
      "Ensured seamless integration between frontend and backend by adhering to RESTful API best practices.",
      "Optimized application performance and scalability by leveraging asynchronous programming in Node.js.",
      "Collaborated on version control with Git, following best practices in code review and pull request management.",
      "Used Postman for API testing and validation of microservice interactions.",
      "Followed Agile development methodologies, participating in sprints, stand-ups, and code reviews.",
    ],
    skills: [
      "React",
      "Tailwind CSS",
      "ShadCN",
      "Prisma",
      "PostgreSQL",
      "Node.js",
      "Microservice Architecture",
      "Git",
    ],
  },
  {
    id: 3,
    title: "Software Developer Intern",
    company: "ValueLabs",
    location: "Telangana, India",

    startDate: new Date(2022, 1),
    endDate: new Date(2022, 4),
    positionType: "Onsite" as positionType,
    description:
      "Worked with Selenium and Java (cron jobs) to automate internal email processes and improve system performance.",
    productLinks: [
      {
        name: "",
        link: "https://www.valuelabs.com/emails",
        description: "This is an internal email project running on VM",
      },
    ],
    responsibilities: [
      "Automated internal email processes using cron jobs, reducing manual effort by over 90%.",
      "Developed and maintained software features using Java and Selenium, contributing to improved system performance and reliability.",
      "Participated in code reviews and debugging sessions, ensuring the delivery of high-quality software.",
      "Enhanced skills in agile methodologies, teamwork, and technical documentation through active participation in project planning and execution.",
      "Gained practical experience in version control (Git) and containerization (Docker).",
    ],
    skills: [
      "Java",
      "Selenium",
      "Git",
      "Docker",
      "Agile methodologies",
      "Code reviews",
      "Debugging",
      "Internal email process automation",
    ],
  },
].map((exp) => ({
  ...exp,
  duration: calculateDuration(exp.startDate, exp.endDate),
}));
