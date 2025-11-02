import Experience from "@/components/experience";
import { GitHubStatsCard } from "@/components/githubStats";
import HeroSection from "@/components/home";

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <main className="container mx-auto px-4 pt-24 pb-5">
        <HeroSection />

        {/* Experience Section */}
        <Experience />

        <GitHubStatsCard username="just-breathing" />
      </main>
    </div>
  );
}
