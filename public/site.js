/* ===== Next Level — shared front-end interactivity ===== */
/* ⚠️ Keep WHATSAPP_NUMBER in sync with src/config.ts (site.whatsapp). */
const WHATSAPP_NUMBER = '21600000000';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  /* nav shadow + scroll progress */
  const nav = document.getElementById('nav');
  const bar = document.getElementById('progress');
  let ticking = false;
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* mobile drawer */
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger && drawer) {
    const setDrawer = (open) => {
      drawer.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) { setDrawer(false); burger.focus(); }
    });
  }

  /* scroll reveal */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* animated counters (skipped under reduced-motion) */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const cio = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        cio.unobserve(el);
        if (Number.isNaN(target)) return;
        if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
        let cur = 0;
        const step = Math.max(1, Math.round(target / 40));
        const tick = () => {
          cur += step;
          if (cur >= target) el.textContent = prefix + target + suffix;
          else { el.textContent = prefix + cur + suffix; requestAnimationFrame(tick); }
        };
        tick();
      }),
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* video modal — with focus trap + restore */
  const modal = document.getElementById('modal');
  if (modal) {
    const title = modal.querySelector('#modalTitle');
    const desc = modal.querySelector('#modalDesc');
    const closeBtn = modal.querySelector('#modalClose');
    let lastFocus = null;

    const open = (el) => {
      title.textContent = el.dataset.video || 'Showreel';
      desc.textContent = el.dataset.desc || 'الفيديو الحقيقي يتحط هنا.';
      lastFocus = el;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };
    const close = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    document.querySelectorAll('[data-video]').forEach((el) => {
      el.addEventListener('click', () => open(el));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(el); }
      });
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        // simple trap: only the close button + CTA are focusable
        const f = modal.querySelectorAll('button, a[href]');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* hover/focus-to-play portfolio clips */
  document.querySelectorAll('.shot__media video').forEach((v) => {
    const card = v.closest('.shot');
    if (!card) return;
    const play = () => { v.play().catch(() => {}); };
    const stop = () => { v.pause(); try { v.currentTime = 0; } catch (e) {} };
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focus', play);
    card.addEventListener('blur', stop);
  });

  /* FAQ accordion — close siblings */
  const faqs = document.querySelectorAll('.faq__item');
  faqs.forEach((d) =>
    d.addEventListener('toggle', () => {
      if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
    })
  );

  /* before/after slider — pointer + keyboard.
     `pos` is the PHYSICAL visual position (0 = left edge, 100 = right edge).
     The handle, the clip edge, and the cursor all share this one axis so they
     always move together. RTL only affects which arrow key increases pos. */
  document.querySelectorAll('.ba').forEach((ba) => {
    const before = ba.querySelector('.ba__before');
    const handle = ba.querySelector('.ba__handle');
    const rtl = getComputedStyle(ba).direction === 'rtl';
    let dragging = false;
    let pos = 50;

    const apply = () => {
      before.style.clipPath = `inset(0 0 0 ${pos}%)`;
      handle.style.left = pos + '%';
      ba.setAttribute('aria-valuenow', String(Math.round(pos)));
    };
    const setFromX = (clientX) => {
      const r = ba.getBoundingClientRect();
      pos = Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100));
      apply();
    };

    const start = (e) => { dragging = true; setFromX((e.touches ? e.touches[0] : e).clientX); };
    const move = (e) => { if (dragging) setFromX((e.touches ? e.touches[0] : e).clientX); };
    const end = () => (dragging = false);
    ba.addEventListener('mousedown', start);
    ba.addEventListener('touchstart', start, { passive: true });
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('mouseup', end);
    window.addEventListener('touchend', end);

    ba.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'Home' || k === 'End') {
        e.preventDefault();
        if (k === 'Home') pos = rtl ? 100 : 0;
        else if (k === 'End') pos = rtl ? 0 : 100;
        else {
          const dir = k === 'ArrowRight' ? 1 : -1; // move line toward the pressed arrow
          pos = Math.max(0, Math.min(100, pos + dir * 4));
        }
        apply();
      }
    });

    apply();
  });

  /* lead form -> open WhatsApp prefilled */
  const form = document.getElementById('leadForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      let firstInvalid = null;
      form.querySelectorAll('[required]').forEach((i) => {
        const bad = !i.value.trim();
        i.classList.toggle('invalid', bad);
        i.setAttribute('aria-invalid', String(bad));
        if (bad) { valid = false; firstInvalid = firstInvalid || i; }
      });
      if (!valid) { if (firstInvalid) firstInvalid.focus(); return; }

      const name = form.bizname.value.trim();
      const phone = form.phone.value.trim();
      const type = form.biztype.value;
      const time = (form.querySelector('input[name="time"]:checked') || {}).dataset?.label || '—';
      const ready = (form.querySelector('input[name="ready"]:checked') || {}).dataset?.label || '—';

      const msg =
`السلام عليكم Next Level 👋
• الاسم / البراند: ${name}
• نوع البيزنس: ${type}
• وقت المكالمة: ${time}
• عندو فيديوهات حاضرة: ${ready}
• WhatsApp: ${phone}

نحب نخدم معاكم 🚀`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      const win = window.open(url, '_blank');
      const ok = document.getElementById('formOk');
      if (win) {
        ok.textContent = 'تمّت! ✅ توّا يتحلّك الـ WhatsApp بالمعلومات — كمّل الإرسال و احنا نجاوبوك بسرعة.';
      } else {
        // popup blocked — give a direct link instead of a false success
        ok.innerHTML = 'اضغط هنا باش تكمّل على الـ WhatsApp ← <a href="' + url + '" target="_blank" rel="noopener" style="color:#fff;text-decoration:underline">افتح المحادثة</a>';
      }
      ok.classList.add('show');
    });
  }
});
