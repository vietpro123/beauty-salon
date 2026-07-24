import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { FALLBACK_STYLISTS } from "@/lib/fallbackData";
import { Link } from "react-router-dom";
import Reveal from "@/components/shared/Reveal";
import { ArrowUpRight } from "lucide-react";

export default function Team() {
  const [stylists, setStylists] = useState(FALLBACK_STYLISTS);

  useEffect(() => {
    base44.entities.Stylist.list("display_order")
      .then((list) => {
        if (list && list.length) setStylists(list);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="pt-40 md:pt-52 pb-16 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h1 className="mt-6 font-serif text-6xl md:text-[8.5rem] leading-[0.92] tracking-tight text-balance">
              The hands behind<br />
              <span className="italic text-secondary">the work</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-lg text-foreground/70 leading-[1.7]">
            Our team is small by design. Each stylist carries a distinct point of view and a shared belief that your time is sacred.
          </Reveal>
        </div>
      </section>

      <section className="pb-28 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10">
          {stylists.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08} className="bg-background">
              <article className="group relative p-6 md:p-8">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={s.portrait_url}
                    alt={s.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <img
                    src={s.portrait_color_url || s.portrait_url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-6">
                  <div className="text-[10px] uppercase tracking-editorial text-foreground/50">
                    0{i + 1} / {s.years_experience} yrs
                  </div>
                  <h3 className="mt-3 font-serif text-3xl">{s.name}</h3>
                  <div className="italic text-foreground/70 mt-1 text-sm">{s.title}</div>
                  <div className="mt-5 text-sm text-foreground/70 leading-[1.7] space-y-3">
                    {(Array.isArray(s.bio) ? s.bio : [s.bio]).map((paragraph, pi) => (
                      <p key={pi}>{paragraph}</p>
                    ))}
                  </div>


                  <Link
                    to={`/book?stylist=${s.slug}`}
                    className="mt-6 inline-flex items-center justify-between w-full gap-2 group/btn rounded-full border border-foreground/20 px-5 py-3 text-[11px] uppercase tracking-editorial hover:bg-foreground hover:text-background transition-colors duration-500"
                  >
                    Book with {s.name.split(" ")[0]}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:rotate-45" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}