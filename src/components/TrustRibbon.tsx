import React from 'react';
import {
  ShieldCheck,
  Award,
  Clock3,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

interface TrustRibbonProps {
  onOpenConsultation: () => void;
}

const trustItems = [
  {
    icon: ShieldCheck,
    title: 'ضمان 10 سنوات',
    description: 'ضمان موثق بعقد رسمي',
  },
  {
    icon: Award,
    title: 'مفصلات بلوم أصلية',
    description: 'جودة نمساوية 100%',
  },
  {
    icon: Clock3,
    title: 'التزام بالمواعيد',
    description: 'تنفيذ وتركيب في الموعد',
  },
];

export const TrustRibbon: React.FC<TrustRibbonProps> = ({
  onOpenConsultation,
}) => {
  return (
    <section className="relative z-20 -mt-5 sm:-mt-7 px-4">
      <div className="mx-auto max-w-[1180px]">
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#10141b]/95 shadow-[0_18px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -right-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#d8ad78]/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -left-24 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#d8ad78]/[0.05] blur-3xl" />

          <div className="relative flex flex-col lg:flex-row lg:items-center">
            {/* Trust points */}
            <div className="grid flex-1 grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-x-reverse">
              {trustItems.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 px-5 py-4 sm:px-6 sm:py-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#d8ad78]/20 bg-[#d8ad78]/[0.08] text-[#d8ad78]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/45">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>

          {/* Top accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8ad78]/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};