import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Droplet, Flame, Sparkles, MessageCircle, ArrowLeft, Layers, Check } from 'lucide-react';
import { MaterialInfo } from '../types';

interface MaterialsShowcaseProps {
  onStartWhatsApp: (message: string) => void;
}

const MATERIALS_DATA: MaterialInfo[] = [
  {
    id: 'polylac',
    name: 'بولي لاك تركي أصلي (Poly-lacquer)',
    badge: 'الأعلى تحملاً في مصر',
    description:
      'لوح MDF عالي الكثافة مغطى بطبقة PET مقاومة للخدش والصدمات بدرجة 2H. سطحه زجاجي أو فائق النعومة المات، ولا يتأثر بالحرارة أو الزيوت الناتجة عن الطهي.',
    bestFor: 'المطابخ العائلية النشطة والباحثين عن مظهر مودرن فخم مع أعلى عمر افتراضي.',
    features: [
      'مقاوم للخدش والاحتكاك اليومي',
      'ثبات استثنائي في درجات اللون ولا يصفر مع الوقت',
      'سهل التنظيف تماماً بمسحة قماش قطنية',
      'حواف معالجة بتقنية الليزر الخفي بدون فواصل مياه',
    ],
    durability: 98,
    waterResist: 95,
    heatResist: 92,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
    color: '#dfb57b',
  },
  {
    id: 'acrylic',
    name: 'أكريليك كريستال (Crystal Acrylic)',
    badge: 'عمق زجاجي وبريق استثنائي',
    description:
      'طبقة أكريليك بيور 100% بسماكة ممتازة تعطي لمعاناً زجاجياً فائق النقاء ومرآة تعكس الضوء لتمنح المطابخ الصغيرة والمتوسطة إحساساً كبيراً بالاتساع.',
    bestFor: 'المطابخ المودرن الحديثة وعشاق اللمعان البراق والإضاءة المنعكسة الأنيقة.',
    features: [
      'انعكاس ضوء كريستالي فائق النقاء (Mirror Effect)',
      'يعطي إيحاء بمضاعفة مساحة المطبخ الصغير',
      'مقاوم لامتصاص الروائح وبقع الأطعمة الملونة',
      'متاح بدرجات ألوان جريئة وحيادية راقية',
    ],
    durability: 88,
    waterResist: 96,
    heatResist: 86,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    color: '#8af0a6',
  },
  {
    id: 'hpl',
    name: 'اتش بي ال مصفح (High Pressure Laminate)',
    badge: 'الحصن المنيع ضد المياه والحرارة',
    description:
      'رقائق راتنجية وميلامين مضغوطة تحت ضغط وحرارة هائلة، ينتج عنها أقوى سطح مقاوم للمياه والرطوبة والخدش، مع تشكيلة ملمس خرساني وملمس أخشاب دافئة.',
    bestFor: 'الأماكن المعرضة لبخار شديد أو استخدام تجاري ومطابخ الشاليهات والمصايف.',
    features: [
      'مقاومة 100% للمياه والرطوبة العالية',
      'سطح مضاد للبكتيريا ومقاوم للبقع الكيميائية',
      'متاح بتأثيرات خرسانية ورخامية عصرية بدون وزن الرخام',
      'أفضل قيمة مقابل متانة مدى الحياة',
    ],
    durability: 96,
    waterResist: 99,
    heatResist: 95,
    image: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=85',
    color: '#90b4ce',
  },
  {
    id: 'veneer',
    name: 'قشرة خشب طبيعي معالج (Natural Wood Veneer)',
    badge: 'دفء الفخامة والأناقة الهادئة',
    description:
      'قشور طبيعية من أخشاب السنديان والأرو والجوز، معالجة بطبقات بولي يوريثان إيطالية عازلة تضمن عدم تقشرها وتمنح المطبخ هيبة وفخامة لا تضاهى.',
    bestFor: 'المطابخ ذات المساحات المفتوحة (Open-Concept) والديكورات النيو كلاسيك الفخمة.',
    features: [
      'عروق خشبية طبيعية فريدة لا تتكرر في أي مطبخ آخر',
      'معالجة ضد سوس الخشب والتمدد الناتج عن الرطوبة',
      'يتناغم بسلاسة مع رخام الكوارتز والجرانيت الأسود',
      'إحساس راقٍ يرفع من القيمة العقارية للوحدة بالكامل',
    ],
    durability: 90,
    waterResist: 89,
    heatResist: 88,
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85',
    color: '#e2b87f',
  },
];

export const MaterialsShowcase: React.FC<MaterialsShowcaseProps> = ({ onStartWhatsApp }) => {
  const [selectedId, setSelectedId] = useState<string>(MATERIALS_DATA[0].id);
  const activeMaterial = MATERIALS_DATA.find((m) => m.id === selectedId) || MATERIALS_DATA[0];

  return (
    <div className="rounded-[32px] border border-white/[0.08] bg-[#0c1015] p-6 md:p-10">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#dfb57b]">
            <Layers className="h-3.5 w-3.5" />
            European Standards & Materials
          </span>
          <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
            الخامات المعتمدة <span className="text-[#dfb57b]">لدى البروفيسور</span>
          </h2>
          <p className="mt-2 text-xs text-white/50">
            لا نستخدم أي خامات تجارية مجهولة المصدر. جميع الألواح مستوردة ومعتمدة بضمان رسمي 10 سنوات.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onStartWhatsApp(
              `أهلاً البروفيسور، عايز أشوف عينات خامات المطابخ على الطبيعة (بولي لاك / أكريليك / HPL).`
            )
          }
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-white transition hover:border-[#dfb57b]/40 hover:bg-[#dfb57b]/10"
        >
          <span>طلب معاينة عينات الخامات</span>
          <ArrowLeft className="h-3.5 w-3.5 text-[#dfb57b]" />
        </button>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {MATERIALS_DATA.map((mat) => {
          const isActive = mat.id === selectedId;
          return (
            <button
              key={mat.id}
              type="button"
              onClick={() => setSelectedId(mat.id)}
              className={`relative flex shrink-0 items-center gap-2.5 rounded-2xl border px-4 py-3 text-right transition-all duration-200 ${
                isActive
                  ? 'border-[#dfb57b] bg-[#dfb57b]/[0.12] text-white shadow-[0_0_20px_rgba(223,181,123,0.15)]'
                  : 'border-white/[0.07] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white'
              }`}
            >
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: mat.color }}
              />
              <span className="text-xs font-black">{mat.name.split(' (')[0]}</span>
              {isActive && (
                <span className="rounded bg-[#dfb57b]/20 px-1.5 py-0.5 text-[9px] font-bold text-[#f0c88f]">
                  محدد
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Active Material Detailed Card with smooth animated transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMaterial.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="mt-6 grid gap-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] p-6 lg:grid-cols-12 lg:items-center"
        >
          {/* Visual Showcase (5 cols) */}
          <div className="relative aspect-[1.25] overflow-hidden rounded-2xl border border-white/10 lg:col-span-5">
            <img
              src={activeMaterial.image}
              alt={activeMaterial.name}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 left-4 flex items-center justify-between">
              <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white/90 backdrop-blur-md">
                {activeMaterial.badge}
              </span>
              <span className="text-[10px] font-mono text-white/50">100% ORIGINAL</span>
            </div>
          </div>

          {/* Details & Performance Indicators (7 cols) */}
          <div className="space-y-5 lg:col-span-7">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#dfb57b]">
                {activeMaterial.badge}
              </span>
              <h3 className="mt-1 text-2xl font-black text-white md:text-3xl">
                {activeMaterial.name}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-white/60">
                {activeMaterial.description}
              </p>
            </div>

            {/* Performance Bars */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.06] bg-black/30 p-4">
              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-white/60">
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-[#dfb57b]" /> التحمل والخدش
                  </span>
                  <span className="text-[#f0c88f]">{activeMaterial.durability}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-[#dfb57b] transition-all duration-500"
                    style={{ width: `${activeMaterial.durability}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-white/60">
                  <span className="flex items-center gap-1">
                    <Droplet className="h-3 w-3 text-blue-400" /> مقاومة المياه
                  </span>
                  <span className="text-blue-300">{activeMaterial.waterResist}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-blue-400 transition-all duration-500"
                    style={{ width: `${activeMaterial.waterResist}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-[10px] font-bold text-white/60">
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3 text-amber-500" /> عزل الحرارة
                  </span>
                  <span className="text-amber-400">{activeMaterial.heatResist}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${activeMaterial.heatResist}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bullet points */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {activeMaterial.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-[11px] text-white/70">
                  <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onStartWhatsApp(
                    `أهلاً البروفيسور، أود الاستفسار عن تفاصيل ومواصفات تنفيذ مطبخ بخامة "${activeMaterial.name}".`
                  )
                }
                className="refined-luxury-btn inline-flex items-center gap-2 rounded-full bg-[#c5a880] px-6 py-3 text-xs font-bold text-black transition hover:bg-[#dfb57b]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>استشارة المهندس حول خامة {activeMaterial.name.split(' (')[0]}</span>
                <ArrowLeft className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
