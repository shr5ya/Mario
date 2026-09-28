"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useClickSound } from "@/hooks/useClickSound";

const gameMelody = [
  659.25, 0, 783.99, 0, 880, 783.99, 659.25, 0,
  523.25, 587.33, 659.25, 0, 783.99, 0, 659.25, 523.25,
];

function HomePage() {
  const playClickSound = useClickSound();

  useEffect(() => {
    let audioContext: AudioContext;
    try {
      audioContext = new window.AudioContext();
    } catch {
      return;
    }

    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.08, audioContext.currentTime);
    masterGain.connect(audioContext.destination);

    let timer: number | null = null;
    let step = 0;

    const playStep = () => {
      const frequency = gameMelody[step];
      step = (step + 1) % gameMelody.length;
      if (frequency === 0) return;

      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const noteGain = audioContext.createGain();
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(frequency, now);
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.22, now + 0.012);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.21);
      oscillator.connect(noteGain);
      noteGain.connect(masterGain);
      oscillator.start(now);
      oscillator.stop(now + 0.22);
    };

    const startLoop = () => {
      if (timer !== null || audioContext.state !== "running") return;
      playStep();
      timer = window.setInterval(playStep, 260);
      document.removeEventListener("pointerdown", resumeMusic);
      document.removeEventListener("keydown", resumeMusic);
    };

    const resumeMusic = () => {
      if (audioContext.state === "running") {
        startLoop();
        return;
      }

      void audioContext.resume().then(startLoop).catch(() => {});
    };

    document.addEventListener("pointerdown", resumeMusic);
    document.addEventListener("keydown", resumeMusic);
    resumeMusic();

    return () => {
      document.removeEventListener("pointerdown", resumeMusic);
      document.removeEventListener("keydown", resumeMusic);
      if (timer !== null) window.clearInterval(timer);
      void audioContext.close();
    };
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center -mt-4 px-4 py-8 sm:-mt-8 sm:px-6 sm:py-12">
      <div className="flex flex-col items-center text-center font-pixel text-white">
        <p className="text-xl text-pink-200 sm:text-2xl md:text-3xl">
          Welcome to Shreya&apos;s
        </p>

        <h1
          className="
            text-[clamp(2.75rem,12vw,4.5rem)] font-semibold leading-none text-white md:text-8xl
            [-webkit-text-stroke:2px_#f472b6]
            drop-shadow-[4px_4px_0px_#831843]
          "
        >
          Portfolio
        </h1>

        <p className="mt-5 font-pixel text-sm tracking-wide text-pink-100 md:text-base">
          Breaking software before users do.
        </p>
      </div>

      <Link
        href="/info"
        onClick={playClickSound}
        className="
          mt-10 border-2 border-pink-950 bg-pink-400 px-8 py-2
          font-pixel text-xl font-semibold text-pink-950
          shadow-[5px_5px_0px_#831843]
          transition-all duration-150
          hover:-translate-y-1 hover:bg-pink-300 hover:shadow-[6px_6px_0px_#831843]
          active:translate-x-[4px] active:translate-y-[4px] active:shadow-[1px_1px_0px_#831843]
        "
      >
        Start
      </Link>
    </div>
  );
}

export default HomePage;
