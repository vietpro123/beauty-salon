import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import SalonImageSection from "@/components/home/SalonImageSection";
import AboutSection from "@/components/home/AboutSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <AboutSection />
      <SalonImageSection />
      <TestimonialSlider />
      <InstagramFeed />
      <NewsletterCTA />
    </>
  );
}