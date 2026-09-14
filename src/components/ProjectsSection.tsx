import React, { useState, useMemo } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenConsultation: (message?: string) => void;
}

const CATEGORIES = [
  { key: 'ALL', label: 'كافة الأعمال' },
  { key: 'MODERN', label: 'مودرن Modern' },
  { key: 'NEO CLASSIC', label: 'نيو كلاسيك' },
  { key: 'CONTEMPORARY', label: 'معاصر Contemporary' },
  { key: 'SPACE SMART', label: 'مساحات ذكية' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject,
  onOpenConsultation,
}) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'ALL') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section id="work" className="scroll-mt-20 border-t border-white/[0.06] py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/[0.08] pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#dfb57b]">
              Selected Works Archive
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
              أرشيف المشاريع <span className="text-[#dfb57b]">والأعمال المختارة</span>
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/50 font-light">
              نماذج حقيقية تم تفصيلها وتسليمها بالكامل بمواصفات معمارية خاصة لعملاء التجمع الخامس، الشيخ زايد، والمعادي.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  activeFilter === tab.key
                    ? 'bg-[#c5a880] text-black shadow-md'
                    : 'border border-white/10 bg-white/[0.02] text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c1015] transition duration-300 hover:border-[#c5a880]/40"
            >
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="block w-full text-right"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-104"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-[11px] text-white/40">
                    <span className="font-mono text-[#dfb57b]">0{project.number}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-white group-hover:text-[#dfb57b] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/50 leading-relaxed font-light line-clamp-2">
                    {project.subtitle}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[11px]">
                    <span className="text-white/45">{project.material}</span>
                    <span className="text-[#dfb57b] font-medium flex items-center gap-1 group-hover:underline">
                      عرض المواصفات
                      <ArrowLeft className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Subtle & High-Conversion Gallery Footer CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#0d1016] p-6 text-center sm:text-right">
          <div>
            <span className="text-xs font-bold text-white block">
              أعجبك أحد هذه التصاميم وتريد معرفة تكلفة تنفيذه لمساحتك؟
            </span>
            <span className="text-[11px] text-white/50 font-light mt-0.5 block">
              أرسل أبعاد مطبخك أو صورة تقريبية لنقوم بحساب التكلفة التقديرية وتجهيز مخطط 3D فوراً.
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenConsultation(
                'أهلاً البروفيسور، أعجبتني تصاميم أرشيف الأعمال وأود دراسة مساحتي وحساب التكلفة التقديرية لمطبخي.'
              )
            }
            className="refined-luxury-btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#c5a880] px-6 py-3 text-xs font-bold text-black shadow-md transition hover:bg-[#dfb57b]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>احسب تكلفة مطبخك بالـ 3D</span>
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
