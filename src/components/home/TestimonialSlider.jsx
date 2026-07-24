import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { FALLBACK_TESTIMONIALS } from "@/lib/fallbackData";
import Reveal from "@/components/shared/Reveal";

export default function TestimonialSlider() {
  const [items, setItems] = useState(FALLBACK_TESTIMONIALS);
  const [i, setI] = useState(0);

  useEffect(() => {
    base44.entities.Testimonial.list()
      .then((list) => {
        if (list && list.length) setItems(list);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 6500);
    return () => clearInterval(t);
  }, [items.length]);

  const current = items[i];

  return (
    <section className="relative py-28 md:py-40 bg-secondary/5">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <Reveal className="text-center">
        </Reveal>

        <div className="relative mt-12 min-h-[340px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: current.rating || 5 }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-secondary text-secondary" />
                ))}
              </div>
              <blockquote className="font-serif text-3xl md:text-5xl leading-[1.15] text-balance italic">
                “{current.quote}”
              </blockquote>
              <div className="mt-10 text-[11px] uppercase tracking-editorial text-foreground/60">
                {current.client_name}
                {current.service && <> &middot; {current.service}</>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            aria-label="Previous"
            onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
            className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1 transition-all duration-500 ${
                  idx === i ? "w-10 bg-foreground" : "w-4 bg-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next"
            onClick={() => setI((p) => (p + 1) % items.length)}
            className="h-10 w-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}