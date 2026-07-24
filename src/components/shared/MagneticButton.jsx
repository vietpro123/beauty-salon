import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MagneticButton({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
  strength = 0.25,
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  const base =
    "inline-flex items-center justify-center rounded-full font-sans uppercase tracking-editorial transition-colors duration-500 select-none";
  const sizes = {
    sm: "text-[10px] px-5 py-2.5",
    md: "text-[11px] px-7 py-3.5",
    lg: "text-xs px-9 py-4",
  };
  const variants = {
    primary: "bg-foreground text-background hover:bg-secondary",
    ghost: "bg-transparent text-foreground border border-foreground/30 hover:border-foreground hover:bg-foreground hover:text-background",
    accent: "bg-accent text-foreground hover:bg-foreground hover:text-background",
    light: "bg-background text-foreground hover:bg-accent",
  };

  const content = (
    <motion.span
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.6 }}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );

  const wrapperProps = {
    ref,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: "inline-block",
  };

  if (to) return <Link to={to} {...wrapperProps}>{content}</Link>;
  if (href) return <a href={href} {...wrapperProps}>{content}</a>;
  return <button onClick={onClick} {...wrapperProps} type="button">{content}</button>;
}