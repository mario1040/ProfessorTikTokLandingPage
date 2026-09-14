import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, ArrowLeft, Phone, User, ShieldCheck, Compass } from 'lucide-react';
import { formatToE164, trackSubmitForm, trackSchedule, identifyUser } from '../utils/tiktok';

const SERVICE_OPTIONS = [
  'تصميم مطبخ كامل',
  'تعديل مطبخ حالي',
  'ديكورات وتصاميم 3D',
];

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (data: { name: string; phone: string; service?: string }) => void;
  customContext?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onSubmitLead,
  customContext,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(SERVICE_OPTIONS[0]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError('يرجى كتابة الاسم الكريم للمتابعة');
      return;
    }

    if (!trimmedPhone || trimmedPhone.length < 9) {
      setError('يرجى إدخال رقم هاتف أو واتساب صحيح للتواصل');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Format phone number to standard E.164 format (+201XXXXXXXXX) for TikTok Advanced Matching
    const formattedPhone = formatToE164(trimmedPhone);

    try {
      if (typeof window !== 'undefined' && window.ttq) {
        // Pass formatted E.164 customer info for TikTok Advanced Matching
        identifyUser(formattedPhone);

        // 1. SubmitForm Event with selectedService injected into contents, description, and query
        trackSubmitForm(
          'lead_form_01',
          selectedService || 'Consultation Request',
          500,
          'EGP',
          `خدمة مطلوبة: ${selectedService}`,
          selectedService
        );

        // 2. Schedule Event with rigid, non-empty contents
        trackSchedule('consultation_01', 'Booked 3D Design');
      }
    } catch (err) {
      console.error('TikTok Pixel Tracking Error:', err);
    }

    // Dynamic WhatsApp Redirection message
    const customMessage = customContext
      ? `أهلاً البروفيسور للمطابخ، أنا ${trimmedName} (${trimmedPhone}). مهتم بـ "${selectedService}". ${customContext}`
      : `أهلاً البروفيسور للمطابخ، أنا ${trimmedName} سجلت بياناتي ومهتم بـ "${selectedService}" وحجز معاينة وتصميم 3D لمطبخي.`;

    const whatsappUrl = `https://wa.me/201149238763?text=${encodeURIComponent(customMessage)}`;

    // Preserved 200ms delay for reliable pixel beacon transmission before redirecting to WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Notify parent if needed for persistence or custom logic
      onSubmitLead({
        name: trimmedName,
        phone: trimmedPhone,
        service: selectedService,
      });

      setIsSubmitting(false);
      setName('');
      setPhone('');
      setSelectedService(SERVICE_OPTIONS[0]);
      onClose();
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-[540px] overflow-hidden rounded-3xl border border-[#c5a880]/35 bg-[#0d1016] p-6 sm:p-8 text-right shadow-[0_25px_80px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Top decorative gradient line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:border-white/30 hover:text-white"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header / Value Proposition */}
            <div className="mb-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3.5 py-1 text-[11px] font-bold text-[#f0cb98]">
                <Sparkles className="h-3.5 w-3.5 text-[#dfb57b]" />
                <span>عرض المعاينة الهندسية والتصميم 3D</span>
              </div>
              <h2 className="text-2xl font-black text-white sm:text-3xl">
                احجز استشارتك المعمارية مجاناً
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/60 font-light">
                سجل بياناتك وسيتم توجيهك فوراً لمحادثة المهندس المعماري على واتساب لتحديد موعد المعاينة بالليزر والبدء في التصميم ثلاثي الأبعاد لمساحتك.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  الاسم بالكامل
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                    <User className="h-4 w-4 text-[#dfb57b]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: المهندس محمد أحمد"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] py-3.5 pr-10 pl-4 text-xs text-white placeholder-white/30 focus:border-[#c5a880] focus:bg-white/[0.06] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  رقم الهاتف / واتساب للتواصل
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                    <Phone className="h-4 w-4 text-[#dfb57b]" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="مثال: 01149238763 أو +20..."
                    dir="ltr"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.03] py-3.5 pr-10 pl-4 text-xs text-left text-white placeholder-white/30 focus:border-[#c5a880] focus:bg-white/[0.06] focus:outline-none transition font-mono"
                  />
                </div>
                <span className="mt-1 block text-[10px] text-white/40">
                  * سيتم التواصل معك عبر الواتساب فوراً لمناقشة المساحة والمخطط.
                </span>
              </div>

              {/* Service Type Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-white/80 mb-1.5">
                  نوع الخدمة المطلوبة
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                    <Compass className="h-4 w-4 text-[#dfb57b]" />
                  </div>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-[#0b0e14] py-3.5 pr-10 pl-4 text-xs text-white focus:border-[#c5a880] focus:bg-[#10141c] focus:outline-none transition cursor-pointer appearance-none"
                  >
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-[#0d1016] text-white py-1">
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40 text-[10px]">
                    ▼
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                  {error}
                </div>
              )}

              {/* Guarantees / Trust Badges */}
              <div className="grid grid-cols-2 gap-2.5 rounded-2xl border border-white/[0.08] bg-black/40 p-3 text-[11px] text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#dfb57b] shrink-0" />
                  <span>معاينة ليزر وتصميم 3D</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#dfb57b] shrink-0" />
                  <span>ضمان رسمي 10 سنوات</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="refined-luxury-btn group flex h-13 w-full items-center justify-center gap-3 rounded-full bg-[#c5a880] px-6 text-xs font-bold text-black shadow-xl transition-all duration-300 hover:bg-[#dfb57b] hover:shadow-[0_10px_35px_rgba(197,168,128,0.25)] active:scale-[0.98] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <span>جاري التجهيز والتحويل للواتساب...</span>
                  </span>
                ) : (
                  <>
                    <span>تأكيد الحجز ومتابعة المحادثة</span>
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-[10px] text-white/40">
                🔒 بياناتك محمية تماماً وتُستخدم فقط لترتيب معاينة واستشارة مطبخك.
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
