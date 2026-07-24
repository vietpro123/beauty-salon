import React from "react";
import Reveal from "@/components/shared/Reveal";
import MagneticButton from "@/components/shared/MagneticButton";

const VALUES = [
  { n: "01", title: "Considered pace", body: "We never double-book. Every appointment has the time it deserves." },
  { n: "02", title: "Clinical craft", body: "Our team trains in clinical and editorial disciplines — precision meets vision." },
  { n: "03", title: "Quiet luxury", body: "No loud music, no stock imagery. Just considered design and honest service." },
  { n: "04", title: "Honest pricing", body: "Transparent starting prices. Quotes before we begin — never after." },
];

export default function About() {
  return (
    <>
      <section className="pt-40 md:pt-52 pb-20 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h1 className="mt-6 font-serif text-6xl md:text-[8.5rem] leading-[0.92] tracking-tight text-balance">
              Beauty, <span className="italic text-secondary">reconsidered</span>
              <br />
              from the ground up
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="px-3 md:px-6 pb-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="aspect-[21/9] overflow-hidden">
            <img src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c5bccd8fb_generated_1805c623.png" alt="Salon interior" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 px-3 md:px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-4">
            <div className="text-[17px] uppercase tracking-editorial text-foreground/50 md:sticky md:top-32">
              WHAT SETS US APART
            </div>
          </Reveal>
          <div className="md:col-span-8 space-y-8 text-foreground/80 text-[17px] leading-[1.8]">
            <Reveal>
              <p>
                Maison Luminaire was founded on a simple observation: the beauty industry had
                collapsed its two oldest traditions — the atelier and the apothecary — into
                something neither. We wanted to build back the sanctuary.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Ten years on, our studio is a quiet ground-floor space in lower Manhattan
                designed by architects who understood we needed light, air, and the
                permission to slow down. Our stylists and estheticians train in clinical and
                editorial disciplines, and every service we offer is a considered ritual —
                from the 15-minute consultation that begins each visit to the hand-blended
                products we send you home with.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                We don't chase trends. We refine technique. The result is work that grows out
                beautifully, ages with grace, and feels — above all — inevitably right.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-28 px-3 md:px-6 bg-foreground text-background">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl">Four commitments</h2>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-background/30">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.08} className="bg-foreground p-10 md:p-14">
                <div className="text-[11px] uppercase tracking-editorial text-background/50">{v.n}</div>
                <h3 className="mt-4 font-serif text-3xl">{v.title}</h3>
                <p className="mt-5 text-background/70 leading-[1.7] max-w-md">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}