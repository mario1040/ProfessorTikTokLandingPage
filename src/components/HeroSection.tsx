import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MoveUpRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Project } from '../types';

interface HeroSectionProps {
  heroProject: Project;
  onOpenProject: (project: Project) => void;
  onRequestConsultation: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProject,
  onOpenProject,
  onRequestConsultation,
  onExploreWork,
}) => {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden scroll-mt-20"
      dir="rtl"
    >
      {/* Ambient glowing orbs */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#c5a880]/[0.06] blur-[120px]"
        animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-[#dfb57b]/[0.03] blur-[100px]"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* Content */}
          <div className="order-2 lg:order-1 text-right">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              {/* Premium Luxury Tag */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1 text-[11px] font-semibold tracking-wide text-[#dfb57b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfb57b] animate-pulse" />
                <span>البروفيسور للمطابخ والديكور الفاخر</span>
              </div>

              {/* High-Impact Heading */}
              <h1 className="max-w-[620px] text-[36px] font-extrabold leading-[1.2] tracking-tight text-white sm:text-[48px] md:text-[56px] lg:text-[60px]">
                مطبخ أحلامك،
                <br />
                <span className="bg-gradient-to-l from-white via-white/80 to-[#c5a880] bg-clip-text text-transparent font-light">
                  بدقة هندسية وتصميم 3D واقعي.
                </span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-5 max-w-[520px] text-sm font-light leading-[1.9] text-white/65 sm:text-[15px]"
              >
                نحول مساحتك إلى تحفة فنية متكاملة — قياسات ليزر دقيقة، أرقى الخامات المقاومة للمياه والحرارة، وضمان معتمد 10 سنوات على كل تفصيلة.
              </motion.p>

              {/* High-Conversion Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-8 flex flex-col gap-3.5 sm:flex-row"
              >
                {/* Magnetic & Pulsing Main CTA */}
                <motion.button
                  type="button"
                  onClick={onRequestConsultation}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex h-13 items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#c5a880] via-[#dfb57b] to-[#c5a880] px-7 text-xs font-bold text-black shadow-[0_10px_35px_rgba(197,168,128,0.3)] transition-all duration-300 hover:shadow-[0_15px_45px_rgba(197,168,128,0.45)]"
                >
                  {/* Subtle Shimmer Ray */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
                  
                  <Zap className="h-4 w-4 fill-black text-black" />
                  <span>احجز معاينتك وتصميم 3D مجاناً</span>
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5" />
                </motion.button>

                <button
                  type="button"
                  onClick={onExploreWork}
                  className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 text-xs font-medium text-white/70 transition hover:border-[#c5a880]/40 hover:bg-white/[0.07] hover:text-white"
                >
                  <span>استكشف سابقة الأعمال</span>
                  <MoveUpRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#dfb57b]" />
                </button>
              </motion.div>

              {/* Minimal trust points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-5"
              >
                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <Ruler className="h-3.5 w-3.5 text-[#dfb57b]" />
                  <span>رفع مقاسات بالليزر</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#dfb57b]" />
                  <span>ضمان رسمي 10 سنوات</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-white/60">
                  <Sparkles className="h-3.5 w-3.5 text-[#dfb57b]" />
                  <span>تصميم 3D قبل التعاقد</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <div className="group relative">

              {/* Floating accent ring */}
              <motion.div
                className="pointer-events-none absolute -right-3 top-8 z-10 h-16 w-16 rounded-full border border-[#c5a880]/20"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Main image card */}
              <div className="relative overflow-hidden rounded-[26px] border border-white/[0.12] bg-[#0d1116] shadow-[0_25px_70px_rgba(0,0,0,0.6)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={heroProject.image}
                    alt={heroProject.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    loading="eager"
                  />

                  {/* Soft subtle gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Project label */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-6" dir="rtl">
                    <div className="text-right">
                      <span className="text-[10px] font-bold tracking-widest text-[#dfb57b]">
                        {heroProject.number}
                      </span>

                      <h2 className="mt-1 text-sm font-bold text-white sm:text-base">
                        {heroProject.title}
                      </h2>

                      <p className="mt-1 text-[11px] text-white/60">
                        {heroProject.material}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenProject(heroProject)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c5a880]/60 hover:bg-[#c5a880]/20 hover:text-[#dfb57b]"
                      aria-label="عرض المشروع"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Architectural Badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -left-3 hidden rounded-xl border border-white/[0.10] bg-[#0c1015]/95 px-4 py-2.5 shadow-xl backdrop-blur-md sm:block"
              >
                <div className="text-[9px] font-semibold tracking-wider text-[#dfb57b]">
                  PROFESSOR ATELIER
                </div>

                <div className="mt-0.5 text-[11px] font-medium text-white/85">
                  أعلى معايير الجودة والتصنيع
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
