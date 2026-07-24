import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { FALLBACK_SERVICES, FALLBACK_STYLISTS } from "@/lib/fallbackData";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Book() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preSelectedService = params.get("service") || "";
  const preSelectedStylist = params.get("stylist") || "";

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service_slug: preSelectedService,
    stylist_slug: preSelectedStylist,
    requested_date: "",
    requested_time: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, status: "pending" })
      });
    } catch (err) {
      console.error('Failed to save booking to Cloudflare:', err);
    }
    try {
      await base44.entities.Booking.create({ ...form, status: "pending" });
    } catch {}
    const q = new URLSearchParams({
      name: form.client_name,
      date: form.requested_date,
      time: form.requested_time,
      service: form.service_slug,
    }).toString();
    navigate(`/book/confirmation?${q}`);
  };

  return (
    <section className="min-h-screen pt-28 md:pt-32 pb-20 prism-gradient">
      <div className="max-w-[1200px] mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="text-[11px] uppercase tracking-editorial text-foreground/60 mb-6">
            — The Seamless Scheduler
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[0.95] tracking-tight">
            Reserve your <span className="italic text-secondary">ritual.</span>
          </h1>
          <p className="mt-6 max-w-lg mx-auto text-foreground/70">
            Share a few details and we'll confirm your appointment within business hours.
          </p>
        </motion.div>

        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="glass border border-foreground/10 rounded-sm p-6 md:p-12 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Full name" required>
              <input
                required
                value={form.client_name}
                onChange={(e) => update("client_name", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                required
                value={form.client_email}
                onChange={(e) => update("client_email", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Phone">
              <input
                type="tel"
                value={form.client_phone}
                onChange={(e) => update("client_phone", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Stylist">
              <select
                value={form.stylist_slug}
                onChange={(e) => update("stylist_slug", e.target.value)}
                className={inputCls}
              >
                <option value="">No preference</option>
                {FALLBACK_STYLISTS.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Service" required>
              <select
                required
                value={form.service_slug}
                onChange={(e) => update("service_slug", e.target.value)}
                className={inputCls}
              >
                <option value="">Select a service</option>
                {FALLBACK_SERVICES.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name} · ${s.starting_price}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Preferred date" required>
              <input
                type="date"
                required
                value={form.requested_date}
                onChange={(e) => update("requested_date", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Preferred time" required>
              <input
                type="time"
                required
                value={form.requested_time}
                onChange={(e) => update("requested_time", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>

          <Field label="Notes" className="mt-5">
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Anything we should know — inspiration, allergies, previous treatments..."
              className={`${inputCls} resize-none`}
            />
          </Field>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-[11px] uppercase tracking-editorial text-foreground/50 max-w-sm leading-relaxed">
              24-hour cancellation policy · Confirmation within 2 business hours
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-3 rounded-full bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-editorial hover:bg-secondary transition disabled:opacity-60"
            >
              {submitting ? "Reserving..." : "Request appointment"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full bg-background/60 border border-foreground/10 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-foreground transition";

function Field({ label, children, required, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10px] uppercase tracking-editorial text-foreground/60 mb-2">
        {label} {required && <span className="text-secondary">*</span>}
      </span>
      {children}
    </label>
  );
}