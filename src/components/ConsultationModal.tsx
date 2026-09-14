import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Phone,
  User,
  ShieldCheck,
  Clock,
  Send,
  Zap,
} from 'lucide-react';
import {
  formatToE164,
  trackSubmitForm,
  trackSchedule,
  identifyUser,
} from '../utils/tiktok';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (data: { name: string; phone: string }) => void;
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
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const cleanDigits = phone.replace(/\D/g, '');

    // Validation: Name must not be empty
    if (!trimmedName || trimmedName.length < 2) {
      setError('يرجى إدخال اسمك بالكامل للمتابعة.');
      return;
    }

    // Validation: Egyptian phone number must be at least 10 digits
    if (!cleanDigits || cleanDigits.length < 10) {
      setError('يرجى إدخال رقم هاتف صحيح (10 أرقام على الأقل، مثال: 01149238763)');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // PART 1: Format to standard E.164 (+201...)
    const formattedPhone = formatToE164(phone);

    try {
      if (typeof window !== 'undefined' && window.ttq) {
        // 1. Advanced Matching BEFORE conversion events
        identifyUser(formattedPhone);

        // 2. Fire SubmitForm with rigid contents and value: 500
        trackSubmitForm('lead_form_01', 'Consultation Request', 500, 'EGP');

        // 3. Fire Schedule with rigid contents and value: 500
        trackSchedule('consultation_01', 'Booked 3D Design', 500, 'EGP');
      }
    } catch (err) {
      console.error('TikTok Tracking Execution Error:', err);
    }

    // Dynamic WhatsApp Redirection message
    const customMessage = customContext
      ? `أهلاً البروفيسور للمطابخ، أنا ${trimmedName} (${formattedPhone}). ${customContext}`
      : `أهلاً البروفيسور للمطابخ، أنا ${trimmedName} سجلت بياناتي ومهتم بحجز معاينة وتصميم مطبخي`;

    const whatsappUrl = `https://wa.me/201149238763?text=${encodeURIComponent(customMessage)}`;

    // CRITICAL MOBILE FIX: Wrap WhatsApp redirection in a setTimeout of 250ms
    // to ensure TikTok HTTP tracking requests / beacons are not aborted on mobile devices.
    setTimeout(() => {
      // Use window.location.href (or window.open fallback for popup-friendly envs)
      try {
        window.location.href = whatsappUrl;
      } catch {
        window.open(whatsappUrl, '_blank');
      }

      onSubmitLead({
        name: trimmedName,
        phone: formattedPhone,
      });

      setIsSubmitting(false);
      setName('');
      setPhone('');
      onClose();
    }, 250);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
          dir="rtl"
        >
          {/* Backdrop blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[520px] overflow-hidden rounded-[28px] border border-[#c5a880]/30 bg-[#0b0e14] p-6 sm:p-8 text-right shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative amber gradient hairline */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a880] to-transparent" />

            {/* Ambient Background Glow inside Modal */}
            <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-[#c5a880]/10 blur-[60px]" />
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-[#dfb57b]/5 blur-[60px]" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute left-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Badge & Title */}
            <div className="mb-6">
              <div className="mb-3.5 inline-flex items-center gap-2 rounded-full border border-[#c5a880]/35 bg-[#c5a880]/10 px-3.5 py-1 text-[11px] font-bold text-[#f0cb98]">
                <Sparkles className="h-3.5 w-3.5 text-[#dfb57b]" />
                <span>معاينة ليزر + تصميم 3D مجاناً بالكامل</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                احجز استشارتك وتصميمك الآن
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-white/65 font-light">
                سجل بياناتك وسيتم تحويلك فوراً لمحادثة المهندس المعماري على واتساب لتحديد موعد المعاينة الهندسية ومناقشة تفاصيل مطبخك.
              </p>
            </div>

            {/* Trust Highlights (Free 3D Design & Fast Response Guarantees) */}
            <div className="mb-5 grid grid-cols-2 gap-2.5 rounded-2xl border border-[#c5a880]/20 bg-white/[0.02] p-3 text-[11px] text-white/80">
              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 place-items-center rounded-lg bg-[#c5a880]/15 text-[#dfb57b]">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white">تصميم 3D مجاني</div>
                  <div className="text-[10px] text-white/50">رؤية واقعية لمطبخك</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="grid h-6 w-6 place-items-center rounded-lg bg-[#c5a880]/15 text-[#dfb57b]">
                  <Clock className="h-3.5 w-3.5" />
                </div>
                <div>
                  <div className="font-bold text-white">رد فوري ومباشر</div>
                  <div className="text-[10px] text-white/50">خلال دقائق عبر واتساب</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-white/90 mb-1.5">
                  الاسم الكريم
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
                    placeholder="مثال: المهندس أحمد محمود"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pr-10 pl-4 text-xs text-white placeholder-white/35 transition focus:border-[#c5a880] focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/90 mb-1.5">
                  رقم الهاتف أو الواتساب
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
                    placeholder="01149238763 أو +20..."
                    dir="ltr"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pr-10 pl-4 text-xs text-left text-white placeholder-white/35 font-mono transition focus:border-[#c5a880] focus:bg-white/[0.08] focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                  />
                </div>
                <span className="mt-1 block text-[10px] text-white/40">
                  * سيتم التواصل معك عبر الواتساب فوراً لمناقشة المساحة والمخطط.
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300"
                >
                  {error}
                </motion.div>
              )}

              {/* Guarantees Badges */}
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.08] bg-black/40 p-2.5 text-[10px] text-white/70">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#dfb57b] shrink-0" />
                  <span>معاينة بالليزر للأبعاد الدقيقة</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#dfb57b] shrink-0" />
                  <span>ضمان رسمي معتمد 10 سنوات</span>
                </div>
              </div>

              {/* Submit CTA */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex h-13 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#c5a880] to-[#dfb57b] px-6 text-xs font-bold text-black shadow-[0_10px_35px_rgba(197,168,128,0.3)] transition-all duration-300 hover:shadow-[0_15px_45px_rgba(197,168,128,0.4)] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    <span>جاري التجهيز والتحويل للواتساب...</span>
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-black transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>تأكيد الحجز ومتابعة المحادثة فوراً</span>
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-4 text-center">
              <span className="text-[10px] text-white/40">
                🔒 خصوصيتك مضمونة 100% — بياناتك مشفرة ولا يتم مشاركتها أبداً.
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
