import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpLeft,
  ArrowDownLeft,
  Award,
  Check,
  CheckCircle2,
  ChevronLeft,
  Eye,
  Layers3,
  MessageCircle,
  MoveUpRight,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';

declare global {
  interface Window {
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
      page: () => void;
      load: (pixelId: string) => void;
    };
  }
}

const TIKTOK_PIXEL_ID = 'DAJ83CJC77UCRCTVDQ9G';
const WHATSAPP_PHONE = '+201149238763';

const makeWhatsAppUrl = (message: string) =>
  `https://wa.me/201149238763?text=${encodeURIComponent(message)}`;

type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  material: string;
};

const PROJECTS: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'Warm Minimal',
    subtitle: 'هدوء بصري بمقاسك',
    category: 'MODERN',
    description:
      'تكوين معاصر يعتمد على الكتل الهادئة والتخزين المختفي، مع إبقاء الحركة داخل المطبخ واضحة ومريحة.',
    image:
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=90',
    material: 'Wood / HPL / LED',
  },
  {
    id: '02',
    number: '02',
    title: 'Dark Contrast',
    subtitle: 'عمق بدون زحمة',
    category: 'CONTEMPORARY',
    description:
      'مزج الأسطح الداكنة مع جزيرة مركزية ليكون للمطبخ حضور قوي من غير ما يخسر وظيفته اليومية.',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90',
    material: 'Matt / Stone / Metal',
  },
  {
    id: '03',
    number: '03',
    title: 'Soft Classic',
    subtitle: 'فخامة أهدى',
    category: 'NEO CLASSIC',
    description:
      'تفاصيل أكثر دفئاً مع خطوط متزنة ومساحات تخزين مدروسة للحفاظ على الإحساس الراقي والعملي.',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=90',
    material: 'Lacquer / Brass / Marble',
  },
  {
    id: '04',
    number: '04',
    title: 'Natural Edge',
    subtitle: 'خشب له شخصية',
    category: 'NATURAL',
    description:
      'تكوين يخلط بين الدفء الطبيعي واللمسات المعاصرة، مناسب للمساحات المفتوحة والمطابخ الكبيرة.',
    image:
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1600&q=90',
    material: 'Wood Veneer / Stone',
  },
  {
    id: '05',
    number: '05',
    title: 'Bright Volume',
    subtitle: 'مساحة أكبر بصرياً',
    category: 'ELEGANT',
    description:
      'ألوان أفتح وتوزيع بصري نظيف يناسب المطابخ التي تحتاج إضاءة وإحساساً بالاتساع.',
    image:
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=90',
    material: 'Acrylic / Marble / Brass',
  },
  {
    id: '06',
    number: '06',
    title: 'Smart Small Space',
    subtitle: 'المساحة الصغيرة مش مشكلة',
    category: 'SPACE SMART',
    description:
      'توزيع ذكي يركز على الاستفادة من الزوايا والارتفاعات ومساحات التخزين في المطابخ الأصغر.',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=90',
    material: 'Compact / HPL / Glass',
  },
];

const concerns = [
  'مش عارف أبدأ منين',
  'المساحة عندي صعبة',
  'محتار بين مودرن ونيو كلاسيك',
  'عايز أعرف هل التصميم ينفع عندي',
];

function track(event: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track(event, params);
    }
  } catch (error) {
    console.error(`TikTok ${event} error`, error);
  }
}

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeConcern, setActiveConcern] = useState(concerns[0]);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.ttq) {
        window.ttq.page();
        window.ttq.track('ViewContent', {
          content_id: 'professor-kitchens-landing-v2',
          content_type: 'product',
          content_name: 'Kitchen Design Consultation',
        });
      }
    } catch (error) {
      console.error('TikTok page tracking error', error);
    }
  }, []);

  useEffect(() => {
    const onMove = () => setCursorVisible(true);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const heroProject = PROJECTS[0];

  const startWhatsApp = (message: string) => {
    track('Contact', {
      content_id: 'whatsapp-kitchen-lead',
      content_type: 'product',
      content_name: 'Kitchen Consultation',
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
      `أهلاً البروفيسور، أكتر حاجة محتاج فيها مساعدة هي: "${activeConcern}". عايز أبدأ استشارة لمطبخي.`,
    [activeConcern]
  );

  return (
    <div className="min-h-screen bg-[#080a0c] text-white pb-20 md:pb-0">
      {/* subtle page chrome */}
      <div className="fixed inset-x-0 top-0 z-[100] h-px bg-gradient-to-l from-transparent via-[#dfb57b] to-transparent opacity-70" />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#080a0c]/75 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1220px] items-center justify-between gap-5 px-4 sm:h-[84px]">
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="group relative flex min-w-[160px] items-center"
            aria-label="البروفيسور للمطابخ"
          >
            <img
              src="/logo.png"
              alt="البروفيسور للمطابخ والديكور"
              className="h-12 w-auto max-w-[180px] object-contain sm:h-14"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />

            <span className="pointer-events-none absolute right-0 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#dfb57b]/25 bg-[#dfb57b]/5 text-[#f1ca96] font-serif text-xl">
                P
              </span>
              <span className="hidden text-right sm:block">
                <strong className="block text-sm font-black">البروفيسور</strong>
                <small className="mt-0.5 block text-[9px] text-white/40">للمطابخ والديكور</small>
              </span>
            </span>
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {[
              ['work', 'المشاريع'],
              ['approach', 'المنهج'],
              ['contact', 'ابدأ'],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-[11px] font-bold text-white/45 transition hover:text-white"
              >
                {label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() =>
              startWhatsApp(
                'أهلاً البروفيسور، عايز أبدأ استشارة لمطبخي وأشوف أنسب طريقة أبدأ بيها.'
              )
            }
            className="inline-flex h-10 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 text-[11px] font-black text-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-400/[0.12]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>ابدأ محادثة</span>
          </button>
        </div>
      </header>

      <main>
        {/* HERO — intentionally asymmetrical */}
        <section id="hero" className="relative overflow-hidden scroll-mt-20">
          <div className="pointer-events-none absolute right-[8%] top-[-160px] h-[520px] w-[520px] rounded-full bg-[#c99c67]/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-[-120px] left-[-100px] h-[420px] w-[420px] rounded-full bg-emerald-500/[0.04] blur-[120px]" />

          <div className="mx-auto grid max-w-[1220px] items-center gap-8 px-4 pb-14 pt-10 md:gap-14 md:pb-20 md:pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:pt-20">
            <div className="order-2 relative z-10 lg:order-1">
              <div className="mb-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#dfb57b]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#dfb57b] shadow-[0_0_18px_rgba(223,181,123,.8)]" />
                KITCHEN / SPACE / DETAIL
              </div>

              <h1 className="max-w-[700px] text-[44px] font-black leading-[1.02] tracking-[-0.045em] text-white sm:text-[58px] md:text-[72px] lg:text-[82px]">
                مطبخك
                <br />
                <span className="text-white/35">مش منتج.</span>
                <br />
                <em className="not-italic text-[#e9c28f]">هو مساحة حياة.</em>
              </h1>

              <p className="mt-6 max-w-[650px] text-[15px] leading-[2] text-white/55 md:text-[18px]">
                نصمم المطبخ من استخدامك الحقيقي للمكان، مش من كتالوج جاهز.
                <span className="block text-white/85">
                  النتيجة: شكل له شخصية، وتوزيع يخدمك كل يوم.
                </span>
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    startWhatsApp(
                      'أهلاً البروفيسور، جاي من الصفحة وعايز أبدأ استشارة لمطبخي. ممكن أرسل صورة المكان؟'
                    )
                  }
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#24b95c] px-6 text-sm font-black text-[#06130a] shadow-[0_18px_50px_rgba(36,185,92,.16)] transition hover:-translate-y-1 hover:bg-[#31ca69]"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>ابعت صورة المكان وابدأ</span>
                  <ArrowLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo('work')}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.025] px-6 text-sm font-black text-white/75 transition hover:border-white/15 hover:bg-white/[0.05]"
                >
                  <span>شوف طريقة التفكير</span>
                  <ChevronLeft className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-bold text-white/35">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  تبدأ بصورتك أو مقاساتك
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  تعرف الخطوة التالية قبل التنفيذ
                </span>
              </div>
            </div>

            <div className="order-1 relative lg:order-2">
              <div className="absolute -right-2 top-6 z-20 hidden rounded-2xl border border-white/10 bg-[#0d1015]/80 px-3 py-2 text-[9px] font-bold text-white/55 backdrop-blur-xl md:block">
                <span className="block text-[#dfb57b]">01 / 06</span>
                <span className="mt-1 block">REFERENCE PROJECT</span>
              </div>

              <div
                className="group relative mx-auto aspect-[0.86] max-w-[610px] overflow-hidden rounded-[32px] border border-white/10 bg-[#111]"
                onMouseEnter={() => setCursorVisible(true)}
              >
                <img
                  src={heroProject.image}
                  alt="تصميم مطبخ مودرن"
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.035]"
                  loading="eager"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07090c] via-transparent to-transparent opacity-95" />

                <div className="absolute inset-x-5 bottom-5 md:inset-x-7 md:bottom-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#e2b87d]">
                        {heroProject.category}
                      </span>
                      <h2 className="mt-2 text-2xl font-black text-white md:text-4xl">
                        {heroProject.title}
                      </h2>
                      <p className="mt-1 text-[11px] text-white/45">{heroProject.subtitle}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProject(heroProject)}
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-white/[0.09] text-white backdrop-blur-xl transition hover:bg-white/[0.15]"
                      aria-label="فتح المشروع"
                    >
                      <MoveUpRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[9px] font-bold text-white/70 backdrop-blur-xl">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8af0a6]" />
                  DESIGN BEFORE DECISION
                </div>

                {cursorVisible && (
                  <div className="pointer-events-none absolute bottom-4 right-5 hidden rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[9px] text-white/45 backdrop-blur-xl sm:block">
                    VIEW PROJECT
                  </div>
                )}
              </div>

              <div className="absolute -bottom-5 -left-3 hidden w-[220px] rounded-2xl border border-white/10 bg-[#10141a]/90 p-4 shadow-2xl backdrop-blur-xl md:block">
                <div className="flex items-center gap-2 text-[#dfb57b]">
                  <Ruler className="h-4 w-4" />
                  <span className="text-[10px] font-black">القرار يبدأ من المقاس</span>
                </div>
                <p className="mt-2 text-[10px] leading-6 text-white/40">
                  الصورة الحلوة لوحدها مش كفاية. المهم هل التوزيع ده ينفع عندك؟
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-[1220px] items-center justify-between px-4 pb-12 text-[9px] font-bold uppercase tracking-[0.2em] text-white/20 md:pb-16">
            <span>PROFESSOR KITCHENS</span>
            <span className="hidden sm:block">REAL SPACE / REAL DECISIONS</span>
            <button type="button" onClick={() => scrollTo('work')} className="inline-flex items-center gap-2 hover:text-white/50">
              SCROLL
              <ArrowDownLeft className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="border-y border-white/[0.06] bg-[#0b0e12] scroll-mt-20">
          <div className="mx-auto max-w-[1220px] px-4 py-20 md:py-28">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dfb57b]">
                  Selected work / 2026
                </span>
                <h2 className="mt-4 max-w-[790px] text-[38px] font-black leading-[1.04] tracking-[-0.04em] text-white md:text-[58px]">
                  كل مطبخ هنا له
                  <span className="block text-white/30">طريقة مختلفة في التفكير.</span>
                </h2>
              </div>

              <p className="max-w-[490px] text-[13px] leading-[2.1] text-white/40 lg:justify-self-end">
                مش بنعرض لك موديلات عشان تختار منها وخلاص. بنعرض لك اتجاهات، وبعدها نكتشف معاك إيه اللي يركب
                على مساحتك وطريقة حياتك.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-12 gap-4">
              {PROJECTS.map((project, index) => {
                const featured = index === 0 || index === 3;
                return (
                  <article
                    key={project.id}
                    className={`${featured ? 'col-span-12 lg:col-span-7' : 'col-span-12 sm:col-span-6 lg:col-span-5'} group overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#11151a]`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className={`relative block w-full overflow-hidden ${featured ? 'aspect-[1.42]' : 'aspect-[1.1]'}`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-1000 group-hover:scale-[1.045]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                      <div className="absolute left-5 top-5 text-[10px] font-black tracking-[0.18em] text-white/45">
                        {project.number}
                      </div>

                      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-right md:inset-x-6 md:bottom-6">
                        <div>
                          <span className="text-[9px] font-black tracking-[0.18em] text-[#e0b87f]">
                            {project.category}
                          </span>
                          <h3 className={`${featured ? 'text-2xl md:text-4xl' : 'text-2xl'} mt-1 font-black text-white`}>
                            {project.title}
                          </h3>
                          <p className="mt-1 text-[10px] text-white/45">{project.subtitle}</p>
                        </div>

                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-black/25 text-white backdrop-blur-md transition group-hover:bg-white/10">
                          <MoveUpRight className="h-4 w-4" />
                        </span>
                      </div>
                    </button>

                    <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-4 md:px-6">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-white/30">
                        <Layers3 className="h-3.5 w-3.5" />
                        {project.material}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          startWhatsApp(
                            `أهلاً البروفيسور، عجبني اتجاه "${project.title}" وعايز أعرف هل ممكن نعمل حاجة قريبة منه في مساحتي.`
                          )
                        }
                        className="inline-flex items-center gap-1.5 text-[10px] font-black text-emerald-300 transition hover:text-emerald-200"
                      >
                        اسأل عنه
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* THE INTERACTION / QUALIFICATION SECTION */}
        <section id="approach" className="scroll-mt-20">
          <div className="mx-auto grid max-w-[1220px] gap-5 px-4 py-20 md:py-28 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-7 md:p-10">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dfb57b]">
                Before we design
              </span>
              <h2 className="mt-4 text-3xl font-black leading-[1.08] text-white md:text-5xl">
                إيه أكتر حاجة
                <span className="block text-white/35">موقفاك دلوقتي؟</span>
              </h2>
              <p className="mt-4 max-w-[520px] text-[12px] leading-[2] text-white/40">
                اختار أقرب مشكلة ليك. بدل ما نبعتلك كلام عام، الرسالة اللي هتفتح على واتساب هتكون مرتبطة
                باحتياجك.
              </p>

              <div className="mt-7 space-y-2">
                {concerns.map((concern, index) => {
                  const active = concern === activeConcern;
                  return (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => setActiveConcern(concern)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-right transition ${
                        active
                          ? 'border-[#dfb57b]/35 bg-[#dfb57b]/[0.08] text-white'
                          : 'border-white/[0.06] bg-white/[0.015] text-white/45 hover:bg-white/[0.03]'
                      }`}
                    >
                      <span className="flex items-center gap-3 text-[11px] font-black">
                        <span
                          className={`grid h-7 w-7 place-items-center rounded-lg text-[9px] ${
                            active ? 'bg-[#dfb57b] text-[#101010]' : 'bg-white/[0.04] text-white/25'
                          }`}
                        >
                          0{index + 1}
                        </span>
                        {concern}
                      </span>
                      <ChevronLeft className={`h-4 w-4 ${active ? 'text-[#dfb57b]' : 'text-white/20'}`} />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => startWhatsApp(activeConcernMessage)}
                className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-black text-[#090b0d] transition hover:-translate-y-0.5 hover:bg-[#f0f0ef]"
              >
                <MessageCircle className="h-5 w-5" />
                ابعت المشكلة دي وابدأ
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-[#17130f] via-[#11151a] to-[#0b0e12] p-7 md:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#dfb57b]/[0.07] blur-[80px]" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#dfb57b]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Our approach
                </span>

                <h2 className="mt-4 max-w-[700px] text-3xl font-black leading-[1.08] text-white md:text-5xl">
                  ما بنبدأش من
                  <span className="block text-[#dfb57b]">شكل المطبخ.</span>
                  بنبدأ من حياتك داخله.
                </h2>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                  {[
                    ['01', 'المكان', 'المساحة، الأجهزة، النوافذ ومسارات الحركة.'],
                    ['02', 'الاحتياج', 'إيه اللي فعلاً محتاجه يومياً وإيه اللي بيضايقك؟'],
                    ['03', 'الشكل', 'بعدها فقط نختار لغة التصميم والخامات.'],
                  ].map(([number, title, text]) => (
                    <div key={number} className="border-t border-white/10 pt-4">
                      <span className="font-mono text-[10px] text-[#dfb57b]">{number}</span>
                      <h3 className="mt-2 text-[16px] font-black text-white">{title}</h3>
                      <p className="mt-2 text-[10px] leading-6 text-white/35">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-[10px] text-white/30">DESIGN SHOULD FEEL OBVIOUS AFTER YOU SEE IT.</span>
                  <Award className="h-5 w-5 text-[#dfb57b]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="border-y border-white/[0.06] bg-[#0c1014]">
          <div className="mx-auto max-w-[1220px] px-4 py-20 md:py-28">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#dfb57b]">
                  From message to kitchen
                </span>
                <h2 className="mt-4 text-4xl font-black leading-[1.04] tracking-[-0.035em] md:text-6xl">
                  ثلاث خطوات
                  <span className="block text-white/30">وبس.</span>
                </h2>
                <p className="mt-5 max-w-[390px] text-[12px] leading-[2] text-white/40">
                  من أول رسالة على واتساب لحد ما تكون الصورة واضحة قدامك — من غير ما تحس إنك دخلت في
                  “فَنَكوش” مبيعات.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    num: '01',
                    icon: MessageCircle,
                    title: 'كلّمني',
                    text: 'ابعت صورة المكان أو المقاسات ونبدأ نفهم احتياجك.',
                  },
                  {
                    num: '02',
                    icon: Ruler,
                    title: 'نرتّب',
                    text: 'نشوف المساحة ونحدد الاتجاه الأنسب قبل أي قرار.',
                  },
                  {
                    num: '03',
                    icon: ShieldCheck,
                    title: 'ننفّذ',
                    text: 'بعد وضوح التصميم والتفاصيل تبدأ مرحلة التنفيذ.',
                  },
                ].map(({ num, icon: Icon, title, text }) => (
                  <div
                    key={num}
                    className="group rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-[#dfb57b]/20"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#dfb57b]">{num}</span>
                      <Icon className="h-4 w-4 text-white/30 transition group-hover:text-[#dfb57b]" />
                    </div>
                    <h3 className="mt-12 text-xl font-black">{title}</h3>
                    <p className="mt-2 text-[10px] leading-6 text-white/35">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className="relative overflow-hidden scroll-mt-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(218,173,111,.11),transparent_35%)]" />

          <div className="relative mx-auto max-w-[1100px] px-4 py-20 md:py-28">
            <div className="rounded-[34px] border border-white/10 bg-[#101418] px-6 py-10 text-center shadow-[0_35px_120px_rgba(0,0,0,.3)] md:px-14 md:py-16">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#dfb57b]/20 bg-[#dfb57b]/[0.06] px-3 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-[#dfb57b]">
                <Sparkles className="h-3.5 w-3.5" />
                One good conversation can save you weeks
              </span>

              <h2 className="mx-auto mt-6 max-w-[850px] text-4xl font-black leading-[1.03] tracking-[-0.04em] md:text-7xl">
                جاهز نشوف
                <span className="text-[#dfb57b]"> مطبخك الحقيقي؟</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[650px] text-[13px] leading-[2] text-white/40 md:text-[15px]">
                ابعت صورة المكان على واتساب. مش لازم تكون عارف المقاسات ولا شكل التصميم من دلوقتي.
                المهم نبدأ من الواقع.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    startWhatsApp(
                      'أهلاً البروفيسور، جاي من الصفحة وعايز أبدأ استشارة لمطبخي. هبعت صورة المكان.'
                    )
                  }
                  className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#25bd5e] px-7 text-sm font-black text-[#061008] shadow-[0_18px_60px_rgba(37,189,94,.18)] transition hover:-translate-y-1 hover:bg-[#34cb6b] sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" />
                  ابعت صورة المطبخ
                  <ArrowLeft className="h-5 w-5" />
                </button>

                <div className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-5 text-right">
                  <Phone className="h-4 w-4 text-[#dfb57b]" />
                  <div>
                    <span className="block text-[8px] text-white/30">WHATSAPP</span>
                    <b dir="ltr" className="block text-xs text-white/75">
                      {WHATSAPP_PHONE}
                    </b>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-[9px] font-bold text-white/25">
                لا يوجد احتياج لقرار شراء من أول رسالة — البداية مجرد فهم للمشروع.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] bg-[#07090b]">
        <div className="mx-auto flex max-w-[1220px] flex-col gap-4 px-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="text-xs font-black text-white/75">البروفيسور للمطابخ والديكور</strong>
            <p className="mt-1 text-[9px] text-white/25">
              تصميم وتنفيذ مطابخ حسب المساحة والاحتياج.
            </p>
          </div>
          <button
            type="button"
            onClick={() => startWhatsApp('أهلاً البروفيسور، محتاج أبدأ استشارة لمطبخي.')}
            className="inline-flex items-center gap-2 text-[10px] font-black text-[#dfb57b] transition hover:text-white"
          >
            واتساب مباشر
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </footer>

      {/* mobile conversion bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07090b]/90 p-2 backdrop-blur-2xl md:hidden">
        <button
          type="button"
          onClick={() =>
            startWhatsApp('أهلاً البروفيسور، جاي من الصفحة وعايز أبدأ استشارة لمطبخي.')
          }
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25bd5e] text-[12px] font-black text-[#061008]"
        >
          <MessageCircle className="h-4 w-4" />
          ابدأ استشارتك على واتساب
        </button>
      </div>

      {/* modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-[900px] overflow-auto rounded-[28px] border border-white/10 bg-[#11151a] shadow-[0_50px_160px_rgba(0,0,0,.6)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/40 text-white backdrop-blur-md"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[1.65] overflow-hidden">
              <img src={activeProject.image} alt={activeProject.title} className="h-full w-full object-cover" />
            </div>

            <div className="p-6 md:p-8">
              <span className="text-[9px] font-black tracking-[0.18em] text-[#dfb57b]">
                {activeProject.category}
              </span>
              <h3 className="mt-2 text-3xl font-black md:text-4xl">{activeProject.title}</h3>
              <p className="mt-4 max-w-[720px] text-[12px] leading-[2] text-white/45">
                {activeProject.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2 text-[9px] font-bold text-white/40">
                  {activeProject.material}
                </span>
                <span className="rounded-lg border border-white/8 bg-white/[0.025] px-3 py-2 text-[9px] font-bold text-white/40">
                  DESIGN REFERENCE
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  startWhatsApp(
                    `أهلاً البروفيسور، شفت مشروع "${activeProject.title}" وعايز أعرف هل ينفع ناخد منه inspiration لمطبخي.`
                  );
                  setActiveProject(null);
                }}
                className="mt-7 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-2xl bg-[#25bd5e] px-6 text-sm font-black text-[#061008]"
              >
                <MessageCircle className="h-5 w-5" />
                عايز حاجة قريبة من ده
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <span className="sr-only">
        TikTok Pixel ID: {TIKTOK_PIXEL_ID}
      </span>
    </div>
  );
}