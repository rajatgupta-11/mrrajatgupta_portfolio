import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Resume } from "@/components/Resume";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import { useEffect, useState } from "react";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Set dark mode as default
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onDone={() => setShowSplash(false)} name="RAJAT_GUPTA" />;
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
