"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Link2 } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";
import GithubSVG from "@/assets/github (1).svg";

export interface ProjectProps {
  name: string;
  content: string;
  link: string;
  githubLink: string;
  tech?: readonly string[] | string[];
  images: (StaticImageData | string)[];
  canChangeProject: boolean;
  onPreviousProject: () => void;
  onNextProject: () => void;
}

function ProjectTab({
  name,
  content,
  link,
  githubLink,
  tech = [],
  images,
}: ProjectProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [transitionDirection, setTransitionDirection] = useState<
    "next" | "previous"
  >("next");

  const playClickSound = useClickSound();

  const moveImage = (direction: "next" | "previous") => {
    if (images.length < 2) return;

    playClickSound();

    setTransitionDirection(direction);

    setCurrentImageIndex((current) =>
      direction === "next"
        ? (current + 1) % images.length
        : (current - 1 + images.length) % images.length
    );
  };

  const selectImage = (index: number) => {
    if (index === currentImageIndex) return;

    playClickSound();

    setTransitionDirection(
      index > currentImageIndex ? "next" : "previous"
    );

    setCurrentImageIndex(index);
  };

  const imageAnimation =
    transitionDirection === "next"
      ? "animate-[project-image-in-next_220ms_ease-out]"
      : "animate-[project-image-in-previous_220ms_ease-out]";

  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden px-1 font-pixel sm:px-2">

      {/* =========================
          SCREENSHOT CAROUSEL
      ========================== */}
      <section className="rounded-2xl border-2 border-pink-200 bg-pink-50/60 p-2 shadow-inner sm:p-4">
        <div className="flex w-full items-center gap-2 sm:gap-5">

          {/* Previous Screenshot */}
          <button
            type="button"
            onClick={() => moveImage("previous")}
            disabled={images.length < 2}
            aria-label="Previous screenshot"
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border-2 border-pink-950
              bg-pink-400 text-pink-950
              shadow-[0_4px_0_#831843]
              transition-transform duration-150
              hover:scale-105 hover:bg-pink-300
              active:scale-95
              disabled:cursor-default
              disabled:opacity-40
              sm:h-16 sm:w-16
              sm:rounded-2xl
              sm:border-[3px]
            "
          >
            <ChevronLeft
              className="h-6 w-6 stroke-[3] sm:h-10 sm:w-10"
            />
          </button>

          {/* Screenshot */}
          <div
            className="
              relative aspect-[16/10]
              min-w-0 flex-1
              overflow-hidden rounded-xl
              bg-white shadow-sm
              sm:aspect-auto
              sm:h-[clamp(220px,38vh,410px)]
            "
          >
            {link ? (
              <Link
                href={link}
                onClick={playClickSound}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group flex h-full w-full
                  items-center justify-center
                "
                aria-label={`Open ${name} live project`}
              >
                {images.length > 0 && (
                  <Image
                    key={`${name}-${currentImageIndex}`}
                    src={images[currentImageIndex]}
                    alt={`${name} project screenshot ${
                      currentImageIndex + 1
                    }`}
                    fill
                    sizes="
                      (max-width: 639px) 75vw,
                      (max-width: 1023px) 70vw,
                      800px
                    "
                    className={`
                      object-contain p-1
                      transition-transform duration-200
                      group-hover:scale-[1.01]
                      motion-reduce:transform-none
                      ${imageAnimation}
                      motion-reduce:animate-none
                    `}
                    priority
                  />
                )}
              </Link>
            ) : (
              images.length > 0 && (
                <Image
                  key={`${name}-${currentImageIndex}`}
                  src={images[currentImageIndex]}
                  alt={`${name} project screenshot ${
                    currentImageIndex + 1
                  }`}
                  fill
                  sizes="
                    (max-width: 639px) 75vw,
                    (max-width: 1023px) 70vw,
                    800px
                  "
                  className={`
                    object-contain p-1
                    ${imageAnimation}
                    motion-reduce:animate-none
                  `}
                  priority
                />
              )
            )}
          </div>

          {/* Next Screenshot */}
          <button
            type="button"
            onClick={() => moveImage("next")}
            disabled={images.length < 2}
            aria-label="Next screenshot"
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl border-2 border-pink-950
              bg-pink-400 text-pink-950
              shadow-[0_4px_0_#831843]
              transition-transform duration-150
              hover:scale-105 hover:bg-pink-300
              active:scale-95
              disabled:cursor-default
              disabled:opacity-40
              sm:h-16 sm:w-16
              sm:rounded-2xl
              sm:border-[3px]
            "
          >
            <ChevronRight
              className="h-6 w-6 stroke-[3] sm:h-10 sm:w-10"
            />
          </button>
        </div>

        {/* Screenshot Pagination Dots ONLY */}
        {images.length > 1 && (
          <div
            className="
              flex items-center justify-center
              gap-2 pt-2
            "
            aria-label="Project screenshots"
          >
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => selectImage(index)}
                aria-label={`Show screenshot ${index + 1}`}
                aria-current={
                  index === currentImageIndex
                    ? "true"
                    : undefined
                }
                className={`
                  h-2 rounded-full
                  transition-all duration-200
                  active:scale-90
                  ${
                    index === currentImageIndex
                      ? "w-7 bg-pink-600"
                      : "w-2 bg-pink-300 hover:bg-pink-400"
                  }
                `}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================
          PROJECT DETAILS
      ========================== */}
      <section
        className="
          mt-2 rounded-2xl
          border-2 border-pink-200
          bg-pink-50/70
          px-3 py-2.5
          sm:mt-3
          sm:px-5 sm:py-4
        "
      >
        {/* Project Name + Links */}
        <div className="flex items-center justify-between gap-3">
          <h2
            className="
              min-w-0 truncate
              font-pixel text-lg font-bold
              tracking-widest text-pink-950
              sm:text-2xl
            "
          >
            {name}
          </h2>

          {/* Project Links */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">

            {/* Live Project */}
            {link && (
              <Link
                href={link}
                onClick={playClickSound}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} live link`}
                className="
                  text-pink-800
                  transition-all duration-150
                  hover:scale-110
                  hover:text-pink-500
                  active:scale-95
                "
              >
                <Link2 className="h-5 w-5 sm:h-6 sm:w-6" />
              </Link>
            )}

            {/* GitHub */}
            {githubLink && (
              <Link
                href={githubLink}
                onClick={playClickSound}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} GitHub`}
                className="
                  transition-transform duration-150
                  hover:scale-110
                  active:scale-95
                "
              >
                <Image
                  src={GithubSVG}
                  className="h-5 w-5 rounded-full sm:h-6 sm:w-6"
                  alt="GitHub"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Project Description */}
        {content && (
          <p
            className="
              mt-2
              text-xs leading-relaxed
              text-pink-950/80
              sm:text-sm
            "
          >
            {content}
          </p>
        )}

        {/* Technology Tags */}
        {tech.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {tech.map((tag) => (
              <span
                key={tag}
                className="
                  select-none
                  rounded-md
                  border border-pink-200
                  bg-pink-100
                  px-2.5 py-0.5
                  font-mono text-xs
                  tracking-wider
                  text-pink-900
                  transition-all duration-150
                  hover:-translate-y-0.5
                  hover:border-pink-300
                  hover:bg-pink-200
                  hover:text-pink-950
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProjectTab;