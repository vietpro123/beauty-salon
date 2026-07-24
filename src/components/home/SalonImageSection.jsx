import React from "react";
import { motion } from "framer-motion";

export default function SalonImageSection() {
  return (
    <section className="relative w-full h-[600px] md:h-screen overflow-hidden bg-muted">
      <motion.img src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c5bccd8fb_generated_1805c623.png"

      alt="Maison Luminaire salon interior"
      initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full object-cover" />
      
    </section>);

}