import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";
import OpenStatus from "./OpenStatus";

const NAV = [
  { to: "/services", label: "Treatments", preview: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/0e150b48b_generated_12a9b7fa.png" },
  { to: "/gallery", label: "Gallery", preview: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/a7174adc1_generated_b8a30828.png" },
  { to: "/team", label: "Atelier", preview: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/61a7ba9a2_generated_d52caeb7.png" },
  { to: "/about", label: "Story", preview: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c5bccd8fb_generated_1805c623.png" },
  { to: "/contact", label: "Visit", preview: "https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c5bccd8fb_generated_1805c623.png" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Minimal header on the booking page
  const minimal = location.pathname.startsWith("/book");

  if (minimal) {
    return (
      <header className="fixed top-0 inset-x-0 z-50 glass border-b border-foreground/5">
        <div className="max-w-[1400px] mx-auto px-3 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-[11px] uppercase tracking-editorial text-foreground/70 hover:text-foreground transition">
            ← Return to site
          </Link>
          <Link to="/" className="font-serif text-xl">Maison Luminaire</Link>
          <span className="w-24" />
        </div>
      </header>
    );
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-foreground/5" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-3 md:px-6 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl md:text-2xl">
            Maison Luminaire
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-[11px] uppercase tracking-editorial transition-colors ${
                    isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <OpenStatus className="hidden md:inline-flex" />
            <MagneticButton to="/book" size="sm" variant="primary">
              Book Now
            </MagneticButton>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full border border-foreground/20"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Ephemeral Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-3 md:px-6">
              <Link to="/" className="font-serif text-xl">Maison Luminaire</Link>
              <button
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
                className="h-10 w-10 flex items-center justify-center rounded-full border border-foreground/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="h-full flex flex-col lg:flex-row">
              <div className="flex-1 flex flex-col justify-center px-8 md:px-20 gap-2">
                {NAV.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setHovered(item.preview)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Link
                      to={item.to}
                      className="block font-serif text-5xl md:text-7xl tracking-tight hover:italic transition-all"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-10">
                  <MagneticButton to="/book" size="lg">Book an appointment</MagneticButton>
                </div>
              </div>

              <div className="hidden lg:block w-[45%] relative overflow-hidden bg-muted">
                <AnimatePresence mode="wait">
                  {hovered && (
                    <motion.img
                      key={hovered}
                      src={hovered}
                      alt=""
                      initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(12px)" }}
                      transition={{ duration: 0.7 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>
                {!hovered && (
                  <div className="absolute inset-0 flex items-end p-10 text-foreground/40 text-[11px] uppercase tracking-editorial">
                    Hover to preview
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}