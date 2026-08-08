/**
 * WorkGallery — Next Level portfolio gallery.
 *
 * Adapted from 21st.dev "Circular Gallery 2" by ravikatiyar162 (MIT-style registry
 * component). Substantially reworked for this site:
 *  - shadcn/Tailwind removed (project uses plain CSS) — styles in WorkGallery.css
 *  - NO page-scroll hijack: original bound wheel on window; here wheel only acts
 *    on horizontal intent (deltaX / shift+wheel) inside the container
 *  - keyboard controls (arrows / Home / End), RTL-aware
 *  - prefers-reduced-motion, WebGL-unavailable and small-viewport cases render an
 *    accessible scroll-snap carousel instead of the WebGL canvas
 *  - RAF pauses while the gallery is off-screen (IntersectionObserver)
 *  - real project data + accessible caption list; no picsum defaults
 */
import { useEffect, useRef, useState } from 'react';
import {
  Camera, Mesh, Plane, Program, Renderer, Texture, Transform,
  type OGLRenderingContext,
} from 'ogl';
import './WorkGallery.css';

export interface WorkItem {
  image: string;
  text: string;          // short label rendered under the plane
  category: string;      // client/collection shown in the plane caption
  href: string;
  client: string;
  title: string;
  categoryLabel: string; // localized category for the meta bar
  fullVideo: string;     // explicit-action playback via the shared reel modal
  poster: string;
}

interface Props {
  items: WorkItem[];
  bend?: number;
  textColor?: string;
  font?: string;
}

/* ---------------- OGL helpers (from source, trimmed) ---------------- */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function createTextTexture(gl: OGLRenderingContext, text: string, font: string, color: string) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = font;
  const w = Math.ceil(ctx.measureText(text).width);
  const h = Math.ceil(parseInt(font, 10) * 1.6);
  canvas.width = w + 24;
  canvas.height = h + 24;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  // canvas fillText applies Arabic shaping natively
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  mesh!: Mesh;
  constructor(
    private gl: OGLRenderingContext,
    private plane: Mesh,
    text: string,
    textColor: string,
    font: string,
  ) {
    const { texture, width, height } = createTextTexture(gl, text, font, textColor);
    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `attribute vec3 position;attribute vec2 uv;uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;varying vec2 vUv;
        void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
      fragment: `precision highp float;uniform sampler2D tMap;varying vec2 vUv;
        void main(){vec4 c=texture2D(tMap,vUv);if(c.a<0.1)discard;gl_FragColor=c;}`,
      uniforms: { tMap: { value: texture } },
      transparent: true,
    });
    this.mesh = new Mesh(gl, { geometry, program });
    const aspect = width / height;
    const textHeight = plane.scale.y * 0.14;
    this.mesh.scale.set(textHeight * aspect, textHeight, 1);
    this.mesh.position.y = -plane.scale.y * 0.5 - textHeight * 0.7;
    this.mesh.setParent(plane);
  }
}

class Media {
  program!: Program;
  plane!: Mesh;
  extra = 0; widthTotal = 0; width = 0; x = 0; scale = 1;
  isBefore = false; isAfter = false;

  constructor(
    private opts: {
      geometry: Plane; gl: OGLRenderingContext; image: string; index: number;
      length: number; scene: Transform; screen: { width: number; height: number };
      text: string; viewport: { width: number; height: number }; bend: number;
      textColor: string; borderRadius: number; font: string;
    },
  ) {
    this.createShader();
    this.createMesh();
    new Title(opts.gl, this.plane, opts.text, opts.textColor, opts.font);
    this.onResize();
  }

  createShader() {
    const { gl, image, borderRadius } = this.opts;
    const texture = new Texture(gl, { generateMipmaps: true });
    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `precision highp float;attribute vec3 position;attribute vec2 uv;
        uniform mat4 modelViewMatrix;uniform mat4 projectionMatrix;uniform float uTime;uniform float uSpeed;varying vec2 vUv;
        void main(){vUv=uv;vec3 p=position;
          p.z=(sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);
          gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
      fragment: `precision highp float;uniform vec2 uImageSizes;uniform vec2 uPlaneSizes;uniform sampler2D tMap;uniform float uBorderRadius;varying vec2 vUv;
        float box(vec2 p,vec2 b,float r){vec2 d=abs(p)-b;return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;}
        void main(){
          vec2 ratio=vec2(min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0));
          vec2 uv=vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5,vUv.y*ratio.y+(1.0-ratio.y)*0.5);
          vec4 color=texture2D(tMap,uv);
          float d=box(vUv-0.5,vec2(0.5-uBorderRadius),uBorderRadius);
          float a=1.0-smoothstep(-0.002,0.002,d);
          gl_FragColor=vec4(color.rgb,a);}`,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: borderRadius },
      },
      transparent: true,
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.opts.gl, { geometry: this.opts.geometry, program: this.program });
    this.plane.setParent(this.opts.scene);
  }

  update(scroll: { current: number; last: number }, direction: 'left' | 'right') {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.opts.viewport.width / 2;
    const { bend } = this.opts;

    if (bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B = Math.abs(bend);
      const R = (H * H + B * B) / (2 * B);
      const ex = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - ex * ex);
      this.plane.position.y = bend > 0 ? -arc : arc;
      this.plane.rotation.z = (bend > 0 ? -1 : 1) * Math.sign(x) * Math.asin(ex / R);
    }

    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = scroll.current - scroll.last;

    const half = this.plane.scale.x / 2;
    const vHalf = this.opts.viewport.width / 2;
    this.isBefore = this.plane.position.x + half < -vHalf;
    this.isAfter = this.plane.position.x - half > vHalf;
    if (direction === 'right' && this.isBefore) { this.extra -= this.widthTotal; this.isBefore = this.isAfter = false; }
    if (direction === 'left' && this.isAfter) { this.extra += this.widthTotal; this.isBefore = this.isAfter = false; }
  }

  onResize(sizes?: { screen?: { width: number; height: number }; viewport?: { width: number; height: number } }) {
    if (sizes?.screen) this.opts.screen = sizes.screen;
    if (sizes?.viewport) this.opts.viewport = sizes.viewport;
    this.scale = this.opts.screen.height / 1500;
    this.plane.scale.y = (this.opts.viewport.height * (900 * this.scale)) / this.opts.screen.height;
    this.plane.scale.x = (this.opts.viewport.width * (700 * this.scale)) / this.opts.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.width = this.plane.scale.x + 2;
    this.widthTotal = this.width * this.opts.length;
    this.x = this.width * this.opts.index;
  }
}

class GalleryApp {
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  medias: Media[] = [];
  scroll = { ease: 0.05, current: 0, target: 0, last: 0, position: 0 };
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf = 0;
  running = true;
  isDown = false;
  start = 0;
  private cleanupFns: (() => void)[] = [];

  itemCount = 0;
  onIndex: ((i: number) => void) | null = null;
  private lastIndex = -1;

  constructor(
    private container: HTMLElement,
    items: WorkItem[],
    private conf: { bend: number; textColor: string; font: string },
  ) {
    this.itemCount = items.length;
    this.renderer = new Renderer({ alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    container.appendChild(this.gl.canvas as HTMLCanvasElement);

    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
    this.scene = new Transform();
    this.onResize();

    const geometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
    const doubled = [...items, ...items]; // seamless loop
    this.medias = doubled.map((d, index) => new Media({
      geometry, gl: this.gl, image: d.image, index, length: doubled.length,
      scene: this.scene, screen: this.screen, text: d.text, viewport: this.viewport,
      bend: this.conf.bend, textColor: this.conf.textColor, borderRadius: 0.04, font: this.conf.font,
    }));

    this.bind();
    this.update();
  }

  itemWidth() { return this.medias[0]?.width ?? 1; }

  /** move n items (+1 next / -1 prev), snapping */
  step(n: number) {
    const w = this.itemWidth();
    const idx = Math.round(this.scroll.target / w) + n;
    this.scroll.target = w * idx;
  }

  snap() {
    const w = this.itemWidth();
    this.scroll.target = w * Math.round(this.scroll.target / w);
  }

  private bind() {
    const c = this.container;

    const down = (e: MouseEvent | TouchEvent) => {
      this.isDown = true;
      this.scroll.position = this.scroll.current;
      this.start = 'touches' in e ? e.touches[0].clientX : e.clientX;
    };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!this.isDown) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      this.scroll.target = this.scroll.position + (this.start - x) * 0.05;
    };
    const up = () => {
      if (!this.isDown) return;
      this.isDown = false;
      this.snap();
    };

    /* wheel: ONLY horizontal intent — vertical wheel must keep scrolling the page */
    const wheel = (e: WheelEvent) => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!horizontal) return;
      e.preventDefault();
      const delta = e.shiftKey ? e.deltaY : e.deltaX;
      this.scroll.target += delta * 0.02;
      clearTimeout((this as any)._wt);
      (this as any)._wt = setTimeout(() => this.snap(), 180);
    };

    const resize = () => this.onResize();

    c.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    c.addEventListener('touchstart', down, { passive: true });
    window.addEventListener('touchmove', move, { passive: true });
    window.addEventListener('touchend', up);
    c.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('resize', resize);

    this.cleanupFns.push(() => {
      c.removeEventListener('mousedown', down);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      c.removeEventListener('touchstart', down);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
      c.removeEventListener('wheel', wheel);
      window.removeEventListener('resize', resize);
    });
  }

  onResize() {
    this.screen = { width: this.container.clientWidth, height: this.container.clientHeight };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    this.viewport = { width: height * this.camera.aspect, height };
    this.medias.forEach((m) => m.onResize({ screen: this.screen, viewport: this.viewport }));
  }

  setRunning(on: boolean) {
    if (on === this.running) return;
    this.running = on;
    if (on) this.update();
    else cancelAnimationFrame(this.raf);
  }

  update = () => {
    if (!this.running) return;
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const dir = this.scroll.current > this.scroll.last ? 'right' : 'left';
    this.medias.forEach((m) => m.update(this.scroll, dir));
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;

    // report the centered item (normalized to the original, un-doubled list)
    if (this.onIndex && this.itemCount > 0) {
      const raw = Math.round(this.scroll.current / this.itemWidth());
      const idx = ((raw % this.itemCount) + this.itemCount) % this.itemCount;
      if (idx !== this.lastIndex) { this.lastIndex = idx; this.onIndex(idx); }
    }

    this.raf = requestAnimationFrame(this.update);
  };

  destroy() {
    cancelAnimationFrame(this.raf);
    this.cleanupFns.forEach((f) => f());
    const canvas = this.gl.canvas as HTMLCanvasElement;
    canvas.parentNode?.removeChild(canvas);
  }
}

/* ---------------- fallback carousel (mobile / reduced-motion / no WebGL) ----------------
   Cards are play buttons: the delegated [data-reel] handler in site.js opens the
   shared modal, so full playback happens only on explicit action. */
function FallbackCarousel({ items }: { items: WorkItem[] }) {
  return (
    <div className="wg-fallback" role="list">
      {items.map((it) => (
        <button
          key={it.href + it.text}
          type="button"
          className="wg-card"
          role="listitem"
          data-reel={it.fullVideo}
          data-reel-poster={it.poster}
          aria-label={`شغّل: ${it.title} — ${it.client}`}
        >
          <span className="wg-card__frame">
            <img src={it.image} alt="" loading="lazy" width={720} height={900} />
            <span className="wg-card__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </span>
          <span className="wg-card__meta">
            <span className="wg-card__cat latin">{it.client} · {it.categoryLabel}</span>
            <span className="wg-card__title latin" dir="ltr">{it.title}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ---------------- React component ---------------- */
export default function WorkGallery({ items, bend = 2.4, textColor = '#F4F1EE' }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<GalleryApp | null>(null);
  // SSR + no-JS default is the accessible carousel; WebGL is a progressive upgrade
  const [mode, setMode] = useState<'webgl' | 'fallback'>('fallback');
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 760;
    let webglOk = false;
    try {
      const test = document.createElement('canvas');
      webglOk = !!(test.getContext('webgl2') || test.getContext('webgl'));
    } catch { webglOk = false; }
    if (!reduced && !small && webglOk) setMode('webgl');
  }, []);

  useEffect(() => {
    if (mode !== 'webgl' || !hostRef.current) return;
    const host = hostRef.current;
    const cs = getComputedStyle(host);
    const font = `600 28px ${cs.fontFamily}`;
    const app = new GalleryApp(host, items, { bend, textColor, font });
    app.onIndex = setActive;
    appRef.current = app;

    // pause rendering while off-screen
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => app.setRunning(e.isIntersecting)),
      { threshold: 0.05 },
    );
    io.observe(host);

    return () => { io.disconnect(); app.destroy(); appRef.current = null; };
  }, [mode, items, bend, textColor]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!appRef.current) return;
    // RTL page: ArrowRight = previous, ArrowLeft = next
    if (e.key === 'ArrowLeft') { e.preventDefault(); appRef.current.step(1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); appRef.current.step(-1); }
    else if (e.key === 'Home') { e.preventDefault(); appRef.current.scroll.target = 0; }
  };

  if (mode === 'fallback') return <FallbackCarousel items={items} />;

  const current = items[active] ?? items[0];

  return (
    <div className="wg">
      {/* canvas stage — decorative; the meta bar below carries the content */}
      <div
        ref={hostRef}
        className="wg-stage"
        aria-hidden="true"
        style={{ visibility: mode === 'webgl' ? 'visible' : 'hidden' }}
      />

      {/* active item: client · title · category + explicit play action */}
      <div className="wg-meta" aria-live="polite">
        <div className="wg-meta__text">
          <span className="wg-meta__client latin">{current.client} · {current.categoryLabel}</span>
          <span className="wg-meta__title latin" dir="ltr">{current.title}</span>
        </div>
        <button
          type="button"
          className="wg-play"
          data-reel={current.fullVideo}
          data-reel-poster={current.poster}
          aria-label={`شغّل: ${current.title}`}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          شغّل الفيديو
        </button>
      </div>

      <div
        className="wg-controls"
        role="group"
        aria-label="تنقل في معرض الأعمال"
        onKeyDown={onKey}
      >
        <button type="button" className="wg-btn" aria-label="التالي" onClick={() => appRef.current?.step(1)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <span className="wg-hint latin">Drag · ← →</span>
        <button type="button" className="wg-btn" aria-label="السابق" onClick={() => appRef.current?.step(-1)}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
