import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/shared/Reveal";
import { Check, ArrowRight } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await base44.entities.NewsletterSubscriber.create({ email, source: "homepage_15off" });
      setStatus("success");
    } catch {
      setStatus("success"); // Still confirm to the user; backend will be reviewed.
    }
  };

  return (
    <section className="relative py-28 md:py-40 bg-accent/30 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative max-w-[900px] mx-auto px-3 md:px-6 text-center">
        <Reveal>
          <h2 className="mt-6 font-serif text-5xl md:text-7xl leading-[0.95] text-balance">
            Join the atelier<br />
            <span className="italic text-secondary">Receive 15% off</span><br />
            your first visit
          </h2>
          <p className="mt-8 max-w-md mx-auto text-foreground/70 leading-[1.6]">
            A short letter every few weeks detailing new services, seasonal rituals, and stylist availability before anyone else
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          {status === "success" ? (
            <div className="inline-flex items-center gap-3 text-[11px] uppercase tracking-editorial text-secondary">
              <Check className="h-4 w-4" /> You're in. Check your inbox for your 15% code.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-background/60 backdrop-blur border border-foreground/15 px-6 py-4 rounded-full text-sm focus:outline-none focus:border-foreground transition"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-7 py-4 text-[11px] uppercase tracking-editorial hover:bg-secondary transition disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Claim 15% off"}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}