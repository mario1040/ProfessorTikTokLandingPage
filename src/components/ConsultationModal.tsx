import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, CheckCircle2, ArrowLeft, Phone, User, ShieldCheck } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (data: { name: string; phone: string }) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onSubmitLead,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
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

    try {
      onSubmitLead({
        name: trimmedName,
        phone: trimmedPhone,
      });
      // Reset form after short delay
      setTimeout(() => {
        setIsSubmitting(false);
        setName('');
        setPhone('');
      }, 500);
    } catch {
      setIsSubmitting(false);
    }
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
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute -top-24 right-1/2 h-48 w-48 translate-x-1/2 rounded-full bg-[#c5a880]/15 blur-3xl" />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur-md transition hover:border-[#c5a880]/40 hover:text-white"
              aria-label="إغلاق النافذة"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Header Badge */}
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/10 px-3 py-1 text-[11px] font-semibold text-[#f0cb98]">
              <Sparkles className="h-3 w-3 text-[#dfb57b]" />
              <span>استشارة معمارية وتصميم مجاني</span>
            </div>

            {/* Modal Title */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              احجز معاينتك واستلم تصميم 3D مجاناً
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/65 font-light">
              سجل اسمك ورقم هاتفك الآن ليقوم أحد مهندسي أتيليه «البروفيسور» بالتواصل معك مباشرة، وتحديد موعد المعاينة ورفع المقاسات بالليزر.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5 flex items-center justify-between">
                  <span>الاسم بالكامل <span className="text-[#dfb57b]">*</span></span>
                  <span className="text-[10px] text-white/40 font-light">مطلوب</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="مثال: م. أحمد عبد العزيز"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pr-10 pl-4 text-sm text-white placeholder-white/30 transition focus:border-[#c5a880] focus:bg-[#12161f] focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5 flex items-center justify-between">
                  <span>رقم الهاتف / الواتساب <span className="text-[#dfb57b]">*</span></span>
                  <span className="text-[10px] text-white/40 font-light">مطلوب</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-white/40">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="+20 10X XXX XXXX"
                    className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3.5 pr-10 pl-4 text-sm text-white text-right placeholder-white/30 transition focus:border-[#c5a880] focus:bg-[#12161f] focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2.5 text-xs text-rose-300">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="refined-luxury-btn mt-2 flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-[#c5a880] px-6 text-sm font-bold text-black shadow-lg transition duration-200 hover:bg-[#dfb57b] active:scale-[0.99] disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span>جاري تسجيل الحجز...</span>
                ) : (
                  <>
                    <span>تأكيد الحجز والتواصل عبر الواتساب</span>
                    <ArrowLeft className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Value Guarantees */}
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/[0.08] pt-4 text-center text-[10px] text-white/50">
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-[#dfb57b]" />
                <span>تصميم 3D مجاني</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-[#dfb57b]" />
                <span>معاينة بالليزر</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3 text-[#dfb57b]" />
                <span>ضمان 10 سنوات</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
