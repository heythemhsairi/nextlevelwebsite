/**
 * HeroScroll — cinematic sticky hero for Next Level.
 *
 * Structure adapted from 21st.dev "Smooth Scroll Hero" by ishamsu (Shamsudheen):
 * outer tall wrapper + sticky 100svh stage + framer-motion useScroll/useTransform.
 * Deliberate departures from the source component:
 *  - real hero VIDEOS (responsive desktop/mobile pick) instead of unsplash images
 *  - the brief's scale/translate camera move instead of the demo clip-path polygon
 *  - scrollYProgress of the section (not absolute px), Tailwind removed
 *
 * "Electric Gaze" (21st.dev, serafimcloud) is a demo face/cyan ASCII loop BAKED
 * INTO A VIDEO FILE — its pixels cannot be re-skinned to our poster. Per the
 * task's fallback clause, the essential dither + electric-scan reveal is
 * recreated here (<ElectricGaze/>) with brand colors and strict perf caps.
 *
 * Accessibility: wordmark + canvas are decorative (aria-hidden); the page H1
 * stays in the Intro Video section. Native scrolling only — no hijacking.
 * prefers-reduced-motion → plain 100svh hero, no gaze, no transforms.
 */
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './HeroScroll.css';

interface Props {
  videoDesktop: string;
  videoMobile: string;
  posterDesktop: string;
  posterMobile: string;
  metaLabel: string;
  metaLocation: string;
  copy: string;
  copyLinkLabel: string;
  copyLinkHref: string;
}

/* ---------------- Electric Gaze (recreated) ---------------- */
function ElectricGaze({ poster }: { poster: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    let finished = false;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25); // perf cap
    const W = (canvas.width = Math.round(canvas.offsetWidth * DPR));
    const H = (canvas.height = Math.round(canvas.offsetHeight * DPR));
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx || !W || !H) { setDone(true); return; }

    const DURATION = 1400;   // scan + shimmer (brief: 900–1600ms)
    const FADE = 450;        // css opacity fade after
    const CELL = Math.max(6, Math.round(W / 160)); // capped grid resolution
    // 4×4 Bayer matrix for the dither threshold
    const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16);

    let lum: Float32Array | null = null;
    let cols = 0, rows = 0;
    const img = new Image();
    img.src = poster;

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      setDone(true); // css fades + pointer/none + display removal
    };

    img.onload = () => {
      // one-time downsample of the poster into a luminance grid (no per-frame buffers)
      cols = Math.ceil(W / CELL);
      rows = Math.ceil(H / CELL);
      const off = document.createElement('canvas');
      off.width = cols; off.height = rows;
      const octx = off.getContext('2d', { willReadFrequently: true })!;
      // cover-fit the poster into the grid
      const scale = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
      const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
      octx.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const data = octx.getImageData(0, 0, cols, rows).data;
      lum = new Float32Array(cols * rows);
      for (let i = 0; i < cols * rows; i++) {
        lum[i] = (0.2126 * data[i * 4] + 0.7152 * data[i * 4 + 1] + 0.0722 * data[i * 4 + 2]) / 255;
      }
      start = performance.now();
      raf = requestAnimationFrame(tick);
    };
    img.onerror = finish;

    let start = 0;
    const tick = (now: number) => {
      if (finished || !lum) return;
      const t = Math.min(1, (now - start) / DURATION);
      const scanY = t * (rows + 6) - 3; // scan sweeps top→bottom in grid rows

      ctx.fillStyle = '#0A0808';
      ctx.fillRect(0, 0, W, H);

      for (let ry = 0; ry < rows; ry++) {
        const dScan = Math.abs(ry - scanY);
        const boost = dScan < 3 ? (3 - dScan) / 3 : 0; // rows near the scan glow
        for (let rx = 0; rx < cols; rx++) {
          const L = lum[ry * cols + rx];
          const threshold = BAYER[(ry % 4) * 4 + (rx % 4)];
          if (L + boost * 0.35 < threshold * 0.9) continue; // dithered dropout
          const size = Math.max(1, CELL * (0.28 + L * 0.5 + boost * 0.22));
          if (boost > 0.05) {
            // electric scan: brand red
            ctx.fillStyle = `rgba(230, 51, 41, ${0.35 + boost * 0.65})`;
          } else {
            // warm-white dither particles, brightness from poster luminance
            ctx.fillStyle = `rgba(244, 241, 238, ${0.12 + L * 0.55})`;
          }
          ctx.fillRect(rx * CELL + (CELL - size) / 2, ry * CELL + (CELL - size) / 2, size, size);
        }
      }
      // thin red scan line
      const yPx = (scanY / rows) * H;
      ctx.fillStyle = 'rgba(230, 51, 41, 0.9)';
      ctx.fillRect(0, yPx, W, Math.max(1.5, DPR));

      if (t >= 1) { finish(); return; }
      raf = requestAnimationFrame(tick);
    };

    const onHidden = () => { if (document.hidden) finish(); };
    document.addEventListener('visibilitychange', onHidden);
    const hardStop = setTimeout(finish, DURATION + FADE + 1500); // absolute backstop

    return () => {
      finished = true;
      cancelAnimationFrame(raf);
      clearTimeout(hardStop);
      document.removeEventListener('visibilitychange', onHidden);
    };
  }, [poster]);

  return (
    <canvas
      ref={canvasRef}
      className={`hs__gaze ${done ? 'hs__gaze--done' : ''}`}
      aria-hidden="true"
    />
  );
}

/* ---------------- hero ---------------- */
export default function HeroScroll(props: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [gazePoster, setGazePoster] = useState<string | null>(null);

  /* one controlled camera move, driven by the section's own progress */
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const mediaScale = useTransform(scrollYProgress, [0, 0.7], [1.08, 1]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.35, 0.8, 1], [1, 0.85, 0.9, 1]);
  const wordmarkY = useTransform(scrollYProgress, [0, 0.45], [56, 0]);
  const wordmarkOpacity = useTransform(scrollYProgress, [0, 0.25], [0.75, 1]);
  const copyY = useTransform(scrollYProgress, [0.15, 0.55], [32, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0.15, 0.5], [0.25, 1]);

  useEffect(() => {
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(rm.matches);

    /* responsive source pick (moved here from site.js — single owner now):
       phones never download the desktop file; reduced-motion / Save-Data
       users keep the poster only */
    const v = videoRef.current;
    if (!v) return;
    const saveData = (navigator as any).connection?.saveData === true;
    const mq = window.matchMedia('(max-width: 760px)');
    const apply = () => {
      const m = mq.matches;
      v.poster = m ? props.posterMobile : props.posterDesktop;
      if (!rm.matches && !saveData) setGazePoster(m ? props.posterMobile : props.posterDesktop);
      if (rm.matches || saveData) return;
      const want = m ? props.videoMobile : props.videoDesktop;
      if (v.getAttribute('src') !== want) { v.src = want; v.load(); }
      v.play().catch(() => {});
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const motionStyle = (style: Record<string, unknown>) => (reduced ? undefined : style);

  return (
    <section className="hs" ref={wrapRef as React.RefObject<HTMLElement>}>
      <div className="hs__sticky">
        <motion.div className="hs__media" style={motionStyle({ scale: mediaScale, y: mediaY })} aria-hidden="true">
          <video
            id="heroVideo"
            ref={videoRef}
            poster={props.posterDesktop}
            muted
            loop
            playsInline
            preload="none"
          />
        </motion.div>

        {/* brief digital-production reveal — decorative, self-removing */}
        {!reduced && gazePoster && <ElectricGaze poster={gazePoster} />}

        <motion.div className="hs__scrim" style={motionStyle({ opacity: overlayOpacity })} aria-hidden="true" />

        <div className="hs__meta">
          <span className="hs__meta-item"><b className="hs__dot">●</b> REC — {props.metaLabel}</span>
          <span className="hs__meta-item">{props.metaLocation}</span>
        </div>

        {/* asymmetric editorial row: wordmark lower-left, summary lower-right */}
        <div className="hs__bottom">
          <motion.p
            className="hs__wordmark"
            aria-hidden="true"
            dir="ltr"
            style={motionStyle({ y: wordmarkY, opacity: wordmarkOpacity })}
          >
            <span className="hs__wm-next">NEXT</span>
            <span className="hs__wm-level">LEVEL</span>
          </motion.p>

          <motion.div className="hs__summary" style={motionStyle({ y: copyY, opacity: copyOpacity })}>
            <i className="hs__rule" aria-hidden="true"></i>
            <p>{props.copy}</p>
            <a href={props.copyLinkHref} className="hs__link">{props.copyLinkLabel}</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
