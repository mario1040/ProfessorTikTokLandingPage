import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MessageCircle, X } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onConsult: (message: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onConsult,
}) => {
  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative max-h-[90vh] w-full max-w-[800px] overflow-auto rounded-3xl border border-white/15 bg-[#0e1218] text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:scale-105"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="aspect-[1.6] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb57b]">
                {project.category}
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-white/60 font-light">
                {project.description}
              </p>

              {/* Specs */}
              {project.specs && (
                <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-white/[0.08] bg-black/30 p-4 sm:grid-cols-3 text-xs">
                  <div>
                    <span className="text-white/40 block text-[10px]">الضمان التعاقدي:</span>
                    <strong className="text-white font-semibold mt-1 block">
                      {project.specs.warranty}
                    </strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">نظام الحركة والمفصلات:</span>
                    <strong className="text-[#dfb57b] font-semibold mt-1 block">
                      {project.specs.hardware}
                    </strong>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">الأسطح والرخام:</span>
                    <strong className="text-white font-semibold mt-1 block">
                      {project.specs.countertop}
                    </strong>
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 text-[11px] text-white/60">
                  الخامات: {project.material}
                </span>
                {project.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-[#c5a880]/25 bg-[#c5a880]/10 px-3.5 py-1 text-[11px] text-[#f0cb98]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  onConsult(
                    `أهلاً البروفيسور، اطلعت على مشروع "${project.title}" في أرشيف الأعمال، وأود الاستفسار عن إمكانية تطبيق نفس التصميم والمواصفات لمساحتي.`
                  );
                  onClose();
                }}
                className="refined-luxury-btn mt-6 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full bg-[#c5a880] text-xs font-bold text-black transition hover:bg-[#dfb57b]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>استشارة معمارية لمشروع مماثل عبر واتساب</span>
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
