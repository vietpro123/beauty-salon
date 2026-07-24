import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function NailsCard() {
  return (
    <Reveal y={50} delay={0.4} className="bg-background">
      <Link to="/services?category=nails" onClick={() => window.scrollTo(0, 0)} className="group block relative overflow-hidden">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/dfd33f306_untitled_ChatGPT_Images_20_Edit_2026-06-14_07-08-35.png"
            alt="Nails"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-editorial text-foreground/50 mb-3">03 / Category</div>
              <h3 className="font-serif text-4xl md:text-5xl">Nails</h3>
              <div className="italic text-foreground/70 mt-2">Considered hands, elevated details.</div>
            </div>
            <ArrowUpRight className="h-5 w-5 mt-2 text-foreground/40 transition-all group-hover:rotate-45 group-hover:text-foreground" />
          </div>
          <p className="mt-6 text-sm text-foreground/70 leading-[1.7] max-w-xs">Luxe gel manicures, pedicures, and minimalist nail art in a quiet, focused environment.</p>
        </div>
      </Link>
    </Reveal>
  );
}