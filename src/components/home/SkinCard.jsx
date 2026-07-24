import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

export default function SkinCard() {
  return (
    <Reveal y={50} delay={0.25} className="bg-background">
      <Link to="/services?category=skin" onClick={() => window.scrollTo(0, 0)} className="group block relative overflow-hidden">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/18817d61a_generated_67d1be5b.png"
            alt="Skin"
            className="w-full h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-editorial text-foreground/50 mb-3">02 / Category</div>
              <h3 className="font-serif text-4xl md:text-5xl">Skin</h3>
              <div className="italic text-foreground/70 mt-2">Clinical care, editorial glow.</div>
            </div>
            <ArrowUpRight className="h-5 w-5 mt-2 text-foreground/40 transition-all group-hover:rotate-45 group-hover:text-foreground" />
          </div>
          <p className="mt-6 text-sm text-foreground/70 leading-[1.7] max-w-xs">HydraFacial protocols, bespoke facials, and corrective skin treatments led by licensed estheticians.</p>
        </div>
      </Link>
    </Reveal>
  );
}