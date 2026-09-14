import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SPATIAL_CONCERNS } from '../data';

interface SpatialSolutionsProps {
  onStartWhatsApp: (message: string) => void;
}

const GUARANTEE_PILLARS = [
  {
    num: '01',
    title: 'الرفع المساحي الرقمي بالليزر',
    desc: 'زيارة هندسية متخصصة لرفع أبعاد الحوائط والزوايا بالملليمتر وتحديد مسارات السباكة وتوصيلات الغاز والكهرباء لضمان انعدام أي أخطاء تركيب لاحقة.',
  },
  {
    num: '02',
    title: 'التجسيد الافتراضي 3D والتفاصيل التنفيذية',
    desc: 'إعداد نموذج واقعي شامل يتيح لك رؤية الخامات والإنارة وتوزيع الأجهزة بوضوح تام، وتعديل أي تفصيلة بحرية قبل إصدار أوامر التصنيع.',
  },
  {
    num: '03',
    title: 'التصنيع الميكانيكي والتركيب بالضمان التعاقدي',
    desc: 'تقفيل الحواف بالليزر في ورش عملنا المجهزة، وتركيب المفصلات النمساوية بلوم، مع تسليم رسمي مصحوب بشهادة ضمان موثقة لمدة 10 سنوات.',
  },
];

export const SpatialSolutions: React.FC<SpatialSolutionsProps> = ({ onStartWhatsApp }) => {
  const [activeConcern, setActiveConcern] = useState(SPATIAL_CONCERNS[0]);

  const activeConcernMessage = `أهلاً البروفيسور، أود استشارة استوديو التصميم بخصوص: "${activeConcern}". أرجو توضيح المقترحات المعمارية لمساحتي.`;

  return (
    <section className="scroll-mt-20 border-t border-white/[0.06] bg-[#090c10] py-20 md:py-24">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left Column: Vision & Interactive Concerns */}
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfb57b]">
              Architectural Precision
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl">
              تحديات المساحة
              <br />
              <span className="text-white/35 font-light">وحلول التصميم الذكي.</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60 font-light">
              لا نعتمد على المقايسات التقديرية أو التخمين. كل مطبخ يمر بمسار هندسي موثق يضمن
              استغلال كل سنتيمتر وتطابق الواقع بنسبة 100% مع التصميم الـ 3D المعتمد.
            </p>

            {/* Interactive Concern Consultation */}
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0c1015] p-5">
              <span className="text-[11px] font-medium text-[#dfb57b] block mb-3">
                ما هو التحدي الأبرز في مساحة مطبخك حالياً؟
              </span>
              <div className="space-y-2">
                {SPATIAL_CONCERNS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveConcern(c)}
                    className={`w-full text-right p-3 rounded-xl text-xs transition ${
                      activeConcern === c
                        ? 'border border-[#c5a880]/50 bg-[#c5a880]/10 text-white'
                        : 'border border-white/[0.05] bg-transparent text-white/60 hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onStartWhatsApp(activeConcernMessage)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] p-3 text-xs font-semibold text-[#f0cb98] transition hover:bg-white/[0.1]"
              >
                <span>استشارة المهندس بخصوص هذه النقطة</span>
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Architectural Guarantees */}
          <div className="space-y-4">
            {GUARANTEE_PILLARS.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl border border-white/[0.08] bg-[#0c1015] p-6 transition duration-200 hover:border-[#c5a880]/30"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#dfb57b]">{step.num}</span>
                  <span className="text-[10px] text-white/30 tracking-wider font-mono">
                    PILLAR {step.num}
                  </span>
                </div>
                <h3 className="mt-3 text-base font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/55 font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
