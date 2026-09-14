import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  ChevronLeft,
  Layers3,
  MessageCircle,
  MoveUpRight,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  X,
  Compass,
  Check,
} from 'lucide-react';
import { Project } from './types';
import { MaterialsShowcase } from './components/MaterialsShowcase';
import { BeforeAfterShowcase } from './components/BeforeAfterShowcase';

declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
      loadConsent?: (consent: Record<string, unknown>) => void;
    };
  }
}

const TIKTOK_PIXEL_ID = 'DAJ83CJC77UCRCTVDQ9G';
const WHATSAPP_PHONE = '+201149238763';

const makeWhatsAppUrl = (message: string) =>
  `https://wa.me/201149238763?text=${encodeURIComponent(message)}`;

const PROJECTS: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'Warm Minimal Atelier',
    subtitle: 'توازن هندسي بمقاييس معمارية دقيقة',
    category: 'MODERN',
    description:
      'تكوين معماري معاصر يرتكز على الكتل الهادئة والتخزين غير المرئي. تم تفصيل المساحة بألواح بولي لاك تركي سوبر مات مع دمج أنظمة بلوم النمساوية المخفية بالكامل لمنح تجربة استخدام سلسة وهادئة.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=90',
    material: 'بولي لاك سوبر مات / أنظمة بلوم',
    tags: ['مودرن هادئ', 'إضاءات مخفية', 'تخزين معماري'],
    specs: {
      warranty: '10 سنوات موثق بعقد رسمي',
      hardware: 'Blum Austria هيدروليك كامل',
      countertop: 'كوارتز ناصع البياض مضاد للبكتيريا',
    },
  },
  {
    id: '02',
    number: '02',
    title: 'The Dark Monolith',
    subtitle: 'حضور رخامي استثنائي وجزيرة مركزية',
    category: 'CONTEMPORARY',
    description:
      'تصميم يجمع بين عمق الأسطح الداكنة المطفية مع جزيرة وسطية ضخمة من رخام الكوارتز ذي العروق الذهبية، ليشكل المطبخ قلب المنزل ونقطة الارتكاز البصرية الأولى.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90',
    material: 'كوارتز ذهبي / بولي لاك مطفأ',
    tags: ['جزيرة مركزية', 'بار مفتوح', 'إضاءة بروفايل'],
    specs: {
      warranty: '10 سنوات شامل الأجهزة والإكسسوار',
      hardware: 'أنظمة سحب وإغلاق هيدروليك',
      countertop: 'رخام نيرو ماركينا أسود عروق ذهب',
    },
  },
  {
    id: '03',
    number: '03',
    title: 'Soft Neo-Classic',
    subtitle: 'أناقة كلاسيكية بأبعاد عصرية خالدة',
    category: 'NEO CLASSIC',
    description:
      'تفاصيل نيو كلاسيك مهذبة تعكس الفخامة الهادئة، مع خزائن ممتدة حتى السقف ومقابض نحاسية أصلية معالجة ضد الأكسدة لتدوم لعقود دون أي بهتان.',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=90',
    material: 'أخشاب لاكيه معالجة / نحاس أنتيك',
    tags: ['نيو كلاسيك', 'مقابض نحاس أصلي', 'تخزين رأسي'],
    specs: {
      warranty: '10 سنوات صيانة وضمان شامل',
      hardware: 'أنظمة أدراج ثقيلة صامتة',
      countertop: 'رخام كلكتا إيطالي نخب أول',
    },
  },
  {
    id: '04',
    number: '04',
    title: 'Warm Natural Oak',
    subtitle: 'أصالة الخشب الطبيعي بحماية إيطالية',
    category: 'NATURAL',
    description:
      'حوار بصري بين دفء قشرة خشب الأرو الطبيعي والأسطح الحجرية الرمادية المعاصرة. معالج بطبقات عزل بولي يوريثان إيطالية فائقة لحماية الخشب من الرطوبة وحرارة الطهي.',
    image:
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1600&q=90',
    material: 'قشرة أرو طبيعي / حجر أسود',
    tags: ['خشب طبيعي', 'عزل بولي يوريثان', 'طابع إسكندنافي'],
    specs: {
      warranty: '10 سنوات معتمدة',
      hardware: 'مفصلات بلوم هيدروليك ناعمة',
      countertop: 'جرانيت دبل بلاك معالج ومطفأ',
    },
  },
  {
    id: '05',
    number: '05',
    title: 'Crystal Luminescence',
    subtitle: 'انعكاس كريستالي ومضاعفة رحابة المكان',
    category: 'MODERN',
    description:
      'أسطح أكريليك إسباني نقي 100% تعكس الضوء بنقاء يشبه الكريستال، مما يمنح المساحة إحساساً مضاعفاً بالاتساع والنظافة المعمارية المطلقة.',
    image:
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=90',
    material: 'أكريليك كريستال / كوارتز عاجي',
    tags: ['أكريليك إسباني', 'اتساع بصري', 'مقاوم للبصمات'],
    specs: {
      warranty: '10 سنوات',
      hardware: 'مفصلات ناعمة صامتة كلياً',
      countertop: 'كوارتز أبيض فائق النقاء',
    },
  },
  {
    id: '06',
    number: '06',
    title: 'Intelligent Spatial Flow',
    subtitle: 'هندسة المساحات الصعبة والزوايا السحرية',
    category: 'SPACE SMART',
    description:
      'استغلال هندسي دقيق لكل سنتيمتر من خلال آليات السحب الذكية (Magic Corners) ووحدات التخزين الرأسية المتكاملة مع الأجهزة المدمجة.',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=90',
    material: 'HPL ألماني / زجاج مدمج',
    tags: ['زوايا ذكية', 'HPL ضد المياه', 'تخزين مريح'],
    specs: {
      warranty: '10 سنوات',
      hardware: 'أنظمة زوايا جرارة إيطالية',
      countertop: 'HPL صلب غير قابل للخدش',
    },
  },
];

const concerns = [
  'كيفية استغلال المساحة المتاحة وتوزيع مثلث الحركة بذكاء',
  'تجنب ازدحام المطبخ وتوفير سعة تخزينية رحبة وغير مرئية',
  'اختيار أنسب الخامات الأوروبية التي تقاوم المياه والحرارة وتعيش لعقود',
  'الاطمئنان لمصداقية مواعيد التسليم والضمان التعاقدي الموثق',
];

export function App() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeConcern, setActiveConcern] = useState(concerns[0]);

  useEffect(() => {
    if (window.ttq) {
      window.ttq.page();
    }
  }, []);

  const track = (eventName: string, params: Record<string, unknown> = {}) => {
    try {
      if (window.ttq) {
        window.ttq.track(eventName, params);
      }
    } catch {
      // safe fallback
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const heroProject = PROJECTS[1];

  const startWhatsApp = (message: string) => {
    track('Contact', {
      content_id: 'whatsapp-kitchen-inquiry',
      content_type: 'product',
      content_name: 'Bespoke Atelier Consultation',
      value: 1,
      currency: 'EGP',
    });

    window.open(makeWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const activeConcernMessage = useMemo(
    () =>
      `أهلاً البروفيسور، أود استشارة استوديو التصميم بخصوص: "${activeConcern}". أرجو توضيح المقترحات المعمارية لمساحتي.`,
    [activeConcern]
  );

  return (
    <div className="min-h-screen bg-[#07090c] text-[#f4f6f9] pb-24 md:pb-0 overflow-x-hidden selection:bg-[#c5a880]/30 selection:text-white">
      {/* Subtle architectural hairline border on top */}
      <div className="fixed inset-x-0 top-0 z-[100] h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/40 to-transparent" />

      {/* HEADER: Ultra-clean, Simple & Luxurious */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#07090c]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-20 max-w-[1240px] items-center justify-between px-6">
          {/* Logo Image with Luxury Atelier Frame */}
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="group flex items-center gap-3 transition-all"
            aria-label="البروفيسور للمطابخ الفاخرة"
          >
            <div className="relative flex items-center justify-center rounded-2xl border border-[#c5a880]/30 bg-gradient-to-b from-[#151a22] to-[#0a0d12] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:border-[#dfb57b]/60 group-hover:shadow-[0_4px_25px_rgba(223,181,123,0.2)]">
              {/* Micro Corner Accents */}
              <div className="absolute -top-[1px] -right-[1px] h-1.5 w-1.5 rounded-tr-md border-t border-r border-[#dfb57b]" />
              <div className="absolute -bottom-[1px] -left-[1px] h-1.5 w-1.5 rounded-bl-md border-b border-l border-[#dfb57b]" />
              
              <img
                src="/logo.png"
                alt="البروفيسور للمطابخ والديكور الفاخر"
                className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>

          {/* Clean & Balanced Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex">
            {[
              ['work', 'الأعمال'],
              ['before-after', 'قبل وبعد'],
              ['materials', 'الخامات'],
              ['approach', 'المنهجية'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-[13px] font-normal text-white/60 transition-colors hover:text-[#dfb57b]"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Single Simple WhatsApp CTA */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() =>
                startWhatsApp(
                  'أهلاً بكم في البروفيسور، أود استشارة مهندس معماري لمطبخي والاطلاع على التصميم ثلاثي الأبعاد.'
                )
              }
              className="inline-flex h-10 items-center gap-2 rounded-full border border-[#c5a880]/50 bg-[#c5a880]/10 px-4 sm:px-5 text-xs font-medium text-[#f0cb98] transition hover:bg-[#c5a880] hover:text-black"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>تواصل معنا</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION: Serene, Architectural, Legacy */}
        <section id="hero" className="relative scroll-mt-20 overflow-hidden py-16 md:py-28">
          {/* Gentle ambient light (subtle, non-distracting) */}
          <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-[#c5a880]/[0.04] blur-[150px]" />

          <div className="mx-auto max-w-[1240px] px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              {/* Text Column */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* Atelier Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-[11px] font-medium text-[#dfb57b]">
                  <Compass className="h-3.5 w-3.5" />
                  <span>أتيليه تصميم وتفصيل المطابخ الفاخرة</span>
                </div>

                <h1 className="text-[34px] font-bold leading-[1.25] tracking-[-0.02em] text-white sm:text-[46px] md:text-[54px] lg:text-[58px]">
                  حيث تلتقي الرؤية المعمارية
                  <br />
                  <span className="text-white/40 font-light">بدقة الحرفية الأوروبية الخالدة.</span>
                </h1>

                <p className="mt-6 max-w-[560px] text-[15px] leading-[1.9] text-white/65 font-light">
                  في "البروفيسور"، نتعامل مع المطبخ كتحفة معمارية متكاملة. تفصيل دقيق بالملليمتر
                  بأرقى الخامات الأوروبية المعتمدة مع أنظمة بلوم النمساوية المخفية، ورفع أبعاد هندسي
                  بالليزر وضمان تعاقدي موثق 10 سنوات.
                </p>

                {/* Direct, dignified actions */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() =>
                      startWhatsApp(
                        'أهلاً البروفيسور، أود استشارة مهندس معماري لمطبخي والبدء في إعداد دراسة وتصميم 3D متكامل لمساحتي.'
                      )
                    }
                    className="refined-luxury-btn group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#c5a880] px-7 text-xs font-bold text-black shadow-lg transition hover:bg-[#dfb57b]"
                  >
                    <span>طلب استشارة وتصميم 3D</span>
                    <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollTo('work')}
                    className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 text-xs font-medium text-white/80 transition hover:border-[#c5a880]/50 hover:text-white"
                  >
                    <span>تصفح أرشيف الأعمال</span>
                  </button>
                </div>

                {/* 3 Pillars of Legacy */}
                <div className="mt-10 grid grid-cols-1 gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-3">
                  <div className="flex items-center gap-2.5 text-xs text-white/70">
                    <Ruler className="h-4 w-4 text-[#dfb57b] shrink-0" />
                    <span>رفع مقاسات ليزر دقيق</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white/70">
                    <ShieldCheck className="h-4 w-4 text-[#dfb57b] shrink-0" />
                    <span>ضمان تعاقدي 10 سنوات</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-white/70">
                    <Award className="h-4 w-4 text-[#dfb57b] shrink-0" />
                    <span>أنظمة Blum هيدروليك</span>
                  </div>
                </div>
              </motion.div>

              {/* Visual Showcase (Pure Architectural Frame) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-[28px] border border-white/[0.12] bg-[#10141a] shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={heroProject.image}
                      alt="مطبخ معماري فاخر - أرشيف البروفيسور"
                      className="h-full w-full object-cover transition-transform duration-1000 hover:scale-103"
                      loading="eager"
                    />
                  </div>

                  {/* Architectural metadata plaque */}
                  <div className="flex items-center justify-between border-t border-white/[0.08] bg-[#0c0f14] px-6 py-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#dfb57b] font-mono">
                        ARCHIVE REF. {heroProject.number}
                      </span>
                      <strong className="block text-sm font-bold text-white mt-0.5">
                        {heroProject.title}
                      </strong>
                      <span className="text-[11px] text-white/50">{heroProject.material}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProject(heroProject)}
                      className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80 transition hover:border-[#c5a880]/50 hover:text-[#dfb57b]"
                      aria-label="عرض تفاصيل المشروع"
                    >
                      <MoveUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION: INTERACTIVE BEFORE & AFTER SLIDER (الميزة المطلوبة برقي مع مظهر هادئ) */}
        <section id="before-after" className="scroll-mt-20 border-t border-white/[0.06] bg-[#090c10] py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6">
            <BeforeAfterShowcase onStartWhatsApp={startWhatsApp} />
          </div>
        </section>

        {/* SECTION: CURATED ARCHITECTURAL PORTFOLIO */}
        <section id="work" className="scroll-mt-20 border-t border-white/[0.06] py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="flex flex-col items-start justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfb57b]">
                  Selected Works Archive
                </span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                  أرشيف المشاريع <span className="text-[#dfb57b]">والأعمال المختارة</span>
                </h2>
                <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/50 font-light">
                  نماذج حقيقية تم تفصيلها وتسليمها بالكامل بمواصفات معمارية خاصة لعملاء التجمع الخامس، الشيخ زايد، والمعادي.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'ALL', label: 'كافة الأعمال' },
                  { key: 'MODERN', label: 'مودرن Modern' },
                  { key: 'NEO CLASSIC', label: 'نيو كلاسيك' },
                  { key: 'CONTEMPORARY', label: 'معاصر Contemporary' },
                  { key: 'SPACE SMART', label: 'مساحات ذكية' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveFilter(tab.key)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                      activeFilter === tab.key
                        ? 'bg-[#c5a880] text-black shadow-md'
                        : 'border border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1015] transition duration-300 hover:border-[#c5a880]/40"
                >
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="block w-full text-right"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-104"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] text-white/40">
                        <span className="font-mono text-[#dfb57b]">0{project.number}</span>
                        <span>{project.category}</span>
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-white group-hover:text-[#dfb57b] transition-colors">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/50 leading-relaxed font-light line-clamp-2">
                        {project.subtitle}
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px]">
                        <span className="text-white/45">{project.material}</span>
                        <span className="text-[#dfb57b] font-medium flex items-center gap-1 group-hover:underline">
                          عرض المواصفات
                          <ArrowLeft className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: EUROPEAN MATERIALS ARCHIVE */}
        <section id="materials" className="scroll-mt-20 border-t border-white/[0.06] bg-[#090c10] py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6">
            <MaterialsShowcase onStartWhatsApp={startWhatsApp} />
          </div>
        </section>

        {/* SECTION: THE ARCHITECTURAL APPROACH & METHODOLOGY */}
        <section id="approach" className="scroll-mt-20 border-t border-white/[0.06] py-20 md:py-28">
          <div className="mx-auto max-w-[1240px] px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
              {/* Left Column: Vision */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfb57b]">
                  Architectural Methodology
                </span>
                <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight text-white md:text-5xl">
                  ثلاث مراحل محسوبة
                  <br />
                  <span className="text-white/35 font-light">من الرؤية إلى التسليم المفتاح.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/60 font-light">
                  لا نعتمد على المقايسات التقديرية أو التخمين. كل مطبخ يمر بمسار هندسي موثق يضمن
                  تطابق الواقع بنسبة 100% مع التصميم الـ 3D المعتمد.
                </p>

                {/* Interactive Concern Consultation */}
                <div className="mt-8 rounded-2xl border border-white/[0.08] bg-[#0c1015] p-5">
                  <span className="text-[11px] font-medium text-[#dfb57b] block mb-3">
                    ما هو التحدي الأبرز في مطبخك حالياً؟
                  </span>
                  <div className="space-y-2">
                    {concerns.map((c) => (
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
                    onClick={() => startWhatsApp(activeConcernMessage)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.06] p-3 text-xs font-semibold text-[#f0cb98] transition hover:bg-white/[0.1]"
                  >
                    <span>استشارة المهندس بخصوص هذه النقطة</span>
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3 Structured Phases */}
              <div className="space-y-4">
                {[
                  {
                    num: '01',
                    title: 'الرفع المساحي الدقيق بالليزر',
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
                ].map((step) => (
                  <div
                    key={step.num}
                    className="rounded-2xl border border-white/[0.08] bg-[#0c1015] p-6 transition duration-200 hover:border-[#c5a880]/30"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#dfb57b]">{step.num}</span>
                      <span className="text-[10px] text-white/30 tracking-wider font-mono">PHASE {step.num}</span>
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

        {/* SECTION: PRIVATE ATELIER CONSULTATION (Dignified, High-Converting) */}
        <section id="contact" className="scroll-mt-20 border-t border-white/[0.06] bg-[#080b0f] py-20 md:py-32">
          <div className="mx-auto max-w-[960px] px-6 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfb57b]">
              Private Studio Inquiry
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              ابدأ دراسة مطبخك مع مهندس مختص
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-white/60 font-light md:text-sm">
              يسعدنا استقبال صور مساحتك أو مخططك المعماري على واتساب للبدء في استعراض الحلول المناسبة وإعداد التصميم ثلاثي الأبعاد دون أي التزام مادي.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  startWhatsApp(
                    'أهلاً البروفيسور، أود استشارة استوديو التصميم وتحديد موعد لرفع المقاسات وإعداد دراسة 3D لمطبخي.'
                  )
                }
                className="refined-luxury-btn inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#c5a880] px-8 text-xs font-bold text-black shadow-lg transition hover:bg-[#dfb57b]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>محادثة المهندس المعماري على واتساب</span>
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex h-13 items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 text-xs text-white/70 font-mono" dir="ltr">
                <Phone className="h-3.5 w-3.5 text-[#dfb57b]" />
                <span>{WHATSAPP_PHONE}</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-[11px] text-white/40 font-light">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#dfb57b]" /> استشارة معمارية دون التزام مادي
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#dfb57b]" /> معاينة ورفع أبعاد بالليزر
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-[#dfb57b]" /> تغطية شاملة لكافة أنحاء مصر
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER: Minimalist Atelier Colophon */}
      <footer className="border-t border-white/[0.08] bg-[#050709] py-10 text-xs text-white/40 font-light">
        <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
            <div className="flex items-center justify-center rounded-xl border border-[#c5a880]/20 bg-[#0e1218] p-1.5 shadow-md">
              <img
                src="/logo.png"
                alt="البروفيسور"
                className="h-9 w-auto object-contain opacity-90"
              />
            </div>
            <div>
              <strong className="block text-sm font-semibold text-white/80">
                البروفيسور للمطابخ والديكور الفاخر
              </strong>
              <span className="mt-0.5 block text-[11px] text-white/50">
                تصميم وتصنيع المطابخ العصرية والأثاث المعماري الراقي وفق المواصفات الأوروبية.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              className="transition hover:text-white"
            >
              العودة للأعلى ↑
            </button>
            <button
              type="button"
              onClick={() =>
                startWhatsApp('أهلاً البروفيسور، أود الاستفسار عن تفاصيل الزيارة والمعاينة.')
              }
              className="text-[#dfb57b] transition hover:underline"
            >
              واتساب الأتيليه
            </button>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CALL-TO-ACTION (Discreet, Elegant, Non-Distracting) */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07090c]/95 p-3 backdrop-blur-xl md:hidden">
        <button
          type="button"
          onClick={() =>
            startWhatsApp('أهلاً البروفيسور، أود استشارة مهندس الأتيليه وبدء دراسة مطبخي عبر واتساب.')
          }
          className="refined-luxury-btn flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#c5a880] text-xs font-bold text-black shadow-md"
        >
          <MessageCircle className="h-4 w-4" />
          <span>استشارة معمارية وتصميم 3D على واتساب</span>
        </button>
      </div>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-[800px] overflow-auto rounded-3xl border border-white/15 bg-[#0e1218] text-right shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:scale-105"
                aria-label="إغلاق"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[1.6] overflow-hidden">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb57b]">
                  {activeProject.category}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                  {activeProject.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/60 font-light">
                  {activeProject.description}
                </p>

                {/* Specs */}
                {activeProject.specs && (
                  <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.08] bg-black/30 p-4 sm:grid-cols-3 text-xs">
                    <div>
                      <span className="text-white/40 block text-[10px]">الضمان التعاقدي:</span>
                      <strong className="text-white font-semibold mt-1 block">
                        {activeProject.specs.warranty}
                      </strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">نظام الحركة والمفصلات:</span>
                      <strong className="text-[#dfb57b] font-semibold mt-1 block">
                        {activeProject.specs.hardware}
                      </strong>
                    </div>
                    <div>
                      <span className="text-white/40 block text-[10px]">الأسطح والرخام:</span>
                      <strong className="text-white font-semibold mt-1 block">
                        {activeProject.specs.countertop}
                      </strong>
                    </div>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 text-[11px] text-white/60">
                    الخامات: {activeProject.material}
                  </span>
                  {activeProject.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-[#c5a880]/25 bg-[#c5a880]/10 px-3.5 py-1 text-[11px] text-[#f0cb98]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    startWhatsApp(
                      `أهلاً البروفيسور، اطلعت على مشروع "${activeProject.title}" في أرشيف الأعمال، وأود الاستفسار عن إمكانية تطبيق نفس التصميم والمواصفات لمساحتي.`
                    );
                    setActiveProject(null);
                  }}
                  className="refined-luxury-btn mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#c5a880] text-xs font-bold text-black transition hover:bg-[#dfb57b]"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>استشارة معمارية لمشروع مماثل عبر واتساب</span>
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <span className="sr-only">TikTok Pixel ID: {TIKTOK_PIXEL_ID}</span>
    </div>
  );
}

export default App;
