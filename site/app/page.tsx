import { Navbar } from "@/components/marketing/Navbar";
import { Hero } from "@/components/marketing/Hero";
import {
  DemoChaptersStatic,
  DemoStorySection,
} from "@/components/marketing/DemoStorySection";
import { Faq } from "@/components/marketing/Faq";
import { FinalCta } from "@/components/marketing/FinalCta";
import { Footer } from "@/components/marketing/Footer";

export default function Home() {
  return (
    <div className="min-h-dvh overflow-x-clip bg-surface text-content">
      <Navbar />
      <main>
        <Hero />
        <DemoStorySection />
        <DemoChaptersStatic />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
