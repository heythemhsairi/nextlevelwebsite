const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Shared background-scroll lock. Counted, so the drawer and the video modal
   can't unlock each other while one of them is still open. */
let scrollLocks = 0;
const lockScroll = () => {
  if (++scrollLocks === 1) document.body.style.overflow = 'hidden';
};
const unlockScroll = () => {
  if (scrollLocks > 0 && --scrollLocks === 0) document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
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
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  if (burger && drawer) {
    let lastFocus = null;

    const focusables = () =>
      Array.from(drawer.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
        .filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0);

    const setDrawer = (open) => {
      if (open === drawer.classList.contains('open')) return;

      drawer.classList.toggle('open', open);
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      drawer.setAttribute('aria-hidden', String(!open));

      // `inert` removes the drawer from the tab order and the a11y tree while closed,
      // so its links can never be focused behind the page.
      if (open) drawer.removeAttribute('inert');
      else drawer.setAttribute('inert', '');

      if (open) {
        lastFocus = document.activeElement;
        lockScroll();
        const first = focusables()[0];
        if (first) first.focus();
      } else {
        unlockScroll();
        const back = lastFocus && document.contains(lastFocus) ? lastFocus : burger;
        back.focus();
        lastFocus = null;
      }
    };

    burger.addEventListener('click', () => setDrawer(!drawer.classList.contains('open')));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setDrawer(false)));

    document.addEventListener('keydown', (e) => {
      if (!drawer.classList.contains('open')) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setDrawer(false);
        return;
      }

      if (e.key === 'Tab') {
        // keep focus cycling inside the drawer
        const f = focusables();
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (!drawer.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // a resize up to desktop must not leave the page scroll-locked behind a hidden drawer
    window.addEventListener('resize', () => {
      if (drawer.classList.contains('open') && window.innerWidth > 900) setDrawer(false);
    });
  }

  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  const modal = document.getElementById('modal');
  if (modal) {
    const title = modal.querySelector('#modalTitle');
    const desc = modal.querySelector('#modalDesc');
    const player = modal.querySelector('#modalPlayer');
    const closeBtn = modal.querySelector('#modalClose');
    let lastFocus = null;

    const close = () => {
      if (!modal.classList.contains('open')) return;
      modal.classList.remove('open');
      unlockScroll();
      if (player) {
        player.pause();
        player.removeAttribute('src');
        player.load();
      }
      if (lastFocus) lastFocus.focus();
    };

    const open = (el) => {
      title.textContent = el.dataset.video || 'Showreel';
      desc.textContent = el.dataset.desc || 'شوف كيفاش Next Level تخرّج expertise حقيقية في صورة أقوى وأهدى.';

      if (player) {
        if (el.dataset.videoPoster) player.setAttribute('poster', el.dataset.videoPoster);
        if (el.dataset.videoSrc) {
          player.src = el.dataset.videoSrc;
          player.load();
          player.play().catch(() => {});
        }
      }

      if (modal.classList.contains('open')) return;
      lastFocus = el;
      modal.classList.add('open');
      lockScroll();
      closeBtn.focus();
    };

    document.querySelectorAll('[data-video]').forEach((el) => {
      el.addEventListener('click', () => open(el));
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(el);
        }
      });
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'Tab') {
        const f = modal.querySelectorAll('button, a[href], video');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  if (!reduceMotion) {
    const parallax = Array.from(document.querySelectorAll('[data-parallax]'));
    if (parallax.length) {
      let px = false;
      const applyParallax = () => {
        const vh = window.innerHeight;
        parallax.forEach((el) => {
          const r = el.getBoundingClientRect();
          const center = r.top + r.height / 2;
          const offset = (center - vh / 2) / vh;
          el.style.setProperty('--py', (offset * -22).toFixed(1) + 'px');
        });
        px = false;
      };
      window.addEventListener('scroll', () => {
        if (!px) {
          requestAnimationFrame(applyParallax);
          px = true;
        }
      }, { passive: true });
      applyParallax();
    }
  }

  const ssteps = Array.from(document.querySelectorAll('.sstep'));
  if (ssteps.length) {
    const lightSteps = () => {
      const vh = window.innerHeight;
      ssteps.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.classList.toggle('on', r.top + r.height / 2 < vh * 0.62);
      });
    };
    let st = false;
    window.addEventListener('scroll', () => {
      if (!st) {
        requestAnimationFrame(() => {
          lightSteps();
          st = false;
        });
        st = true;
      }
    }, { passive: true });
    lightSteps();
  }

  document.querySelectorAll('.shot__media video').forEach((v) => {
    const card = v.closest('.shot');
    if (!card) return;
    const play = () => { v.play().catch(() => {}); };
    const stop = () => {
      v.pause();
      try { v.currentTime = 0; } catch (e) {}
    };
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focus', play);
    card.addEventListener('blur', stop);
  });

  const faqs = document.querySelectorAll('.faq__item');
  faqs.forEach((d) =>
    d.addEventListener('toggle', () => {
      if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
    })
  );

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
          const dir = k === 'ArrowRight' ? 1 : -1;
          pos = Math.max(0, Math.min(100, pos + dir * 4));
        }
        apply();
      }
    });

    apply();
  });
});
