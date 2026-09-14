import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';

interface MobileStickyCtaProps {
  onOpenConsultation: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ onOpenConsultation }) => {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#c5a880]/20 bg-[#07090c]/95 p-3 pb-safe backdrop-blur-xl md:hidden"
      dir="rtl"
    >
      <motion.button
        type="button"
        onClick={onOpenConsultation}
        whileTap={{ scale: 0.98 }}
        className="group relative flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#c5a880] via-[#dfb57b] to-[#c5a880] text-xs font-bold text-black shadow-[0_8px_25px_rgba(197,168,128,0.35)] active:scale-[0.98]"
      >
        <Zap className="h-4 w-4 fill-black text-black" />
        <span>احجز معاينتك وتصميم 3D مجاناً</span>
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
      </motion.button>
    </div>
  );
};
