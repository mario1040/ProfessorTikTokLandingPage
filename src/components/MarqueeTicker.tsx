import React from 'react';
import { Sparkles, ShieldCheck, Box, Ruler, CheckCircle2, Clock, MapPin, Award } from 'lucide-react';

export const MarqueeTicker: React.FC = () => {
  const primaryItems = [
    { icon: Sparkles, text: 'تصميم 3D مجاني بالكامل قبل التعاقد', highlight: 'مجاني 100%' },
    { icon: ShieldCheck, text: 'ضمان حقيقي 10 سنوات موثق بعقد رسمي', highlight: '10 سنوات' },
    { icon: Ruler, text: 'معاينة ورفع مقاسات ليزر هندسية دقيقة', highlight: 'بدون رسوم' },
    { icon: Box, text: 'خامات أوروبية مستوردة: HPL - Acrylic - Poly-lacquer', highlight: 'مستورد أصلي' },
    { icon: Clock, text: 'التزام صارم بجدول التوريد وموعد الاستلام', highlight: 'في الموعد' },
    { icon: Award, text: 'إكسسوارات ومفصلات هيدروليك بلوم النمساوية الأصلية', highlight: 'Soft-Close' },
    { icon: CheckCircle2, text: 'فريق هندسي متخصص يشرف على التركيب خطوة بخطوة', highlight: 'إشراف هندسي' },
  ];

  const secondaryLocations = [
    '📍 تم تسليم مطبخ في زايد ديونز (الشيخ زايد)',
    '📍 قيد التركيب: فيلا بالتجمع الخامس (القاهرة الجديدة)',
    '📍 اعتماد تصميم 3D لمطبخ أمريكي (المعادي)',
    '📍 توريد مطبخ بولي لاك تركي سوبر مات (مدينتي)',
    '📍 رفع مقاسات ليزر لمطبخ نيو كلاسيك (مدينة نصر)',
    '📍 تسليم وتركيب مطبخ مع جزيرة رخام (الشروق)',
    '📍 تنفيذ مطبخ HPL ضد المياه والحرارة (أكتوبر)',
  ];

  return (
    <div className="relative overflow-hidden border-y border-white/[0.08] bg-[#07090c] py-4 select-none">
      {/* Ambient gradient edges for seamless fading */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#07090c] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#07090c] to-transparent" />

      {/* Track 1: High-Impact Guarantee Ticker (moves in direction) */}
      <div className="flex overflow-hidden py-1">
        <div className="animate-marquee-backward flex gap-8 whitespace-nowrap">
          {[...primaryItems, ...primaryItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`track1-${idx}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 backdrop-blur-md transition hover:border-[#dfb57b]/30 hover:bg-[#dfb57b]/[0.06]"
              >
                <div className="grid h-6 w-6 place-items-center rounded-full bg-[#dfb57b]/15 text-[#f0c88f]">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-bold text-white/90">{item.text}</span>
                <span className="rounded-md bg-[#dfb57b]/15 px-2 py-0.5 text-[10px] font-black text-[#f3cf9c]">
                  {item.highlight}
                </span>
                <span className="text-white/20 mr-2">•</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track 2: Recent Deliveries & Live Activity Marquee (reverse direction) */}
      <div className="mt-2.5 flex overflow-hidden py-0.5 opacity-75">
        <div className="animate-marquee-forward flex gap-6 whitespace-nowrap">
          {[...secondaryLocations, ...secondaryLocations].map((loc, idx) => (
            <div
              key={`track2-${idx}`}
              className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/60 transition hover:text-white"
            >
              <span>{loc}</span>
              <span className="text-emerald-400/60 font-mono text-[10px]">✓ تم الاعتماد</span>
              <span className="text-white/20 mx-2">—</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
