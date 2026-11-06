import { useEffect, useRef, useState } from 'react';
import typesOfGlaucoma from '../../assets/images/typesofGlaucoma.jpg';
import glaucoma from '../../assets/images/glaucoma.jpg';
import tp from '../../assets/images/tp.jpg';

interface Article {
  title: string;
  description: string;
  image?: string;
  alt?: string;
}

const articles: Article[] = [
  {
    title: 'Your eye test, explained',
    description: 'What to expect when you visit us.',
    image: typesOfGlaucoma,
    alt: 'A clinician carrying out an eye test with a patient at a slit lamp',
  },
  {
    title: 'Finding frames that feel like you',
    description: 'A little inspiration for your next pair.',
  },
  {
    title: 'Getting started with contact lenses',
    description: 'An introduction to your lens options.',
    image: glaucoma,
    alt: 'A close-up of a human eye',
  },
  {
    title: 'Everyday care for your glasses',
    description: 'Simple habits for looking after your eyewear.',
  },
  {
    title: 'Choosing your next sunglasses',
    description: 'Explore styles and lens options for brighter days.',
  },
  {
    title: 'Getting ready for your visit',
    description: 'What to bring and questions you may want to ask.',
    image: tp,
    alt: 'A smiling clinician making notes on a clipboard at a desk',
  },
];

const MS_PER_CARD = 7000;

interface Engine {
  go: (dir: number) => void;
  setPlaying: (v: boolean) => void;
  isPlaying: () => boolean;
}

function Card({ a, i, clone }: { a: Article; i: number; clone?: boolean }) {
  const extra = clone ? ({ 'aria-hidden': true, inert: '' } as Record<string, unknown>) : {};
  return (
    <article className={`jr-card jr-c${(i % 3) + 1}`} {...extra}>
      <div className="jr-img">
        {a.image ? (
          <img src={a.image} alt={clone ? '' : a.alt} draggable={false} />
        ) : (
          <div className="ph">Image placeholder</div>
        )}
      </div>
      <div className="jr-body">
        <h3>{a.title}</h3>
        <p>{a.description}</p>
        <div className="jr-more">
          <a
            href={`#placeholder-article-0${i + 1}`}
            draggable={false}
            tabIndex={clone ? -1 : undefined}
          >
            <b>Read more</b>
            <span className="visually-hidden"> about {a.title.toLowerCase()}</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Journal() {
  const secRef = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine | null>(null);
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [playing, setPlayingState] = useState(!reduce);

  useEffect(() => {
    const sec = secRef.current!;
    const view = viewRef.current!;
    const track = trackRef.current!;
    const cards = Array.from(track.children).slice(0, articles.length) as HTMLElement[];
    const N = cards.length;

    let isPlaying = !reduce;
    let x = 0;
    let step = 0;
    let L = 0;
    let tween: { from: number; to: number; t0: number; d: number } | null = null;
    let drag: { id: number; sx: number; x0: number; moved: boolean } | null = null;
    let justDragged = false;
    let last: number | null = null;
    let raf = 0;

    const wrap = (v: number) => (L ? ((v % L) + L) % L : 0);
    const apply = () => {
      track.style.transform = `translate3d(${-x}px,0,0)`;
    };
    const measure = () => {
      const f = L ? x / L : 0;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      step = cards[0].getBoundingClientRect().width + gap;
      L = step * N;
      x = wrap(f * L);
      apply();
    };
    const setPlaying = (v: boolean) => {
      isPlaying = v;
      setPlayingState(v);
    };
    const pause = () => {
      if (isPlaying) setPlaying(false);
    };
    const frame = (t: number) => {
      if (last === null) last = t;
      const dt = Math.min(t - last, 100);
      last = t;
      if (isPlaying && !drag && !tween) x = wrap(x + (step / MS_PER_CARD) * dt);
      if (tween) {
        const p = Math.min((t - tween.t0) / tween.d, 1);
        const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        x = wrap(tween.from + (tween.to - tween.from) * e);
        if (p >= 1) tween = null;
      }
      apply();
      raf = requestAnimationFrame(frame);
    };
    const go = (dir: number) => {
      pause();
      const idx = dir > 0 ? Math.floor(x / step + 0.001) + 1 : Math.ceil(x / step - 0.001) - 1;
      const to = idx * step;
      if (reduce) {
        x = wrap(to);
        tween = null;
        apply();
        return;
      }
      let from = x;
      if (dir > 0 && to < from) from -= L;
      if (dir < 0 && to > from) from += L;
      tween = { from, to, t0: performance.now(), d: 450 };
    };
    engine.current = { go, setPlaying, isPlaying: () => isPlaying };

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement;
      try {
        if (t.matches(':focus-visible')) pause();
      } catch {
        /* :focus-visible unsupported */
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { id: e.pointerId, sx: e.clientX, x0: x, moved: false };
      tween = null;
    };
    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.sx;
      if (!drag.moved && Math.abs(dx) > 5) {
        drag.moved = true;
        pause();
        view.classList.add('dragging');
        try {
          view.setPointerCapture(e.pointerId);
        } catch {
          /* synthetic pointer */
        }
      }
      if (drag.moved) x = wrap(drag.x0 - dx);
    };
    const end = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) {
        justDragged = true;
        setTimeout(() => {
          justDragged = false;
        }, 0);
      }
      view.classList.remove('dragging');
      drag = null;
    };
    const onClick = (e: MouseEvent) => {
      if (justDragged) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      if (!(e.target as HTMLElement).closest('a')) pause();
    };
    const onDragStart = (e: Event) => e.preventDefault();

    sec.addEventListener('focusin', onFocusIn);
    view.addEventListener('pointerdown', onDown);
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', end);
    view.addEventListener('pointercancel', end);
    view.addEventListener('click', onClick, true);
    view.addEventListener('dragstart', onDragStart);
    window.addEventListener('resize', measure);

    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      sec.removeEventListener('focusin', onFocusIn);
      view.removeEventListener('pointerdown', onDown);
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', end);
      view.removeEventListener('pointercancel', end);
      view.removeEventListener('click', onClick, true);
      view.removeEventListener('dragstart', onDragStart);
      window.removeEventListener('resize', measure);
      engine.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="journal" id="eyecare-journal" aria-labelledby="jr-h" ref={secRef}>
      <div className="jr-head">
        <div>
          <h2 id="jr-h">A clearer understanding.</h2>
          <p>Eyecare advice and inspiration from Amera.</p>
        </div>
        <div className="jr-ctl">
          <button
            type="button"
            className="jr-btn jr-prev"
            aria-label="Previous articles"
            onClick={() => engine.current?.go(-1)}
          >
            <span className="arr2" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            className="jr-btn jr-next"
            aria-label="Next articles"
            onClick={() => engine.current?.go(1)}
          >
            <span className="arr2" aria-hidden="true"></span>
          </button>
          <button
            type="button"
            className="jr-pp"
            aria-label={playing ? 'Pause automatic scrolling' : 'Play automatic scrolling'}
            onClick={() => {
              const e = engine.current;
              if (e) e.setPlaying(!e.isPlaying());
            }}
          >
            {playing ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
      <div
        className="jr-view"
        ref={viewRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Eyecare journal articles"
      >
        <div className="jr-track" ref={trackRef}>
          {articles.map((a, i) => (
            <Card key={a.title} a={a} i={i} />
          ))}
          {articles.map((a, i) => (
            <Card key={`clone-${a.title}`} a={a} i={i} clone />
          ))}
        </div>
      </div>
    </section>
  );
}
