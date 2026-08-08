/* =========================================================================
   NEXT LEVEL — content source of truth.
   Media production house, Tunisia. Doctors, lawyers, consultants, founders.
   Primary language: Tunisian Arabic. English only where it feels natural.

   PLACEHOLDER POLICY (do not remove):
   - Items flagged `placeholder: true` use temporary repo media and factual
     generic descriptions. Swap with real projects before paid traffic.
   - Portal calendar content is a FICTIONAL demo, labelled as such in the UI.
   - Social URLs are placeholders; links render only when real.
   ========================================================================= */

export const site = {
  name: 'Next Level',
  domain: 'NextLevel.tn',
  tagline: 'Media Production House — Tunisia',
  whatsapp: '21627391176',
  whatsappDisplay: '+216 27 391 176',
  bookingUrl: '',
  email: 'hello@nextlevel.tn',
  socials: {
    instagram: 'https://instagram.com/yourbrand',
    tiktok: 'https://tiktok.com/@yourbrand',
    youtube: 'https://youtube.com/@yourbrand',
  },
};

const PLACEHOLDER_WHATSAPP = '21600000000';
const PLACEHOLDER_SOCIAL_TOKENS = ['yourbrand', 'instagram.com/', 'tiktok.com/@', 'youtube.com/@'];

export const hasRealWhatsapp =
  /^\d{8,15}$/.test(site.whatsapp) && site.whatsapp !== PLACEHOLDER_WHATSAPP;

export const isPlaceholderSocial = (url: string) =>
  PLACEHOLDER_SOCIAL_TOKENS.some((token) => url.includes(token));

export const hasRealSocials = {
  instagram: !isPlaceholderSocial(site.socials.instagram),
  tiktok: !isPlaceholderSocial(site.socials.tiktok),
  youtube: !isPlaceholderSocial(site.socials.youtube),
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/* ---- FOUNDERS ---- */
export const founders = [
  {
    name: 'Walif Doukh',
    role: 'CEO & Co-Founder',
    photo: null as string | null, // TODO client: real portrait — UI shows labelled frame until supplied
  },
  {
    name: 'Heythem Hsairi',
    role: 'COO & Co-Founder',
    photo: null as string | null,
  },
];

/* ---- NAV ---- */
export const nav = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الأعمال', href: '/work' },
  { label: 'الخدمات', href: '/services' },
  { label: 'الـ Studio', href: '/studio' },
  { label: 'Client Portal', href: '/portal' },
];

export const CTA = {
  primary: 'احجز مكالمة 15 دقيقة',
  secondary: 'شوف أعمالنا',
  whatsapp: 'احكينا على WhatsApp',
};

/* =========================================================================
   HOMEPAGE
   ========================================================================= */

/* ---- 01 · HERO ---- */
export const hero = {
  eyebrow: 'Media Production House — Tunisia',
  title: 'سمعتك سبقتك. يلزمها حضور يوازيها.',
  sub: 'نخططو، نكتبوا، نصوّرو وننتجو content يخلّي خبرتك تبان كيما تستاهل—من غير ما تسيّر production كاملة وحدك.',
  video: '/media/intro.mp4', // TODO client: real showreel — current file is a licensed placeholder
  poster: '/media/intro-poster.jpg',
  reelLabel: 'شوف الـ Showreel',
  meta: { location: 'Tunis, TN', label: 'Showreel — 01:30' },
};

/* ---- 02 · TRUST (facts only — no invented numbers) ---- */
export const trust = {
  note: 'ما نبيعوش وعود بالأرقام. نبيعو سلسلة إنتاج كاملة، تحت مسؤولية وحدة.',
  capabilities: ['Strategy', 'Scripts', 'Production', 'Editing', 'Publishing'],
  fields: ['أطباء واختصاصيين', 'محامين', 'Consultants', 'Founders'],
};

/* ---- 03 · SELECTED WORK ---- */
export const workIntro = {
  title: 'الخدمة تحكي قبل الكلام.',
  sub: 'شوف كيفاش نحولو expertise حقيقية إلى حضور أوضح، أقوى وأكثر ثبات.',
  cta: 'شوف كل الأعمال',
};

export interface Project {
  slug: string;
  title: string;
  category: 'Doctor' | 'Legal' | 'Consultant' | 'Founder';
  categoryAr: string;
  poster: string;
  video?: string;
  summary: string;
  placeholder: boolean;
  /* case-study body — factual only; empty until real info supplied */
  challenge?: string;
  approach?: string;
  deliverables?: string[];
}

/* TODO client: replace with real projects (names, media, outcomes).
   These entries are format demonstrations using licensed placeholder media —
   flagged in the UI with a «عيّنة» badge and never presented as client work. */
export const projects: Project[] = [
  {
    slug: 'clinic-presence',
    title: 'حضور عيادة طبية',
    category: 'Doctor',
    categoryAr: 'طبيب',
    poster: '/media/poster-11.jpg',
    video: '/media/clip1.mp4',
    summary: 'مثال على شكل الحضور اللي نبنيوه لطبيب: تصوير هادئ، إيقاع واضح، ورسالة تبني الثقة قبل الموعد.',
    placeholder: true,
    approach: 'تخطيط شهري، تصوير في جلسة وحدة منظمة، مونتاج بإيقاع محترم للمشاهد.',
    deliverables: ['خطة شهرية', 'Scripts', 'تصوير', 'مونتاج', 'نشر'],
  },
  {
    slug: 'legal-standing',
    title: 'صورة مكتب محاماة',
    category: 'Legal',
    categoryAr: 'محاماة',
    poster: '/media/poster-24.jpg',
    video: '/media/clip4.mp4',
    summary: 'مثال على المعالجة البصرية لمحامي: تصوير رسمي بلا جمود، وصياغة تحترم طبيعة المهنة.',
    placeholder: true,
    approach: 'زوايا ثابتة، إضاءة محايدة، ونبرة مدروسة تناسب الإطار القانوني.',
    deliverables: ['خطة شهرية', 'Scripts', 'تصوير', 'مونتاج'],
  },
  {
    slug: 'consultant-clarity',
    title: 'محتوى consultant',
    category: 'Consultant',
    categoryAr: 'استشارات',
    poster: '/media/poster-33.jpg',
    video: '/media/clip3.mp4',
    summary: 'مثال على تحويل الخبرة الاستشارية إلى محتوى منظم: فكرة واضحة في كل فيديو، بلا حشو.',
    placeholder: true,
    approach: 'تفكيك المواضيع الكبيرة إلى أفكار قصيرة قابلة للنشر أسبوعيًا.',
    deliverables: ['استراتيجية', 'Scripts', 'مونتاج', 'نشر'],
  },
  {
    slug: 'coach-energy',
    title: 'حضور coach',
    category: 'Consultant',
    categoryAr: 'تدريب',
    poster: '/media/poster-48.jpg',
    video: '/media/clip2.mp4',
    summary: 'مثال على معالجة أقرب للطاقة الطبيعية: كاميرا حرة أكثر، مع الحفاظ على مستوى الإنتاج.',
    placeholder: true,
    approach: 'تصوير حركي خفيف، مونتاج بإيقاع أسرع، وألوان دافئة.',
    deliverables: ['خطة', 'تصوير', 'مونتاج'],
  },
  {
    slug: 'founder-face',
    title: 'وجه founder',
    category: 'Founder',
    categoryAr: 'مؤسس',
    poster: '/media/poster-52.jpg',
    video: '/media/clip5.mp4',
    summary: 'مثال على بناء حضور مؤسس يمثل الـ brand: قصة واضحة، وصورة تمشي مع طموح الشركة.',
    placeholder: true,
    approach: 'ربط قصة المؤسس بمنتج الشركة، وتثبيت هوية بصرية متكررة.',
    deliverables: ['استراتيجية', 'Scripts', 'تصوير', 'مونتاج', 'نشر'],
  },
  {
    slug: 'clinic-shorts',
    title: 'Shorts عيادة',
    category: 'Doctor',
    categoryAr: 'طبيب',
    poster: '/media/poster-52.jpg',
    video: '/media/clip1.mp4',
    summary: 'مثال على صيغة القصير العمودي: معلومة وحدة، إيقاع سريع، وختم بصري ثابت.',
    placeholder: true,
    deliverables: ['Scripts', 'مونتاج', 'نشر'],
  },
];

export const workCategories = [
  { key: 'all', label: 'الكل' },
  { key: 'Doctor', label: 'أطباء' },
  { key: 'Legal', label: 'محاماة' },
  { key: 'Consultant', label: 'استشارات' },
  { key: 'Founder', label: 'مؤسسين' },
];

/* ---- 04 · TWO SERVICE PATHS ---- */
export const servicesIntro = {
  title: 'زوز طرق. نفس الـ standard.',
  sub: 'اختار كيفاش تحب تخدم معانا. في الحالتين، الخطة والـquality والـfollow-up يبقاو تحت مسؤولية team واحدة.',
};

export const services = [
  {
    slug: 'full-stack',
    index: '01',
    name: 'Full-Stack Production',
    nameAr: 'إنتاج كامل',
    copy: 'من أول فكرة حتى للنشر، team واحدة تتكفّل بالـcontent system كاملة. إنت تجيب الخبرة، واحنا نحوّلوها إلى حضور ثابت ومحسوب.',
    process: ['Plan', 'Write', 'Shoot', 'Edit', 'Approve', 'Publish'],
    includes: [
      'فهم الـ brand والمحتوى',
      'تخطيط شهري',
      'استراتيجية محتوى',
      'تطوير المواضيع',
      'كتابة Scripts',
      'إخراج إبداعي',
      'تصوير',
      'مونتاج',
      'Motion وصوت',
      'مراجعة وموافقة',
      'نشر وجدولة',
    ],
    cta: 'اكتشف الـ Full-Stack',
    forWho: 'للّي يحب يسلّم الملف الكامل ويركّز على خدمتو.',
  },
  {
    slug: 'remote',
    index: '02',
    name: 'Remote Content System',
    nameAr: 'نظام عن بُعد',
    copy: 'عندك القدرة تصوّر من عندك؟ نعطيوك الخطة، الـscripts والتوجيه، وإنت تبعث الـfootage. احنا نتكفّلوا بالمونتاج، التنظيم والنشر.',
    process: ['Plan', 'Write', 'Guide', 'Upload', 'Edit', 'Approve', 'Publish'],
    includes: [
      'استراتيجية',
      'تخطيط شهري',
      'تطوير المواضيع',
      'كتابة Scripts',
      'Shot lists',
      'توجيه تصوير عن بُعد',
      'إنت تصوّر وتبعث الـ footage',
      'نظام رفع ملفات',
      'مونتاج',
      'Motion وصوت',
      'مراجعة وموافقة',
      'نشر وجدولة',
    ],
    cta: 'اكتشف الـ Remote System',
    forWho: 'للّي ينجم يصوّر وحدو ويحب نفس مستوى التنظيم والمونتاج.',
  },
];

/* ---- 05 · CLIENT PORTAL DEMO ---- */
export const portalIntro = {
  title: 'كل شهر واضح قبل ما يبدأ.',
  sub: 'الخطة، الـscripts، المواعيد، الـfeedback وحالة كل content—الكل في بلاصة وحدة.',
  demoBadge: 'Demo — محتوى تجريبي',
  productName: 'Next Level Client Portal',
  soon: 'Coming soon',
  soonLine: 'قريبًا، كل client باش يلقى الـcontent system متاعو واضحة، منظمة وسهلة للـapproval.',
};

export type PostStatus =
  | 'idea' | 'script' | 'shoot' | 'editing' | 'approval' | 'scheduled' | 'published';

export const statusLabels: Record<PostStatus, string> = {
  idea: 'فكرة',
  script: 'Script جاهز',
  shoot: 'جاهز للتصوير',
  editing: 'مونتاج',
  approval: 'في انتظار الموافقة',
  scheduled: 'مجدول',
  published: 'منشور',
};

export interface DemoPost {
  day: number;            // day of the demo month
  title: string;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn';
  format: 'Reel' | 'Short' | 'Carousel' | 'Long-form';
  status: PostStatus;
  deadline: string;       // display string
  stage: string;          // human description of current stage
}

/* Fictional demo client: «Dr. Demo — عيادة جلدية» — labelled in UI */
export const demoMonth = {
  label: 'نوفمبر — شهر تجريبي',
  clientLabel: 'Dr. Demo — عيادة جلدية (مثال)',
  daysInMonth: 30,
  startOffset: 5, // demo month starts on Saturday (grid offset)
  posts: [
    { day: 3,  title: 'غلطات شائعة في العناية بالبشرة', platform: 'Instagram', format: 'Reel',      status: 'published', deadline: '03', stage: 'تنشر وتوثّقت.' },
    { day: 6,  title: 'شنوّة يصير في أول موعد؟',          platform: 'TikTok',    format: 'Short',     status: 'published', deadline: '06', stage: 'تنشر وتوثّقت.' },
    { day: 10, title: 'حماية الشمس: سؤال وجواب',          platform: 'Instagram', format: 'Carousel',  status: 'scheduled', deadline: '10', stage: 'مجدول للنشر آليًا.' },
    { day: 13, title: 'قصة حالة (بموافقة المريض)',        platform: 'YouTube',   format: 'Long-form', status: 'approval',  deadline: '12', stage: 'الفيديو عند الـ client للمراجعة.' },
    { day: 17, title: 'روتين الشتاء للبشرة الجافة',       platform: 'Instagram', format: 'Reel',      status: 'editing',   deadline: '15', stage: 'في المونتاج — نسخة أولى قريبة.' },
    { day: 20, title: 'أسئلة متكررة من العيادة',           platform: 'TikTok',    format: 'Short',     status: 'shoot',     deadline: '18', stage: 'Script موافق عليه — موعد التصوير محدد.' },
    { day: 24, title: 'التقشير الكيميائي: الحقيقة',        platform: 'Instagram', format: 'Reel',      status: 'script',    deadline: '21', stage: 'Script جاهز — في انتظار الموافقة.' },
    { day: 27, title: 'جولة في العيادة',                   platform: 'YouTube',   format: 'Long-form', status: 'idea',      deadline: '25', stage: 'فكرة مقترحة للشهر الجاي.' },
  ] as DemoPost[],
};

/* ---- 06 · FOUNDERS TEASER ---- */
export const foundersIntro = {
  title: 'ورا كل content قوي، فمّا team تعرف شنوّة تعمل.',
  cta: 'اكتشف الـ Studio',
};

/* ---- 07 · FINAL CTA ---- */
export const finalCta = {
  title: 'مستعد تخلي حضورك يعكس قيمتك؟',
  sub: 'في مكالمة 15 دقيقة، نفهمو وين إنت اليوم ونشوفو شنوّة الـsystem المناسبة ليك.',
};

/* =========================================================================
   DEDICATED PAGES
   ========================================================================= */

/* ---- /work ---- */
export const workPage = {
  title: 'أعمال تخلّي الخبرة تبان.',
  sub: 'كل مشروع يبدأ من نفس السؤال: كيفاش نخلّيو الخبرة الحقيقية محسوسة من أول ثانية؟',
};

/* ---- /services ---- */
export const servicesPage = {
  title: 'من الفكرة للنشر. System تخدم معاك كل شهر.',
  sub: 'زوز صيغ، نفس المسؤولية: خطة واضحة، إنتاج محسوب، ومتابعة ما تقصش.',
  monthly: {
    title: 'كيفاش يمشي الشهر',
    steps: [
      { n: '01', t: 'تخطيط', d: 'نحددو مواضيع الشهر والـ formats والمواعيد — وتوافق عليها قبل ما نبداو.' },
      { n: '02', t: 'كتابة', d: 'Scripts جاهزة للمراجعة، بصوتك ونبرتك، موش قوالب.' },
      { n: '03', t: 'إنتاج', d: 'تصوير منظم في Full-Stack، أو توجيه ورفع ملفات في Remote.' },
      { n: '04', t: 'مونتاج', d: 'قصّ، إيقاع، motion وصوت — بنفس الـ standard في الصيغتين.' },
      { n: '05', t: 'موافقة', d: 'ما يتنشر شيء قبل موافقتك. الملاحظات تتسجل وتتنفذ.' },
      { n: '06', t: 'نشر', d: 'جدولة ونشر وتوثيق — وتقرير بسيط في آخر الشهر.' },
    ],
  },
  onboarding: {
    title: 'أول أسبوعين',
    steps: [
      'مكالمة تعريفية: المجال، الجمهور، والهدف.',
      'جلسة نبرة وأسلوب: كيفاش تحب تبان وكيفاش ما تحبش.',
      'أول خطة شهرية للموافقة.',
      'أول جلسة تصوير أو أول دفعة footage.',
    ],
  },
  responsibilities: {
    title: 'شكون مسؤول على شنوّة',
    ours: ['الخطة والمواعيد', 'الكتابة والمراجعة', 'الإنتاج والمونتاج', 'الجدولة والنشر', 'التذكير والمتابعة'],
    yours: ['الحضور وقت التصوير (أو إرسال الـ footage)', 'الموافقة على الخطة والـ scripts', 'ملاحظات في وقتها'],
  },
  faqs: [
    { q: 'قدّاش لازمني نكون متفرّغ؟', a: 'في Full-Stack: جلسة تصوير وحدة منظمة في الشهر تقريبًا، وموافقات قصيرة. في Remote: وقت التصوير متاعك، والباقي علينا.' },
    { q: 'شكون يكتب الـ scripts؟', a: 'احنا. من مواضيعك وخبرتك، وبصوتك. إنت تراجع وتوافق قبل أي تصوير.' },
    { q: 'وين تنشرو؟', a: 'على الحسابات متاعك. النشر والجدولة جزء من الخدمة في الصيغتين.' },
    { q: 'نجم نبدل من صيغة لصيغة؟', a: 'نعم. برشة clients يبداو Remote وبعد يمشيو لـ Full-Stack. التبديل يتعمل من شهر لشهر.' },
    { q: 'الأسعار؟', a: 'حسب الحجم والإيقاع. في مكالمة 15 دقيقة نعطيوك رقم واضح على قياس وضعيتك.' },
    { q: 'كيفاش نبداو؟', a: 'احجز مكالمة. نفهمو وضعك، وإذا كان fit نبعثولك خطة أول شهر.' },
  ],
};

/* ---- /studio ---- */
export const studioPage = {
  title: 'ورا كل content قوي، فمّا production تعرف شنوّة تعمل.',
  story: [
    'Next Level بدات من ملاحظة بسيطة: في تونس، برشة خبرات حقيقية — أطباء، محامين، consultants — تظهر أونلاين أضعف من قيمتها الفعلية.',
    'المشكلة ما هيش الكاميرا. المشكلة هي السلسلة: فكرة هنا، مصور غادي، editor آخر، وما فمّاش حد مسؤول على النتيجة الكاملة.',
    'فبنينا studio يملك السلسلة كاملة — من الفهم للنشر — تحت مسؤولية وحدة، وبمستوى ثابت كل شهر.',
  ],
  principles: [
    { t: 'المسؤولية وحدة', d: 'ما فمّاش «هذا موش خدمتي». من الفكرة للنشر، النتيجة علينا.' },
    { t: 'الثبات قبل الضجة', d: 'حضور محترم كل شهر أهم من فيديو viral مرة في العام.' },
    { t: 'صوتك إنت', d: 'ما نلبسوكش شخصية. نخرجو أحسن نسخة من أسلوبك الحقيقي.' },
    { t: 'الاحترام للوقت', d: 'جلسات منظمة، مواعيد محترمة، وما نطلبو حضورك كان وين يلزم.' },
  ],
  capabilities: {
    title: 'Capabilities',
    note: 'الأدوار اللي تغطيها الـ team في كل مشروع:',
    list: [
      { name: 'Creative Direction', role: 'الرؤية والمعيار النهائي' },
      { name: 'Content Strategy', role: 'المواضيع، الإيقاع، وصياغة الرسالة' },
      { name: 'Filming', role: 'كاميرا، إضاءة، وتأطير' },
      { name: 'Editing', role: 'بنية، إيقاع، وصقل' },
      { name: 'Motion & Sound', role: 'حركة، هوية سمعية، وعمق إنتاج' },
      { name: 'Client Partner', role: 'نقطة اتصال وحدة من الخطة للتسليم' },
    ],
  },
};

/* ---- /portal ---- */
export const portalPage = {
  title: 'الـcontent system متاعك، واضحة في بلاصة وحدة.',
  sub: 'هذا شكل الأداة اللي نحضرو فيها. المعروض هنا demo بمحتوى تجريبي — الأداة الفعلية قادمة.',
  benefits: [
    { t: 'رؤية كاملة', d: 'الشهر الجاي معروض قدامك قبل ما يبدأ: المواضيع، المواعيد، والحالة.' },
    { t: 'موافقة أسهل', d: 'Scripts وفيديوهات تتراجع وتتوافق من نفس البلاصة، بلا سلاسل إيمايلات.' },
    { t: 'حالة واضحة', d: 'كل content عندها مرحلة معروفة: من الفكرة حتى للنشر.' },
    { t: 'أرشيف منظم', d: 'كل اللي تنشر يتوثق — تلقاه وقت ما تحتاجو.' },
  ],
  cta: 'احكي معانا على شراكة إنتاج',
};

/* ---- /book ---- */
export const bookPage = {
  title: 'مكالمة قصيرة. رؤية أوضح.',
  sub: 'في 15 دقيقة، نفهمو مجالك، حضورك الحالي وشنوّة تحب تبدّل. إذا كان ثمة fit، نحدّدوا الخطوة اللي بعد.',
  fields: [
    { name: 'name', label: 'الاسم', placeholder: 'مثال: د. أحمد بن صالح', type: 'text', required: true },
    { name: 'phone', label: 'نومرو WhatsApp', placeholder: '216 XX XXX XXX', type: 'tel', required: true },
  ],
  areas: ['طبيب / اختصاصي', 'محامي', 'Consultant / Coach', 'Founder / Personal brand', 'مجال آخر'],
  situations: ['ما عنديش حضور منتظم', 'ننشر بلا خطة واضحة', 'عندي فريق/شخص أما النتيجة ما ترضينيش', 'عندي حضور باهي ونحب نطوّرو'],
  serviceOptions: ['Full-Stack Production', 'Remote Content System', 'موش متأكد — نحب نفهم الفرق'],
  objectives: ['نبني ثقة قبل أول موعد/اجتماع', 'نثبّت حضور شهري منتظم', 'نحسّن مستوى الصورة والإنتاج', 'هدف آخر'],
};
