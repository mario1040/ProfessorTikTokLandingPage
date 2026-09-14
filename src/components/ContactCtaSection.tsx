import React from 'react';
import { ArrowLeft, Check, MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_PHONE } from '../data';

interface ContactCtaSectionProps {
  onStartWhatsApp: (message: string) => void;
}

export const ContactCtaSection: React.FC<ContactCtaSectionProps> = ({ onStartWhatsApp }) => {
  return (
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
              onStartWhatsApp(
                'أهلاً البروفيسور، أود استشارة استوديو التصميم وتحديد موعد لرفع المقاسات وإعداد دراسة 3D لمطبخي.'
              )
            }
            className="refined-luxury-btn inline-flex h-13 items-center justify-center gap-3 rounded-full bg-[#c5a880] px-8 text-xs font-bold text-black shadow-lg transition hover:bg-[#dfb57b]"
          >
            <MessageCircle className="h-4 w-4" />
            <span>محادثة المهندس المعماري على واتساب</span>
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div
            className="flex h-13 items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-6 text-xs text-white/70 font-mono"
            dir="ltr"
          >
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
  );
};
