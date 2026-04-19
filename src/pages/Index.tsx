import AccessibilityBar from "@/components/AccessibilityBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import LiveDemo from "@/components/sections/LiveDemo";
import Differentials from "@/components/sections/Differentials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <LiveDemo />
        <Differentials />
        <CTA />
      </main>
      <Footer />
      <AccessibilityBar />
    </div>
  );
};

export default Index;