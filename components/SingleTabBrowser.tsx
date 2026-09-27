"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Maximize2, Minimize2 } from "lucide-react";
import { useClickSound } from "@/hooks/useClickSound";

interface BrowserLayoutProps {
  children: React.ReactNode;
  tabName: string;
  theme?: "pink" | "yellow";
  link?: string;
}

function SingleTabBrowser({
  children,
  tabName,
  theme = "pink",
  link
}: BrowserLayoutProps) {
  const [origin, setOrigin] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const path = usePathname();
  const playClickSound = useClickSound();
 
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenEl =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      setIsFullscreen(!!fullscreenEl);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      const doc = document as any;
      const docEl = document.documentElement as any;

      const fullscreenEl =
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement;

      if (!fullscreenEl) {
        if (docEl.requestFullscreen) {
          await docEl.requestFullscreen();
        } else if (docEl.webkitRequestFullscreen) {
          await docEl.webkitRequestFullscreen();
        } else if (docEl.mozRequestFullScreen) {
          await docEl.mozRequestFullScreen();
        } else if (docEl.msRequestFullscreen) {
          await docEl.msRequestFullscreen();
        }
      } else {
        if (doc.exitFullscreen) {
          await doc.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  const themes = {
    pink: {
      header: "bg-[#d936b8]",
      toolbar: "bg-[#ed5dcc]",
      activeTab: "bg-[#ed5dcc]",
      inactiveTab: "bg-[#d936b8]",
      button: "bg-[#e95dcc]",
      hoverButton: "hover:bg-[#f178d7]",
      hoverTab: "hover:bg-[#e95dcc]",
      hoverNav: "hover:bg-pink-300",
      traffic: [
        "bg-[#e95dcc]",
        "bg-[#f178d7]",
        "bg-[#f5a0e4]",
      ],
    },

    yellow: {
      header: "bg-[#e5b800]",
      toolbar: "bg-[#f4d03f]",
      activeTab: "bg-[#f4d03f]",
      inactiveTab: "bg-[#e5b800]",
      button: "bg-[#f1c40f]",
      hoverButton: "hover:bg-[#f7dc6f]",
      hoverTab: "hover:bg-[#f1c40f]",
      hoverNav: "hover:bg-yellow-300",
      traffic: [
        "bg-[#f1c40f]",
        "bg-[#f7dc6f]",
        "bg-[#f9e79f]",
      ],
    },
  };

  const currentTheme = themes[theme];
  const frameSize =
    theme === "yellow"
      ? "sm:h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-1.5rem)] sm:max-w-4xl lg:h-[min(88dvh,52rem)] lg:max-h-[min(88dvh,52rem)]"
      : "sm:h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-1.5rem)] sm:max-w-5xl lg:h-[min(88dvh,52rem)] lg:max-h-[min(88dvh,52rem)]";

  return (
    <div className="flex h-dvh w-full items-center justify-center overflow-hidden p-2 sm:p-3 lg:p-4">
      <div
        className={`
          relative
          flex h-full w-full max-h-full flex-col
          overflow-hidden
          rounded-2xl border-[3px] border-black
          bg-white
          shadow-[4px_4px_0px_#111]
          ${frameSize}
          sm:rounded-[22px]
          sm:shadow-[8px_8px_0px_#111]
        `}
      >
        {/* Browser Header */}
        <div
          className={`
            relative flex h-11 shrink-0 items-center justify-between
            border-b-[3px] border-black
            px-2
            ${currentTheme.header}
            sm:h-14 sm:px-5
          `}
        >
          {/* Traffic Lights */}
          <div
            className="
              z-10 mr-2 flex shrink-0 gap-1.5
              sm:mr-6 sm:gap-3
            "
          >
            {currentTheme.traffic.map((color, index) => (
              <span
                key={index}
                className={`
                  h-3 w-3 rounded-full border-2 border-black
                  sm:h-4 sm:w-4 sm:border-[3px]
                  ${color}
                `}
              />
            ))}
          </div>

          {/* Single Tab */}
          <div
            className={`
              flex h-full min-w-0 flex-1
              items-end
            `}
          >
            <div
              onClick={playClickSound}
              className={`
                flex h-8 shrink-0 items-center justify-center
                rounded-t-lg border-2 border-b-0 border-black
                px-4
                font-pixel text-[10px] font-semibold
                ${currentTheme.activeTab}

                sm:h-10
                sm:w-32
                sm:rounded-t-xl
                sm:border-[3px]
                sm:border-b-0
                sm:px-2
                sm:text-base
              `}
            >
              {tabName}
            </div>
          </div>

          {/* Browser Buttons */}
          <div className="z-10 ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Fullscreen */}
            <button
              type="button"
              onClick={() => {
                toggleFullscreen();
                playClickSound();
              }}
              className={`
                flex h-7 w-7 items-center justify-center
                rounded-full border-2 border-black
                text-xs font-bold
                transition-colors
                active:scale-95
                ${currentTheme.button}
                ${currentTheme.hoverButton}
                sm:h-8 sm:w-8
                sm:border-[3px]
              `}
              aria-label={
                isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
              }
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5 text-black sm:h-4 sm:w-4" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5 text-black sm:h-4 sm:w-4" />
              )}
            </button>

            {/* Close */}
            <Link
              href={`${link ? link : "/"}`}
              onClick={playClickSound}
              className={`
                flex h-7 w-7 items-center justify-center
                rounded-full border-2 border-black
                text-xs font-bold
                transition-colors
                active:scale-95
                ${currentTheme.button}
                ${currentTheme.hoverButton}

                sm:h-8 sm:w-8
                sm:border-[3px]
                sm:text-base
              `}
              title="Close"
            >
              X
            </Link>
          </div>
        </div>

        {/* Browser Toolbar */}
        <div
          className={`
            flex h-12 shrink-0 items-center gap-1.5
            border-b-[3px] border-black
            px-2
            ${currentTheme.toolbar}

            sm:h-14 sm:gap-2 sm:px-4
          `}
        >
          {/* Navigation */}
          <div className="flex shrink-0 items-center justify-center text-lg font-bold sm:text-2xl">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                window.history.back();
              }}
              className={`
                flex h-7 w-7 items-center justify-center
                rounded-full
                ${currentTheme.hoverNav}
                sm:h-8 sm:w-8
              `}
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                window.history.forward();
              }}
              className={`
                hidden h-7 w-7 items-center justify-center
                rounded-full
                ${currentTheme.hoverNav}
                sm:flex sm:h-8 sm:w-8
              `}
            >
              →
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                window.location.reload();
              }}
              className={`
                flex h-7 w-7 items-center justify-center
                rounded-full
                ${currentTheme.hoverNav}
                sm:h-8 sm:w-8
              `}
            >
              ↻
            </button>
          </div>

          {/* Address Bar */}
          <div
            className="
              flex h-8 min-w-0 flex-1 items-center
              rounded-full border-2 border-black
              bg-white px-2
              sm:h-10 sm:border-[3px] sm:px-3
            "
          >
            {/* Search Icon */}
            <div
              className="
                relative h-4 w-4 shrink-0
                rounded-full border-2 border-black
                sm:h-5 sm:w-5 sm:border-[3px]
              "
            >
              <span
                className="
                  absolute -bottom-0.5 -right-1
                  h-0.5 w-1.5
                  rotate-45 bg-black
                  sm:h-0.75 sm:w-2
                "
              />
            </div>

            <span
              className="
                ml-2 min-w-0 truncate
                font-pixel text-[9px] text-gray-500
                sm:ml-3 sm:text-xs
              "
            >
              {origin}
              {path}
            </span>
          </div>

          {/* Browser Button */}
          <div
            className={`
              h-7 w-7 shrink-0
              rounded-full border-2 border-black
              ${currentTheme.button}

              sm:h-8 sm:w-8 sm:border-[3px]
            `}
          />
        </div>

        {/* Page Content */}
        <main
          className="
            min-h-0 flex-1
            overflow-y-auto overflow-x-hidden
            bg-white
            no-scrollbar
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default SingleTabBrowser;
