import React from "react";
import Reveal from "@/components/shared/Reveal";

export default function ServicesHeading() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
      <Reveal y={40} delay={0}>
        <h2 className="mt-5 font-serif text-5xl md:text-7xl leading-[0.95] text-balance max-w-3xl">
          Three disciplines<br />
          <span className="italic text-secondary">One quiet practice</span>
        </h2>
      </Reveal>
      <Reveal y={40} delay={0.15} className="max-w-sm text-foreground/70 leading-[1.6]">
        Every service at Maison Luminaire is designed especially for you with signature products, and an outcome that feels inevitably right.
      </Reveal>
    </div>
  );
}