"use client";

import React from "react";
import Image from "next/image";

import {
  ChromeSVG,
  CSSSVG,
  ExpressSVG,
  GitSVG,
  GithubSVG,
  HTMLSVG,
  JiraSVG,
  MongoSVG,
  MysqlSVG,
  NodeSVG,
  ReactSVG,
  TailwindSVG,
  VSSVG,
  PostmanSVG,
  JavascriptSVG
} from "@/assets/techicons/techicons";
import { Icon } from "lucide-react";

const skills = [
  {
    label: "QA & Software Testing",
    items: [
      { name: "Manual Testing" },
      { name: "Functional Testing" },
      { name: "Regression Testing" },
      { name: "Smoke & Sanity Testing" },
      { name: "Test Case Design" },
      { name: "Bug Reporting" },
      { name: "SDLC" },
      { name: "STLC" },
      { name: "Agile/Scrum" },
    ],
  },

  {
    label: "Automation Testing",
    items: [
      { name: "Selenium WebDriver" },
      { name: "Java" },
      { name: "Test Automation" },
      { name: "Web Automation" },
    ],
  },

  {
    label: "API & Database Testing",
    items: [
      { name: "Postman" , icon:PostmanSVG},
      { name: "REST APIs" },
      { name: "SQL" },
      { name: "MySQL", icon: MysqlSVG },
      { name: "MongoDB", icon: MongoSVG },
    ],
  },

  {
    label: "Development",
    items: [
      { name: "JavaScript", icon:JavascriptSVG },
      { name: "React.js", icon: ReactSVG },
      { name: "Node.js", icon: NodeSVG },
      { name: "Express.js", icon: ExpressSVG },
      { name: "HTML", icon: HTMLSVG },
      { name: "CSS", icon: CSSSVG },
      { name: "Tailwind CSS", icon: TailwindSVG },
    
    ],
  },

  {
    label: "Tools & Workflow",
    items: [
      { name: "Jira", icon: JiraSVG },
      { name: "Git", icon: GitSVG },
      { name: "GitHub", icon: GithubSVG },
      { name: "Chrome DevTools", icon: ChromeSVG },
      { name: "VS Code", icon: VSSVG },
    ],
  },
];

function SkillItem({
  text,
  icon,
}: {
  text: string;
  icon?: any;
}) {
  return (
    <div className="flex flex-row text-xs font-pixel border border-pink-200/40 rounded bg-pink-100/80 w-fit px-2 py-1 items-center gap-2 transition-all duration-150 hover:-translate-y-0.5 hover:border-pink-300 hover:bg-pink-200 hover:shadow-[2px_2px_0px_#f472b6] active:scale-95 motion-reduce:transform-none">
      {icon && (
        <Image
          className="w-7 h-7"
          src={icon}
          alt={text}
          width={28}
          height={28}
        />
      )}

      <p>{text}</p>
    </div>
  );
}

function TechStack() {
  return (
    <div className="px-4 py-2 sm:px-6 lg:px-12 lg:py-6">
      {skills.map((skill) => (
        <div
          key={skill.label}
          className="flex flex-col gap-2"
        >
          <p className="font-semibold pt-4">{skill.label}</p>

          <div className="flex flex-wrap gap-2 py-">
            {skill.items.map((item) => (
              <SkillItem
                key={item.name}
                text={item.name}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TechStack;
