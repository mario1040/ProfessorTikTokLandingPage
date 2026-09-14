import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

interface FAQSectionProps {
  onStartWhatsApp: (msg: string) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'ما هي مدة تنفيذ وتصنيع المطبخ من تاريخ التعاقد؟',
    answer:
      'تستغرق دورة التصنيع والتقفيل الدقيق بالليزر من 20 إلى 30 يوم عمل حسب طبيعة الخامات المختارة وحجم المطبخ، ويتم تحديد موعد التسليم النهائي بدقة وتوثيقه في العقد الرسمي مع شرط جزائي للتأخير.',
  },
  {
    question: 'ما الذي يغطيه الضمان التعاقدي لمدة 10 سنوات؟',
    answer:
      'يغطي الضمان عيوب التصنيع وثبات الألوان ومقاومة الرطوبة والحرارة، بالإضافة إلى الضمان المباشر والشامل على جميع مفصلات وأنظمة سحب بلوم النمساوية (Blum Austria).',
  },
  {
    question: 'هل المعاينة والتصميم ثلاثي الأبعاد (3D) مجانيان حقاً؟',
    answer:
      'نعم، نوفر جلسة استشارية وتصميم 3D أولي لمساحتك لترى شكل مطبخك وتوزيعه وخاماته بوضوح تام، وذلك قبل أي التزام تعاقدي أو مادي.',
  },
  {
    question: 'ما هي الخامات الأكثر طلباً ومقاومة للماء والدهون في مصر؟',
    answer:
      'نستخدم خامات أصلية معتمدة مثل البولي لاك التركي السوبر مات المقاوم للخدش، والأكريليك الإسباني عالي اللمعان والنقاء، والـ HPL المقاوم للمياه والحرارة، مع أسطح رخام كوارتز نخب أول مضادة للبكتيريا والبقع.',
  },
  {
    question: 'هل تقومون بالتوصيل والتركيب في كافة المحافظات والمشاريع السكنية؟',
    answer:
      'نعم، نقوم بالتوريد والتركيب لجميع مناطق القاهرة الكبرى (التجمع الخامس، العاصمة الإدارية، الشيخ زايد، 6 أكتوبر، المعادي) ومختلف محافظات مصر والساحل الشمالي.',
  },
];

export const FAQSection: React.FC<FAQSectionProps> = ({ onStartWhatsApp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="scroll-mt-20 border-t border-white/[0.06] bg-[#07090c] py-20 md:py-28">
      <div className="mx-auto max-w-[960px] px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 text-[11px] font-medium text-[#dfb57b]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>الأسئلة الأكثر شيوعاً</span>
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
            كل ما يهمك معرفته <span className="text-[#dfb57b]">قبل البدء</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-white/55 font-light leading-relaxed">
            إجابات واضحة وشفافة حول الضمان ومواعيد التنفيذ وأنظمة المفصلات لتتخذ قرارك باطمئنان كامل.
          </p>
        </div>

        {/* Accordion list */}
        <div className="mt-12 space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1016] transition-colors hover:border-[#c5a880]/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-right font-medium transition focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white pl-4">
                    {faq.question}
                  </span>
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-[#dfb57b] transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#c5a880]/20' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-white/[0.06] bg-[#090c10] p-5 pt-3 text-xs sm:text-sm text-white/65 leading-relaxed font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Help Callout */}
        <div className="mt-8 rounded-2xl border border-[#c5a880]/20 bg-gradient-to-r from-[#12161f] to-[#0c1015] p-5 text-center sm:flex sm:items-center sm:justify-between sm:text-right">
          <div>
            <strong className="block text-sm font-bold text-white">لديك استفسار خاص لمساحتك؟</strong>
            <span className="text-xs text-white/50 font-light mt-0.5 block">مهندسو البروفيسور جاهزون للرد على أي تفاصيل فنية مباشرة.</span>
          </div>
          <button
            type="button"
            onClick={() => onStartWhatsApp('أهلاً البروفيسور، لدي استفسار خاص بخصوص مساحة ومواصفات مطبخي.')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/50 bg-[#c5a880]/10 px-5 py-2.5 text-xs font-semibold text-[#f0cb98] transition hover:bg-[#c5a880] hover:text-black"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>اسأل المهندس على واتساب</span>
          </button>
        </div>
      </div>
    </section>
  );
};
