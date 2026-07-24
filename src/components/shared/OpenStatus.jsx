import React, { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/salonConfig";

export default function OpenStatus({ className = "", variant = "light" }) {
  const [status, setStatus] = useState(getOpenStatus());

  useEffect(() => {
    const id = setInterval(() => setStatus(getOpenStatus()), 60_000);
    return () => clearInterval(id);
  }, []);

  const dot = status.open ? "bg-emerald-400" : "bg-amber-400";
  const text = variant === "dark" ? "text-background/80" : "text-foreground/70";

  return (
    <div className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial ${text} ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute inline-flex h-full w-full rounded-full ${dot} opacity-60 breathe`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} />
      </span>
      <span>{status.label}</span>
    </div>
  );
}