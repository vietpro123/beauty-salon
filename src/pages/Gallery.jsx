import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { FALLBACK_GALLERY } from "@/lib/fallbackData";
import Reveal from "@/components/shared/Reveal";

const FILTERS = [
{ key: "all", label: "All" },
{ key: "color", label: "Color" },
{ key: "cuts", label: "Cuts" },
{ key: "bridal", label: "Bridal" },
{ key: "nails", label: "Nails" },
{ key: "skin", label: "Skin" }];


export default function Gallery() {
  const [items, setItems] = useState(FALLBACK_GALLERY);
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState(-1);

  useEffect(() => {
    base44.entities.GalleryItem.list().
    then((list) => {
      if (list && list.length) setItems(list);
    }).
    catch(() => {});
  }, []);

  const filtered = useMemo(
    () => active === "all" ? items : items.filter((i) => i.category === active),
    [items, active]
  );

  useEffect(() => {
    if (lightbox < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(-1);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % filtered.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  return (
    <>
      <section className="pt-40 md:pt-52 pb-16 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <h1 className="mt-6 font-serif text-6xl md:text-[8.5rem] leading-[0.92] tracking-tight text-balance">
              Transformations<br />
              <span className="italic text-secondary">in lived-in light.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.15} className="mt-12 flex flex-wrap gap-2">
            {FILTERS.map((f) =>
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`text-[11px] uppercase tracking-editorial rounded-full px-5 py-2.5 border transition ${
              active === f.key ?
              "bg-foreground text-background border-foreground" :
              "border-foreground/20 hover:border-foreground/60"}`
              }>
              
                {f.label}
              </button>
            )}
          </Reveal>
        </div>
      </section>

      <section className="pb-28 px-3 md:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
          <AnimatePresence mode="popLayout">

            {/* Radiance Facial */}
            {(active === "all" || active === "skin") &&
            <motion.button
              layout
              key="radiance-facial"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Radiance Facial"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/fe4ba3d20_generated_image.png"
                alt="Radiance Facial"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">skin</div>
                  <div className="font-serif text-xl mt-1">Radiance Facial</div>
                </div>
              </motion.button>
            }

            {/* Bridal Chignon */}
            {(active === "all" || active === "bridal") &&
            <motion.button
              layout
              key="bridal-chignon"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Bridal Chignon"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c058cb48b_generated_334ff08c.png"
                alt="Bridal Chignon"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">bridal</div>
                  <div className="font-serif text-xl mt-1">Bridal Chignon</div>
                </div>
              </motion.button>
            }

            {/* Architectural Bob */}
            {(active === "all" || active === "cuts") &&
            <motion.button
              layout
              key="architectural-bob"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Architectural Bob"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/04e7a210e_generated_270fe41f.png"
                alt="Architectural Bob"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">cuts</div>
                  <div className="font-serif text-xl mt-1">Architectural Bob</div>
                </div>
              </motion.button>
            }

            {/* Copper Renaissance */}
            {(active === "all" || active === "color") &&
            <motion.button
              layout
              key="copper-renaissance"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Copper Renaissance"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/69d46f537_generated_9c8d3588.png"
                alt="Copper Renaissance"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">color</div>
                  <div className="font-serif text-xl mt-1">Copper Renaissance</div>
                </div>
              </motion.button>
            }

            {/* Minimalist Manicure */}
            {(active === "all" || active === "nails") &&
            <motion.button
              layout
              key="minimalist-manicure"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Minimalist Manicure"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/982264062_generated_7a2441d4.png"
                alt="Minimalist Manicure"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">nails</div>
                  <div className="font-serif text-xl mt-1">Minimalist Manicure</div>
                </div>
              </motion.button>
            }

            {/* Luminous Complexion */}
            {(active === "all" || active === "skin") &&
            <motion.button
              layout
              key="luminous-complexion"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Luminous Complexion"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/1044c3582_generated_image.png"
                alt="Luminous Complexion"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">skin</div>
                  <div className="font-serif text-xl mt-1">Luminous Complexion</div>
                </div>
              </motion.button>
            }

            {/* Layered Texture */}
            {(active === "all" || active === "cuts") &&
            <motion.button
              layout
              key="layered-texture"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Layered Texture"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/b28ed9df4_generated_187b3d03.png"
                alt="Layered Texture"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">cuts</div>
                  <div className="font-serif text-xl mt-1">Layered Texture</div>
                </div>
              </motion.button>
            }

            {/* Soft Wave Bride */}
            {(active === "all" || active === "bridal") &&
            <motion.button
              layout
              key="soft-wave-bride"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Soft Wave Bride"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/69e3fe3e053d56de33d4c853/c058cb48b_generated_334ff08c.png"
                alt="Soft Wave Bride"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">bridal</div>
                  <div className="font-serif text-xl mt-1">Soft Wave Bride</div>
                </div>
              </motion.button>
            }

            {/* Chrome Manicure */}
            {(active === "all" || active === "nails") &&
            <motion.button
              layout
              key="chrome-manicure"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Chrome Manicure"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/383024eba_generated_image.png"
                alt="Chrome Manicure"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">nails</div>
                  <div className="font-serif text-xl mt-1">Chrome Manicure</div>
                </div>
              </motion.button>
            }

            {/* Chocolate Balayage */}
            {(active === "all" || active === "color") &&
            <motion.button
              layout
              key="chocolate-balayage"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Chocolate Balayage"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/a94fec8fa_generated_image.png"
                alt="Chocolate Balayage"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">color</div>
                  <div className="font-serif text-xl mt-1">Chocolate Balayage</div>
                </div>
              </motion.button>
            }

            {/* Calming Ritual */}
            {(active === "all" || active === "skin") &&
            <motion.button
              layout
              key="calming-ritual"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "Calming Ritual"))}
              className="relative overflow-hidden group aspect-square">
              
                <img
                src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/11fe7131c_generated_image.png"
                alt="Calming Ritual"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">skin</div>
                  <div className="font-serif text-xl mt-1">Calming Ritual</div>
                </div>
              </motion.button>
            }

            {/* LED Therapy */}
            {(active === "all" || active === "skin") &&
            <motion.button
              layout
              key="led-therapy"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(filtered.findIndex((i) => i.title === "LED Therapy"))}
              className="relative overflow-hidden group aspect-square">
              
                <img src="https://media.base44.com/images/public/6a16aa721bc0ca9b12553699/3eeaec254_Screenshot2026-06-09at181035.png"

              alt="LED Therapy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-left">
                  <div className="text-[10px] uppercase tracking-editorial text-background/70">skin</div>
                  <div className="font-serif text-xl mt-1">LED Therapy</div>
                </div>
              </motion.button>
            }

          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {lightbox >= 0 && filtered[lightbox] &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[70] bg-foreground/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(-1)}>
          
            <button
            onClick={() => setLightbox(-1)}
            aria-label="Close"
            className="absolute top-6 right-6 h-10 w-10 rounded-full border border-background/30 flex items-center justify-center text-background">
            
              <X className="h-4 w-4" />
            </button>
            <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + filtered.length) % filtered.length);
            }}
            aria-label="Previous"
            className="absolute left-6 md:left-10 h-12 w-12 rounded-full border border-background/30 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition">
            
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % filtered.length);
            }}
            aria-label="Next"
            className="absolute right-6 md:right-10 h-12 w-12 rounded-full border border-background/30 text-background flex items-center justify-center hover:bg-background hover:text-foreground transition">
            
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
            key={lightbox}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[90vw] max-h-[85vh]">
            
              <img
              src={filtered[lightbox].image_url}
              alt={filtered[lightbox].title}
              className="max-w-full max-h-[80vh] object-contain" />
            
              <div className="mt-4 text-background/80 text-center">
                <div className="text-[10px] uppercase tracking-editorial text-background/50 mb-1">
                  {filtered[lightbox].category}
                </div>
                <div className="font-serif text-2xl">{filtered[lightbox].title}</div>
                {filtered[lightbox].description &&
              <div className="text-background/70 text-sm mt-1 max-w-md mx-auto">{filtered[lightbox].description}</div>
              }
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}