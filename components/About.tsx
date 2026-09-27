"use client";

import Image from "next/image";
import React from "react";
import DesktopBG from "@/assets/desktopbg2.jpeg";
import Shreya from "@/assets/shreya.png";

function About() {
  const skills = {
    Programming: ["Java", "C++"],
    Testing: ["JUnit", "Selenium"],
    Tools: ["Git", "GitHub", "VS Code"],
  };

  return (
    <div className="min-h-full w-full overflow-x-hidden bg-white">
      {/* Banner */}
      <div className="relative">
        <div className="relative h-36 w-full overflow-hidden sm:h-44 md:h-48">
          <Image
            src={DesktopBG}
            alt="Shreya workspace"
            fill
            priority
            className="object-cover object-center opacity-90"
          />
        </div>

        {/* Profile */}
        <div className="px-4 sm:px-6">
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-3 sm:gap-4">
            <div
              className="
                relative h-28 w-28 shrink-0
                -mt-14 sm:-mt-16
                rounded-full border-4 border-white bg-white shadow-sm
                transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-1
                motion-reduce:transform-none motion-reduce:transition-none
                sm:h-32 sm:w-32
                md:h-34 md:w-34
              "
            >
              <Image
                src={Shreya}
                alt="Shreya"
                fill
                priority
                className="rounded-full object-cover object-top p-0.5"
              />
            </div>

            <div className="pt-2 sm:pb-2">
              <h1 className="font-pixel text-xl font- text-black sm:text-2xl md:text-3xl leading-tight">
                Shreya Yadav
              </h1>

              <p className="font-pixel text-xs text-zinc-700 sm:text-sm md:text-base mt-0.5">
                Software Engineer-QA
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div
        className="
          flex flex-col gap-6
          px-5 pb-8 pt-6
          sm:px-8
          md:px-10
        "
      >
        {/* About */}
        <section>
          <h1 className="font-pixel text-2xl text-pink-400 sm:text-3xl">
            About
          </h1>

          <p
            className="
              mt-3
              text-left text-base leading-relaxed text-gray-700
              font-pixel
              sm:mt-4 sm:text-lg sm:text-justify
            "
          >
           I’m a Computer Science graduate working in Quality Assurance, with a strong interest in understanding how software works and finding where it can break. My experience includes functional and regression testing, API testing with Postman, SQL validation, log analysis, bug tracking, and troubleshooting real application issues. I enjoy digging into problems rather than just reporting them, whether that means checking logs, validating API responses, or working with developers to understand the root cause. I’m also building my skills in Java and Selenium to move deeper into automation and grow as an SDET.

          </p>
        </section>

        {/* Skills */}
        {/* <section>
          <p className="font-pixel text-xl text-pink-400 sm:text-2xl">
            Skills
          </p>

          <hr className="my-2 border-zinc-300" />

          <div className="flex flex-col gap-1.5">
            {Object.entries(skills).map(([category, items]) => (
              <p
                key={category}
                className="font-pixel text-sm sm:text-base"
              >
                <span className="font-semibold">{category}:</span>{" "}
                <span className="font-normal">{items.join(", ")}</span>
              </p>
            ))}
          </div>
        </section> */}

        {/* Education */}
        <section>
          <p className="font-pixel text-xl text-pink-400 sm:text-2xl">
            Education
          </p>

          <hr className="my-2 border-zinc-300" />

          <div>
            <div className="flex flex-col gap-1 font-pixel sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold sm:text-base">
              Chitkara University{" "}
              <span className="font-normal italic text-xs text-zinc-500 sm:text-sm">
                Rajpura, Punjab
              </span>
            </p>

            <p className="text-sm font-semibold sm:text-base">
              2022-2026
            </p>
          </div>
          <div className="font-pixel py-1">
            <p>Bachelor's of Engineering in Computer Science</p>
          </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <p className="font-pixel text-xl text-pink-400 sm:text-2xl">
            Experience
          </p>

          <hr className="my-2 border-zinc-300" />

          <div className="px-0 sm:px-2">
            <div className="flex flex-col gap-1 font-pixel sm:flex-row sm:items-center sm:justify-between">
              <p className="text-base font-semibold sm:text-lg">
                Vertex Infosoft
              </p>

              <p className="text-xs text-zinc-600 sm:text-sm">
                Full-time — Onsite
              </p>
            </div>

            <div className="mt-1 flex flex-col gap-1 font-pixel text-sm italic sm:flex-row sm:justify-between sm:text-base">
              <p className="">
              Software Tester
            </p>
            <p className="text-xs text-zinc-600 sm:text-sm">May 2026 - Present</p>
            </div>

<ul className="list-disc space-y-1 py-2 pl-5 font-pixel text-sm leading-relaxed text-gray-700 sm:text-base">
  <li>
    Perform functional, regression & exploratory testing across application
    workflows.
  </li>

  <li>
    Analyze application logs, API responses & SQL data to investigate and
    troubleshoot issues.
  </li>

  <li>
    Perform API testing using Postman and validate backend data using SQL
    queries.
  </li>

  <li>
    Identify, document, track & retest defects using Jira throughout the
    defect lifecycle.
  </li>

  <li>
    Collaborate with developers and cross-functional teams to investigate
    issues and ensure timely resolution.
  </li>

  <li>
    Validate UI, workflows, cross-browser compatibility & application
    behavior.
  </li>

  <li>
    Develop automation testing skills using Java & Selenium.
  </li>
</ul>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
