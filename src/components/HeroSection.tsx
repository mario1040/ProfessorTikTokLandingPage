import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MoveUpRight,
  Ruler,
  ShieldCheck,
  Sparkles,
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
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#c5a880]/[0.045] blur-[120px]"
        animate={{ y: [0, -18, 0], opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-white/[0.02] blur-[100px]"
        animate={{ y: [0, 20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <div className="mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">

          {/* Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              {/* Small label */}
              <div className="mb-5 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] text-[#dfb57b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfb57b]" />
                مطابخ مصممة على مقاسك
              </div>

              {/* Heading */}
              <h1 className="max-w-[620px] text-[38px] font-semibold leading-[1.22] tracking-[-0.035em] text-white sm:text-[50px] md:text-[58px] lg:text-[64px]">
                مطبخك،
                <br />
                <span className="font-light text-white/45">
                  كما تخيلته تمامًا.
                </span>
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-5 max-w-[500px] text-sm font-light leading-[1.9] text-white/55 sm:text-[15px]"
              >
                تصميم هندسي دقيق، خامات مختارة، وتنفيذ يهتم بكل تفصيلة.
              </motion.p>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-7 flex flex-col gap-3 sm:flex-row"
              >
                <button
                  type="button"
                  onClick={onRequestConsultation}
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#c5a880] px-6 text-xs font-bold text-black transition-all duration-300 hover:bg-[#dfb57b] hover:shadow-[0_10px_35px_rgba(197,168,128,0.16)] active:scale-[0.98]"
                >
                  <span>ابدأ تصميم مطبخك</span>

                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={onExploreWork}
                  className="group inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-xs font-medium text-white/60 transition hover:text-white"
                >
                  <span>استكشف أعمالنا</span>

                  <MoveUpRight className="h-4 w-4 text-white/35 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#dfb57b]" />
                </button>
              </motion.div>

              {/* Minimal trust points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.07] pt-5"
              >
                <div className="flex items-center gap-2 text-[10px] text-white/45">
                  <Ruler className="h-3.5 w-3.5 text-[#dfb57b]" />
                  قياسات دقيقة
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white/45">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#dfb57b]" />
                  ضمان موثق
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white/45">
                  <Sparkles className="h-3.5 w-3.5 text-[#dfb57b]" />
                  تصميم 3D
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12, ease: 'easeOut' }}
            className="order-1 lg:order-2"
          >
            <div className="group relative">

              {/* Floating accent */}
              <motion.div
                className="pointer-events-none absolute -right-3 top-8 z-10 h-16 w-16 rounded-full border border-[#c5a880]/20"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Main image */}
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.10] bg-[#0d1116] shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={heroProject.image}
                    alt={heroProject.title}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.025]"
                    loading="eager"
                  />

                  {/* Soft overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  {/* Project label */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-6">
                    <div>
                      <span className="text-[9px] tracking-[0.18em] text-[#dfb57b]/80">
                        {heroProject.number}
                      </span>

                      <h2 className="mt-1 text-sm font-semibold text-white sm:text-base">
                        {heroProject.title}
                      </h2>

                      <p className="mt-1 text-[10px] text-white/50">
                        {heroProject.material}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenProject(heroProject)}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:border-[#c5a880]/50 hover:text-[#dfb57b]"
                      aria-label="عرض المشروع"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tiny floating detail */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -left-3 hidden rounded-xl border border-white/[0.08] bg-[#0c1015]/90 px-3.5 py-2.5 shadow-lg backdrop-blur-md sm:block"
              >
                <div className="text-[8px] tracking-[0.16em] text-white/30">
                  ARCHIVE
                </div>

                <div className="mt-0.5 text-[10px] font-medium text-white/75">
                  {heroProject.number}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};