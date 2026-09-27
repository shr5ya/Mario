import BrowserLayout from "@/components/BrowserLayout";
import Projects from "@/components/Projects";
import About from "@/components/About";
import React from "react";
import SingleTabBrowser from "@/components/SingleTabBrowser";

export default function ProjectsPage() {
  return (
    <div className="flex min-h-dvh w-full flex-row px-0 py-1 sm:px-2 lg:px-3 xl:px-4">
      <div className="hidden xl:flex xl:w-[32%]">
        <SingleTabBrowser tabName="About" theme="pink">
          <About />
        </SingleTabBrowser>
      </div>

      <div className="min-h-dvh w-full xl:w-[68%]">
        <SingleTabBrowser link="/info" tabName="Projects" theme="yellow">
          <Projects />
        </SingleTabBrowser>
      </div>
    </div>
  );
}
