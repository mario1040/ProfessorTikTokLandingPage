import React from 'react';
import { Sparkles, MessageCircle, Ruler, Palette, FileCheck2, Hammer, ShieldCheck, ArrowLeft } from 'lucide-react';

interface JourneyWorkflowProps {
  onStartConsultation: () => void;
}

export const JourneyWorkflow: React.FC<JourneyWorkflowProps> = ({ onStartConsultation }) => {
  const steps = [
    {
      step: '01',
      title: 'حجز المعاينة واستشارة المهندس',
      desc: 'تسجيل بياناتك لتحديد موعد زيارة الأتيليه أو زيارة موقعك لرفع الأبعاد بالليزر ودراسة مثلث الحركة.',
      icon: Ruler,
      highlight: 'مجاناً وبدون التزام مادي',
    },
    {
      step: '02',
      title: 'التصميم الثلاثي الأبعاد (3D)',
      desc: 'تصور معماري واقعي مطابق لمطبخك يوضح الخامات وتوزيع الخزائن والإنارة والأجهزة وتعديلها بحرية.',
      icon: Palette,
      highlight: 'رؤية كاملة قبل التصنيع',
    },
    {
      step: '03',
      title: 'التعاقد الموثق واختيار الخامات',
      desc: 'تحديد الخامات الأوروبية (بولي لاك، أكريليك، قشرة أرو، كوارتز) وتثبيت المواصفات والموعد بعقد رسمي.',
      icon: FileCheck2,
      highlight: 'عقد رسمي بضمان 10 سنوات',
    },
    {
      step: '04',
      title: 'التصنيع الدقيق والتسليم المفتاح',
      desc: 'تقفيل بالليزر الألماني وتركيب أنظمة بلوم النمساوية بأيدي فنيين محترفين مع تنظيف وتسليم جاهز للاستخدام.',
      icon: Hammer,
      highlight: 'تسليم مطابق للتصميم 100%',
    },
  ];

  return (
    <section id="approach" className="scroll-mt-20 border-t border-white/[0.06] bg-[#080b0f] py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfb57b]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Architectural Methodology</span>
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-5xl">
              رحلة تنفيذ مطبخك <span className="text-[#dfb57b]">خطوة بخطوة</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs sm:text-sm text-white/55 font-light leading-relaxed">
              منهجية معمارية محسوبة تنقلك من المساحة الأولية إلى مطبخ فاخر جاهز للاستخدام بدون مفاجآت أو عشوائية.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartConsultation}
            className="refined-luxury-btn inline-flex h-12 items-center gap-2.5 rounded-full bg-[#c5a880] px-6 text-xs font-bold text-black transition hover:bg-[#dfb57b]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>ابدأ الخطوة الأولى الآن</span>
          </button>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0d1016] p-6 transition-all duration-300 hover:border-[#c5a880]/40 hover:bg-[#121620] hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
              >
                {/* Step number badge & Icon */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-[#c5a880]/40 group-hover:text-[#dfb57b] transition-colors">
                      {item.step}
                    </span>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[#c5a880]/20 bg-[#c5a880]/10 text-[#dfb57b] transition group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-base font-bold text-white group-hover:text-[#f0cb98] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs text-white/55 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                {/* Highlight footer */}
                <div className="mt-6 border-t border-white/[0.06] pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#dfb57b]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{item.highlight}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Bottom CTA Banner */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#c5a880]/25 bg-gradient-to-r from-[#12161f] via-[#0d1016] to-[#12161f] p-6 sm:flex-row sm:px-8">
          <div className="text-center sm:text-right">
            <span className="text-[11px] font-semibold text-[#dfb57b] uppercase tracking-wider block">
              جاهز لبدء الخطوة الأولى؟
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-1">
              احجز معاينتك واستلم مسودة تصميم ثلاثي الأبعاد 3D لمطبخك
            </h3>
            <p className="text-xs text-white/50 font-light mt-0.5">
              زيارة هندسية متخصصة مجاناً وبدون أي التزام مادي
            </p>
          </div>

          <button
            type="button"
            onClick={onStartConsultation}
            className="refined-luxury-btn inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#c5a880] px-6 py-3 text-xs font-bold text-black shadow-lg transition hover:bg-[#dfb57b]"
          >
            <span>ابدأ الخطوة 01 الآن</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
