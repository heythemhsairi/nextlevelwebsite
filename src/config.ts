/* =========================================================================
   NEXT LEVEL — single source of truth for content + contact info.
   ⚠️ REPLACE the placeholders below before going live (marked TODO).
   ========================================================================= */

export const site = {
  name: 'Next Level',
  domain: 'NextLevel.tn',
  // TODO: real international WhatsApp number, no "+" or spaces.
  whatsapp: '21600000000',
  email: 'hello@nextlevel.tn',
  socials: {
    // TODO: replace with real profile URLs.
    instagram: 'https://instagram.com/yourbrand',
    tiktok: 'https://tiktok.com/@yourbrand',
    youtube: 'https://youtube.com/@yourbrand',
  },
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

/* ---- NAV ---- */
export const nav = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الأعمال', href: '/#work' },
  { label: 'الـ Packs', href: '/#packs' },
  { label: 'الـ Team', href: '/team' },
  { label: 'FAQ', href: '/#faq' },
];

/* ---- HERO ---- */
export const hero = {
  badge: 'Your Editing Team — Tunisia',
  // headline split so we can color the accent words
  titleLines: [
    [{ t: 'الـ ' }, { t: 'Content', red: true }, { t: ' متاعك،' }],
    [{ t: 'نوصلوه للـ ' }, { t: 'Next Level', red: true }],
  ],
  sub: 'ماهيش مشكلة budget، ماهيش مشكلة talent — هي مشكلة System. عطينا الـ footage متاعك واحنا الـ team متاع المونتاج اللي يخدم معاك كل أسبوع باش يبقى الـ content متاعك ثابت و حاضر.',
  primaryCta: 'نبدأو نخدمو معاك',
  secondaryCta: 'شوف الـ Packs',
};

/* ---- METRICS ---- */
export const metrics = [
  { value: 500, prefix: '+', label: 'Videos delivered' },
  { value: 40, prefix: '+', label: 'Brands سعداء' },
  { value: null, display: '24–48h', label: 'أول delivery' },
  { value: null, display: '∞', label: 'Revisions' },
];

/* ---- PROBLEM ---- */
export const problems = [
  {
    title: 'Consistency',
    body: 'تـ post كل أسبوع بـ نظام واضح. الـ algorithm يحب اللي يخدم بانتظام، موش وقتما يجي الوقت.',
  },
  {
    title: 'Quality ثابتة',
    body: 'نفس المستوى في كل فيديو. عندنا process و checklist يضمنولك quality ما تتقلبش.',
  },
  {
    title: 'Speed',
    body: 'الـ momentum يضيع كي تستنا برشا. احنا نوصلوك بسرعة باش تبقى دايما present في الـ feed.',
  },
];

/* ---- COMPARE (the system) ---- */
export const compare = {
  bad: {
    tag: 'الطريقة العادية',
    items: [
      'فيديو وقتما يجي الوقت',
      'Quality متقلبة من video للأخرى',
      'Delivery بطيء و مواعيد مش مضبوطة',
      'كل مرة تشرح من الزيرو',
    ],
  },
  good: {
    tag: 'Next Level System',
    items: [
      'Calendar ثابت، تـ post كل أسبوع',
      'Quality ثابتة في كل فيديو',
      'Delivery في وقتو، بـ مواعيد واضحة',
      'Team يعرف الـ brand و الـ style متاعك',
    ],
  },
};

/* ---- PROCESS ---- */
export const steps = [
  { n: '01', title: 'نتعرفو على الـ brand', body: 'نحكيو على الـ goals و الـ style اللي يمشي معاك.' },
  { n: '02', title: 'ابعثلنا الـ Raw Footage', body: 'عطينا الـ footage متاعك، الباقي كامل علينا.' },
  { n: '03', title: 'نحللو و نمنتجو', body: 'Edit + Hooks + Color + Sound design.' },
  { n: '04', title: 'Quality Check و Delivery', body: 'نثبتو في كل detail و نسلموك ready-to-post.' },
];

/* ---- WORK / PORTFOLIO ----
   poster = thumbnail shown at rest; video = clip played on hover.
   Swap these for your real exports (keep the 9:16 ratio). */
export const work = [
  { tag: 'E-com Ad', caption: 'Hook في أول 3 ثواني', poster: '/media/poster-11.jpg', video: '/media/clip1.mp4' },
  { tag: 'Talking Head', caption: 'Retention edit', poster: '/media/poster-24.jpg', video: '/media/clip4.mp4' },
  { tag: 'Brand Reel', caption: 'Cinematic color', poster: '/media/poster-33.jpg', video: '/media/clip3.mp4' },
  { tag: 'UGC', caption: 'Native style', poster: '/media/poster-48.jpg', video: '/media/clip2.mp4' },
  { tag: 'Story Ad', caption: 'Fast cut', poster: '/media/poster-52.jpg', video: '/media/clip5.mp4' },
];

/* ---- TESTIMONIALS ---- */
export const testimonials = [
  { name: 'Wael Trabelsi', role: 'E-commerce', poster: '/media/face-1011.jpg' },
  { name: 'Sarra Mejri', role: 'Skincare Brand', poster: '/media/face-1027.jpg' },
  { name: 'Hamza Gharbi', role: 'Fitness Coach', poster: '/media/face-1005.jpg' },
];

/* ---- SOCIAL LIVE GRID ---- */
export const socialThumbs = [
  '/media/sq-61.jpg', '/media/sq-72.jpg', '/media/sq-83.jpg',
  '/media/sq-94.jpg', '/media/sq-15.jpg', '/media/sq-26.jpg',
];

/* ---- HERO + BEFORE/AFTER media ---- */
export const heroPoster = '/media/showreel.jpg';
export const beforeAfter = { before: '/media/ba-before.jpg', after: '/media/ba-after.jpg' };

/* ---- PRICING ---- */
export const packs = [
  {
    kicker: 'Starter',
    name: 'Starter Boost',
    price: 'DT 500',
    popular: false,
    cta: 'نبدا بالـ Test',
    feats: ['Revisions مجانية', 'Color grading و Visual Hooks', 'Up to 3 hooks لكل فيديو'],
  },
  {
    kicker: 'Growth',
    name: 'Growth Engine',
    price: 'DT 1500',
    popular: true,
    cta: 'نمشيو للـ Next Level',
    feats: [
      'Revisions مجانية',
      'Color grading و Visual Hooks محترفة',
      'Up to 3 hooks لكل فيديو',
      'Content calendar شهري',
      'Team ثابت يعرف الـ brand متاعك',
    ],
  },
  {
    kicker: 'Pro',
    name: 'Momentum Pack',
    price: 'DT 1000',
    popular: false,
    cta: 'نبدا الـ Momentum',
    feats: [
      'Revisions مجانية',
      'Color grading و Visual Hooks محترفة',
      'Up to 3 hooks لكل فيديو',
      'Content calendar نص شهري',
    ],
  },
];

/* ---- FAQ ---- */
export const faqs = [
  {
    q: 'شنوة بالضبط تعملوا؟',
    a: 'احنا الـ editing team متاعك. نعملو edit لأي صاحب business يحب يبني محتوى — من talking head للـ ads للـ UGC — بـ system ثابت كل أسبوع.',
  },
  {
    q: 'الخدمة هذي تصلح لأي نوع بيزنس؟',
    a: 'إيه. تصلح لأي business يحب presence قوية على السوشيال — e-commerce، personal brand، خدمات، restos… أي حاجة.',
  },
  {
    q: 'قداش تاخو وقت؟',
    a: 'الـ delivery يكون سريع و في مواعيد واضحة نتفقو عليهم من البداية، باش تبقى دايما في وقتك.',
  },
  {
    q: 'كيفاش نبدأ؟',
    a: 'عمّر الـ form لوطة، وفي أقل من 24 ساعة نكلموك على WhatsApp مباشرة — بلا أي التزام.',
  },
];

/* ---- TEAM PAGE ---- */
export const values = [
  { title: 'Partnership', body: 'احنا extension للـ team متاعك، موش مجرد service. نجاحك هو نجاحنا.' },
  { title: 'Craft', body: 'نهتمو بالـ detail الصغير اللي يفرّق بين فيديو عادي و فيديو يـ stop الـ scroll.' },
  { title: 'Consistency', body: 'نسلموك في وقتنا، بنفس الـ quality، في كل مرة. النظام قبل كل شيء.' },
];

export const team = [
  { initials: 'YB', name: 'Yassine Ben Ali', role: 'Founder & Creative Lead', body: 'يحط الـ vision و الـ style العام، ويتأكد إلي كل فيديو يخدم الـ goal.' },
  { initials: 'RM', name: 'Rania Mansour', role: 'Senior Video Editor', body: 'متخصصة في الـ retention editing و الـ storytelling اللي يخلي الناس تكمّل المشاهدة.' },
  { initials: 'KH', name: 'Khalil Haddad', role: 'Motion Designer', body: 'الـ animations، الـ transitions و الـ visual hooks اللي يعطيو الفيديو روح.' },
  { initials: 'IS', name: 'Ines Sassi', role: 'Content Strategist', body: 'تبني الـ calendar و الـ hooks باش الـ content يجيب نتائج، موش غير views.' },
  { initials: 'AM', name: 'Aymen Mabrouk', role: 'Colorist & Sound', body: 'Color grading سينمائي و sound design يرفعو الـ production value.' },
  { initials: 'LF', name: 'Lina Ferchichi', role: 'Client Success', body: 'الـ contact المباشر متاعك — تتابع كل project و تتأكد إلي راك راضي.' },
];

export const teamStats = [
  { value: 6, label: 'Team members' },
  { value: 500, prefix: '+', label: 'Videos delivered' },
  { value: 40, prefix: '+', label: 'Brands' },
  { value: 98, suffix: '%', label: 'Clients يرجعو' },
];
