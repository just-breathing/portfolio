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

export const formatDuration = (months: number): string => {
  if (months < 12) {
    return `${months}mo`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years}yr`;
  }

  return `${years}yr ${remainingMonths}mo`;
};

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Full Stack Engineer",
    company: "Blockhouse",
    startDate: new Date(2024, 8),
    endDate: new Date(2025, 9),
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
          "A mobile investing platform that empowers you to build a personalized portfolio tailored to your financial goals and values.",
      },
      {
        name: "Blockhouse Crypto Dashboard",
        link: "https://crypto-dashboard.blockhouse.app/",
        description:
          "Monitor SMA-based crypto trading performance and analytics in real-time",
      },
      {
        name: "Blockhouse Equities Dashboard",
        link: "https://dev-dashboard.blockhouse.app/",
        description:
          "Advanced trading and analytics platform for institutional investors",
      },
    ],
    location: "NYC",
    description:
      "Developed real-time crypto trading dashboard and production-grade equities Order Management System with cutting-edge performance optimizations and cross-platform applications.",
    responsibilities: [
      "Developed real-time crypto trading dashboard processing 10,000+ WebSocket messages per second with sub-second latency, optimizing large dataset rendering (100,000+ data points) using Web Workers and WebAssembly for 3x faster risk calculations",
      "Built production-grade equities Order Management System (OMS) with FastAPI backend and WebSocket architecture for real-time order tracking, scheduling, and execution analytics including TWAP/VWAP analysis",
      "Created cross-platform applications using React Native/Expo (mobile), Tauri (desktop), and Plasmo (browser extension) with Plaid integration for secure trade data retrieval",
      "Implemented reusable Next.js components with dynamic rendering (SSR, CSR, SSG) and Server Actions to securely proxy REST APIs without exposing endpoints to client",
      "Optimized application performance by debugging and resolving memory leaks, thread-related issues, and race conditions in WebSocket connections and worker threads",
      "Designed PostgreSQL and MongoDB database schemas with Prisma ORM, managing migrations, query optimization, and high-throughput operations",
      "Built comprehensive data visualization using Recharts for equity curves, performance metrics, Sharpe/Sortino ratios, and slippage distribution",
      "Implemented authentication systems with NextAuth and Better Auth, including email invitation feature with secure token generation and middleware-based access control",
      "Integrated smart order routing (SOR) algorithms and auto-flagging system with configurable rules for monitoring order performance metrics",
      "Configured CI/CD pipelines with GitHub Actions and Turborepo monorepo, ensuring automated testing with Cypress before deployment",
      "Managed AWS deployments: Amplify for frontend hosting with custom domain mapping, EC2 instances for backend services with Certbot SSL certificates and Nginx reverse proxy configurations",
      "Debugged production issues including memory leaks and optimized bundle sizes by 40% through code splitting and tree shaking, improving load times and runtime performance",
      "Tested React Native applications using Android/iOS emulators and physical devices",
    ],
    skills: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "WebSocket",
      "REST APIs",
      "Prisma ORM",
      "PostgreSQL",
      "MongoDB",
      "NextAuth",
      "Better Auth",
      "Web Workers",
      "WebAssembly",
      "Recharts",
      "Zustand",
      "React Native",
      "Expo",
      "Tauri",
      "Plasmo",
      "Plaid",
      "GitHub Actions",
      "Turborepo",
      "Cypress",
      "Sentry",
      "AWS Amplify",
      "AWS EC2",
      "Nginx",
      "Certbot",
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
        name: "Data Sense",
        link: "https://datasenseit.com/",
        description:
          "IT consulting and staffing firm whose mission is shaping technological solutions that drive businesses forward",
      },
    ],
    startDate: new Date(2024, 1),
    endDate: new Date(2024, 8),
    description:
      "Developed modern, responsive web interfaces using React.js, Tailwind CSS, and ShadCN component library with efficient state management and database operations.",
    responsibilities: [
      "Developed modern, responsive web interfaces using React.js, Tailwind CSS, and ShadCN component library",
      "Built reusable components to streamline development workflow and improve code maintainability across multiple projects",
      "Utilized React Context API for state management, enabling efficient data sharing across multiple components",
      "Implemented CRUD operations using Prisma ORM with PostgreSQL database for efficient data management",
    ],
    skills: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCN",
      "Context API",
      "Prisma ORM",
      "PostgreSQL",
    ],
  },
  {
    id: 3,
    title: "Software Developer Intern",
    company: "ValueLabs",
    location: "Hyderabad, India",
    startDate: new Date(2022, 1),
    endDate: new Date(2022, 4),
    positionType: "Onsite" as positionType,
    productLinks: [],
    description:
      "Developed and maintained web applications using React.js for frontend and Node.js for backend services, collaborating with cross-functional teams.",
    responsibilities: [
      "Developed and maintained web applications using React.js for frontend and Node.js for backend services",
      "Collaborated with cross-functional teams to deliver high-quality software solutions following agile methodologies",
      "Participated in code reviews and implemented best practices for code quality and maintainability",
      "Gained hands-on experience with full-stack development using JavaScript ecosystem and MongoDB database",
    ],
    skills: ["JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
  },
].map((exp) => ({
  ...exp,
  duration: calculateDuration(exp.startDate, exp.endDate),
}));
