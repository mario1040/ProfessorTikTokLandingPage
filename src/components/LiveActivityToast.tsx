import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, CheckCircle, X } from 'lucide-react';

const LIVE_EVENTS = [
  {
    title: 'طلب تصميم 3D مجاني جديد',
    location: 'التجمع الخامس، القاهرة الجديدة',
    time: 'منذ 3 دقائق',
    type: 'design',
  },
  {
    title: 'تأكيد معاينة ورفع مقاسات ليزر',
    location: 'الشيخ زايد، الجيزة',
    time: 'منذ 9 دقائق',
    type: 'visit',
  },
  {
    title: 'تسليم مطبخ بولي لاك بضمان 10 سنوات',
    location: 'المعادي، القاهرة',
    time: 'منذ 18 دقيقة',
    type: 'delivery',
  },
  {
    title: 'استشارة تصميم مطبخ نيو كلاسيك',
    location: 'مدينة نصر، القاهرة',
    time: 'منذ 24 دقيقة',
    type: 'design',
  },
  {
    title: 'اعتماد عقد توريد مطبخ أكريليك',
    location: 'مدينتي، القاهرة',
    time: 'منذ 35 دقيقة',
    type: 'contract',
  },
];

export const LiveActivityToast: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_EVENTS.length);
        setIsVisible(true);
      }, 600);
    }, 8500);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed) return null;

  const currentEvent = LIVE_EVENTS[currentIndex];

  return (
    <div className="fixed bottom-24 right-4 z-40 hidden max-w-[340px] sm:block md:bottom-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#0e1218]/90 p-3.5 shadow-2xl backdrop-blur-xl"
          >
            <div className="relative mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-400/25 bg-emerald-500/15 text-emerald-300">
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <CheckCircle className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1 text-right">
              <div className="flex items-center justify-between gap-1">
                <strong className="text-[11px] font-black text-white">{currentEvent.title}</strong>
                <span className="text-[9px] font-mono text-emerald-400/80">{currentEvent.time}</span>
              </div>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/50">
                <MapPin className="h-3 w-3 shrink-0 text-[#dfb57b]" />
                <span className="truncate">{currentEvent.location}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="text-white/30 hover:text-white"
              aria-label="إغلاق التنبيه"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
