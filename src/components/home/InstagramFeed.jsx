import React from "react";
import { Instagram } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import { SALON } from "@/lib/salonConfig";

export default function InstagramFeed() {
  return (
    <section className="relative py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <Reveal>
            <h2 className="mt-5 font-serif text-4xl md:text-6xl">@maisonluminaire</h2>
          </Reveal>
          <a
            href={SALON.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-foreground/70 hover:text-foreground"
          >
            <Instagram className="h-4 w-4" />
            Follow along
          </a>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {/* Image 1 — Skincare Treatment */}
          <Reveal delay={0}>
            <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group block relative aspect-square overflow-hidden">
              <img src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/638d54f00_generated_image.png" alt="Skincare Treatment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          </Reveal>
          {/* Image 2 — Bridal Chignon */}
          <Reveal delay={0.05}>
            <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group block relative aspect-square overflow-hidden">
              <img src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/ef139f876_untitled_ChatGPT_Images_20_Edit_2026-06-14_08-19-12.png" alt="Bridal Chignon" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          </Reveal>
          {/* Image 3 — Architectural Bob */}
          <Reveal delay={0.1}>
            <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group block relative aspect-square overflow-hidden">
              <img src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/04e7a210e_generated_270fe41f.png" alt="Architectural Bob" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          </Reveal>
          {/* Image 4 — Copper Renaissance */}
          <Reveal delay={0.15}>
            <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group block relative aspect-square overflow-hidden">
              <img src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/469a98cf2_untitled_ChatGPT_Images_20_Edit_2026-06-14_08-03-42.png" alt="Copper Renaissance" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          </Reveal>
          {/* Image 5 — Minimalist Manicure */}
          <Reveal delay={0.2}>
            <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group block relative aspect-square overflow-hidden">
              <img src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/982264062_generated_7a2441d4.png" alt="Minimalist Manicure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          </Reveal>
          {/* Image 6 — Luminous Complexion */}
          <Reveal delay={0.25}>
            <a href={SALON.instagram} target="_blank" rel="noreferrer" className="group block relative aspect-square overflow-hidden">
              <img src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/685fe0ec9_generated_image.png" alt="Luminous Complexion" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}