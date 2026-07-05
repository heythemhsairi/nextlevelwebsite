/* =========================================================================
   NEXT LEVEL — content source of truth.
   Positioning: full-stack media production house that manufactures
   authority for reputation-driven experts. "You show up. We handle the rest."
   ⚠️ Replace placeholders marked TODO before real promotion.
   ========================================================================= */

export const site = {
  name: 'Next Level',
  domain: 'NextLevel.tn',
  tagline: 'We make experts look like the authority they are.',
  // TODO: real international WhatsApp number, no "+" or spaces.
  whatsapp: '21600000000',
  // TODO: real booking link (Calendly / Cal.com). Falls back to #book form if empty.
  bookingUrl: '',
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

export const CTA = {
  primary: 'احجز مكالمة خاصة',      // Book a private call
  primaryEn: 'Book a private call',
  secondary: 'شوف الأعمال',         // See the work
  whatsapp: 'كلّم الـ Studio',       // Talk to the studio
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
  // headline lines; `red` marks the accent word
  titleAr: 'نخليو الـ Expert يبان بالـ authority اللي فيه',
  titleEn: 'We make experts look like the authority they are.',
  sub: 'بنيت الـ reputation متاعك. الـ content لازم يوصلها. Next Level هي production house كاملة تتكفّل بالكل — الفكرة، الـ filming، الـ montage، الـ refinement — team واحد، كل شهر.',
  promise: 'إنت تحضر. احنا نتكفّلو بالباقي.',
  promiseEn: 'You show up. We handle the rest.',
  trust: 'موثوق من أطباء، محامين، consultants و founders في تونس.',
};

/* ---- REFRAME (the real problem) ---- */
export const reframe = {
  eyebrow: 'المشكلة الصحيحة',
  title: 'إنت أحسن من الـ Content اللي يمثّلك',
  body: 'في مجالك، إنتِ الاسم اللي الناس تثق فيه. أونلاين، تبان كيف الكل. الفجوة هاذي تكلّفك — في الـ perception، في الـ positioning، وفي الـ clients اللي ما كلّموكش خاطرهم ما تأكدوش.',
  points: [
    { k: 'الـ Perception', v: 'content ضعيف يخلّيك تبان أصغر من اللي إنت عليه فعلاً.' },
    { k: 'الفوضى', v: 'freelancer هنا، monteur لهنا، designer آخر — إنت اللي تدير الكل.' },
    { k: 'الـ Consistency', v: 'تـ post كي يجي الوقت. الـ reputation ما تتبناش هكا.' },
  ],
};

/* ---- BEFORE / AFTER ---- */
export const beforeAfter = {
  eyebrow: 'الفرق',
  title: 'الفرق موش الـ camera — الفرق هو الـ production',
  sub: 'نفس الشخص. نفس الـ expertise. وحدة متروكة للزهر، والأخرى production. اسحب باش تشوف معنى "handled".',
  before: '/media/ba-before.jpg',
  after: '/media/ba-after.jpg',
};

/* ---- THE SYSTEM (the chain) ---- */
export const system = {
  eyebrow: 'كيفاش نخدمو',
  title: 'Team واحد. السلسلة الكاملة.',
  sub: 'أغلب الناس يجمّعو videographer و monteur و designer و يتمنّاو تمشي. احنا ما نعطيوكش أجزاء — نتكفّلو بالـ process كامل، من الألف للياء.',
  steps: [
    { n: '01', title: 'Understand', ar: 'نفهمو', body: 'نتعلّمو الـ brand متاعك، مجالك، و كيفاش تحب تبان.' },
    { n: '02', title: 'Shape', ar: 'نشكّلو', body: 'نحوّلو الـ expertise متاعك لأفكار تستاهل تتنشر.' },
    { n: '03', title: 'Film', ar: 'نصوّرو', body: 'نصوّروك كيف ما يلزم، بـ calendar يحترم وقتك.' },
    { n: '04', title: 'Edit', ar: 'نمنتجو', body: 'production بمستوى يوازي الـ standing متاعك.' },
    { n: '05', title: 'Refine', ar: 'نصقلو', body: 'نثبتو في كل detail حتى يكون جاهز يمثّلك.' },
  ],
  footer: 'ما فماش freelancers باش تجري وراهم. ما فماش briefs باش تكتبهم. team واحد يعرف الـ brand متاعك.',
};

/* ---- SYSTEM, NOT ONE-OFFS ---- */
export const cadence = {
  eyebrow: 'System موش One-offs',
  title: 'الـ Authority موش فيديو وحدة — هي إنك تحضر كل شهر',
  sub: 'post وحدة تمشي في أسبوع. الـ reputation تتبنى بالحضور المستمر، بنفس المستوى، بلا فراغات. علاّه ما نبيعوش projects — نديرو system شهري، باش الحضور متاعك يتراكم و إنت راكز على خدمتك.',
  bad: {
    tag: 'الطريقة العادية',
    items: [
      'content كي يجي الوقت',
      'quality تتقلّب من مرّة للأخرى',
      'خمسة أشخاص باش تدير معاهم',
      'إنت تبريفي، تجري، و تصلّح',
    ],
  },
  good: {
    tag: 'Next Level System',
    items: [
      'cadence شهري ثابت',
      'نفس الـ standard، كل مرّة',
      'team واحد، contact واحد',
      'إنت تحضر. احنا نتكفّلو بالباقي.',
    ],
  },
};

/* ---- WHO IT'S FOR ---- */
export const audience = {
  eyebrow: 'لِشكون',
  title: 'مصمّم للناس اللي الـ reputation متاعهم هي الـ business متاعهم',
  sub: 'إذا الطريقة اللي تبان بيها تأثّر مباشرة على اللي تربحو — هاذا ليك:',
  list: [
    { who: 'أطباء و اختصاصيين', why: 'يبنيو الثقة قبل أول موعد.' },
    { who: 'محامين', why: 'يلزمهم يبانو authority قدّ ما يترافعو.' },
    { who: 'Consultants و Coaches', why: 'يبيعو expertise، موش ساعات.' },
    { who: 'Founders', why: 'اللي وجههم هو الـ brand.' },
  ],
  note: 'موش للكل — و هاذا هو المقصود. ناخذو عدد محدود من الـ clients باش كل واحد ياخذ team يعرفو فعلاً.',
};

/* ---- PROOF ---- */
export const proof = {
  eyebrow: 'Proof',
  title: 'شنوّة يتبدّل كي الـ production يتكفّل بيه',
  sub: 'موش احنا نقولو — النتائج تحكي.',
  // TODO: replace with real client outcomes + footage.
  items: [
    { poster: '/media/face-1011.jpg', quote: 'ولّى عندو حضور شهري ثابت — و بدا الناس تعرفو في مجالو.', who: 'اختصاصي، تونس' },
    { poster: '/media/face-1027.jpg', quote: 'أخيراً تبان أونلاين كيف ما هي في القاعة.', who: 'محامية' },
    { poster: '/media/face-1005.jpg', quote: 'حضور premium بلا ما نضيّع وقتي في الـ content.', who: 'Founder' },
  ],
};

/* ---- WORK / PORTFOLIO ----
   Swap the sample media in public/media/ for real client exports. */
export const work = [
  { tag: 'Doctor', caption: 'Authority على المريض قبل الموعد', poster: '/media/poster-11.jpg', video: '/media/clip1.mp4' },
  { tag: 'Lawyer', caption: 'حضور يوازي الـ standing', poster: '/media/poster-24.jpg', video: '/media/clip4.mp4' },
  { tag: 'Consultant', caption: 'Expertise مصوّرة كيف يلزم', poster: '/media/poster-33.jpg', video: '/media/clip3.mp4' },
  { tag: 'Coach', caption: 'Native style، production عالي', poster: '/media/poster-48.jpg', video: '/media/clip2.mp4' },
  { tag: 'Founder', caption: 'الوجه اللي يمثّل الـ brand', poster: '/media/poster-52.jpg', video: '/media/clip5.mp4' },
];

/* ---- SOCIAL LIVE GRID ---- */
export const socialThumbs = [
  '/media/sq-61.jpg', '/media/sq-72.jpg', '/media/sq-83.jpg',
  '/media/sq-94.jpg', '/media/sq-15.jpg', '/media/sq-26.jpg',
];

export const heroPoster = '/media/showreel.jpg';

/* ---- INTRO VIDEO (horizontal cinematic anchor in the hero) ----
   TODO: replace intro.mp4 / intro-poster.jpg with the real graded showreel.
   `intro` = muted autoplay loop band; `showreel` = full video opened by play. */
export const intro = {
  video: '/media/intro.mp4',
  poster: '/media/intro-poster.jpg',
  showreel: '/media/intro.mp4',      // TODO: full-length reel for the modal
  caption: '٩٠ ثانية تكفي باش تفهم الفرق — هاذا مستوى الـ production اللي يمثّلك.',
  captionEn: 'Ninety seconds. This is the standard that will represent you.',
};

/* ---- OFFER — partnership tiers ---- */
export const tiers = [
  {
    name: 'Presence',
    ar: 'للـ expert اللي يحب أخيراً يحضر بانتظام.',
    price: 'from DT 1,000',
    per: '/ شهر',
    featured: false,
    outcomes: [
      'cadence شهري ثابت من content مصوّر و منتَج',
      'team واحد يتكفّل بالكل، من الفكرة للتسليم',
      'حضور حقيقي و credible يتبنى',
    ],
    best: 'مناسب: البداية، channel واحد واضح.',
    cta: CTA.primary,
  },
  {
    name: 'Authority',
    ar: 'للـ expert اللي واجد يولّي الاسم في مجالو.',
    price: 'from DT 1,500',
    per: '/ شهر',
    featured: true,
    outcomes: [
      'كل اللي في Presence',
      'content plan شهري مشكّل حسب مجالك',
      'production بأولوية و team يعامل الـ brand متاعك كامتداد ليك',
      'الـ system كامل يخدم بأقصى قوّتو',
    ],
    best: 'مناسب: المحترفين الجدّيين اللي يحبو يملكو مجالهم.',
    cta: CTA.primary,
  },
  {
    name: 'Signature',
    ar: 'للـ founders و الأسماء اللي يحبو production partner مفصّل.',
    price: 'By application',
    per: '',
    featured: false,
    outcomes: [
      'engagement مفصّل — cadence خاص',
      'creative direction أعمق',
      'ملكية كاملة للحضور الإعلامي متاعك',
      'ناخذو عدد قليل جداً من هاذوما',
    ],
    best: 'مناسب: authorities راسخين يحبو الكل يتكفّل بيه بأعلى مستوى.',
    cta: 'قدّم طلب',
  },
];

/* ---- FAQ ---- */
export const faqs = [
  {
    q: 'قدّاش لازمني نكون involved؟',
    a: 'بأقل ما يمكن. احنا نتكفّلو بالـ strategy و الـ production و التسليم. خدمتك الوحيدة إنك تحضر نهار الـ filming. هاذا هو المعنى الكامل متاع "we handle the rest".',
  },
  {
    q: 'هاذي خدمة مرّة وحدة ولا مستمرّة؟',
    a: 'مستمرّة. الـ authority تتبنى بالـ consistency، علاّه نخدمو كـ system شهري — موش projects متفرّقة.',
  },
  {
    q: 'إنتوما تعملو غير montage؟',
    a: 'لا. الـ montage خطوة وحدة. احنا نملكو السلسلة الكاملة — من تشكيل الفكرة، للـ filming، للقطعة النهائية المصقولة.',
  },
  {
    q: 'أنا موش "content person" — تنجم تخدم معايا؟',
    a: 'هاذا بالضبط شكون مصمّم ليه. إنت تجيب الـ expertise. احنا نخلّيوها تبان كيف يلزم.',
  },
  {
    q: 'كيفاش نبداو؟',
    a: 'مكالمة خاصة. نتعلّمو مجالك و أهدافك، نوريّوك شنوّة ممكن، و إذا كان fit نبداو. بلا ضغط، بلا التزام.',
  },
];

/* ---- THE STUDIO (about) ---- */
export const studio = {
  eyebrow: 'The Studio',
  title: 'ورا كل authority، فمّا production تتكفّل بيها',
  founder: {
    name: 'Yassine Ben Ali',
    role: 'Founder & Creative Director',
    initials: 'YB',
    // TODO: real founder photo -> /media/founder.jpg
    statement: 'بديت Next Level خاطر أحسن المحترفين في تونس كانو يتغطّاو أونلاين من ناس نصف الـ expertise متاعهم و ضعف الـ production. المشكلة هاذي تتحلّ.',
  },
  values: [
    { title: 'Full-stack', body: 'team واحد يملك السلسلة كاملة. موش أجزاء، موش freelancers.' },
    { title: 'System', body: 'حضور يتراكم كل شهر. الـ consistency هي المنتج.' },
    { title: 'For the person', body: 'مصمّم حسبك إنت — موش template. نعرفو الـ brand متاعك.' },
  ],
  team: [
    { initials: 'YB', name: 'Yassine Ben Ali', role: 'Founder & Creative Director' },
    { initials: 'RM', name: 'Rania Mansour', role: 'Senior Editor' },
    { initials: 'KH', name: 'Khalil Haddad', role: 'Motion & Direction' },
    { initials: 'IS', name: 'Ines Sassi', role: 'Content Strategy' },
    { initials: 'AM', name: 'Aymen Mabrouk', role: 'Colorist & Sound' },
    { initials: 'LF', name: 'Lina Ferchichi', role: 'Client Partner' },
  ],
};

/* ---- BOOK A CALL ---- */
export const book = {
  eyebrow: 'Book a Call',
  title: 'مكالمة خاصة',
  sub: '15 دقيقة. نتعلّمو مجالك و أهدافك، نوريّوك شنوّة ممكن، و إذا كان fit نبداو. بلا ضغط.',
  fields: [
    { name: 'name', label: 'الاسم متاعك', placeholder: 'Ex: Dr. Ahmed…', type: 'text', required: true },
    { name: 'phone', label: 'نومرو الـ WhatsApp', placeholder: '216XXXXXXXX', type: 'tel', required: true },
  ],
  areas: ['طبيب / اختصاصي', 'محامي', 'Consultant / Coach', 'Founder / Personal brand', 'أخرى'],
  goals: ['نبني حضور من الصفر', 'نحسّن الـ perception متاعي', 'نثبّت cadence شهري', 'نحب نشوف شنوّة ممكن'],
};
