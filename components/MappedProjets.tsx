"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Project from "./ProjectTab";
import { useClickSound } from "@/hooks/useClickSound";

interface ProjectData {
  name: string;
  content: string;
  link: string;
  githubLink: string;
  tech: string[];
  images: any[];
}

interface ProjectsI {
  projects: ProjectData[];
}

function MappedProjects({ projects }: ProjectsI) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playClickSound = useClickSound();

  if (!projects || projects.length === 0) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-pink-400">
        No projects available
      </div>
    );
  }

  const activeProject = projects[currentIndex];

  const moveProject = (direction: "next" | "previous") => {
    if (projects.length < 2) return;

    playClickSound();

    setCurrentIndex((current) =>
      direction === "next"
        ? (current + 1) % projects.length
        : (current - 1 + projects.length) % projects.length
    );
  };

  return (
    <div className="relative flex w-full flex-col overflow-hidden px-3 pt-3 sm:px-5 sm:pt-4 md:px-8 lg:px-12">
      {/* Active Project */}
      <Project
        key={activeProject.name}
        name={activeProject.name}
        content={activeProject.content}
        link={activeProject.link}
        githubLink={activeProject.githubLink}
        images={activeProject.images}
        tech={activeProject.tech}
        canChangeProject={projects.length > 1}
        onPreviousProject={() => moveProject("previous")}
        onNextProject={() => moveProject("next")}
      />

      {/* Project Navigation */}
      {projects.length > 1 && (
        <nav
          aria-label="Project navigation"
          className="
            mx-auto mt-3 flex w-full max-w-6xl
            items-center justify-center
            gap-4
            pt-1
            font-pixel
            sm:mt-4 sm:gap-6
          "
        >
          {/* Previous Project */}
          <button
            type="button"
            onClick={() => moveProject("previous")}
            aria-label="Previous project"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              border-2 border-pink-300
              bg-white
              text-pink-900
              shadow-sm
              transition-all duration-150
              hover:scale-105
              hover:bg-pink-100
              active:scale-95
              sm:h-11 sm:w-11
            "
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Project Dots */}
          <div
            className="flex items-center gap-2"
            aria-label="Choose project"
          >
            {projects.map((project, index) => (
              <button
                key={project.name}
                type="button"
                onClick={() => {
                  if (index === currentIndex) return;

                  playClickSound();
                  setCurrentIndex(index);
                }}
                aria-label={`Show project ${index + 1}: ${project.name}`}
                aria-current={
                  index === currentIndex ? "true" : undefined
                }
                className={`
                  h-2.5 rounded-full
                  transition-all duration-200
                  active:scale-90
                  ${
                    index === currentIndex
                      ? "w-6 bg-pink-600"
                      : "w-2.5 bg-pink-300 hover:bg-pink-400"
                  }
                `}
              />
            ))}
          </div>

          {/* Next Project */}
          <button
            type="button"
            onClick={() => moveProject("next")}
            aria-label="Next project"
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-full
              border-2 border-pink-300
              bg-white
              text-pink-900
              shadow-sm
              transition-all duration-150
              hover:scale-105
              hover:bg-pink-100
              active:scale-95
              sm:h-11 sm:w-11
            "
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </nav>
      )}
    </div>
  );
}

export default MappedProjects;