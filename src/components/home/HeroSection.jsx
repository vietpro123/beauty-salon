import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [orb, setOrb] = useState({ x: 0, y: 0, visible: false });

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const onMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
    setOrb({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };
  const onLeave = () => setOrb((o) => ({ ...o, visible: false }));

  useEffect(() => {
    const t = setTimeout(() => setOrb({ x: 120, y: 80, visible: false }), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative min-h-screen overflow-hidden prism-gradient">
      
      {/* ambient prism blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-3 md:px-6 pt-40 md:pt-48 pb-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-24 items-center">
        {/* Left — Statement */}
         <motion.div style={{ y: textY }} className="md:col-span-7">
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2, duration: 0.8 }}
             className="mb-6 text-[12px] uppercase tracking-editorial text-black/60">
             Aesthetics &amp; wellness
           </motion.p>
           <h1 className="font-serif text-[13vw] md:text-[8vw] leading-[0.92] tracking-tight text-black">
              <motion.span
               initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
               className="block">
                Boost Your
                </motion.span>
                <motion.span
                 initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                 transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                 className="block italic">
                  Natural Beauty
              </motion.span>
            </h1>




        </motion.div>

        {/* Right — Portrait */}
        <div className="md:col-span-5 relative">
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity: 0, scale: 1.05, filter: "blur(16px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] overflow-hidden scale-125 origin-center">
            
            <motion.img
              src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/6f0f0314c_untitled_ChatGPT_Images_20_Edit_2026-06-14_07-34-38.png"
              alt="Luminous portrait"
              style={{
                x: mouse.x * -20,
                y: mouse.y * -20,
                scale: 1.08
              }}
              className="absolute inset-0 w-full h-full object-cover" />
            
            <div className="absolute inset-0 ring-1 ring-inset ring-foreground/5" />
          </motion.div>

          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="hidden md:flex absolute -left-14 bottom-6">
            <Link
              to="/book"
              className="flex items-center justify-center h-28 w-28 rounded-full bg-foreground text-background text-[10px] uppercase tracking-editorial shadow-2xl hover:scale-105 transition-transform duration-300 text-center leading-tight px-3">
              Book a Treatment
            </Link>
          </motion.div>
        </div>
      </div>



      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-editorial text-foreground/40">
        Scroll to explore ↓
      </div>
    </section>);

}