/* =========================================================================
   NEXT LEVEL - content source of truth.
   Positioning: full-stack media production house that manufactures
   authority for reputation-driven experts. "You show up. We handle the rest."
   Replace placeholders before running paid traffic or outbound at scale.
   ========================================================================= */

export const site = {
  name: 'Next Level',
  domain: 'NextLevel.tn',
  tagline: 'We make experts look like the authority they are.',
  whatsapp: '21600000000',
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

export const CTA = {
  primary: 'احجز مكالمة خاصة',
  primaryEn: 'Book a private call',
  secondary: 'شوف الأعمال',
  whatsapp: 'كلّم الـ Studio',
};

/* ---- NAV ---- */
export const nav = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الأعمال', href: '/#work' },
  { label: 'الـ Studio', href: '/studio' },
  { label: 'الـ Packs', href: '/#packs' },
  { label: 'FAQ', href: '/#faq' },
];

/* ---- HERO ---- */
export const hero = {
  eyebrow: 'Media Production House — Tunisia',
  titleAr: 'سمعتك سبقتك. يلزمها حضور يوازيها.',
  titleEn: 'We turn real expertise into visible authority.',
  sub: 'Next Level production house كاملة للـ experts اللي ما يحبّوش content عادية. نفهمو مجالك، نركّبو الفكرة، نصوّرو، نمنتجو، ونصقلو كل detail باش الحضور متاعك يقول نفس الحاجة اللي تقولها خدمتك في الواقع.',
  promise: 'إنت تحضر. احنا نتكفّلوا بالباقي.',
  promiseEn: 'You show up. We handle the rest.',
  trust: 'مصمّمة للأطباء، المحامين، consultants و founders اللي الـ reputation متاعهم جزء من شغلهم.',
};

/* ---- REFRAME ---- */
export const reframe = {
  eyebrow: 'المشكلة الصحيحة',
  title: 'إنت أحسن من الـ Content اللي يمثّلك',
  body: 'في مجالك، إنت الاسم اللي الناس تثق فيه. أما أونلاين، برشة experts يبانوا عاديين أكثر من اللازم. الفجوة هاذي تضرّ الـ perception، تضعّف الـ positioning، وتخلي فرص صحيحة ما تولّيش حتى conversation.',
  points: [
    { k: 'Perception', v: 'content ضعيفة تنقص من قيمة expertise حتى قبل ما يبدأ الكلام.' },
    { k: 'Chaos', v: 'freelancer هنا، editor غادي، designer آخر - وإنت اللي تلمّ في كل شيء.' },
    { k: 'Consistency', v: 'تحضر وقتما يجي الوقت. والـ reputation ما تتبناش بالانقطاع.' },
  ],
};

/* ---- BEFORE / AFTER ---- */
export const beforeAfter = {
  eyebrow: 'الفرق',
  title: 'الفرق موش الـ camera - الفرق هو الـ production',
  sub: 'نفس الشخص. نفس الـ expertise. أمّا output مختلف برشة. اسحب باش تشوف كيفاش presence أقوى تبدأ من production محسوبة.',
  before: '/media/ba-before.jpg',
  after: '/media/ba-after.jpg',
};

/* ---- THE SYSTEM ---- */
export const system = {
  eyebrow: 'كيفاش نخدمو',
  title: 'Team واحد. السلسلة الكاملة.',
  sub: 'أغلب الناس يجمّعوا videographer و editor و designer ويتمنّاو الأمور تمشي. احنا ما نعطيوكش أجزاء. نتكفّلوا بالـ process كاملة - من الفهم للفكرة، للتصوير، للتنفيذ، للتسليم.',
  steps: [
    { n: '01', title: 'Understand', ar: 'نفهمو', body: 'ندخلوا في brand متاعك، مجالك، والنبرة اللي لازم تخرج بيها.' },
    { n: '02', title: 'Shape', ar: 'نشكّلو', body: 'نحوّلوا expertise متاعك لأفكار، formats، وزوايا تستاهل تتنشر.' },
    { n: '03', title: 'Film', ar: 'نصوّرو', body: 'نحضّروا presence قوية بتصوير منظم يحترم وقتك.' },
    { n: '04', title: 'Edit', ar: 'نمنتجو', body: 'نركّبوا كل شيء بمستوى يوازي standing متاعك.' },
    { n: '05', title: 'Refine', ar: 'نصقلو', body: 'نثبتوا في كل detail حتى يخرج content تقول عليك الشيء الصحيح.' },
  ],
  footer: 'لا freelancers تجري وراهم. لا briefs تكتبها كل مرة. team واحدة تعرفك، وتحافظ على standard ثابت.',
};

/* ---- SYSTEM, NOT ONE-OFFS ---- */
export const cadence = {
  eyebrow: 'System موش One-offs',
  title: 'الـ Authority موش فيديو وحدة - هي إنك تحضر كل شهر',
  sub: 'video باهية تنجم تشدّ الانتباه. أما الـ reputation تتبنى بالحضور المستمر، بنفس المستوى، بلا فراغات. هذا علاش نخدموا على system شهرية، موش projects متقطّعين.',
  bad: {
    tag: 'الطريقة العادية',
    items: [
      'content وقتما يجي الوقت',
      'quality تتقلّب من مرة للأخرى',
      'برشة أشخاص لازمك تسيّرهم',
      'إنت تbriefi، تجري، وتصلّح',
    ],
  },
  good: {
    tag: 'Next Level System',
    items: [
      'cadence شهرية ثابتة',
      'نفس الـ standard، كل مرة',
      'team واحدة، contact واحد',
      'إنت تحضر. احنا نتكفّلوا بالباقي.',
    ],
  },
};

/* ---- WHO IT'S FOR ---- */
export const audience = {
  eyebrow: 'لشكون',
  title: 'مصمّم للناس اللي الـ reputation متاعهم هي الـ business متاعهم',
  sub: 'إذا الطريقة اللي تبان بيها تأثر مباشرة على الثقة، الطلب، والسعر اللي تنجم تفرضو - هذا معمول ليك:',
  list: [
    { who: 'أطباء واختصاصيين', why: 'يبنيو الثقة قبل أول consultation.' },
    { who: 'محامين', why: 'يلزمهم presence توازي standing متاعهم.' },
    { who: 'Consultants و Coaches', why: 'يبيعوا expertise، موش ساعات.' },
    { who: 'Founders', why: 'وجههم جزء من الـ brand.' },
  ],
  note: 'موش service للجميع - وهذا هو المقصود. ناخذوا عدد محدود من clients باش كل واحد ياخذ attention حقيقية وteam تعرفو فعلاً.',
};

/* ---- PROOF ---- */
export const proof = {
  eyebrow: 'Proof',
  title: 'شنوّة يتبدّل كي الـ production تتشدّ صح',
  sub: 'التحويل موش في الفيديو برك. التحويل في impression الأول، في الثقة، وفي مستوى الحضور.',
  items: [
    { poster: '/media/face-1011.jpg', quote: 'حضور أوضح، rhythm أقوى، وimage أقرب للثقة من أول ثانية.', who: 'Doctor-led practice' },
    { poster: '/media/face-1027.jpg', quote: 'وقت الـ production تكون هادئة ومضبوطة، الـ expertise تولّي محسوسة أكثر.', who: 'Legal brand presence' },
    { poster: '/media/face-1005.jpg', quote: 'المحتوى يولّي جزء من الـ system، موش task إضافية فوق الخدمة.', who: 'Founder-led brand' },
  ],
};

/* ---- WORK / PORTFOLIO ---- */
export const work = [
  { tag: 'Doctor', caption: 'Presence تبني الثقة قبل الموعد', poster: '/media/poster-11.jpg', video: '/media/clip1.mp4' },
  { tag: 'Lawyer', caption: 'صورة توازي الـ standing', poster: '/media/poster-24.jpg', video: '/media/clip4.mp4' },
  { tag: 'Consultant', caption: 'Expertise مصوّرة كيف يلزم', poster: '/media/poster-33.jpg', video: '/media/clip3.mp4' },
  { tag: 'Coach', caption: 'Native energy مع production عالية', poster: '/media/poster-48.jpg', video: '/media/clip2.mp4' },
  { tag: 'Founder', caption: 'وجه يمثّل الـ brand صح', poster: '/media/poster-52.jpg', video: '/media/clip5.mp4' },
];

export const socialThumbs = [
  '/media/sq-61.jpg', '/media/sq-72.jpg', '/media/sq-83.jpg',
  '/media/sq-94.jpg', '/media/sq-15.jpg', '/media/sq-26.jpg',
];

export const heroPoster = '/media/showreel.jpg';

/* ---- INTRO VIDEO ---- */
export const intro = {
  video: '/media/intro.mp4',
  poster: '/media/intro-poster.jpg',
  showreel: '/media/intro.mp4',
  caption: 'فيلم قصير يعطيك الإحساس الصحيح: expertise حقيقية، production محسوبة، وحضور يتشاف قبل ما يتفسّر.',
  captionEn: 'A short film. The standard that will represent you.',
};

/* ---- OFFERS ---- */
export const tiers = [
  {
    name: 'Presence',
    ar: 'للـ expert اللي يحب يثبت حضور محترم ومنتظم.',
    price: 'from DT 1,000',
    per: '/ شهر',
    featured: false,
    outcomes: [
      'cadence شهرية واضحة من content مصوّرة ومنتَجة',
      'team واحدة تتكفّل بالخط من الفكرة للتسليم',
      'حضور credible يبدأ يتبنى على قاعدة صحيحة',
    ],
    best: 'مناسب: البداية الجدية، أو channel واحدة واضحة.',
    cta: CTA.primary,
  },
  {
    name: 'Authority',
    ar: 'للـ expert اللي يحب يولّي الاسم اللي الناس تربطو بمجالو.',
    price: 'from DT 1,500',
    per: '/ شهر',
    featured: true,
    outcomes: [
      'كل اللي في Presence',
      'content plan شهرية مشكّلة حسب المجال والهدف',
      'production بأولوية وteam تعامل brand متاعك كامتداد ليك',
      'system كاملة تخدم بأكثر عمق وثبات',
    ],
    best: 'مناسب: المحترفين اللي يحبّوا ownership حقيقي للحضور متاعهم.',
    cta: CTA.primary,
  },
  {
    name: 'Signature',
    ar: 'للأسماء اللي تحتاج production partner على القياس.',
    price: 'By application',
    per: '',
    featured: false,
    outcomes: [
      'engagement مفصّل حسب الـ pace والهدف',
      'creative direction أعمق',
      'coverage أوسع للحضور الإعلامي كامل',
      'ناخذوا عدد قليل برك من المستوى هذا',
    ],
    best: 'مناسب: authorities راسخين يحبّوا كل شيء handled بأعلى مستوى.',
    cta: 'قدّم طلب',
  },
];

/* ---- FAQ ---- */
export const faqs = [
  {
    q: 'قدّاش لازمني نكون involved؟',
    a: 'بأقل ما يمكن. احنا نتكفّلوا بالتخطيط، الـ production، والمتابعة. إنت يلزمك تكون حاضر في اللحظات اللي تهم - والباقي علينا.',
  },
  {
    q: 'هذه خدمة مرة وحدة ولا مستمرة؟',
    a: 'الأصل فيها مستمرة. خاطر الـ authority تتبنى بالتراكم، موش بضربة وحدة. لهذا نخدموا على system شهرية.',
  },
  {
    q: 'إنتوما تعملوا غير editing؟',
    a: 'لا. الـ editing خطوة من السلسلة. احنا نملكو الفهم، تشكيل الفكرة، التصوير، التنفيذ، والـ refinement النهائي.',
  },
  {
    q: 'أنا موش content person - تنجموا تخدموا معايا؟',
    a: 'هذا بالضبط علاش Next Level موجودة. إنت تجيب الـ expertise، واحنا نخليوها تبان كيف يلزم.',
  },
  {
    q: 'كيفاش نبدأوا؟',
    a: 'بمكالمة خاصة. نفهموا وضعيتك، نوريّوك شنوّة ممكن، وإذا كان fit نبدأوا. واضحين من الأول، وبلا ضغط.',
  },
];

/* ---- THE STUDIO ---- */
export const studio = {
  eyebrow: 'The Studio',
  title: 'ورا كل authority، فمّا production تعرف شنوّة تعمل',
  founder: {
    name: 'Founder-led Studio',
    role: 'Creative Direction & Production',
    initials: 'NL',
    statement: 'تعملت Next Level على فكرة بسيطة: برشة experts أقوى برشة من الصورة اللي يخرجو بيها أونلاين. وقت الـ production تتنظّم صح، authority تبان وحدها.',
  },
  values: [
    { title: 'Full-stack', body: 'Team واحدة تملك السلسلة كاملة. موش أجزاء متفرّقة، وموش freelancers مجمّعين.' },
    { title: 'System', body: 'حضور يتبنى كل شهر. الـ consistency موش bonus - هي المنتج.' },
    { title: 'Built around you', body: 'موش template. كل expert عندو منطقو، ونبنيوا الـ production على ذلك.' },
  ],
  team: [
    { initials: 'CD', name: 'Creative Direction', role: 'Positioning, vision, and the final standard' },
    { initials: 'CS', name: 'Content Strategy', role: 'Topics, cadence, and message shaping' },
    { initials: 'FM', name: 'Filming', role: 'Camera, lighting, framing, and on-set presence' },
    { initials: 'ED', name: 'Editing', role: 'Structure, pacing, polish, and delivery flow' },
    { initials: 'MO', name: 'Motion & Sound', role: 'Movement, sound texture, and production depth' },
    { initials: 'CP', name: 'Client Partner', role: 'One point of contact from plan to delivery' },
  ],
};

/* ---- BOOK A CALL ---- */
export const book = {
  eyebrow: 'Book a Call',
  title: 'مكالمة خاصة',
  sub: '15 دقيقة. نفهموا مجالك، نسمعوا شنوّة تحب تغيّر، ونوريّوك كيفاش Next Level تنجم تولّي production partner متاعك. إذا كان fit، نبدأوا. وإذا موش fit، تخرج برؤية أوضح.',
  fields: [
    { name: 'name', label: 'اسمك', placeholder: 'Ex: Dr. Ahmed…', type: 'text', required: true },
    { name: 'phone', label: 'نومرو الـ WhatsApp', placeholder: '216XXXXXXXX', type: 'tel', required: true },
  ],
  areas: ['طبيب / اختصاصي', 'محامي', 'Consultant / Coach', 'Founder / Personal brand', 'أخرى'],
  goals: ['نبني حضور من الصفر', 'نحسّن الـ perception متاعي', 'نثبّت cadence شهرية', 'نحب نشوف شنوّة ممكن'],
};
