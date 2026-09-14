import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  ArrowLeft,
  ChevronsLeftRight,
  ShieldCheck,
  CheckCircle2,
  Ruler,
  Maximize2,
  Sliders,
  Flame,
} from 'lucide-react';

interface BeforeAfterShowcaseProps {
  onStartWhatsApp: (message: string) => void;
}

interface CaseStudy {
  id: string;
  title: string;
  location: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  beforeDesc: string;
  afterDesc: string;
  specs: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'case-custom',
    title: 'المشروع المخصص (صور من ملف public)',
    location: 'تسليم وتنفيذ البروفيسور',
    beforeLabel: 'قبل: المساحة الأولية',
    afterLabel: 'بعد: التسليم النهائي المتكامل',
    // إذا قمت برفع before.jpg و after.jpg أو before.png و after.png في ملف public فسيتم عرضهما فوراً
    beforeImage: '/before.jpg',
    afterImage: '/after.jpg',
    beforeDesc: 'المساحة قبل البدء، استعراض الوضع الإنشائي والأبعاد قبل تركيب وحدات المطبخ.',
    afterDesc: 'النتيجة المتكاملة بعد تصنيع وتركيب المطبخ مع الخامات والرخام وأنظمة الإضاءة.',
    specs: ['تفصيل هندسي بالليزر', 'أنظمة بلوم هيدروليك', 'ضمان رسمي 10 سنوات'],
  },
  {
    id: 'case-1',
    title: 'تحويل مساحة خام إلى مطبخ بولي لاك مع جزيرة مركزية',
    location: 'فيلا بالتجمع الخامس (القاهرة الجديدة)',
    beforeLabel: 'قبل: مرحلة الطوب والتأسيس',
    afterLabel: 'بعد: تسليم كامل بالرخام والإضاءة',
    beforeImage:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    beforeDesc: 'مساحة فارغة بتأسيسات سباكة وكهرباء عشوائية بدون أي استغلال لمثلث الحركة.',
    afterDesc: 'مطبخ بولي لاك تركي سوبر مات مع جزيرة رخام كوارتز عروق ذهبية ومفصلات بلوم المخفية.',
    specs: ['بولي لاك تركي سوبر مات', 'مفصلات بلوم سوفت كلوز', 'رخام كوارتز أبيض عروق ذهبية'],
  },
  {
    id: 'case-2',
    title: 'تجديد مطبخ متهالك إلى تحفة مودرن أكريليك فائقة الاتساع',
    location: 'كمبوند بالشيخ زايد (أكتوبر)',
    beforeLabel: 'قبل: مطبخ قديم ضيق ومظلم',
    afterLabel: 'بعد: لمعان كريستالي واستغلال رأسي',
    beforeImage:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
    beforeDesc: 'دواليب قديمة متهالكة وتراكم للمياه والدهون في الزوايا مع إضاءة خافتة وإحساس بالضيق.',
    afterDesc: 'أسطح أكريليك كريستالي عاكسة للضوء مع خزائن سحرية تمتد للسقف ضاعفت سعة التخزين 3 أضعاف.',
    specs: ['أكريليك إسباني كريستال', 'إضاءات LED بروفايل ذكية', 'زوايا سحرية Magic Corners'],
  },
  {
    id: 'case-3',
    title: 'تحول نيو كلاسيك فاخر بقشرة أرو طبيعي معالج',
    location: 'دوبلكس في المعادي (القاهرة)',
    beforeLabel: 'قبل: حوائط غير منتظمة وزوايا ميتة',
    afterLabel: 'بعد: فخامة نيو كلاسيك ملكية',
    beforeImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85',
    beforeDesc: 'حوائط غير متناسقة في الأبعاد وشبابيك تعوق وضع الدواليب التقليدية.',
    afterDesc: 'تفصيل هندسي بالليزر لدمج الخزائن مع إطارات نيو كلاسيك ومقابض نحاسية أصلية بضمان 10 سنوات.',
    specs: ['خشب طبيعي معالج إيطالياً', 'مقابض نحاس أصلي أنتيك', 'رخام كلكتا نخب أول'],
  },
];

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ onStartWhatsApp }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIndex];

  // Calculate percentage from pointer event
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  return (
    <div id="before-after" className="scroll-mt-20 rounded-[32px] border border-white/[0.08] bg-[#0c0f14] p-6 md:p-10 shadow-2xl">
      {/* Header section */}
      <div className="flex flex-col items-start justify-between gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#dfb57b]">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive Before & After Slider
          </span>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            سلايدر مقارنة <span className="text-[#dfb57b]">قبل وبعد التنفيذ</span>
          </h2>
          <p className="mt-2 text-xs text-white/50">
            حرّك المؤشر يميناً ويساراً لتشاهد كيف نحول أصعب المساحات والخامات المتهالكة إلى مطابخ فاخرة متكاملة.
          </p>
        </div>

        {/* Project switcher tabs */}
        <div className="flex flex-wrap gap-2">
          {CASES.map((item, idx) => {
            const isActive = idx === activeCaseIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50); // reset to center on switch
                }}
                className={`rounded-xl px-3.5 py-2 text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#dfb57b] text-black shadow-lg shadow-[#dfb57b]/20'
                    : 'border border-white/10 bg-white/[0.03] text-white/60 hover:text-white'
                }`}
              >
                نموذج 0{idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case title and location */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div>
          <strong className="text-base font-black text-white">{activeCase.title}</strong>
          <span className="mr-3 text-white/45">📍 {activeCase.location}</span>
        </div>

        {/* Quick Position Presets */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/40 p-1 text-[11px] font-bold text-white/70">
          <span className="px-2 text-[10px] text-white/40">المقارنة:</span>
          <button
            type="button"
            onClick={() => setSliderPosition(20)}
            className={`rounded-lg px-2.5 py-1 transition ${
              sliderPosition < 35 ? 'bg-white/20 text-white' : 'hover:text-white'
            }`}
          >
            تركيز على (قبل)
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className={`rounded-lg px-2.5 py-1 transition ${
              sliderPosition >= 35 && sliderPosition <= 65
                ? 'bg-[#dfb57b] text-black'
                : 'hover:text-white'
            }`}
          >
            نصف ونصف 50%
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(80)}
            className={`rounded-lg px-2.5 py-1 transition ${
              sliderPosition > 65 ? 'bg-emerald-500 text-black' : 'hover:text-white'
            }`}
          >
            تركيز على (بعد)
          </button>
        </div>
      </div>

      {/* INTERACTIVE COMPARISON SLIDER STAGE */}
      <div className="relative mt-6">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[560px] cursor-ew-resize select-none overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_25px_80px_rgba(0,0,0,0.6)] touch-none"
        >
          {/* Layer 1: AFTER Image (Underneath, full view) */}
          <img
            src={activeCase.afterImage}
            alt="المطبخ بعد التنفيذ والتسليم - البروفيسور"
            onError={(e) => {
              // Fallback to high quality photo if user has not yet dropped after.jpg into public
              (e.currentTarget as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
            }}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* Layer 2: BEFORE Image (Clipped dynamically based on sliderPosition) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
            }}
          >
            <img
              src={activeCase.beforeImage}
              alt="المطبخ قبل التنفيذ - المساحة الأولية"
              onError={(e) => {
                // Fallback to high quality photo if user has not yet dropped before.jpg into public
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80';
              }}
              className="absolute inset-0 h-full w-full object-cover grayscale-[35%]"
              draggable={false}
            />
            {/* Subtle vintage tint overlay for the 'Before' area */}
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Vertical Divider Line with Glow */}
          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-white shadow-[0_0_15px_rgba(223,181,123,0.8)]"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Top & Bottom anchor nodes */}
            <div className="absolute -top-1 -left-1.5 h-3 w-3 rounded-full bg-[#dfb57b] ring-2 ring-black" />
            <div className="absolute -bottom-1 -left-1.5 h-3 w-3 rounded-full bg-[#dfb57b] ring-2 ring-black" />
          </div>

          {/* Central Circular Drag Handle Button */}
          <div
            className="pointer-events-none absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${sliderPosition}%` }}
          >
            <div
              className={`grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border-2 border-white bg-gradient-to-tr from-[#0b0e12] via-[#1a202a] to-[#252f3e] text-[#dfb57b] shadow-[0_0_25px_rgba(0,0,0,0.8),0_0_15px_rgba(223,181,123,0.5)] transition-transform duration-150 ${
                isDragging ? 'scale-115 ring-4 ring-[#dfb57b]/40' : 'scale-100 hover:scale-105'
              }`}
            >
              <ChevronsLeftRight className="h-6 w-6 text-white" />
            </div>
          </div>

          {/* Floating 'BEFORE' Badge (Pinned Left) */}
          <div className="pointer-events-none absolute top-5 left-5 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/75 px-3.5 py-1.5 text-[11px] font-black text-white/90 shadow-xl backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span>قبل (المساحة الأولية)</span>
            </span>
          </div>

          {/* Floating 'AFTER' Badge (Pinned Right) */}
          <div className="pointer-events-none absolute top-5 right-5 z-20">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-[#07190f]/85 px-3.5 py-1.5 text-[11px] font-black text-emerald-300 shadow-xl backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>بعد (تسليم البروفيسور)</span>
            </span>
          </div>

          {/* Bottom Hint Strip */}
          <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-1.5 text-[10px] font-bold text-white/75 backdrop-blur-md">
              <ChevronsLeftRight className="h-3.5 w-3.5 text-[#dfb57b]" />
              <span>اسحب الدائرة بإصبعك أو الماوس لمقارنة النتيجة</span>
            </span>
          </div>
        </div>
      </div>

      {/* Case Details & Transformation Insights */}
      <div className="mt-8 grid gap-6 rounded-3xl border border-white/[0.06] bg-white/[0.015] p-5 sm:p-7 md:grid-cols-12 md:items-center">
        {/* Before Column (4 cols) */}
        <div className="space-y-1.5 border-b border-white/[0.06] pb-4 md:col-span-4 md:border-b-0 md:border-l md:border-white/[0.08] md:pb-0 md:pl-5">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/90">
            الوضع قبل التأسيس
          </span>
          <p className="text-xs leading-relaxed text-white/60">{activeCase.beforeDesc}</p>
        </div>

        {/* After Column (5 cols) */}
        <div className="space-y-1.5 md:col-span-5 md:pr-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
            النتيجة بعد التسليم
          </span>
          <p className="text-xs leading-relaxed text-white/85">{activeCase.afterDesc}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {activeCase.specs.map((spec, i) => (
              <span
                key={i}
                className="rounded-lg border border-[#dfb57b]/20 bg-[#dfb57b]/10 px-2.5 py-1 text-[10px] font-bold text-[#f0c88f]"
              >
                ✓ {spec}
              </span>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA for this transformation (3 cols) */}
        <div className="pt-2 md:col-span-3 md:pt-0">
          <button
            type="button"
            onClick={() =>
              onStartWhatsApp(
                `أهلاً البروفيسور، شفت دراسة التحول المعماري لمشروع "${activeCase.title}" وحابب استفسر عن إمكانية تنفيذ نفس النتيجة لمساحتي.`
              )
            }
            className="refined-luxury-btn flex w-full items-center justify-center gap-2 rounded-2xl bg-[#c5a880] px-4 py-3.5 text-xs font-black text-black shadow-lg transition hover:bg-[#dfb57b]"
          >
            <span>استشارة معمارية للمساحة</span>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="mt-2 block text-center text-[10px] text-white/40">
            دراسة أولية وتصميم 3D بدون التزام
          </span>
        </div>
      </div>
    </div>
  );
};
