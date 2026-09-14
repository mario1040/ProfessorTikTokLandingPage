import { Project } from './types';

export const TIKTOK_PIXEL_ID = 'DAJ83CJC77UCRCTVDQ9G';
export const WHATSAPP_PHONE = '+201149238763';

export const makeWhatsAppUrl = (message: string) =>
  `https://wa.me/201149238763?text=${encodeURIComponent(message)}`;

export const PROJECTS: Project[] = [
  {
    id: '01',
    number: '01',
    title: 'Warm Minimal Atelier',
    subtitle: 'توازن هندسي بمقاييس معمارية دقيقة',
    category: 'MODERN',
    description:
      'تكوين معماري معاصر يرتكز على الكتل الهادئة والتخزين غير المرئي. تم تفصيل المساحة بألواح بولي لاك تركي سوبر مات مع دمج أنظمة بلوم النمساوية المخفية بالكامل لمنح تجربة استخدام سلسة وهادئة.',
    image:
      'public/487434658_1110418867772539_4697664293445161849_n.jpg',
    material: 'بولي لاك سوبر مات / أنظمة بلوم',
    tags: ['مودرن هادئ', 'إضاءات مخفية', 'تخزين معماري'],
    specs: {
      warranty: '10 سنوات موثق بعقد رسمي',
      hardware: 'Blum Austria هيدروليك كامل',
      countertop: 'كوارتز ناصع البياض مضاد للبكتيريا',
    },
  },
  {
    id: '02',
    number: '02',
    title: 'The Dark Monolith',
    subtitle: 'حضور رخامي استثنائي وجزيرة مركزية',
    category: 'CONTEMPORARY',
    description:
      'تصميم يجمع بين عمق الأسطح الداكنة المطفية مع جزيرة وسطية ضخمة من رخام الكوارتز ذي العروق الذهبية، ليشكل المطبخ قلب المنزل ونقطة الارتكاز البصرية الأولى.',
    image:
      'public/1679126199043.jpg',
    material: 'كوارتز ذهبي / بولي لاك مطفأ',
    tags: ['جزيرة مركزية', 'بار مفتوح', 'إضاءة بروفايل'],
    specs: {
      warranty: '10 سنوات شامل الأجهزة والإكسسوار',
      hardware: 'أنظمة سحب وإغلاق هيدروليك',
      countertop: 'رخام نيرو ماركينا أسود عروق ذهب',
    },
  },
  {
    id: '03',
    number: '03',
    title: 'Soft Neo-Classic',
    subtitle: 'أناقة كلاسيكية بأبعاد عصرية خالدة',
    category: 'NEO CLASSIC',
    description:
      'تفاصيل نيو كلاسيك مهذبة تعكس الفخامة الهادئة، مع خزائن ممتدة حتى السقف ومقابض نحاسية أصلية معالجة ضد الأكسدة لتدوم لعقود دون أي بهتان.',
    image:
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=90',
    material: 'أخشاب لاكيه معالجة / نحاس أنتيك',
    tags: ['نيو كلاسيك', 'مقابض نحاس أصلي', 'تخزين رأسي'],
    specs: {
      warranty: '10 سنوات صيانة وضمان شامل',
      hardware: 'أنظمة أدراج ثقيلة صامتة',
      countertop: 'رخام كلكتا إيطالي نخب أول',
    },
  },
  {
    id: '04',
    number: '04',
    title: 'Warm Natural Oak',
    subtitle: 'أصالة الخشب الطبيعي بحماية إيطالية',
    category: 'NATURAL',
    description:
      'حوار بصري بين دفء قشرة خشب الأرو الطبيعي والأسطح الحجرية الرمادية المعاصرة. معالج بطبقات عزل بولي يوريثان إيطالية فائقة لحماية الخشب من الرطوبة وحرارة الطهي.',
    image:
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1600&q=90',
    material: 'قشرة أرو طبيعي / حجر أسود',
    tags: ['خشب طبيعي', 'عزل بولي يوريثان', 'طابع إسكندنافي'],
    specs: {
      warranty: '10 سنوات معتمدة',
      hardware: 'مفصلات بلوم هيدروليك ناعمة',
      countertop: 'جرانيت دبل بلاك معالج ومطفأ',
    },
  },
  {
    id: '05',
    number: '05',
    title: 'Crystal Luminescence',
    subtitle: 'انعكاس كريستالي ومضاعفة رحابة المكان',
    category: 'MODERN',
    description:
      'أسطح أكريليك إسباني نقي 100% تعكس الضوء بنقاء يشبه الكريستال، مما يمنح المساحة إحساساً مضاعفاً بالاتساع والنظافة المعمارية المطلقة.',
    image:
      'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=90',
    material: 'أكريليك كريستال / كوارتز عاجي',
    tags: ['أكريليك إسباني', 'اتساع بصري', 'مقاوم للبصمات'],
    specs: {
      warranty: '10 سنوات',
      hardware: 'مفصلات ناعمة صامتة كلياً',
      countertop: 'كوارتز أبيض فائق النقاء',
    },
  },
  {
    id: '06',
    number: '06',
    title: 'Intelligent Spatial Flow',
    subtitle: 'هندسة المساحات الصعبة والزوايا السحرية',
    category: 'SPACE SMART',
    description:
      'استغلال هندسي دقيق لكل سنتيمتر من خلال آليات السحب الذكية (Magic Corners) ووحدات التخزين الرأسية المتكاملة مع الأجهزة المدمجة.',
    image:
      'public/images (8).jpg',
    material: 'HPL ألماني / زجاج مدمج',
    tags: ['زوايا ذكية', 'HPL ضد المياه', 'تخزين مريح'],
    specs: {
      warranty: '10 سنوات معتمدة',
      hardware: 'سلال وهيدروليك ميكانيكي كامل',
      countertop: 'رخام صناعي ناعم ومقاوم للصدمات',
    },
  },
];

export const SPATIAL_CONCERNS = [
  'كيفية استغلال المساحة المتاحة وتوزيع مثلث الحركة بذكاء',
  'تجنب ازدحام المطبخ وتوفير سعة تخزينية رحبة وغير مرئية',
  'اختيار أنسب الخامات الأوروبية التي تقاوم المياه والحرارة وتعيش لعقود',
  'الاطمئنان لمصداقية مواعيد التسليم والضمان التعاقدي الموثق',
];
