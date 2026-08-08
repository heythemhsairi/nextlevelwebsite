/* Next Level — site controller (vanilla, no framework).
   Drawer a11y contract: aria-expanded on trigger, aria-hidden + inert on the
   drawer, focus trap, Escape, focus return, counted body scroll-lock. */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* counted scroll-lock — drawer + modals can't unlock each other */
let scrollLocks = 0;
const lockScroll = () => { if (++scrollLocks === 1) document.body.style.overflow = 'hidden'; };
const unlockScroll = () => { if (scrollLocks > 0 && --scrollLocks === 0) document.body.style.overflow = ''; };

document.addEventListener('DOMContentLoaded', () => {
  /* ---- nav scrolled state ---- */
  const nav = document.getElementById('nav');
  let ticking = false;
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
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
      if (e.key === 'Escape') { e.preventDefault(); setDrawer(false); return; }
      if (e.key === 'Tab') {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (!drawer.contains(document.activeElement)) {
          e.preventDefault(); (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    });

    window.addEventListener('resize', () => {
      if (drawer.classList.contains('open') && window.innerWidth > 900) setDrawer(false);
    });
  }

  /* ---- reveals ---- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal, .reveal-stagger, .mask').forEach((el) => io.observe(el));

  /* ---- responsive hero video ----
     Pick ONE source per breakpoint. Reduced-motion or Save-Data users keep
     the static poster (no video bytes at all). */
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const saveData = navigator.connection && navigator.connection.saveData === true;
    const mobile = window.matchMedia('(max-width: 760px)');

    const applyHero = () => {
      const m = mobile.matches;
      heroVideo.poster = m ? heroVideo.dataset.posterMobile : heroVideo.dataset.posterDesktop;
      if (reduceMotion || saveData) return; // poster-only experience
      const want = m ? heroVideo.dataset.srcMobile : heroVideo.dataset.srcDesktop;
      if (heroVideo.getAttribute('src') !== want) {
        heroVideo.src = want;
        heroVideo.load();
      }
      heroVideo.play().catch(() => {});
    };
    applyHero();
    // switch source only when the breakpoint actually flips
    mobile.addEventListener('change', applyHero);
  }

  /* ---- showreel modal ----
     Delegated [data-reel] so triggers added after load (React island) work. */
  const reel = document.getElementById('reelModal');
  if (reel) {
    const player = reel.querySelector('video');
    const closeBtn = reel.querySelector('.reel__close');
    let lastFocus = null;

    reel.addEventListener('close', () => {
      unlockScroll();
      if (player) { player.pause(); player.removeAttribute('src'); player.load(); }
      // restore the background hero film after the modal experience
      const hv = document.getElementById('heroVideo');
      if (hv && hv.getAttribute('src') && !reduceMotion) hv.play().catch(() => {});
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    });
    reel.addEventListener('click', (e) => {
      if (e.target === reel) reel.close();
    });
    closeBtn?.addEventListener('click', () => reel.close());

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-reel]');
      if (!btn) return;
      lastFocus = btn;
      // pause the background hero film while a modal video plays
      document.getElementById('heroVideo')?.pause();
      if (player) {
        if (btn.dataset.reelPoster) player.setAttribute('poster', btn.dataset.reelPoster);
        player.src = btn.dataset.reel;
        player.load();
      }
      lockScroll();
      reel.showModal();
      if (player && !reduceMotion) player.play().catch(() => {});
    });
  }

  /* ---- work cards: muted preview on intentional hover/focus (pointer devices,
     no reduced-motion). preload=none keeps previews off the wire until then. */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-hover-preview]').forEach((card) => {
      const v = card.querySelector('video');
      if (!v) return;
      const play = () => { v.play().catch(() => {}); card.classList.add('previewing'); };
      const stop = () => {
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
        card.classList.remove('previewing');
      };
      card.addEventListener('mouseenter', play);
      card.addEventListener('mouseleave', stop);
      card.addEventListener('focusin', play);
      card.addEventListener('focusout', stop);
    });
  }

  /* ---- portal calendar demo: post detail panel (native <dialog>) ---- */
  const postDialog = document.getElementById('postDialog');
  if (postDialog) {
    const fields = {
      title: postDialog.querySelector('[data-f="title"]'),
      platform: postDialog.querySelector('[data-f="platform"]'),
      format: postDialog.querySelector('[data-f="format"]'),
      status: postDialog.querySelector('[data-f="status"]'),
      deadline: postDialog.querySelector('[data-f="deadline"]'),
      stage: postDialog.querySelector('[data-f="stage"]'),
    };
    let lastFocus = null;

    postDialog.addEventListener('close', () => { unlockScroll(); if (lastFocus) lastFocus.focus(); });
    postDialog.addEventListener('click', (e) => { if (e.target === postDialog) postDialog.close(); });
    postDialog.querySelector('.pd__close')?.addEventListener('click', () => postDialog.close());

    document.querySelectorAll('[data-post]').forEach((btn) => {
      btn.addEventListener('click', () => {
        lastFocus = btn;
        const d = btn.dataset;
        if (fields.title) fields.title.textContent = d.postTitle || '';
        if (fields.platform) fields.platform.textContent = d.postPlatform || '';
        if (fields.format) fields.format.textContent = d.postFormat || '';
        if (fields.status) {
          fields.status.textContent = d.postStatusLabel || '';
          fields.status.dataset.status = d.postStatus || '';
        }
        if (fields.deadline) fields.deadline.textContent = d.postDeadline || '';
        if (fields.stage) fields.stage.textContent = d.postStage || '';
        lockScroll();
        postDialog.showModal();
      });
    });
  }

  /* ---- work page filters ---- */
  const filterBar = document.getElementById('workFilters');
  if (filterBar) {
    const cards = Array.from(document.querySelectorAll('[data-project-cat]'));
    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const key = btn.dataset.filter;
      filterBar.querySelectorAll('[data-filter]').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      cards.forEach((c) => {
        const show = key === 'all' || c.dataset.projectCat === key;
        c.hidden = !show;
      });
    });
  }
});
