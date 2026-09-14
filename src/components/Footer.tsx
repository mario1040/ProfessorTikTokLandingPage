import React from 'react';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenWhatsApp: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop, onOpenWhatsApp }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050709] py-10 text-xs text-white/40 font-light">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-right">
          <div className="flex items-center justify-center rounded-xl border border-[#c5a880]/20 bg-[#0e1218] p-1.5 shadow-md">
            <img
              src="/logo.png"
              alt="البروفيسور"
              className="h-9 w-auto object-contain opacity-90"
            />
          </div>
          <div>
            <strong className="block text-sm font-semibold text-white/80">
              البروفيسور للمطابخ والديكور الفاخر
            </strong>
            <span className="mt-0.5 block text-[11px] text-white/50">
              تصميم وتصنيع المطابخ العصرية والأثاث المعماري الراقي وفق المواصفات الأوروبية.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <button
            type="button"
            onClick={onScrollToTop}
            className="transition hover:text-white"
          >
            العودة للأعلى ↑
          </button>
          <button
            type="button"
            onClick={() =>
              onOpenWhatsApp('أهلاً البروفيسور، أود الاستفسار عن تفاصيل الزيارة والمعاينة.')
            }
            className="text-[#dfb57b] transition hover:underline"
          >
            واتساب الأتيليه
          </button>
        </div>
      </div>
    </footer>
  );
};
