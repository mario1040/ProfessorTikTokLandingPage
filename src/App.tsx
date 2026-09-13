/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  Clock,
  Compass,
  CheckCircle2,
  Star,
  Phone,
  ChevronLeft,
  X,
  Eye,
  Award,
  BadgePercent,
  Check,
  MapPin,
  Flame,
  ArrowDown
} from 'lucide-react';

// TypeScript declaration for TikTok Pixel window object
declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
    };
  }
}

// Brand & Contact Constants
const TIKTOK_PIXEL_ID = 'DAJ83CJC77UCRCTVDQ9G';
const WHATSAPP_PHONE = '+201149238763';
const DEFAULT_WHATSAPP_URL =
  'https://wa.me/201149238763?text=' +
  encodeURIComponent('أهلاً البروفيسور للمطابخ، مهتم بتصميم مطبخي وأريد معرفة التفاصيل');

// Curated Luxury Kitchen Portfolio Images
const KITCHEN_PROJECTS = [
  {
    id: 'k1',
    title: 'مطبخ مودرن كولد جراي مع خشب الجوز',
    category: 'أكريليك تركي & HPL',
    desc: 'تصميم أوروبي انسيابي بدون مقابض مع إضاءة بروفايل ليد ذكية ومساحات تخزين مخفية.',
    img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    tags: ['مقاوم للرطوبة', 'إكسسوارات بلوم', 'ضمان 10 سنوات']
  },
  {
    id: 'k2',
    title: 'مطبخ دارك تشاركول مع جزيرة رخامية',
    category: 'بولي لاك ألماني',
    desc: 'فخامة اللون الأسود المات المقاوم لبصمات الأصابع مع جزيرة مركزية من رخام الكلكتا الطبيعي.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tags: ['مضاد للبصمات', 'إضاءة ليد مخفية', 'تصميم 3D']
  },
  {
    id: 'k3',
    title: 'مطبخ أبيض ناصع مع لمسات نحاسية دافئة',
    category: 'يو في لاك مقاوم للخدش',
    desc: 'تناغم معماري بين البياض النقي والرخام مع مقابض وإكسسوارات مطلية بالذهب والنحاس المعتق.',
    img: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1200&q=80',
    tags: ['أعلى إشراق', 'سهل التنظيف', 'مفصلات هيدروليك']
  },
  {
    id: 'k4',
    title: 'مطبخ نيو كلاسيك فخم بلون كشمير ملكي',
    category: 'خشب طبيعي & بي في سي تركي',
    desc: 'مزيج راقٍ يجمع بين كلاسيكية الحفر وأحدث الآليات التكنولوجية لأرفف التخزين الدوارة.',
    img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
    tags: ['عازل حراري', 'دهانات مقاومة', 'سعة تخزين مضاعفة']
  },
  {
    id: 'k5',
    title: 'مطبخ زان طبيعي مع لمسات ستيل صناعي',
    category: 'كلادينج وقشرة طبيعية',
    desc: 'مطبخ معاصر مصمم لقصور وفيلات التجمع والشيخ زايد مع كبائن مرتفعة حتى السقف.',
    img: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=80',
    tags: ['شاسيه ألومنيوم', 'مقاوم للحرارة', 'عمر افتراضي مديد']
  },
  {
    id: 'k6',
    title: 'مطبخ مينيماليست ممتد مع ركن قهوة متكامل',
    category: 'لامينات أوروبي مضغوط',
    desc: 'حلول عملية لاستغلال أصغر المساحات بدقة متناهية مع ركن قهوة مدمج بأرفف زجاجية منيرة.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    tags: ['كوفي كورنر مدمج', 'سحب ناعم Soft-Close', 'أرفف سحرية']
  }
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<typeof KITCHEN_PROJECTS[0] | null>(null);
  const [remainingMinutes, setRemainingMinutes] = useState(14);
  const [remainingSeconds, setRemainingSeconds] = useState(59);

  // TikTok Pixel Standard Event: ViewContent on page load
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.page();
        window.ttq.track('ViewContent', {
          contents: [
            {
              content_id: 'kitchen_custom_01',
              content_type: 'product',
              content_name: 'Custom Kitchen Design'
            }
          ],
          value: 0,
          currency: 'EGP'
        });
      }
    } catch (e) {
      console.error('TikTok ViewContent track error:', e);
    }
  }, []);

  // Countdown timer for TikTok conversion urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev > 0) return prev - 1;
        setRemainingMinutes((m) => (m > 0 ? m - 1 : 15));
        return 59;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // WhatsApp Conversion Click Handler with TikTok Pixel Contact Event
  const handleWhatsAppClick = (customMsg?: string) => {
    try {
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.track('Contact', {
          contents: [
            {
              content_id: 'whatsapp_lead',
              content_type: 'product',
              content_name: 'WhatsApp Inquiry'
            }
          ],
          value: 500,
          currency: 'EGP'
        });
      }
    } catch (e) {
      console.error('TikTok Contact track error:', e);
    }

    const url = customMsg
      ? `https://wa.me/201149238763?text=${encodeURIComponent(customMsg)}`
      : DEFAULT_WHATSAPP_URL;

    // Immediately open WhatsApp in a new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-[#0a0d14] text-slate-100 selection:bg-amber-500 selection:text-black font-sans pb-24 md:pb-12">
      
      {/* Top Conversion Announcement Bar (Urgency Hook for TikTok Traffic) */}
      <div id="top-announcement-bar" className="bg-gradient-to-r from-amber-900/90 via-amber-600 to-amber-700 text-black py-2.5 px-4 text-center font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-black animate-bounce shrink-0" />
        <span>
          عرض حصري لعملاء تيك توك: معاينة مجانية + تصميم 3D واقعي قبل التعاقد! ينتهي خلال{' '}
          <span className="bg-black/80 text-amber-300 px-2 py-0.5 rounded font-mono text-xs sm:text-sm inline-block mx-1">
            {String(remainingMinutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
          </span>
        </span>
      </div>

      {/* Header / Brand Identity */}
      <header id="main-header" className="sticky top-0 z-40 bg-[#0a0d14]/95 backdrop-blur-md border-b border-amber-500/20 px-4 py-3 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 flex items-center justify-center shadow-lg shadow-amber-500/20 border border-amber-300/40">
              <span className="font-extrabold text-black text-lg sm:text-xl font-serif">P</span>
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                البروفيسور <span className="text-amber-400 text-xs sm:text-sm font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">للمطابخ والديكور</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium">
                خبرة تتجاوز 15 عاماً في تصنيع أرقى المطابخ في مصر
              </p>
            </div>
          </div>

          <button
            id="header-whatsapp-cta"
            onClick={() => handleWhatsAppClick('أهلاً البروفيسور، أريد الاستفسار عن تفاصيل تصميم المطابخ والعروض المتاحة')}
            className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-all duration-200 shadow-md shadow-emerald-900/30 border border-emerald-400/30"
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>تواصل مباشر</span>
          </button>
        </div>
      </header>

      <main>
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION                                                   */}
        {/* ========================================================================= */}
        <section id="hero-section" className="relative pt-6 sm:pt-12 pb-14 sm:pb-20 px-4 overflow-hidden">
          {/* Subtle architectural ambient background glow */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            
            {/* VIP Social Proof Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-5 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>أكبر صرح متخصص في المطابخ المودرن والنيوكلاسيك بمصر</span>
            </div>

            {/* Main Headline (Exact Copy requested) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.25] tracking-tight mb-5 drop-shadow-sm">
              صمم مطبخ أحلامك مع{' '}
              <span className="bg-gradient-to-l from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy decoration-2">
                البروفيسور للمطابخ والديكور
              </span>
            </h1>

            {/* Subheadline (Exact Copy requested) */}
            <p className="text-base sm:text-xl md:text-2xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
              أحدث التصميمات العصرية، خامات مستوردة، وتنفيذ دقيق. احجز معاينتك الآن واستلم تصميم 3D مجاناً.
            </p>

            {/* Hero Interactive Visual Container with Live Proof Badge */}
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl mb-8 max-w-3xl mx-auto group">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=85"
                alt="تصميم مطبخ فاخر مودرن من البروفيسور للمطابخ"
                className="w-full h-64 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d14] via-black/30 to-transparent" />
              
              {/* Overlay Quality Badge */}
              <div className="absolute bottom-4 right-4 left-4 flex flex-wrap items-center justify-between gap-2 bg-black/75 backdrop-blur-md p-3 sm:p-4 rounded-xl border border-white/10 text-right">
                <div>
                  <p className="text-white font-bold text-xs sm:text-sm">معاينة منزلية ورفع مقاسات ليزر مجاناً</p>
                  <p className="text-amber-400 text-[11px] sm:text-xs font-medium">عرض خاص يشمل كافة مناطق القاهرة والجيزة والإسكندرية</p>
                </div>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/20 px-2.5 py-1 rounded-lg border border-amber-400/30">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>4.9 / 5 (1,500+ عميل)</span>
                </div>
              </div>
            </div>

            {/* Primary Massive CTA Button with Pulse Animation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
              <button
                id="hero-primary-whatsapp-btn"
                onClick={() => handleWhatsAppClick()}
                className="w-full sm:w-auto flex-1 group relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-98 text-white text-lg sm:text-xl font-black py-4 sm:py-5 px-8 rounded-2xl shadow-xl transition-all duration-300 animate-pulse-whatsapp cursor-pointer border border-emerald-300/40"
              >
                <WhatsAppIcon className="w-7 h-7 fill-current shrink-0 group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide">تواصل معنا عبر الواتساب الآن</span>
                <ChevronLeft className="w-6 h-6 shrink-0 transition-transform group-hover:-translate-x-1" />
              </button>
            </div>

            {/* Direct Trust Proof Micro-items */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto mt-6 text-slate-300 text-xs sm:text-sm font-medium">
              <div className="flex items-center justify-center gap-1.5 bg-slate-900/60 py-2 px-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تصميم 3D فوري</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-slate-900/60 py-2 px-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ضمان 10 سنوات</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-slate-900/60 py-2 px-2 rounded-lg border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>خامات أوروبية 100%</span>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: WHY CHOOSE US (TRUST SIGNALS)                                  */}
        {/* ========================================================================= */}
        <section id="why-choose-us-section" className="py-12 sm:py-16 px-4 bg-[#0f141e] border-y border-amber-500/15 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
              <div className="inline-flex items-center gap-2 text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                <Award className="w-4 h-4" />
                <span>لماذا يفضلنا عملاء النخبة؟</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                معايير هندسية صارمة وجودة لا تقبل التنازل
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">
                نعتمد أعلى المواصفات العالمية لضمان مطبخ يجمع بين الجمال المبهر والتحمل الأبدي
              </p>
            </div>

            {/* 4 Trust Pillar Cards (خامات، ضمان، تسليم، تصميم) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* 1. الخامات (Premium Materials) */}
              <div id="trust-card-materials" className="bg-[#141a27] rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>الخامات</span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-normal">مستوردة</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  نستخدم أرقى الخامات الأوروبية والتركية (بولي لاك، أكريليك، HPL، كلادينج) المقاومة كلياً للمياه، الرطوبة، والحرارة والخدش.
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>معالجة ضد البكتيريا وحشرات المطابخ</span>
                </div>
              </div>

              {/* 2. الضمان (Up to 10 Years Warranty) */}
              <div id="trust-card-warranty" className="bg-[#141a27] rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500 group-hover:text-black transition-colors duration-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>الضمان</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-normal">حتى 10 سنوات</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  شهادة ضمان معتمدة رسمياً تصل إلى 10 سنوات تشمل الهيكل والخشب ومفصلات بلوم النمساوية (Blum) مع صيانة دورية مجانية.
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>إكسسوارات إيطالية ونمساوية أصلية</span>
                </div>
              </div>

              {/* 3. التسليم (Fast Delivery) */}
              <div id="trust-card-delivery" className="bg-[#141a27] rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>التسليم</span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-normal">دقيق وبدون تأخير</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  نلتزم بجدول زمني محدد ومكتوب في العقد، مع خط إنتاج آلي متطور يضمن تصنيع وتركيب مطبخك في أسرع وقت وبأعلى دقة تشطيب.
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs text-amber-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>فريق تركيب محترف ونظيف</span>
                </div>
              </div>

              {/* 4. التصميم (Smart internal layouts) */}
              <div id="trust-card-design" className="bg-[#141a27] rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:bg-blue-500 group-hover:text-black transition-colors duration-300">
                  <Compass className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  <span>التصميم</span>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-normal">3D مجاناً</span>
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  توزيع هندسي ذكي لكل سنتيمتر يحقق مثلث الحركة المريح، مع تصميم ثلاثي الأبعاد واقعي 3D تراه وتعدل عليه قبل البدء.
                </p>
                <div className="pt-3 border-t border-slate-800 text-xs text-blue-400 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>استغلال ذكي للأركان والمساحات الصعبة</span>
                </div>
              </div>

            </div>

            {/* Quick Consultation Trigger */}
            <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">هل لديك أبعاد مطبخك أو مخطط شقتك؟</h4>
                <p className="text-xs sm:text-sm text-slate-300">أرسل المقاسات أو الفيديو عبر الواتساب واحصل على تقدير تكلفة وتصميم مقترح خلال دقائق.</p>
              </div>
              <button
                id="trust-section-whatsapp-btn"
                onClick={() => handleWhatsAppClick('أهلاً البروفيسور، لدي مقاسات مطبخي وأريد معرفة التكلفة التقريبية وتصميم 3D')}
                className="bg-amber-500 hover:bg-amber-400 active:scale-95 text-black font-extrabold px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>أرسل مقاساتك الآن</span>
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: VISUAL PROOF (GALLERY)                                         */}
        {/* ========================================================================= */}
        <section id="gallery-section" className="py-14 sm:py-20 px-4 max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs sm:text-sm font-bold uppercase mb-2">
              <Eye className="w-4 h-4" />
              <span>معرض أعمالنا الواقعية</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              نماذج من إبداعات البروفيسور في بيوت عملائنا
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              اضغط على أي تصميم لمعاينته بالتفصيل أو طلبه مباشرة عبر الواتساب
            </p>
          </div>

          {/* Masonry / Clean Modern Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {KITCHEN_PROJECTS.map((item) => (
              <div
                key={item.id}
                id={`gallery-item-${item.id}`}
                onClick={() => setSelectedImage(item)}
                className="group relative bg-[#111724] rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer flex flex-col"
              >
                {/* Image Wrap */}
                <div className="relative h-60 sm:h-64 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111724] via-transparent to-black/20" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.category}
                  </span>

                  {/* Hover Inspect Prompt */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm backdrop-blur-[2px]">
                    <Eye className="w-5 h-5 text-amber-400" />
                    <span>معاينة التفاصيل</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      id={`gallery-cta-${item.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppClick(`أهلاً البروفيسور، أعجبني تصميم "${item.title}" وأريد معرفة تفاصيل تنفيذه وتكلفته`);
                      }}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/40 hover:bg-emerald-900/50 px-2.5 py-1.5 rounded-lg border border-emerald-500/30 transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                      <span>اطلب مثله</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof Stats Banner */}
          <div className="mt-12 bg-gradient-to-br from-[#141a27] to-[#0d121c] p-6 sm:p-8 rounded-2xl border border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-4xl font-black text-amber-400">+1,500</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">مطبخ تم تنفيذه في مصر</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-emerald-400">10 سنوات</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">ضمان معتمد على الخامات</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-amber-400">100%</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">خامات أصلية غير مقلدة</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-black text-emerald-400">مجاناً</p>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">المعاينة وتصميم الـ 3D</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SIMPLE 3-STEP PROCESS FOR TIKTOK HIGH-INTENT CONVERSION                   */}
        {/* ========================================================================= */}
        <section id="process-section" className="py-12 px-4 bg-[#0a0d14] border-t border-slate-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2">
              كيف تبدأ تنفيذ مطبخك في 3 خطوات بسيطة؟
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mb-8">
              بدون أي تعقيد أو إهدار لوقتك — نحن نتكفل بكل شيء من الألف إلى الياء
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
              <div className="bg-[#111724] p-5 rounded-2xl border border-slate-800 relative">
                <span className="text-amber-500 font-mono font-black text-2xl absolute top-4 left-4">01</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">تواصل عبر الواتساب</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تواصل معنا بنقرة واحدة وشاركنا مقاسات مطبخك أو فكرتك المبدئية.
                </p>
              </div>

              <div className="bg-[#111724] p-5 rounded-2xl border border-slate-800 relative">
                <span className="text-amber-500 font-mono font-black text-2xl absolute top-4 left-4">02</span>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">معاينة وتصميم 3D فوري</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  مهندس متخصص يزور موقعك لرفع المقاسات بالليزر وتجهيز تصميم ثلاثي الأبعاد مجاناً.
                </p>
              </div>

              <div className="bg-[#111724] p-5 rounded-2xl border border-slate-800 relative">
                <span className="text-amber-500 font-mono font-black text-2xl absolute top-4 left-4">03</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">تصنيع وتركيب وتسليم بالضمان</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  تصنيع بأحدث ماكينات CNC وتركيب متقن مع تسليم شهادة الضمان الـ 10 سنوات.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: FINAL PUSH & SPECIAL OFFER / FOOTER                            */}
        {/* ========================================================================= */}
        <section id="final-push-section" className="py-14 sm:py-20 px-4 bg-gradient-to-b from-[#0e1422] to-[#07090e] border-t border-amber-500/20 relative">
          <div className="max-w-3xl mx-auto text-center relative z-10">
            
            {/* Offer Highlight Box */}
            <div className="bg-[#141b2b] rounded-3xl p-6 sm:p-10 border border-amber-500/40 shadow-2xl shadow-amber-500/10 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
              
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold mb-4">
                <BadgePercent className="w-4 h-4" />
                <span>عرض لفترة محدودة جداً</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white mb-4 leading-snug">
                احجز موعد معاينتك المجانية اليوم واستلم تصميم 3D لمطبخك بدون أي مقابل!
              </h2>

              <p className="text-slate-300 text-sm sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                لا تضيع وقتك في الحيرة بين الورش. تعامل مع المصنع مباشرة واضمن أعلى خامة وأدق تنفيذ مع شهادة ضمان معتمدة 10 سنوات.
              </p>

              {/* Secondary CTA Button with High Contrast & Pulse */}
              <button
                id="footer-secondary-whatsapp-btn"
                onClick={() => handleWhatsAppClick('أهلاً البروفيسور، أريد حجز المعاينة المجانية وتصميم 3D لمطبخي من عرض تيك توك')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-98 text-white text-lg sm:text-xl font-black py-4 sm:py-5 px-10 rounded-2xl shadow-xl transition-all duration-300 animate-pulse-whatsapp cursor-pointer border border-emerald-300/40"
              >
                <WhatsAppIcon className="w-7 h-7 fill-current shrink-0" />
                <span>تواصل معنا عبر الواتساب الآن</span>
                <ChevronLeft className="w-6 h-6 shrink-0" />
              </button>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span dir="ltr">{WHATSAPP_PHONE}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>القاهرة - الجيزة - الإسكندرية وجميع محافظات مصر</span>
                </span>
              </div>
            </div>

            {/* Reassurance text */}
            <p className="text-xs text-slate-400 mt-6 max-w-md mx-auto">
              فريق خدمة العملاء والمهندسين متاح للرد الفوري على مدار الساعة للإجابة على كافة استفساراتكم.
            </p>
          </div>
        </section>
      </main>

      {/* Footer Credentials */}
      <footer id="main-footer" className="bg-[#07090e] border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <p className="font-bold text-slate-200 text-sm">البروفيسور للمطابخ والديكور © {new Date().getFullYear()}</p>
            <p className="text-slate-400 text-xs">جميع الحقوق محفوظة. متخصصون في تصميم وتصنيع المطابخ الفاخرة.</p>
          </div>

          <button
            onClick={() => handleWhatsAppClick()}
            className="text-amber-400 hover:text-amber-300 text-xs font-semibold underline underline-offset-4"
          >
            تواصل مع الإدارة عبر الواتساب مباشرة
          </button>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING WHATSAPP CTA (DESKTOP & MOBILE FIXED FLOATING ICON)               */}
      {/* ========================================================================= */}
      <aside aria-label="WhatsApp Floating Action" className="fixed bottom-24 sm:bottom-6 left-5 z-50">
        <button
          id="floating-whatsapp-btn"
          onClick={() => handleWhatsAppClick('أهلاً البروفيسور، تواصلت معكم من خلال الصفحة وأريد استفساراً سريعاً')}
          aria-label="تواصل معنا عبر الواتساب"
          className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-2xl shadow-emerald-900/60 border-2 border-white/30 animate-pulse-whatsapp active:scale-90 transition-transform cursor-pointer"
        >
          <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 fill-current" />
          
          {/* Notification Ping Badge */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border border-black text-[9px] font-black text-black items-center justify-center">1</span>
          </span>

          {/* Desktop Hover Label */}
          <span className="hidden sm:group-hover:block absolute right-full mr-3 whitespace-nowrap bg-slate-900/95 text-white text-xs font-bold py-2 px-3.5 rounded-xl border border-amber-500/40 shadow-xl">
            تواصل معنا عبر الواتساب الآن 💬
          </span>
        </button>
      </aside>

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM BAR (CRITICAL FOR TIKTOK 99% MOBILE CONVERSION)       */}
      {/* ========================================================================= */}
      <div
        id="mobile-sticky-bar"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0d14]/95 backdrop-blur-lg border-t border-amber-500/30 p-2.5 shadow-2xl flex items-center gap-2"
      >
        <button
          id="mobile-sticky-whatsapp-btn"
          onClick={() => handleWhatsAppClick()}
          className="flex-1 flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-500 active:scale-95 text-white font-extrabold text-base py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/50 animate-pulse-whatsapp border border-emerald-300/30"
        >
          <WhatsAppIcon className="w-5 h-5 fill-current shrink-0" />
          <span>احجز معاينتك مجاناً عبر الواتساب</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL FOR GALLERY DETAILS                                        */}
      {/* ========================================================================= */}
      {selectedImage && (
        <div
          id="gallery-modal-backdrop"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            id="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
            className="bg-[#131926] border border-amber-500/40 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
          >
            <button
              id="close-gallery-modal"
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 left-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white hover:bg-black flex items-center justify-center border border-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-96">
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131926] via-transparent to-black/30" />
              <span className="absolute bottom-4 right-4 bg-amber-500 text-black font-extrabold text-xs px-3 py-1 rounded-full">
                {selectedImage.category}
              </span>
            </div>

            <div className="p-6 text-right">
              <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                {selectedImage.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                {selectedImage.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedImage.tags.map((tag, i) => (
                  <span key={i} className="bg-slate-800 text-amber-300 text-xs px-2.5 py-1 rounded-md border border-slate-700">
                    ✓ {tag}
                  </span>
                ))}
              </div>

              <button
                id="modal-whatsapp-cta"
                onClick={() => {
                  handleWhatsAppClick(`أهلاً البروفيسور للمطابخ، أريد الاستفسار عن تفاصيل تنفيذ "${selectedImage.title}" لمطبخي.`);
                  setSelectedImage(null);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-black py-4 px-6 rounded-xl shadow-xl active:scale-98 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                <span>اطلب تصميم مطبخك مثل هذا النموذج عبر الواتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Crisp Vector SVG for Official WhatsApp Icon
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}
