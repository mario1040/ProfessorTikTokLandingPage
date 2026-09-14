import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Layers,
  Maximize2,
  CheckCircle2,
  MessageCircle,
  ArrowLeft,
  Calculator,
  ShieldCheck,
  Gift,
  HelpCircle,
} from 'lucide-react';
import { EstimatorChoice } from '../types';

interface KitchenEstimatorProps {
  onStartWhatsApp: (message: string) => void;
}

const LAYOUTS = [
  { id: 'straight', name: 'خط مستقيم (I-Shape)', desc: 'مثالي للمساحات الضيقة والاستوديوهات', icon: '📏' },
  { id: 'l_shape', name: 'زاوية حرف (L-Shape)', desc: 'الأكثر طلباً وعملية لاستغلال الأركان', icon: '📐' },
  { id: 'u_shape', name: 'حرف (U-Shape)', desc: 'تخزين عملاق وأعلى سعة استخدام للأجهزة', icon: '🔄' },
  { id: 'island', name: 'مطبخ مع جزيرة (Island)', desc: 'فخامة مفتوحة مع بار وتخزين مركزي', icon: '🏝️' },
];

const MATERIALS = [
  {
    id: 'polylac',
    name: 'بولي لاك تركي (Poly-lacquer)',
    badge: 'الأكثر تحملاً للخدش',
    desc: 'مقاوم للحرارة والزيوت ولمعان فائق أو سوبر مات ناعم',
  },
  {
    id: 'acrylic',
    name: 'أكريليك كريستال (Acrylic)',
    badge: 'عمق زجاجي مذهل',
    desc: 'انعكاس ضوئي يعطي إحساساً بمضاعفة مساحة المطبخ',
  },
  {
    id: 'hpl',
    name: 'اتش بي ال مصفح (HPL)',
    badge: 'ضد المياه 100%',
    desc: 'مقاومة قصوى للرطوبة والبكتيريا مع ملمس عصري أنيق',
  },
  {
    id: 'wood',
    name: 'قشرة خشب طبيعي معالج',
    badge: 'فخامة نيو كلاسيك ومودرن',
    desc: 'دفء الخشب الطبيعي بطبقات عزل إيطالية مضادة لامتصاص الزيوت',
  },
];

const SIZES = [
  { id: 'small', name: 'مطبخ مدمج (أقل من 3 أمتار)', note: 'تركيز على الحلول الرأسية والزوايا السحرية' },
  { id: 'medium', name: 'مطبخ متوسط (3 - 5 أمتار)', note: 'توزيع مثالي لمثلث الحركة (الحوض - الثلاجة - البوتاجاز)' },
  { id: 'large', name: 'مطبخ كبير / مفتوح (أكثر من 5 أمتار)', note: 'مساحة لتصميم جزيرة أو ركن قهوة متكامل' },
];

export const KitchenEstimator: React.FC<KitchenEstimatorProps> = ({ onStartWhatsApp }) => {
  const [choice, setChoice] = useState<EstimatorChoice>({
    layout: LAYOUTS[1].id,
    layoutName: LAYOUTS[1].name,
    material: MATERIALS[0].id,
    materialName: MATERIALS[0].name,
    size: SIZES[1].id,
    sizeName: SIZES[1].name,
  });

  const generateWhatsAppMessage = () => {
    return `أهلاً البروفيسور، عملت تهيئة لمطبخي على صفحتكم:
📐 الشكل: ${choice.layoutName}
🪵 الخامة: ${choice.materialName}
📏 المساحة: ${choice.sizeName}
وعايز أستفيد من عرض التصميم الـ 3D المجاني والمقايسة الدقيقة.`;
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#12161d] to-[#0b0e12] p-6 md:p-10 shadow-2xl">
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-[#dfb57b]/[0.08] blur-[90px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-emerald-500/[0.05] blur-[90px]" />

      {/* Header */}
      <div className="relative z-10 flex flex-col items-start justify-between gap-4 border-b border-white/[0.08] pb-6 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#dfb57b]/25 bg-[#dfb57b]/10 px-3 py-1 text-[11px] font-black text-[#f0c88f]">
            <Calculator className="h-3.5 w-3.5" />
            <span>محدد ومخطط المطبخ التفاعلي</span>
          </div>
          <h3 className="mt-3 text-2xl font-black text-white md:text-3xl">
            خصص مطبخك واستلم <span className="text-[#dfb57b]">التصميم والمقايسة</span> في ثوانٍ
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            حدد اختياراتك المبدئية وسيقوم مهندسو "البروفيسور" بتجهيز دراسة مبدئية لمطبخك مجاناً.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.08] px-3.5 py-2 text-xs font-bold text-emerald-300">
          <Gift className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>يشمل تصميم 3D كامل مجاناً</span>
        </div>
      </div>

      <div className="relative z-10 mt-8 grid gap-8 lg:grid-cols-12">
        {/* Selection Columns (8 cols) */}
        <div className="space-y-6 lg:col-span-8">
          {/* Step 1: Layout */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/80">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#dfb57b] text-[10px] font-black text-black">
                1
              </span>
              اختر توزيع وشكل المطبخ
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {LAYOUTS.map((item) => {
                const isSelected = choice.layout === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setChoice((prev) => ({ ...prev, layout: item.id, layoutName: item.name }))}
                    className={`group relative flex items-start gap-3 rounded-2xl border p-3.5 text-right transition-all duration-200 ${
                      isSelected
                        ? 'border-[#dfb57b] bg-[#dfb57b]/[0.12] shadow-[0_0_20px_rgba(223,181,123,0.15)]'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-white group-hover:text-[#f0c88f]">
                          {item.name}
                        </strong>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-[#dfb57b]" />}
                      </div>
                      <p className="mt-1 text-[10px] text-white/45">{item.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Materials */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/80">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#dfb57b] text-[10px] font-black text-black">
                2
              </span>
              اختر نوع الخامة المفضلة لك
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {MATERIALS.map((mat) => {
                const isSelected = choice.material === mat.id;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() =>
                      setChoice((prev) => ({ ...prev, material: mat.id, materialName: mat.name }))
                    }
                    className={`group relative flex flex-col justify-between rounded-2xl border p-3.5 text-right transition-all duration-200 ${
                      isSelected
                        ? 'border-[#dfb57b] bg-[#dfb57b]/[0.12] shadow-[0_0_20px_rgba(223,181,123,0.15)]'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-white">{mat.name}</strong>
                        {isSelected && <CheckCircle2 className="h-4 w-4 text-[#dfb57b]" />}
                      </div>
                      <span className="mt-1 inline-block rounded bg-[#dfb57b]/15 px-1.5 py-0.5 text-[9px] font-bold text-[#f0c88f]">
                        {mat.badge}
                      </span>
                      <p className="mt-1.5 text-[10px] text-white/45">{mat.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Size */}
          <div>
            <label className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white/80">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#dfb57b] text-[10px] font-black text-black">
                3
              </span>
              المساحة التقريبية للمطبخ
            </label>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {SIZES.map((sz) => {
                const isSelected = choice.size === sz.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setChoice((prev) => ({ ...prev, size: sz.id, sizeName: sz.name }))}
                    className={`rounded-2xl border p-3 text-right transition-all duration-200 ${
                      isSelected
                        ? 'border-[#dfb57b] bg-[#dfb57b]/[0.12] shadow-[0_0_20px_rgba(223,181,123,0.15)]'
                        : 'border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-bold text-white">{sz.name}</strong>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#dfb57b]" />}
                    </div>
                    <p className="mt-1 text-[9px] text-white/40">{sz.note}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Summary Card (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 flex flex-col justify-between rounded-3xl border border-[#dfb57b]/25 bg-gradient-to-br from-[#1b222c] to-[#10141a] p-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-[10px] font-black tracking-widest text-[#dfb57b]">ملخص اختياراتك</span>
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[9px] font-black text-emerald-300">
                  عرض حصري
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-white/[0.06] bg-black/25 p-3">
                  <span className="text-[10px] text-white/40 block">التوزيع المختار:</span>
                  <strong className="text-xs text-white block mt-0.5">{choice.layoutName}</strong>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-black/25 p-3">
                  <span className="text-[10px] text-white/40 block">الخامة المعتمدة:</span>
                  <strong className="text-xs text-[#f0c88f] block mt-0.5">{choice.materialName}</strong>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-black/25 p-3">
                  <span className="text-[10px] text-white/40 block">المساحة المقدرة:</span>
                  <strong className="text-xs text-white block mt-0.5">{choice.sizeName}</strong>
                </div>
              </div>

              {/* Guarantees included */}
              <div className="mt-5 space-y-2 border-t border-white/[0.08] pt-4 text-[11px] text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>تصميم ثلاثي الأبعاد 3D مجاني للرؤية الواقعية</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>معاينة ورفع مقاسات بالليزر للموقع مجاناً</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#dfb57b] shrink-0" />
                  <span>ضمان رسمي 10 سنوات على الخامات والمفصلات</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp trigger */}
            <div className="mt-6 pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => onStartWhatsApp(generateWhatsAppMessage())}
                className="radar-glow-btn group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#24b95c] px-4 py-4 text-xs font-black text-[#041208] shadow-[0_12px_40px_rgba(36,185,92,0.25)] transition hover:bg-[#2ed66d]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>ابعت تفاصيل مطبخي على واتساب فوراً</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </button>
              <p className="mt-2 text-center text-[9px] text-white/40">
                ⚡ الرد فوري خلال دقائق من مهندس الديكور المختص
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
