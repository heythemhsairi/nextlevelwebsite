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

/* =========================================================================
   TEAM — official structure.
   ONLY Walif Doukh and Heythem Hsairi are founders. Nobody else carries a
   founder title anywhere. Charlotte GPT AI is an AI system, labelled as such
   and given an abstract (non-human) identity — never a generated portrait.
   Profile copy describes the ROLE only: no invented history, employers,
   education, awards or client results.
   ========================================================================= */
export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  bio: string;
  photo: string | null;      // TODO client: real portraits — typographic frame until supplied
  kind: 'human' | 'ai';
}

export const founders: TeamMember[] = [
  {
    name: 'Walif Doukh',
    role: 'CEO & Co-Founder',
    initials: 'WD',
    bio: 'يقود الـvision، الـpositioning واتجاه Next Level كـproduction partner للـexperts والـpersonal brands.',
    photo: null,
    kind: 'human',
  },
  {
    name: 'Heythem Hsairi',
    role: 'COO & Co-Founder',
    initials: 'HH',
    bio: 'يقود الـoperations، تنظيم الـproduction وتجربة الـclient من أول planning للتسليم.',
    photo: null,
    kind: 'human',
  },
];

export const executiveTeam: TeamMember[] = [
  {
    name: 'Charlotte GPT AI',
    role: 'Chief Technology Officer — AI',
    initials: 'AI',
    bio: 'AI system داخل Next Level يساعدنا ننظّموا المعرفة، نحسّنوا الـworkflows ونطوّروا الـClient Portal.',
    photo: null,
    kind: 'ai',
  },
  {
    name: 'Adel Hadid',
    role: 'Chief Financial Officer',
    initials: 'AH',
    bio: 'يتابع الـfinance، الـbudget والقرارات المالية اللي تخلي Next Level تكبر بطريقة صحيحة.',
    photo: null,
    kind: 'human',
  },
];

export const creativeTeam: TeamMember[] = [
  {
    name: 'Mohamed Nour Wannes',
    role: 'Senior Video Editor & Motion Designer',
    initials: 'MW',
    bio: 'مسؤول على الـmontage، rythme، motion والتفاصيل البصرية اللي تعطي لكل content المستوى النهائي متاعو.',
    photo: null,
    kind: 'human',
  },
  {
    name: 'Mohamed Amine Shili',
    role: 'Senior Videographer & Filmmaker',
    initials: 'MS',
    bio: 'مسؤول على الـtournage، الإضاءة والـframing، ويحوّل الـcreative direction لصورة قوية قدّام الكاميرا.',
    photo: null,
    kind: 'human',
  },
  {
    name: 'Mokhles B. Cheikh',
    role: 'Senior Marketer & Creative Strategist',
    initials: 'MC',
    bio: 'يربط أهداف الـbrand بفهم الجمهور والـcreative ideas، باش كل content يكون عندو دور واضح.',
    photo: null,
    kind: 'human',
  },
];

export const teamSection = {
  title: 'الناس والـsystems اللي ورا Next Level.',
  sub: 'من الإدارة والتكنولوجيا، للـcreative direction والتصوير والمونتاج—كل دور يخدم على نفس الرؤية.',
  groups: {
    founders: 'Founders',
    executive: 'Executive Team',
    creative: 'Creative Team',
  },
  aiLabel: 'AI TEAM MEMBER',
  pendingLabel: 'Portrait pending',
};

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
  whatsapp: 'احكينا على WhatsApp',
};

/* =========================================================================
   HOMEPAGE
   ========================================================================= */

/* ---- 01 · HERO — pure cinematic brand introduction ----
   No copy, no CTAs: nav + tiny metadata + solid filled NEXT LEVEL wordmark.
   The semantic message (page H1) lives in the Intro Video section below. */
export const hero = {
  /* responsive sources — site.js picks one; never load both.
     Filenames carry a version suffix so a replaced hero can never be served
     from a browser or CDN cache: bump -v2 -> -v3 when the media changes. */
  videoDesktop: '/media/hero/hero-desktop-v2.mp4',
  videoMobile: '/media/hero/hero-mobile-v2.mp4',
  posterDesktop: '/media/hero/hero-desktop-poster-v2.webp',
  posterMobile: '/media/hero/hero-mobile-poster-v2.webp',
  meta: { location: 'Tunis, TN', label: 'Hero Video' },
  /* short statement, lower-right of the hero (the wordmark sits lower-left) */
  copy: 'نبنيو حضور يبيّن خبرتك.',
  copyLinkLabel: 'Explore our process ↓',
  copyLinkSmall: 'OUR WORKFLOW',
  copyLinkHref: '#intro',
};

/* ---- 03 · INTRO VIDEO — carries the primary value proposition + page H1 ----
   Uses the real "Intro Video" supplied via Drive (5.3s brand film with audio).
   Playback stays gated on file existence at build time, so a future longer
   cut is a drop-in replacement at the same path. */
export const introVideo = {
  label: 'Intro Video',
  system: 'THE NEXT LEVEL SYSTEM',
  titleLines: ['سمعتك ديما تسبقك.', 'حضورك لازم يكون في مستواها.'],
  sub: 'في الفيديو هذا نوريّوك كيفاش نخدموا: من الـconcept والـscripts، للتصوير، للمونتاج والنشر.',
  play: 'شغّل الفيديو',
  soon: 'الفيديو الكامل قريبًا',
  servicesLink: 'اكتشف خدماتنا',
  /* real Intro Video from the Drive collection — 1920×1080 h264 + AAC,
     re-encoded CRF23 +faststart (10.6 MB source → ~2 MB web) */
  video: '/media/intro/services-intro.mp4',
  poster: '/media/intro/services-intro-poster.webp',
  duration: '00:05',
};

/* ---- 02 · TRUST (facts only — no invented numbers) ---- */
export const trust = {
  note: 'ما نبيعوش أرقام ووعود وهمية. نوفّرولك production كاملة، من الـconcept للنتيجة، تحت مسؤولية team واحدة.',
  capabilities: ['Strategy', 'Scripts', 'Production', 'Editing', 'Publishing'],
  /* audience line intentionally removed from the homepage (not replaced) */
};

/* ---- 03 · SELECTED WORK ---- */
export const workIntro = {
  title: 'خدمتنا تحكي وحدها.',
  sub: 'شوف كيفاش نحوّلوا expertise حقيقية لحضور واضح، قوي وثابت.',
  cta: 'شوف كل الأعمال',
};

export interface WorkItem {
  slug: string;
  client: 'Salma Cherni' | 'Focus Plus';
  collection: 'salma-cherni' | 'focus-plus';
  category: string;      // verified-safe category only
  categoryAr: string;
  title: string;         // real supplied deliverable title — do not embellish
  poster: string;
  previewVideo: string;  // muted lightweight loop (hover/preview only)
  fullVideo: string;     // explicit-action playback (modal / project page)
  aspectRatio: 'portrait' | 'landscape' | 'square';
  featured?: boolean;
  summary: string;       // factual production description — no invented results
}

/* Real client work from the Next Level archive (Google Drive transfer, re-encoded
   for web). Titles are the supplied deliverable names. Summaries are factual
   format descriptions — no invented results, testimonials or metrics. */
const SC = '/media/work/salma-cherni';
const FP = '/media/work/focus-plus';

export const workItems: WorkItem[] = [
  {
    slug: 'salma-three-things-allergies',
    client: 'Salma Cherni',
    collection: 'salma-cherni',
    category: 'Educational Content',
    categoryAr: 'محتوى تعليمي',
    title: '3 Things to Avoid or Treat Allergies',
    poster: `${SC}/three-things-allergies-poster.webp`,
    previewVideo: `${SC}/three-things-allergies-preview.mp4`,
    fullVideo: `${SC}/three-things-allergies.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Vidéo éducative courte — script, tournage et montage en format vertical.',
  },
  {
    slug: 'focus-plus-creative-01',
    client: 'Focus Plus',
    collection: 'focus-plus',
    category: 'E-commerce Creative',
    categoryAr: 'إعلان E-commerce',
    title: 'Focus Plus — Creative 01',
    poster: `${FP}/focus-plus-creative-01-poster.webp`,
    previewVideo: `${FP}/focus-plus-creative-01-preview.mp4`,
    fullVideo: `${FP}/focus-plus-creative-01.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Vidéo publicitaire pour Focus Plus — pensée pour les réseaux sociaux.',
  },
  {
    slug: 'salma-why-you-wake-up-tired',
    client: 'Salma Cherni',
    collection: 'salma-cherni',
    category: 'Educational Content',
    categoryAr: 'محتوى تعليمي',
    title: 'Why Do You Wake Up Tired?',
    poster: `${SC}/why-you-wake-up-tired-poster.webp`,
    previewVideo: `${SC}/why-you-wake-up-tired-preview.mp4`,
    fullVideo: `${SC}/why-you-wake-up-tired.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Vidéo éducative courte — une idée claire et un rythme direct.',
  },
  {
    slug: 'focus-plus-creative-02',
    client: 'Focus Plus',
    collection: 'focus-plus',
    category: 'E-commerce Creative',
    categoryAr: 'إعلان E-commerce',
    title: 'Focus Plus — Creative 02',
    poster: `${FP}/focus-plus-creative-02-poster.webp`,
    previewVideo: `${FP}/focus-plus-creative-02-preview.mp4`,
    fullVideo: `${FP}/focus-plus-creative-02.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Deuxième vidéo de la campagne, avec un angle différent.',
  },
  {
    slug: 'salma-bac-exams',
    client: 'Salma Cherni',
    collection: 'salma-cherni',
    category: 'Educational Content',
    categoryAr: 'محتوى تعليمي',
    title: 'Get Ready for Your Bac Exams',
    poster: `${SC}/bac-exams-poster.webp`,
    previewVideo: `${SC}/bac-exams-preview.mp4`,
    fullVideo: `${SC}/bac-exams.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Vidéo pensée pour les élèves avant le bac.',
  },
  {
    slug: 'focus-plus-creative-03',
    client: 'Focus Plus',
    collection: 'focus-plus',
    category: 'E-commerce Creative',
    categoryAr: 'إعلان E-commerce',
    title: 'Focus Plus — Creative 03',
    poster: `${FP}/focus-plus-creative-03-poster.webp`,
    previewVideo: `${FP}/focus-plus-creative-03-preview.mp4`,
    fullVideo: `${FP}/focus-plus-creative-03.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Troisième variation de la même campagne.',
  },
  {
    slug: 'salma-michael-jackson',
    client: 'Salma Cherni',
    collection: 'salma-cherni',
    category: 'Educational Content',
    categoryAr: 'محتوى تعليمي',
    title: 'How Michael Jackson Died',
    poster: `${SC}/michael-jackson-poster.webp`,
    previewVideo: `${SC}/michael-jackson-preview.mp4`,
    fullVideo: `${SC}/michael-jackson.mp4`,
    aspectRatio: 'portrait',
    featured: true,
    summary: 'Storytelling court avec un traitement visuel sobre.',
  },
];

export const workCollections = [
  {
    key: 'salma-cherni',
    client: 'Salma Cherni',
    category: 'Educational Content',
    categoryAr: 'محتوى تعليمي',
    intro: 'Série de vidéos éducatives en format vertical — du script à la publication.',
  },
  {
    key: 'focus-plus',
    client: 'Focus Plus',
    category: 'E-commerce Creative',
    categoryAr: 'إعلان E-commerce',
    intro: 'Série de vidéos publicitaires e-commerce, pensée pour les réseaux sociaux.',
  },
];

/* ---- 04 · TWO SERVICE PATHS ---- */
export const servicesIntro = {
  title: 'زوز طرق. نفس الـstandard.',
  sub: 'اختار كيفاش تحب تخدم معانا. في الزوز، الـplanning والـquality والـfollow‑up مسؤوليتنا.',
};

export const services = [
  {
    slug: 'full-stack',
    index: '01',
    name: 'Full‑Stack Production',
    nameAr: 'إنتاج كامل',
    copy: 'من الـconcept للنشر، team واحدة تتكفّل بكل شي: strategy، scripts، tournage، montage وpublication. إنت تجيب الـexpertise، واحنا نحوّلوها لحضور ثابت.',
    process: ['Plan', 'Write', 'Shoot', 'Edit', 'Approve', 'Publish'],
    includes: [
      'Brand & content brief',
      'Planning mensuel',
      'Stratégie de contenu',
      'Développement des sujets',
      'Écriture des scripts',
      'Direction créative',
      'Tournage',
      'Montage',
      'Motion design & sound',
      'Révision & validation',
      'Publication & programmation',
    ],
    cta: 'اكتشف الـ Full‑Stack',
    forWho: 'للّي يحب يسلّم الملف الكامل ويركّز على خدمتو.',
  },
  {
    slug: 'remote',
    index: '02',
    name: 'Remote Content System',
    nameAr: 'نظام عن بُعد',
    copy: 'إنت تصوّر من عندك. إحنا نعطيوك الـstrategy، scripts وshot list، وبعد نتكفّلوا بالmontage، validation وpublication.',
    process: ['Plan', 'Write', 'Guide', 'Upload', 'Edit', 'Approve', 'Publish'],
    includes: [
      'Stratégie',
      'Planning mensuel',
      'Développement des sujets',
      'Écriture des scripts',
      'Shot lists',
      'Direction de tournage à distance',
      'إنت تصوّر وتبعث الـrushes',
      'Espace d’upload',
      'Montage',
      'Motion design & sound',
      'Révision & validation',
      'Publication & programmation',
    ],
    cta: 'اكتشف الـ Remote System',
    forWho: 'للّي ينجم يصوّر وحدو ويحب نفس مستوى التنظيم والمونتاج.',
  },
];

/* ---- 05 · CLIENT PORTAL DEMO ---- */
export const portalIntro = {
  title: 'كل شهر يكون واضح قبل ما يبدأ.',
  sub: 'الـplanning، scripts، dates، feedback وstatut متاع كل content، الكل في بلاصة وحدة.',
  demoBadge: 'Demo — محتوى تجريبي',
  productName: 'Next Level Client Portal',
  soon: 'Coming soon',
  soonLine: 'قريبًا، كل client باش يلقى الـcontent system متاعو منظّم، واضح وساهل للvalidation.',
};

export type PostStatus =
  | 'idea' | 'script' | 'shoot' | 'editing' | 'approval' | 'scheduled' | 'published';

/* Short labels for calendar cells (small space, French/production terms per
   the language system). Full context always lives in the detail dialog. */
export const statusLabels: Record<PostStatus, string> = {
  idea: 'Idée',
  script: 'Script prêt',
  shoot: 'Prêt à tourner',
  editing: 'En montage',
  approval: 'À valider',
  scheduled: 'Programmé',
  published: 'Publié',
};

/* Field labels in the post-detail dialog */
export const postFieldLabels = {
  platform: 'Plateforme',
  format: 'Format',
  date: 'Date',
  status: 'Statut',
  stage: 'Étape actuelle',
};

export interface DemoPost {
  day: number;            // day of the demo month
  title: string;          // full title — used in the detail modal + accessible labels
  shortTitle: string;     // short title for small calendar cells (grid + agenda)
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
    { day: 3,  title: '3 غلطات شائعة في العناية بالبشرة',        shortTitle: '3 غلطات في skincare',        platform: 'Instagram', format: 'Reel',      status: 'published', deadline: '03', stage: 'نشرت وتوثّقت في الـarchive.' },
    { day: 6,  title: 'شنوّة يصير في أول rendez‑vous؟',           shortTitle: 'أول rendez‑vous: شنوّة يصير؟', platform: 'TikTok',    format: 'Short',     status: 'published', deadline: '06', stage: 'نشرت وتوثّقت في الـarchive.' },
    { day: 10, title: 'Protection solaire: سؤال وجواب',           shortTitle: 'Protection solaire: Q&A',    platform: 'Instagram', format: 'Carousel',  status: 'scheduled', deadline: '10', stage: 'Programmé للنشر آليًا.' },
    { day: 13, title: 'Cas patient (بموافقة المريض)',             shortTitle: 'Cas patient — avec accord',  platform: 'YouTube',   format: 'Long-form', status: 'approval',  deadline: '12', stage: 'الفيديو عند الـclient للvalidation.' },
    { day: 17, title: 'Routine الشتاء للبشرة الجافة',             shortTitle: 'Routine hiver: peau sèche',  platform: 'Instagram', format: 'Reel',      status: 'editing',   deadline: '15', stage: 'En montage — première version قريبة.' },
    { day: 20, title: 'FAQ من العيادة',                            shortTitle: 'FAQ de la clinique',         platform: 'TikTok',    format: 'Short',     status: 'shoot',     deadline: '18', stage: 'Script validé — date التصوير محددة.' },
    { day: 24, title: 'Peeling chimique: الحقيقة',                shortTitle: 'Peeling chimique: الحقيقة',  platform: 'Instagram', format: 'Reel',      status: 'script',    deadline: '21', stage: 'Script prêt — في انتظار الـvalidation.' },
    { day: 27, title: 'Tour de la clinique',                      shortTitle: 'Tour de la clinique',        platform: 'YouTube',   format: 'Long-form', status: 'idea',      deadline: '25', stage: 'Idée مقترحة للشهر الجاي.' },
  ] as DemoPost[],
};

/* ---- 06 · FOUNDERS TEASER (homepage shows the two founders only) ---- */
export const foundersIntro = {
  title: 'ورا كل content قوي، فمّا team تعرف شنوّة تعمل.',
  sub: 'ورا كل content قوي، فمّا team تخطّط، تصوّر وتنتج.',
  cta: 'تعرّف على الـ Team',
  ctaHref: '/studio#team',
};

/* ---- 07 · FINAL CTA ---- */
export const finalCta = {
  title: 'مستعد تخلي حضورك يبيّن قيمتك؟',
  sub: 'في مكالمة 15 دقيقة، نفهمو وضعك اليوم ونشوفو أنهي system يناسبك.',
};

/* =========================================================================
   DEDICATED PAGES
   ========================================================================= */

/* ---- /work ---- */
export const workPage = {
  title: 'أعمال تخلّي الخبرة تبان.',
  sub: 'كل projet يبدأ بسؤال واحد: كيفاش نخلّيو الـexpertise الحقيقية تبان من أول ثانية؟',
};

/* ---- /services ---- */
export const servicesPage = {
  title: 'من الفكرة للنشر. System يخدم معاك كل شهر.',
  sub: 'زوز formules، ونفس المسؤولية: planning واضح، production محسوبة وsuivi ما يوقفش.',
  monthly: {
    title: 'كيفاش يمشي الشهر',
    steps: [
      { n: '01', t: 'Planning', d: 'نحدّدوا sujets الشهر، formats والdates. إنت توافق قبل ما نبداو.' },
      { n: '02', t: 'Scripts', d: 'Scripts جاهزين للreview، بصوتك ونبرتك، موش templates.' },
      { n: '03', t: 'Production', d: 'Tournage منظّم في Full‑Stack، أو remote direction وupload في Remote.' },
      { n: '04', t: 'Montage', d: 'Cut، rythme، motion وsound — بنفس الـstandard في الزوز.' },
      { n: '05', t: 'Validation', d: 'ما ننشرو حتى شي قبل الـvalidation متاعك. الـfeedback يتسجّل ويتطبّق.' },
      { n: '06', t: 'Publication', d: 'Programmation، publication وarchivage، مع bilan بسيط آخر الشهر.' },
    ],
  },
  onboarding: {
    title: 'أول أسبوعين',
    steps: [
      'Call découverte: المجال، الجمهور والهدف.',
      'Session tone of voice: كيفاش تحب تبان وكيفاش ما تحبّش.',
      'أول planning mensuel للvalidation.',
      'أول session de tournage أو أول batch de rushes.',
    ],
  },
  responsibilities: {
    title: 'Qui fait quoi ?',
    ours: ['Planning & dates', 'Scripts & révisions', 'Production & montage', 'Programmation & publication', 'Follow-up'],
    yours: ['الحضور وقت الـtournage أو إرسال الـrushes', 'Validation متاع الـplanning والـscripts', 'Feedback في وقتو'],
  },
  faqs: [
    { q: 'قدّاش لازمني نكون متفرّغ؟', a: 'في Full‑Stack: session تصوير وحدة منظمة في الشهر تقريبًا، وvalidations قصيرة. في Remote: وقت التصوير متاعك، والباقي علينا.' },
    { q: 'شكون يكتب الـ scripts؟', a: 'احنا. من مواضيعك وخبرتك، وبصوتك. إنت تراجع وتوافق قبل أي tournage.' },
    { q: 'وين تنشرو؟', a: 'على الحسابات متاعك. الـpublication والـprogrammation جزء من الخدمة في الصيغتين.' },
    { q: 'نجم نبدل من صيغة لصيغة؟', a: 'نعم. برشة clients يبداو Remote وبعد يمشيو لـ Full‑Stack. التبديل يتعمل من شهر لشهر.' },
    { q: 'الأسعار؟', a: 'حسب الحجم والإيقاع. في مكالمة 15 دقيقة نعطيوك رقم واضح على قياس وضعيتك.' },
    { q: 'كيفاش نبداو؟', a: 'احجز مكالمة. نفهمو وضعك، وإذا كان fit نبعثولك planning أول شهر.' },
  ],
};

/* ---- /studio ---- */
export const studioPage = {
  title: 'ورا كل content قوي، فمّا production تعرف شنوّة تعمل.',
  story: [
    'Next Level بدات من ملاحظة بسيطة: في تونس، فمّا برشة ناس عندهم expertise حقيقية، أما حضورهم online ما يبيّنش قيمتهم.',
    'المشكلة موش في الكاميرا. المشكلة في الـworkflow: فكرة عند شخص، tournage عند شخص آخر، montage عند واحد ثالث، وما فمّاش شكون مسؤول على النتيجة الكاملة.',
    'على خاطر هكا، بنينا studio يتحمّل الـworkflow كامل، من أول brief للنشر، وبنفس الـquality كل شهر.',
  ],
  principles: [
    { t: 'المسؤولية وحدة', d: 'ما فمّاش «هذا موش خدمتي». من الفكرة للنشر، النتيجة علينا.' },
    { t: 'الاستمرارية قبل الضجة', d: 'حضور قوي كل شهر خير من فيديو viral مرّة في العام.' },
    { t: 'صوتك إنت', d: 'ما نبدلوش شخصيتك. نطلّعوا أحسن نسخة من أسلوبك الحقيقي.' },
    { t: 'وقتك مهم', d: 'Sessions منظمة، مواعيد محترمة، وما نطلبوش حضورك كان وقت يلزم.' },
  ],
  /* the generic "Capabilities" list was replaced by the real named team —
     see founders / executiveTeam / creativeTeam above */
};

/* ---- /portal ---- */
export const portalPage = {
  title: 'الـcontent system متاعك، الكل في بلاصة وحدة.',
  sub: 'هذا preview للأداة اللي قاعدين نطوّروا فيها. اللي تشوفو demo، والـClient Portal الرسمي قريب.',
  benefits: [
    { t: 'Vue d’ensemble', d: 'الشهر الجاي تشوفو كامل قبل ما يبدأ: sujets، dates وstatut.' },
    { t: 'Validation أسهل', d: 'Scripts وفيديوهات تراجعهم وتعمل validation من نفس البلاصة، بلا chaînes d’e-mails.' },
    { t: 'Statut واضح', d: 'كل content عندو étape واضحة: من الفكرة للنشر.' },
    { t: 'Archive منظّمة', d: 'كل content منشور يتسجّل في الـarchive وتلقاه وقت تحتاجو.' },
  ],
  cta: 'احكي معانا على شراكة إنتاج',
};

/* ---- /book ---- */
export const bookPage = {
  title: '15 دقيقة. خطوة أوضح.',
  sub: 'في 15 دقيقة، نفهمو مجالك، حضورك اليوم وشنوّة تحب تبدّل. إذا كان فمّا fit، نتفقو على الخطوة الجاية.',
  fields: [
    { name: 'name', label: 'الاسم', placeholder: 'مثال: د. أحمد بن صالح', type: 'text', required: true },
    { name: 'phone', label: 'نومرو WhatsApp', placeholder: '216 XX XXX XXX', type: 'tel', required: true },
  ],
  areaLabel: 'المجال',
  situationLabel: 'وضعك الحالي مع الـcontent',
  serviceLabel: 'الصيغة اللي تناسبك',
  objectiveLabel: 'هدفك الرئيسي',
  areas: ['طبيب / اختصاصي', 'محامي', 'Consultant / Coach', 'Founder / Personal brand', 'مجال آخر'],
  situations: ['ما عنديش حضور منتظم', 'ننشر بلا خطة واضحة', 'عندي فريق/شخص أما النتيجة ما ترضينيش', 'عندي حضور باهي ونحب نطوّرو'],
  serviceOptions: ['Full‑Stack Production', 'Remote Content System', 'موش متأكد — نحب نفهم الفرق'],
  objectives: ['نبني ثقة قبل أول موعد/اجتماع', 'نثبّت حضور شهري منتظم', 'نحسّن الصورة والـproduction', 'هدف آخر'],
};
