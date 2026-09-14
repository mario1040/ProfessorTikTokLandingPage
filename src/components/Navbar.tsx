import React, { useEffect, useState } from 'react';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavbarProps {
  onOpenConsultation: (message?: string) => void;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'المشاريع' },
  { id: 'materials', label: 'الخامات' },
  { id: 'approach', label: 'التنفيذ' },
  { id: 'faq', label: 'الأسئلة' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenConsultation,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigate = (id: string) => {
    setIsOpen(false);

    setTimeout(() => {
      onNavigate(id);
    }, 100);
  };

  const consultationMessage =
    'أهلاً بكم في البروفيسور، أود استشارة مهندس معماري لمطبخي والاطلاع على التصميم ثلاثي الأبعاد.';

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/[0.08] bg-[#07090c]/90 backdrop-blur-xl'
            : 'bg-[#07090c]/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-4 sm:h-[70px] sm:px-6">
          
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate('hero')}
            className="shrink-0"
            aria-label="البروفيسور"
          >
            <img
              src="/logo.png"
              alt="البروفيسور"
              className="h-8 w-auto object-contain sm:h-10"
            />
          </button>

          {/* Desktop */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className="text-[12px] font-medium text-white/60 transition hover:text-[#dfb57b]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenConsultation(consultationMessage)}
              className="flex h-9 items-center gap-1.5 rounded-full bg-[#c5a880] px-3.5 text-[10px] font-bold text-black transition hover:bg-[#dfb57b] active:scale-95 sm:h-10 sm:px-4 sm:text-[11px]"
            >
              تصميم 3D
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
              aria-label={isOpen ? 'إغلاق' : 'القائمة'}
            >
              {isOpen ? (
                <X className="h-4 w-4 text-[#dfb57b]" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed left-3 right-3 top-[72px] z-50 rounded-2xl border border-white/10 bg-[#0b0f14] p-2 shadow-2xl md:hidden"
            >
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className="w-full rounded-xl px-4 py-3 text-right text-sm font-medium text-white/80 transition hover:bg-white/[0.05] hover:text-[#dfb57b]"
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenConsultation(consultationMessage);
                }}
                className="mt-1 w-full rounded-xl bg-[#c5a880] py-3 text-xs font-bold text-black"
              >
                تصميم 3D مجاناً
              </button>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};