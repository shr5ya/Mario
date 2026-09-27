"use client"

import React, { use } from 'react'
import GithubContributions from './GithubContributions'
import TechStack from './TechStack'
import Link from 'next/link'
import { useClickSound } from '@/hooks/useClickSound'
import { Download } from "lucide-react"

function Skills() {
  const playClickSound = useClickSound();
  return (
    <div>
      <TechStack />
      <div className='flex flex-wrap gap-4 px-4 pt-4 sm:px-6 lg:px-12'>

        <a
          href="/resume.pdf"
          download="Shreya_Yadav_Resume.pdf"
          onClick={playClickSound}
          className="flex items-center gap-1.5 w-fit rounded-xl border-2 border-pink-900 bg-pink-100 px-2.5 py-1.5 text-lg font-semibold text-pink-950 shadow-[3px_3px_0px_#831843] transition-all hover:-translate-y-0.5 hover:bg-pink-200 sm:gap-2 sm:px-3"
        >
          <div className="flex flex-row gap-2 items-center">
            <span>Resume</span>
            <Download className="w-6 h-6" />
          </div>
        </a>
      </div>
      <GithubContributions />
      
    </div>
  )
}

export default Skills
