import Experience from "@/components/experience";
import { GitHubStatsCard } from "@/components/githubStats";
import Header from "@/components/header";
import HeroSection from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 pt-24 pb-5">
        <HeroSection />

        {/* Experience Section */}
        <Experience />

        <GitHubStatsCard username="just-breathing" />
      </main>
    </div>
  );
}
