import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Mail, Phone } from "lucide-react";
import OpenStatus from "./OpenStatus";
import { SALON, HOURS } from "@/lib/salonConfig";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6 pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-5">
            <h3 className="font-serif text-4xl md:text-5xl leading-[0.95] text-balance">
              Begin your<br />transformation.
            </h3>
            <div className="mt-8">
              <OpenStatus variant="dark" className="text-background/70" />
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-editorial text-background/50 mb-4">Visit</h4>
            <ul className="space-y-2 text-sm text-background/80">
              {["/services", "/team", "/gallery", "/about", "/contact", "/book"].map((p) => (
                <li key={p}>
                  <Link to={p} className="hover:text-background transition">
                    {(() => { const s = p.replace("/", ""); return s.charAt(0).toUpperCase() + s.slice(1); })()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-editorial text-background/50 mb-4">Hours</h4>
            <ul className="space-y-1.5 text-sm text-background/80">
              {HOURS.map((h) => (
                <li key={h.day} className="flex justify-between max-w-[220px]">
                  <span>{h.label}</span>
                  <span className="text-background/60">
                    {h.open ? `${h.open}–${h.close}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-editorial text-background/50 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li>
                <a href={`tel:${SALON.phone}`} className="inline-flex items-center gap-2 hover:text-background">
                  <Phone className="h-3.5 w-3.5" /> {SALON.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SALON.email}`} className="inline-flex items-center gap-2 hover:text-background">
                  <Mail className="h-3.5 w-3.5" /> {SALON.email}
                </a>
              </li>
              <li>
                <a href={SALON.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-background">
                  <Instagram className="h-3.5 w-3.5" /> Instagram
                </a>
              </li>
              <li className="text-background/60 text-xs leading-relaxed pt-2">{SALON.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-background/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] uppercase tracking-editorial text-background/50">
          <div>© 2026 {SALON.name}. Built on Base44.</div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-background">Privacy</Link>
            <Link to="/terms" className="hover:text-background">Terms</Link>
            <Link to="/accessibility" className="hover:text-background">Accessibility</Link>
            <Link to="/refund" className="hover:text-background">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}