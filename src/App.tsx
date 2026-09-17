import React, { useEffect, useState } from 'react';
import { Project } from './types';
import { PROJECTS, TIKTOK_PIXEL_ID, makeWhatsAppUrl } from './data';
import { trackViewContent, trackContact, trackSubmitForm, trackSchedule } from './utils/tiktok';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustRibbon } from './components/TrustRibbon';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';
import { ProjectsSection } from './components/ProjectsSection';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { JourneyWorkflow } from './components/JourneyWorkflow';
import { SpatialSolutions } from './components/SpatialSolutions';
import { FAQSection } from './components/FAQSection';
import { ContactCtaSection } from './components/ContactCtaSection';
import { Footer } from './components/Footer';
import { MobileStickyCta } from './components/MobileStickyCta';
import { FloatingAction } from './components/FloatingAction';
import { ProjectModal } from './components/ProjectModal';

declare global {
  interface Window {
    ttq?: {
      identify: (customerInfo: { phone_number?: string; email?: string; external_id?: string }) => void;
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
      loadConsent?: (consent: Record<string, unknown>) => void;
    };
  }
}

export function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    if (window.ttq) {
      window.ttq.page();
      trackViewContent('kitchen_custom_01', 'Custom Kitchen Design');
    }
  }, []);

  /**
   * DIRECT WHATSAPP CONVERSION HANDLER
   * Fires TikTok conversion events with full parameters and opens WhatsApp immediately.
   */
  const directToWhatsApp = (contextMessage?: string) => {
    const defaultMsg = 'أهلاً البروفيسور للمطابخ والديكور، أود استشارة مهندس وحجز معاينة وتصميم 3D لمطبخي.';
    const finalMsg = contextMessage || defaultMsg;

    // Fire conversion and contact tracking for TikTok Pixel
    trackContact('whatsapp_direct_01', 'WhatsApp Inquiry');
    trackSubmitForm('whatsapp_lead_01', 'Direct WhatsApp Consultation', 500, 'EGP');
    trackSchedule('consultation_schedule_01', 'WhatsApp 3D Design Booking', 500, 'EGP');

    // WhatsApp safe redirection
    const url = makeWhatsAppUrl(finalMsg);
    setTimeout(() => {
      window.location.href = url;
    }, 250);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const heroProject = PROJECTS[1];

  return (
    <div className="min-h-screen bg-[#07090c] text-[#f4f6f9] pb-24 md:pb-0 overflow-x-hidden selection:bg-[#c5a880]/30 selection:text-white">
      {/* Subtle architectural hairline border on top */}
      <div className="fixed inset-x-0 top-0 z-[100] h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/40 to-transparent" />

      {/* HEADER: Ultra-clean, Fixed Navbar at Top */}
      <Navbar
        onOpenConsultation={directToWhatsApp}
        onNavigate={scrollTo}
      />

      <main className="pt-16 sm:pt-[70px]">
        {/* HERO SECTION: Serene, Architectural, Legacy */}
        <HeroSection
          heroProject={heroProject}
          onOpenProject={setActiveProject}
          onRequestConsultation={() =>
            directToWhatsApp(
              'أهلاً البروفيسور، أود استشارة مهندس معماري لمطبخي والبدء في إعداد دراسة وتصميم 3D متكامل لمساحتي.'
            )
          }
          onExploreWork={() => scrollTo('work')}
        />

        {/* TRUST RIBBON: High-Conversion Value Indicators */}
        <TrustRibbon onOpenConsultation={directToWhatsApp} />

        {/* SECTION: INTERACTIVE BEFORE & AFTER SLIDER */}
        <section id="before-after" className="scroll-mt-20 border-t border-white/[0.06] bg-[#090c10] py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6">
            <BeforeAfterShowcase onStartWhatsApp={directToWhatsApp} />
          </div>
        </section>

        {/* SECTION: CURATED ARCHITECTURAL PORTFOLIO */}
        <ProjectsSection
          projects={PROJECTS}
          onSelectProject={setActiveProject}
          onOpenConsultation={directToWhatsApp}
        />

        {/* SECTION: EUROPEAN MATERIALS ARCHIVE */}
        <section id="materials" className="scroll-mt-20 border-t border-white/[0.06] bg-[#090c10] py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6">
            <MaterialsShowcase onStartWhatsApp={directToWhatsApp} />
          </div>
        </section>

        {/* SECTION: THE ARCHITECTURAL APPROACH & WORKFLOW */}
        <JourneyWorkflow onStartConsultation={() => directToWhatsApp('أهلاً البروفيسور، أود استشارة مهندس بخصوص خطوات ومراحل تنفيذ مطبخي.')} />

        {/* SECTION: ARCHITECTURAL CHALLENGES & SOLUTIONS */}
        <SpatialSolutions onStartWhatsApp={directToWhatsApp} />

        {/* SECTION: FREQUENTLY ASKED QUESTIONS */}
        <FAQSection onStartWhatsApp={directToWhatsApp} />

        {/* SECTION: PRIVATE ATELIER CONSULTATION */}
        <ContactCtaSection onStartWhatsApp={directToWhatsApp} />
      </main>

      {/* FOOTER: Minimalist Atelier Colophon */}
      <Footer
        onScrollToTop={() => scrollTo('hero')}
        onOpenWhatsApp={directToWhatsApp}
      />

      {/* MOBILE STICKY CALL-TO-ACTION */}
      <MobileStickyCta
        onOpenConsultation={() =>
          directToWhatsApp('أهلاً البروفيسور، أود استشارة مهندس الأتيليه وبدء دراسة وتصميم 3D لمطبخي.')
        }
      />

      {/* PROJECT DETAILS MODAL */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onConsult={(message) => directToWhatsApp(message)}
      />

      {/* DESKTOP FLOATING QUICK CONSULTATION CTA */}
      <FloatingAction
        onOpenConsultation={() =>
          directToWhatsApp('أهلاً البروفيسور، أود استشارة المهندس المعماري وحجز معاينة وتصميم 3D لمطبخي.')
        }
      />

      <span className="sr-only">TikTok Pixel ID: {TIKTOK_PIXEL_ID}</span>
    </div>
  );
}

export default App;
