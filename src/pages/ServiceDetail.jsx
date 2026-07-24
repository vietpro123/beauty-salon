import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { FALLBACK_SERVICES } from "@/lib/fallbackData";
import Reveal from "@/components/shared/Reveal";
import MagneticButton from "@/components/shared/MagneticButton";
import { ArrowLeft, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceDetail() {
  const { slug } = useParams();
  const initial = FALLBACK_SERVICES.find((s) => s.slug === slug);
  const [service, setService] = useState(initial);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    base44.entities.Service.filter({ slug })
      .then((list) => {
        if (list && list.length) setService(list[0]);
      })
      .catch(() => {});
  }, [slug]);

  if (!service) {
    return (
      <div className="pt-40 px-6 max-w-3xl mx-auto text-center">
        <h1 className="font-serif text-4xl mb-6">Service not found</h1>
        <Link to="/services" className="text-[11px] uppercase tracking-editorial underline">
          Return to the almanac
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 md:pt-40 pb-16 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-foreground/60 hover:text-foreground mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to services
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <Reveal className="md:col-span-7">
              <h1 className="mt-6 font-serif text-6xl md:text-8xl leading-[0.92] tracking-tight text-balance">
                {service.name}
              </h1>
              <p className="mt-6 italic text-foreground/70 text-xl">{service.tagline}</p>
            </Reveal>
            <Reveal delay={0.15} className="md:col-span-5 md:sticky md:top-28">
              <div className="glass border border-foreground/10 p-8 rounded-sm">
                <div className="text-[10px] uppercase tracking-editorial text-foreground/50">Treatment card</div>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-serif text-5xl">${service.starting_price}</span>
                  <span className="text-sm text-foreground/50">starting at</span>
                </div>
                <div className="mt-2 text-sm text-foreground/70">{service.duration_minutes} minutes</div>
                <div className="mt-8">
                  <MagneticButton to={`/book?service=${service.slug}`} size="lg" className="w-full">
                    Book this treatment
                  </MagneticButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 px-3 md:px-6 bg-muted">
        <div className="max-w-[1400px] mx-auto">
          <div className="aspect-[21/9] overflow-hidden">
            <img src={service.image_url} alt={service.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-28 px-3 md:px-6">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <h2 className="mt-6 font-serif text-4xl md:text-6xl leading-tight text-balance">
              {service.long_description?.split(".")[0]}.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 text-foreground/75 leading-[1.8] text-[16px]">{service.long_description}</p>
          </Reveal>
        </div>
      </section>

      {service.preparation_steps?.length > 0 && (
        <section className="py-20 px-3 md:px-6 bg-accent/20">
          <div className="max-w-[1000px] mx-auto">
            <Reveal>
              <h2 className="mt-6 font-serif text-4xl md:text-5xl">Before your visit</h2>
            </Reveal>
            <ul className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
              {service.preparation_steps.map((step, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <li className="flex items-start gap-4 pb-5 border-b border-foreground/10">
                    <Check className="h-4 w-4 mt-1 text-secondary flex-shrink-0" />
                    <span className="text-foreground/80 leading-[1.6]">{step}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {service.faq?.length > 0 && (
        <section className="py-28 px-3 md:px-6">
          <div className="max-w-[900px] mx-auto">
            <Reveal>
              <h2 className="mt-6 font-serif text-4xl md:text-6xl">Frequently asked.</h2>
            </Reveal>
            <div className="mt-16 divide-y divide-foreground/10 border-y border-foreground/10">
              {service.faq.map((f, i) => (
                <div key={i} className="py-2">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-2xl md:text-3xl">{f.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 flex-shrink-0 transition-transform duration-500 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-foreground/75 leading-[1.7] max-w-xl">{f.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-3 md:px-6 bg-foreground text-background">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-serif text-5xl md:text-7xl leading-[0.95]">Ready to begin?</h2>
          <p className="mt-6 text-background/70 max-w-md mx-auto">
            Reserve {service.name.toLowerCase()} with the next available stylist.
          </p>
          <div className="mt-10">
            <MagneticButton to={`/book?service=${service.slug}`} size="lg" variant="light">
              Book this treatment
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}