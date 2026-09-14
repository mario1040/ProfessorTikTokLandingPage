import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowLeft,
  ChevronsLeftRight,
  ShieldCheck,
  CheckCircle2,
  Ruler,
  Maximize2,
  Layers,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface BeforeAfterShowcaseProps {
  onStartWhatsApp: (message: string) => void;
}

interface CaseStudy {
  id: string;
  number: string;
  tag: string;
  title: string;
  location: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  transformationFact: string;
  specs: string[];
}

const CASES: CaseStudy[] = [
  {
    id: 'case-custom',
    number: '01',
    tag: 'تسليم واقعي حصري',
    title: 'تحويل مساحة معقدة إلى مطبخ بولي لاك فندقي',
    location: 'التجمع الخامس • القاهرة الجديدة',
    beforeLabel: 'قبل: مرحلة الطوب والتأسيس',
    afterLabel: 'بعد: تسليم كامل بالرخام والإضاءة',
    beforeImage: 'public/before1.png',
    afterImage: 'public/after1.png',
    transformationFact: 'استغلال 100% من الجدران ودمج جزيرة كوارتز مركزية مع مفصلات بلوم هيدروليك.',
    specs: ['تفصيل هندسي بالليزر', 'أنظمة بلوم هيدروليك النمساوية', 'ضمان رسمي 10 سنوات'],
  },
  {
    id: 'case-1',
    number: '02',
    tag: 'مساحات مفتوحة Open Concept',
    title: 'تجديد مطبخ متهالك إلى تحفة أكريليك كريستال',
    location: 'كمبوند بالشيخ زايد • 6 أكتوبر',
    beforeLabel: 'قبل: مطبخ قديم ضيق ومظلم',
    afterLabel: 'بعد: لمعان كريستالي واستغلال رأسي',
    beforeImage:
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    transformationFact: 'مضاعفة سعة التخزين 3 أضعاف باستخدام وحدات ممتدة للسقف وزوايا سحرية.',
    specs: ['أكريليك إسباني كريستال', 'إضاءات LED بروفايل ذكية', 'زوايا سحرية Magic Corners'],
  },
  {
    id: 'case-2',
    number: '03',
    tag: 'نيو كلاسيك ملكي',
    title: 'تحول نيو كلاسيك فاخر بقشرة أرو طبيعي معالج',
    location: 'دوبلكس في المعادي • القاهرة',
    beforeLabel: 'قبل: حوائط غير منتظمة وزوايا ميتة',
    afterLabel: 'بعد: فخامة نيو كلاسيك ملكية',
    beforeImage:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
    afterImage:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=85',
    transformationFact: 'معالجة انحرافات الحوائط ودمج الرخام الإيطالي مع خشب طبيعي معالج.',
    specs: ['خشب طبيعي معالج إيطالياً', 'مقابض نحاس أصلي', 'رخام كلكتا نخب أول'],
  },
];

export const BeforeAfterShowcase: React.FC<BeforeAfterShowcaseProps> = ({ onStartWhatsApp }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[activeCaseIndex];

  // Calculate percentage smoothly from pointer / touch event
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
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
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  // Quick jump presets
  const setQuickView = (pos: number) => {
    setSliderPosition(pos);
  };

  return (
    <div id="before-after" className="relative select-none" dir="rtl">
      {/* Minimalist Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3 py-1 text-[11px] font-semibold text-[#dfb57b] mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>التحول المعماري الفعلي</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            شاهد الفرق <span className="bg-gradient-to-l from-white via-white/85 to-[#c5a880] bg-clip-text text-transparent">قبل وبعد التنفيذ</span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-white/55 font-light max-w-xl">
            اسحب المؤشر التفاعلي لمشاهدة دقة تحويل المساحات الخام والمتهالكة إلى مطابخ فاخرة بأعلى المواصفات الأوروبية.
          </p>
        </div>

        {/* Minimalist Tab Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl border border-white/[0.08] bg-[#0c1016]/90 backdrop-blur-md">
          {CASES.map((item, idx) => {
            const isActive = idx === activeCaseIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveCaseIndex(idx);
                  setSliderPosition(50);
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#c5a880] text-black shadow-[0_4px_20px_rgba(197,168,128,0.3)]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>مشروع {item.number}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-stretch">
        
        {/* INTERACTIVE COMPARISON CANVAS */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#090c10] shadow-[0_20px_70px_rgba(0,0,0,0.7)] group">
          
          {/* Comparison Viewport */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative aspect-[16/10] sm:aspect-[16/9] w-full cursor-ew-resize overflow-hidden touch-none"
          >
            {/* 1. AFTER Image (Base Layer) */}
            <img
              src={activeCase.afterImage}
              alt={activeCase.afterLabel}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
              }}
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* 2. BEFORE Image (Clipped dynamically via polygon) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `polygon(0% 0%, ${sliderPosition}% 0%, ${sliderPosition}% 100%, 0% 100%)`,
              }}
            >
              <img
                src={activeCase.beforeImage}
                alt={activeCase.beforeLabel}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1600&q=80';
                }}
                className="absolute inset-0 h-full w-full object-cover grayscale-[30%] brightness-90"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            {/* 3. Sleek Divider Line with High-Tech Glow */}
            <div
              className="pointer-events-none absolute inset-y-0 z-20 w-[2px] bg-gradient-to-b from-white via-[#dfb57b] to-white shadow-[0_0_15px_rgba(223,181,123,0.9)]"
              style={{ left: `${sliderPosition}%` }}
            />

            {/* 4. Luxury Floating Drag Handle */}
            <div
              className="pointer-events-none absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <motion.div
                animate={{ scale: isDragging ? 1.12 : 1 }}
                className="grid h-12 w-12 sm:h-14 sm:w-14 place-items-center rounded-full border-2 border-[#dfb57b] bg-[#0c1015]/95 text-white shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_15px_rgba(197,168,128,0.5)] backdrop-blur-xl"
              >
                <ChevronsLeftRight className="h-5 w-5 text-[#dfb57b]" />
              </motion.div>
            </div>

            {/* 5. Minimalist Glass Badges */}
            <div className="pointer-events-none absolute top-4 left-4 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-[11px] font-bold text-white/90 shadow-xl backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>قبل البدء</span>
              </span>
            </div>

            <div className="pointer-events-none absolute top-4 right-4 z-20">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/40 bg-[#0c1015]/85 px-3.5 py-1.5 text-[11px] font-bold text-[#f0cb98] shadow-xl backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-[#dfb57b] animate-pulse" />
                <span>بعد التسليم الكامل</span>
              </span>
            </div>

            {/* 6. Quick Interactive Slider Controls (Bottom Center) */}
            <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-2 pointer-events-auto">
              <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/70 px-2 py-1 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setQuickView(15)}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/70 hover:text-white transition"
                >
                  عرض (قبل)
                </button>
                <span className="text-white/20">•</span>
                <button
                  type="button"
                  onClick={() => setQuickView(50)}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-[#dfb57b] hover:text-[#f0cb98] transition"
                >
                  مقارنة 50/50
                </button>
                <span className="text-white/20">•</span>
                <button
                  type="button"
                  onClick={() => setQuickView(85)}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white/70 hover:text-white transition"
                >
                  عرض (بعد)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PROJECT INSIGHT & INSTANT ACTION CARD */}
        <div className="flex flex-col justify-between rounded-[28px] border border-white/[0.08] bg-[#0c1015] p-6 sm:p-7 shadow-xl">
          <div>
            {/* Location & Tag */}
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#dfb57b] font-bold">{activeCase.tag}</span>
              <span className="text-white/40">{activeCase.location}</span>
            </div>

            {/* Title */}
            <h3 className="mt-3 text-lg sm:text-xl font-bold text-white leading-snug">
              {activeCase.title}
            </h3>

            {/* Transformation Highlight Fact */}
            <p className="mt-3 text-xs leading-relaxed text-white/65 font-light">
              {activeCase.transformationFact}
            </p>

            {/* Technical Specifications Checklist */}
            <div className="mt-6 space-y-2.5 border-t border-white/[0.06] pt-5">
              <span className="block text-[11px] font-bold text-white/80">المواصفات المنفذة في هذا المشروع:</span>
              {activeCase.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/75">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#dfb57b] shrink-0" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* High-Conversion WhatsApp Trigger */}
          <div className="mt-8 border-t border-white/[0.06] pt-5">
            <button
              type="button"
              onClick={() =>
                onStartWhatsApp(
                  `أهلاً البروفيسور، شاهدت مقارنة قبل وبعد لمشروع "${activeCase.title}" وحابب استفسر عن إمكانية تنفيذ دراسة وتصميم 3D لمساحة مطبخي.`
                )
              }
              className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#c5a880] px-4 text-xs font-bold text-black shadow-lg transition-all duration-300 hover:bg-[#dfb57b] hover:shadow-[0_10px_30px_rgba(197,168,128,0.3)] active:scale-98"
            >
              <span>طلب دراسة وتصميم لمساحتك</span>
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </button>
            <span className="mt-2 block text-center text-[10px] text-white/40 font-light">
              معاينة ليزر وتصميم 3D مجاناً بالكامل
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
