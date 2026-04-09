import { useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import ProblemStrip from '@/sections/ProblemStrip';
import SolutionOverview from '@/sections/SolutionOverview';
import Services from '@/sections/Services';
import Qualifications from '@/sections/Qualifications';
import CTA from '@/sections/CTA';
import Clients from '@/sections/Clients';
import SuccessCases from '@/sections/SuccessCases';
import FAQ from '@/sections/FAQ';
import DemosStory from '@/sections/DemosStory';
import Footer from '@/sections/Footer';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <ProblemStrip />
        <SolutionOverview />
        <Services />
        <DemosStory />
        <Qualifications />
        <SuccessCases />
        <Clients />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
