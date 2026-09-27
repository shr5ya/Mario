"use client";

import Image from "next/image";
import { useClickSound } from "@/hooks/useClickSound";

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  image: string;
  credentialUrl: string;
}

const certificates: Certificate[] = [
  {
    title: "The Complete 2026 Software Testing Bootcamp",
    issuer: "Udemy",
    year: "2026",
    image: "/certificates/testing.jpg",
    credentialUrl:
      "https://www.udemy.com/certificate/UC-2e782b6d-17b4-47cf-aedb-d832dd066b49/",
  },

  {
    title: "Software Product Management",
    issuer: "Coursera",
    year: "2026",
    image: "/certificates/software-product.jpg",
    credentialUrl:
      "https://coursera.org/verify/specialization/XGIN2TFU9QXO",
  },

  {
    title: "IBM Applied DevOps Engineering",
    issuer: "IBM / Coursera",
    year: "2025",
    image: "/certificates/devops.jpg",
    credentialUrl:
      "https://coursera.org/verify/professional-cert/HYR6F3UGFL10",
  },
];

function Certificates() {
  const playClickSound = useClickSound();

  return (
    <section className="w-full px-4 py-4 font-pixel sm:px-6 sm:py-5 md:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {certificates.map((certificate) => (
          <article
            key={certificate.title}
            className="
              group
              overflow-hidden
              rounded-xl
              border-[2.5px]
              border-black
              bg-pink-100
              shadow-[4px_4px_0px_#111]
              transition-all
              duration-200
              hover:-translate-y-1
              hover:shadow-[6px_6px_0px_#111]
            "
          >
            {/* ================= CERTIFICATE PREVIEW ================= */}
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="block"
              aria-label={`View ${certificate.title} credential`}
            >
              <div
                className="
                  relative
                  h-48
                  w-full
                  overflow-hidden
                  border-b-[2.5px]
                  border-black
                  bg-zinc-100
                  p-2
                  sm:h-52
                "
              >
                {/* Inner certificate frame */}
                <div
                  className="
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    rounded-md
                    border
                    border-zinc-300
                    bg-white
                    shadow-inner
                  "
                >
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    fill
                    sizes="(max-width: 639px) 100vw, 50vw"
                    className="
                      object-contain
                      p-1
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:scale-[1.04]
                    "
                  />

                  {/* Subtle hover overlay */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-black/0
                      transition-all
                      duration-300
                      group-hover:bg-black/[0.03]
                    "
                  />

                  {/* Click hint */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      right-2
                      top-2
                      rounded-md
                      border
                      border-black/20
                      bg-white/90
                      px-2
                      py-1
                      text-[9px]
                      text-pink-900
                      opacity-0
                      shadow-sm
                      transition-opacity
                      duration-200
                      group-hover:opacity-100
                    "
                  >
                    View Certificate
                  </div>
                </div>
              </div>
            </a>

            {/* ================= DETAILS ================= */}
            <div className="p-3 sm:p-4">
              <h2 className="text-sm leading-relaxed text-pink-950 sm:text-base">
                {certificate.title}
              </h2>

              <div className="mt-1.5 flex items-center justify-between gap-2 text-xs text-pink-900 sm:text-sm">
                <span>{certificate.issuer}</span>
                <span>{certificate.year}</span>
              </div>

              {/* ================= CREDENTIAL BUTTON ================= */}
              <a
                href={certificate.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="
                  mt-3
                  inline-flex
                  items-center
                  rounded-lg
                  border-2
                  border-pink-900
                  bg-pink-200
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  text-pink-950
                  shadow-[2px_2px_0px_#831843]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-pink-300
                  hover:shadow-[3px_3px_0px_#831843]
                  active:translate-x-[1px]
                  active:translate-y-[1px]
                "
              >
                View Credential →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Certificates;