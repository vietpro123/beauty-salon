import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Flower2 } from "lucide-react";
import MagneticButton from "@/components/shared/MagneticButton";

function buildICS({ name, date, time, service }) {
  const dt = date && time ? new Date(`${date}T${time}`) : new Date();
  const end = new Date(dt.getTime() + 90 * 60 * 1000);
  const fmt = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Maison Luminaire//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@maisonluminaire`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(dt)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Maison Luminaire — ${service || "Appointment"}`,
    `DESCRIPTION:Reservation for ${name || "you"}. We will confirm within 2 business hours.`,
    "LOCATION:24 Rue Lumière, Suite 3, New York, NY 10013",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export default function BookingConfirmation() {
  const [params] = useSearchParams();
  const info = {
    name: params.get("name") || "",
    date: params.get("date") || "",
    time: params.get("time") || "",
    service: params.get("service") || "",
  };
  const icsUrl = buildICS(info);

  return (
    <section className="min-h-screen pt-28 pb-20 prism-gradient relative overflow-hidden">
      {/* Blooming flower animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -40 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-28 left-1/2 -translate-x-1/2 text-secondary/30"
      >
        <Flower2 className="h-64 w-64 md:h-96 md:w-96" strokeWidth={0.5} />
      </motion.div>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 2.5, opacity: 0 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        className="absolute top-28 left-1/2 -translate-x-1/2 h-64 w-64 md:h-96 md:w-96 rounded-full border border-secondary/30"
      />

      <div className="relative max-w-[800px] mx-auto px-6 md:px-10 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-[11px] uppercase tracking-editorial text-foreground/60 mb-6">
            — Reservation received
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95]">
            Your transformation<br />
            <span className="italic text-secondary">begins soon.</span>
          </h1>
          <p className="mt-8 text-foreground/70 leading-[1.7] max-w-md mx-auto">
            Thank you{info.name && `, ${info.name.split(" ")[0]}`}. We've received your request
            and a member of our concierge will confirm within 2 business hours.
          </p>
        </motion.div>

        {(info.date || info.time) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-12 glass border border-foreground/10 rounded-sm p-8 max-w-md mx-auto text-left"
          >
            <div className="text-[10px] uppercase tracking-editorial text-foreground/50">Reserved for</div>
            <div className="mt-3 font-serif text-3xl">
              {info.date && new Date(info.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </div>
            <div className="mt-1 text-foreground/70">{info.time}</div>
            {info.service && <div className="mt-4 text-[11px] uppercase tracking-editorial text-secondary">{info.service.replace(/-/g, " ")}</div>}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={icsUrl}
            download="maison-luminaire-appointment.ics"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-[11px] uppercase tracking-editorial hover:bg-secondary transition"
          >
            <Calendar className="h-4 w-4" /> Add to calendar
          </a>
          <MagneticButton to="/" variant="ghost">Return home</MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 pt-10 border-t border-foreground/10 max-w-lg mx-auto text-left"
        >
          <div className="text-[10px] uppercase tracking-editorial text-foreground/50 mb-3">
            Cancellation policy
          </div>
          <p className="text-sm text-foreground/70 leading-[1.7]">
            We kindly ask for at least 24 hours' notice for cancellations or rescheduling. Late
            cancellations may be subject to a 50% service fee, and no-shows will be charged in
            full. You can reach us at{" "}
            <Link to="/contact" className="underline hover:text-foreground inline-flex items-center gap-1">
              concierge@maisonluminaire.com <ArrowRight className="h-3 w-3" />
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}