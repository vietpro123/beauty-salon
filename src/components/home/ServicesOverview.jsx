import React from "react";
import ServicesHeading from "@/components/home/ServicesHeading";
import HairCard from "@/components/home/HairCard";
import SkinCard from "@/components/home/SkinCard";
import NailsCard from "@/components/home/NailsCard";

export default function ServicesOverview() {
  return (
    <section className="relative py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <ServicesHeading />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/10">
          <HairCard />
          <SkinCard />
          <NailsCard />
        </div>
      </div>
    </section>
  );
}