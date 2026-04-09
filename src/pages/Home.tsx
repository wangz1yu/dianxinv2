import { useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import TransitionBand from '@/sections/TransitionBand';
import Services from '@/sections/Services';
import Pricing from '@/sections/Pricing';
import Qualifications from '@/sections/Qualifications';
import CTA from '@/sections/CTA';
import Ecosystem from '@/sections/Ecosystem';
import Clients from '@/sections/Clients';
import SuccessCases from '@/sections/SuccessCases';
import FAQ from '@/sections/FAQ';
import DemoSettlement from '@/sections/DemoSettlement';
import DemoContract from '@/sections/DemoContract';
import DemoRiskControl from '@/sections/DemoRiskControl';
import Footer from '@/sections/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TransitionBand />
        <div className="bg-paper paper-grain relative text-[hsl(var(--ink))]">
        <Services />
        <Pricing />
        <Qualifications />
        <CTA />
        <Ecosystem />
        <Clients />
        <SuccessCases />
        <DemoSettlement />
        <DemoContract />
        <DemoRiskControl />
        <FAQ />
        </div>
      </main>
      <Footer />
    </div>
  );
}
