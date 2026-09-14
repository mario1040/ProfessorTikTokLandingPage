import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Layers,
  ArrowLeft,
  ShieldCheck,
  Droplet,
  Flame,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface MaterialsShowcaseProps {
  onStartWhatsApp: (message: string) => void;
}

interface MaterialSpec {
  id: string;
  name: string;
  category: string;
  origin: string;
  headline: string;
  summary: string;
  keyFeature: string;
  durability: number;
  waterproof: number;
  heatproof: number;
  image: string;
  color: string;
}

const MATERIALS: MaterialSpec[] = [
  {
    id: 'polylac',
    name: 'بولي لاك تركي',
    category: 'Poly-lacquer Original',
    origin: 'تركي نخب أول معتمد',
    headline: 'الأعلى تحملاً ومقاومة للخدش والصدمات',
    summary:
      'لوح MDF عالي الكثافة مغطى بطبقة PET بدرجة صلابة 2H، يجمع بين النعومة الفائقة ومقاومة الزيوت وتغير الألوان.',
    keyFeature: 'تقفيل الحواف بالليزر بدون فواصل مياه',
    durability: 98,
    waterproof: 95,
    heatproof: 92,
    image: 'public/45dd05754a65295ca8c5959bced8a9be.jpg',
    color: '#dfb57b',
  },
  {
    id: 'acrylic',
    name: 'أكريليك كريستال',
    category: 'Crystal Pure Acrylic',
    origin: 'إسباني نخب أول',
    headline: 'عمق زجاجي وبريق يعكس الضوء والاتساع',
    summary:
      'طبقة أكريليك بيور 100% تعكس الإضاءة كمرآة نقية، تمنح المساحة إيحاء بمضاعفة الحجم ومقاومة تامة للبقع والروائح.',
    keyFeature: 'انعكاس كريستالي ومقاومة للبقع الصعبة',
    durability: 88,
    waterproof: 96,
    heatproof: 86,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    color: '#9ae6b4',
  },
  {
    id: 'hpl',
    name: 'HPL مصفح',
    category: 'High Pressure Laminate',
    origin: 'هندي / إيطالي مصفح',
    headline: 'الحصن المنيع ضد الرطوبة وبخار المياه',
    summary:
      'رقائق راتنجية وميلامين مضغوطة تحت درجات حرارة فائقة، تضمن استقرار المطبخ حتى مع الاستخدام اليومي الشاق.',
    keyFeature: 'سطح مضاد للمياه والرطوبة بنسبة 100%',
    durability: 96,
    waterproof: 99,
    heatproof: 95,
    image: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=85',
    color: '#90cdf4',
  },
  {
    id: 'veneer',
    name: 'قشرة أرو طبيعي',
    category: 'Natural Wood Veneer',
    origin: 'أخشاب سنديان وأرو معالجة',
    headline: 'دفء الخشب الطبيعي والفخامة الكلاسيكية',
    summary:
      'عروق خشب طبيعية معالجة بطبقات بولي يوريثان إيطالية عازلة للرطوبة، تمنح المطبخ طابعاً فريداً لا يتكرر.',
    keyFeature: 'معالجة إيطالية ضد التسوس وتغير اللون',
    durability: 90,
    waterproof: 89,
    heatproof: 88,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
    color: '#f6ad55',
  },
];

export const MaterialsShowcase: React.FC<MaterialsShowcaseProps> = ({ onStartWhatsApp }) => {
  const [activeId, setActiveId] = useState<string>(MATERIALS[0].id);
  const activeMaterial = MATERIALS.find((m) => m.id === activeId) || MATERIALS[0];

  return (
    <div className="relative select-none" dir="rtl">
      {/* Minimalist Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3 py-1 text-[11px] font-semibold text-[#dfb57b] mb-3">
            <Layers className="h-3.5 w-3.5" />
            <span>المواصفات والخامات الأوروبية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            الخامات المعتمدة <span className="bg-gradient-to-l from-white via-white/85 to-[#c5a880] bg-clip-text text-transparent">لدى البروفيسور</span>
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-white/55 font-light max-w-xl">
            ألواح أصلية مستوردة تخضع لمعايير الجودة الأوروبية ومرفقة بضمان تعاقدي رسمي 10 سنوات.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onStartWhatsApp('أهلاً البروفيسور، أود الاطلاع على عينات الخامات على الطبيعة ومطابقة درجات الألوان.')
          }
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs font-bold text-white transition hover:border-[#dfb57b]/50 hover:bg-white/[0.07]"
        >
          <span>معاينة عينات الخامات</span>
          <ArrowLeft className="h-3.5 w-3.5 text-[#dfb57b]" />
        </button>
      </div>

      {/* Interactive Bento Showcase */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Interactive Material Cards Selector (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {MATERIALS.map((mat) => {
            const isSelected = mat.id === activeId;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setActiveId(mat.id)}
                className={`group relative flex items-center justify-between p-4 rounded-2xl border text-right transition-all duration-300 ${
                  isSelected
                    ? 'border-[#dfb57b] bg-[#dfb57b]/10 shadow-[0_8px_30px_rgba(223,181,123,0.15)]'
                    : 'border-white/[0.07] bg-[#0c1016]/80 hover:border-white/20 hover:bg-[#111620]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="h-3 w-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: mat.color }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-white/80'}`}>
                        {mat.name}
                      </h3>
                      {isSelected && (
                        <span className="shrink-0 rounded-full bg-[#dfb57b]/20 px-2 py-0.5 text-[9px] font-bold text-[#dfb57b]">
                          محدد
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-white/45 truncate mt-0.5">
                      {mat.origin}
                    </p>
                  </div>
                </div>

                <div className="text-left shrink-0 pl-1">
                  <span className="text-[11px] font-mono text-[#dfb57b] font-bold">
                    {mat.durability}%
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Material Detailed Studio Card (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMaterial.id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative h-full flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#0c1015] p-6 sm:p-8 shadow-2xl"
            >
              {/* Background ambient glow */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-[90px] opacity-15"
                style={{ backgroundColor: activeMaterial.color }}
              />

              <div>
                {/* Header tag & origin */}
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#dfb57b]">
                    <Sparkles className="h-3 w-3" />
                    {activeMaterial.category}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-white/60">
                    {activeMaterial.origin}
                  </span>
                </div>

                {/* Main Headline */}
                <h3 className="mt-4 text-2xl sm:text-3xl font-black text-white leading-tight">
                  {activeMaterial.name}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-[#dfb57b]">
                  {activeMaterial.headline}
                </p>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm text-white/65 font-light leading-relaxed">
                  {activeMaterial.summary}
                </p>

                {/* Photo Preview & Key Feature Badge */}
                <div className="mt-5 relative aspect-[16/7] overflow-hidden rounded-2xl border border-white/[0.08]">
                  <img
                    src={activeMaterial.image}
                    alt={activeMaterial.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#dfb57b]" />
                      {activeMaterial.keyFeature}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">ORIGINAL LABELS</span>
                  </div>
                </div>

                {/* Performance Metrics Bar */}
                <div className="mt-6 grid grid-cols-3 gap-2.5 rounded-2xl border border-white/[0.06] bg-black/40 p-3 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-white/50 mb-1">
                      <ShieldCheck className="h-3 w-3 text-[#dfb57b]" />
                      <span>مقاومة الخدش</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-white">
                      {activeMaterial.durability}%
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-white/50 mb-1">
                      <Droplet className="h-3 w-3 text-sky-400" />
                      <span>عزل المياه</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-white">
                      {activeMaterial.waterproof}%
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-1 text-[10px] text-white/50 mb-1">
                      <Flame className="h-3 w-3 text-amber-400" />
                      <span>تحمل الحرارة</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-white">
                      {activeMaterial.heatproof}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Callout */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[11px] text-white/40">
                  متاح بجميع الدرجات المات واللامعة مع مقاسات مخصصة.
                </span>

                <button
                  type="button"
                  onClick={() =>
                    onStartWhatsApp(
                      `أهلاً البروفيسور، أود معرفة تكلفة ومواصفات مطبخ بخامة "${activeMaterial.name}".`
                    )
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#c5a880] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#dfb57b]"
                >
                  <span>طلب تسعير ودراسة للخامة</span>
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
