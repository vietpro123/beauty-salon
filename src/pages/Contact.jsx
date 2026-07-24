import React from "react";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import Reveal from "@/components/shared/Reveal";
import OpenStatus from "@/components/shared/OpenStatus";
import MagneticButton from "@/components/shared/MagneticButton";
import { SALON, HOURS } from "@/lib/salonConfig";

export default function Contact() {
  return (
    <>
      <section className="pt-40 md:pt-52 pb-12 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h1 className="mt-6 font-serif text-6xl md:text-[8.5rem] leading-[0.92] tracking-tight text-balance">
              Find us in the <span className="italic text-secondary">light.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-28 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5 space-y-10">
            <div>
              <div className="text-[10px] uppercase tracking-editorial text-foreground/50 mb-3">Address</div>
              <div className="font-serif text-2xl leading-snug">{SALON.address}</div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(SALON.address)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-foreground/70 hover:text-foreground"
              >
                <MapPin className="h-3.5 w-3.5" /> Get directions
              </a>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-editorial text-foreground/50 mb-3">Reach us</div>
              <div className="space-y-2">
                <a href={`tel:${SALON.phone}`} className="flex items-center gap-3 font-serif text-xl hover:text-secondary transition">
                  <Phone className="h-4 w-4 text-foreground/60" /> {SALON.phone}
                </a>
                <a href={`mailto:${SALON.email}`} className="flex items-center gap-3 font-serif text-xl hover:text-secondary transition">
                  <Mail className="h-4 w-4 text-foreground/60" /> {SALON.email}
                </a>
                <a href={SALON.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 font-serif text-xl hover:text-secondary transition">
                  <Instagram className="h-4 w-4 text-foreground/60" /> @maisonluminaire
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] uppercase tracking-editorial text-foreground/50">Hours</div>
                <OpenStatus />
              </div>
              <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex items-center justify-between py-3 text-sm">
                    <span>{h.label}</span>
                    <span className="text-foreground/60">{h.open ? `${h.open} – ${h.close}` : "Closed"}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6">
              <MagneticButton to="/book" size="lg">Reserve an appointment</MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-7">
            <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden rounded-sm border border-foreground/10 bg-muted">
              <iframe
                title="Map"
                src={SALON.mapEmbed}
                className="w-full h-full"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}