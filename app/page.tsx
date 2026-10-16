"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Members from "@/components/sections/Members";
import JoinCTA from "@/components/sections/JoinCTA";
import Footer from "@/components/Footer";
import IntroLoader from "@/components/IntroLoader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  const handleIntroComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen">
      <IntroLoader onComplete={handleIntroComplete} />
      <Navbar isLoaded={isLoaded} />
      <Hero isLoaded={isLoaded} />
      <About />
      <Projects />
      <Members />
      <JoinCTA />
      <Footer />
    </main>
  );
}
