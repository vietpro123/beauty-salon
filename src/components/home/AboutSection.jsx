import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function AboutSection() {
  return (
    <section className="py-28 md:py-40 px-3 md:px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
        <Reveal className="md:col-span-5">
          <h2 className="font-serif text-5xl md:text-6xl leading-[0.95] text-balance">
            Results-driven treatments<br />
            <span className="italic text-secondary">that center your natural beauty</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-7 space-y-6 text-foreground/75 text-[16px] leading-[1.8]">
          <p>
            Maison Luminaire was founded on a simple observation, the beauty industry had collapsed its two oldest traditions the atelier and the apothecary into something neither. We wanted to build back the sanctuary.
          </p>
          <p>
            Ten years on, our studio is a quiet ground-floor space in lower Manhattan. Our stylists and estheticians train in clinical and editorial disciplines. Every service is a considered ritual from consultation to finish.
          </p>
          <Link
            to="/about"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-foreground hover:text-secondary transition"
          >
            Read our full story
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}