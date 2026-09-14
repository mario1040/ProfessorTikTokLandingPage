import React, { useEffect, useState } from 'react';
import { MessageCircle, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingActionProps {
  onOpenConsultation: () => void;
}

export const FloatingAction: React.FC<FloatingActionProps> = ({ onOpenConsultation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasDismissedTooltip, setHasDismissedTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls down at least 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="طلب استشارة وتصميم ثلاثي الأبعاد"
      className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col items-start gap-2.5 pointer-events-auto"
    >
      {/* Floating Micro Badge / Tooltip (can be dismissed or clicked) */}
      <AnimatePresence>
        {!hasDismissedTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="group relative flex items-center gap-2 rounded-2xl border border-[#c5a880]/35 bg-[#0f131a]/95 px-3.5 py-2 text-right shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-md"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c5a880]/20 text-[#dfb57b]">
              <Sparkles className="h-3 w-3" />
            </div>
            <div className="pr-1 cursor-pointer" onClick={onOpenConsultation}>
              <span className="block text-[11px] font-bold text-white leading-tight">
                تصميم 3D ومعاينة ليزر مجاناً
              </span>
              <span className="block text-[9px] text-[#dfb57b] font-light mt-0.5">
                اضغط هنا لبدء استشارة المهندس المعماري
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setHasDismissedTooltip(true);
              }}
              className="mr-1 text-white/40 hover:text-white transition"
              aria-label="إغلاق التنبيه"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpenConsultation}
        className="group relative flex items-center gap-3 rounded-full border border-[#c5a880]/40 bg-gradient-to-r from-[#171d26] via-[#10141c] to-[#171d26] py-3 pr-4 pl-5 text-right shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl transition duration-300 hover:border-[#dfb57b] hover:shadow-[0_12px_45px_rgba(197,168,128,0.25)]"
      >
        {/* Soft pulse indicator */}
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25d366] opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25d366]" />
        </span>

        <div className="flex flex-col">
          <span className="text-[12px] font-bold text-white group-hover:text-[#dfb57b] transition-colors">
            استشارة وتصميم 3D
          </span>
          <span className="text-[9px] text-white/50 font-light">
            تواصل مباشر مع المهندس
          </span>
        </div>

        <div className="grid h-8 w-8 place-items-center rounded-full bg-[#c5a880] text-black transition group-hover:bg-[#dfb57b]">
          <MessageCircle className="h-4 w-4" />
        </div>
      </motion.button>
    </aside>
  );
};
