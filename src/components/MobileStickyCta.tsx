import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface MobileStickyCtaProps {
  onOpenConsultation: () => void;
}

export const MobileStickyCta: React.FC<MobileStickyCtaProps> = ({ onOpenConsultation }) => {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#07090c]/95 p-3 pb-safe backdrop-blur-xl md:hidden">
      <button
        type="button"
        onClick={onOpenConsultation}
        className="refined-luxury-btn flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#c5a880] text-xs font-bold text-black shadow-lg active:scale-98"
      >
        <Sparkles className="h-4 w-4" />
        <span>احجز معاينتك وتصميم 3D مجاناً</span>
        <ArrowLeft className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
