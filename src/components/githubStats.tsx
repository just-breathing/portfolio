"use client";

import Image from "next/image";

export function GitHubStatsCard({ username }: { username: string }) {
  return (
    <section
      id="github"
      className="border border-gray-700 rounded-lg p-4 bg-gray-800  mt-[30px] md:mt-[100px]"
    >
      <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub Activity
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-self-center">
        {/* Stats Card */}
        <div className="bg-gray-900 p-3 rounded-lg">
          <Image
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&bg_color=1a1b26&title_color=60a5fa&text_color=ffffff&icon_color=60a5fa&hide_border=true`}
            alt={`GitHub stats for ${username}`}
            width={500}
            height={500}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Streak Card */}
        <div className="bg-gray-900 p-3 rounded-lg">
          <Image
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&background=1a1b26&stroke=1a1b26&ring=60a5fa&fire=60a5fa&currStreakLabel=60a5fa&hide_border=true`}
            alt={`GitHub streak for ${username}`}
            width={500}
            height={500}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        {/* Languages Card - Full width below */}
        <div className=" bg-gray-900 p-3 rounded-lg ">
          <Image
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark&bg_color=1a1b26&title_color=60a5fa&text_color=ffffff&hide_border=true`}
            alt={`Top languages for ${username}`}
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
        className="inline-block mt-4 text-sm text-blue-400 hover:underline"
      >
        View Full Profile →
      </a>
    </section>
  );
}
