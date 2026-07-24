import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { FALLBACK_SERVICES } from "@/lib/fallbackData";
import Reveal from "@/components/shared/Reveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { ArrowUpRight } from "lucide-react";

const CATS = [
  { key: "all", label: "All" },
  { key: "hair", label: "Hair" },
  { key: "skin", label: "Skin" },
  { key: "nails", label: "Nails" },
];

export default function Services() {
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [searchParams, setSearchParams] = useSearchParams();
  const active = searchParams.get("category") || "all";

  useEffect(() => {
    base44.entities.Service.list()
      .then((list) => {
        if (list && list.length) setServices(list);
      })
      .catch(() => {});
  }, []);

  const filtered = useMemo(
    () => (active === "all" ? services : services.filter((s) => s.category === active)),
    [services, active]
  );

  const setCat = (c) => {
    if (c === "all") setSearchParams({});
    else setSearchParams({ category: c });
  };

  return (
    <>
      <section className="pt-40 md:pt-52 pb-20 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h1 className="mt-6 font-serif text-6xl md:text-[8rem] leading-[0.92] tracking-tight text-balance">
              Our Signature<br />
              <span className="italic text-secondary">Treatments</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 max-w-xl text-foreground/70 leading-[1.7]">
            Unveil the potential of your beauty through our curated treatments
          </Reveal>

          <Reveal delay={0.2} className="mt-16 flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`text-[11px] uppercase tracking-editorial rounded-full px-5 py-2.5 border transition ${
                  active === c.key
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-foreground/60"
                }`}
              >
                {c.label}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-28 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border-y border-foreground/10">
          {filtered.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 0.05} className="bg-background">
              <Link
                to={`/services/${s.slug}`}
                className="group block p-8 md:p-12 hover:bg-accent/30 transition-colors duration-500 h-full"
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-editorial text-foreground/50 mb-3">
                      {s.category}
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl">{s.name}</h3>
                    <div className="italic text-foreground/70 mt-2">{s.tagline}</div>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-foreground/40 group-hover:rotate-45 group-hover:text-foreground transition-all duration-500" />
                </div>
                <p className="text-sm text-foreground/70 leading-[1.7] truncate">{s.description}</p>
                <div className="mt-8 pt-6 border-t border-foreground/10 flex items-center justify-between text-[11px] uppercase tracking-editorial text-foreground/60">
                  <span>Starting at <span className="text-foreground">${s.starting_price}</span></span>
                  <span>{s.duration_minutes} min</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <MagneticButton to="/book" size="lg">Book an appointment</MagneticButton>
        </div>
      </section>
    </>
  );
}