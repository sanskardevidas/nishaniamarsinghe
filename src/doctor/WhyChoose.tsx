import { useEffect, useRef, useState } from 'react';
import { Target, Microscope, Heart, Users, ShieldCheck, Clock, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Subspecialty Expertise',
    description: 'Focused specialist training in glaucoma with extensive experience managing complex and challenging cases.',
  },
  {
    icon: Microscope,
    title: 'Advanced Techniques',
    description: 'Access to the latest surgical technologies including MIGS, selective laser trabeculoplasty, and modern cataract platforms.',
  },
  {
    icon: Heart,
    title: 'Personalised Care',
    description: 'Every treatment plan is tailored to the individual patient\'s needs, lifestyle, and long-term vision goals.',
  },
  {
    icon: Users,
    title: 'Trusted Referrals',
    description: 'A preferred specialist for GP and optometrist referrals across Hampshire and the South Coast.',
  },
  {
    icon: ShieldCheck,
    title: 'NHS & Private',
    description: 'Seamless care across NHS and private pathways, ensuring the right treatment in the right setting for every patient.',
  },
  {
    icon: Clock,
    title: 'Prompt Access',
    description: 'Short waiting times for private consultations and urgent review pathways for time-sensitive conditions.',
  },
];

const N = reasons.length;
const HOLD_MS = 2000; // cards stay still this long between moves
const SLIDE_MS = 500; // one-card slide

interface Engine {
  go: (dir: number) => void;
  goTo: (idx: number) => void;
  setPlaying: (v: boolean) => void;
}

export default function WhyChoose() {
  const ref = useRef<HTMLElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const engine = useRef<Engine | null>(null);
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [playing, setPlayingState] = useState(!reduce);
  const [centre, setCentre] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.why-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const view = viewRef.current!;
    const track = trackRef.current!;
    const items = Array.from(track.children) as HTMLElement[]; // 3 identical sets; the middle set is real

    let isPlaying = !reduce;
    let p = N; // position in card units; item j is centred when p === j
    let step = 0;
    let cw = 0;
    let vw = 0;
    let hi = -1;
    let tween: { from: number; to: number; t0: number; d: number } | null = null;
    let drag: { id: number; sx: number; p0: number; moved: boolean } | null = null;
    let justDragged = false;
    let wheelTimer = 0;
    let idle = 0;
    let last: number | null = null;
    let raf = 0;

    // Keep p inside the middle set; the sets are identical so the jump is invisible.
    const wrap = (v: number) => {
      while (v >= 2 * N) v -= N;
      while (v < N) v += N;
      return v;
    };
    const centreIdx = () => (((Math.round(p) % N) + N) % N);
    const apply = () => {
      track.style.transform = `translate3d(${vw / 2 - cw / 2 - p * step}px,0,0)`;
      const c = centreIdx();
      if (c !== hi) {
        hi = c;
        items.forEach((el, j) => el.classList.toggle('is-centre', j % N === c));
        setCentre(c);
      }
    };
    const measure = () => {
      vw = view.clientWidth;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      cw = items[0].getBoundingClientRect().width;
      step = cw + gap;
      apply();
    };
    const setPlaying = (v: boolean) => {
      isPlaying = v;
      setPlayingState(v);
    };
    const pause = () => {
      if (isPlaying) setPlaying(false);
    };
    const animateTo = (to: number, d: number) => {
      if (reduce) {
        tween = null;
        p = wrap(to);
        apply();
        return;
      }
      tween = { from: p, to, t0: performance.now(), d };
    };
    const frame = (t: number) => {
      if (last === null) last = t;
      const dt = Math.min(t - last, 100);
      last = t;
      if (isPlaying && !drag && !tween) {
        idle += dt;
        if (idle >= HOLD_MS) {
          idle = 0;
          animateTo(Math.round(p) + 1, SLIDE_MS);
        }
      } else {
        idle = 0;
      }
      if (tween) {
        const k = Math.min((t - tween.t0) / tween.d, 1);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        p = wrap(tween.from + (tween.to - tween.from) * e);
        if (k >= 1) tween = null;
      }
      apply();
      raf = requestAnimationFrame(frame);
    };
    const go = (dir: number) => {
      pause();
      const to = dir > 0 ? Math.floor(p + 0.001) + 1 : Math.ceil(p - 0.001) - 1;
      animateTo(to, SLIDE_MS);
    };
    const goTo = (idx: number) => {
      pause();
      const base = Math.round(p);
      let delta = (((idx - base) % N) + N) % N;
      if (delta > N / 2) delta -= N;
      animateTo(base + delta, SLIDE_MS);
    };
    engine.current = { go, goTo, setPlaying };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { id: e.pointerId, sx: e.clientX, p0: p, moved: false };
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
      if (drag.moved) p = wrap(drag.p0 - dx / step);
    };
    const end = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      if (drag.moved) {
        justDragged = true;
        setTimeout(() => {
          justDragged = false;
        }, 0);
        animateTo(Math.round(p), 300);
      }
      view.classList.remove('dragging');
      drag = null;
    };
    const onClick = () => {
      if (!justDragged) pause();
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      pause();
      tween = null;
      p = wrap(p + e.deltaX / step);
      window.clearTimeout(wheelTimer);
      wheelTimer = window.setTimeout(() => animateTo(Math.round(p), 300), 140);
    };
    const onFocusIn = (e: FocusEvent) => {
      try {
        if ((e.target as HTMLElement).matches(':focus-visible')) pause();
      } catch {
        /* :focus-visible unsupported */
      }
    };

    const root = view.parentElement as HTMLElement;
    view.addEventListener('pointerdown', onDown);
    view.addEventListener('pointermove', onMove);
    view.addEventListener('pointerup', end);
    view.addEventListener('pointercancel', end);
    view.addEventListener('click', onClick);
    view.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('focusin', onFocusIn);
    const ro = new ResizeObserver(measure);
    ro.observe(view);
    measure();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(wheelTimer);
      ro.disconnect();
      view.removeEventListener('pointerdown', onDown);
      view.removeEventListener('pointermove', onMove);
      view.removeEventListener('pointerup', end);
      view.removeEventListener('pointercancel', end);
      view.removeEventListener('click', onClick);
      view.removeEventListener('wheel', onWheel);
      root.removeEventListener('focusin', onFocusIn);
    };
  }, [reduce]);

  return (
    <section ref={ref} className="py-24 bg-[#f3f2ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="why-reveal reveal inline-flex items-center gap-2 bg-[#a5b387] text-brand-dark text-xs font-semibold px-4 py-2 rounded-full border border-[#a5b387] mb-4">
            <ShieldCheck size={12} className="text-brand-dark" />
            Why Choose Dr. Amerasinghe
          </div>
          <h2 className="why-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            The Standard of Care You Deserve
          </h2>
          <p className="why-reveal reveal stagger-2 text-[#3d445a] text-lg max-w-2xl mx-auto leading-relaxed">
            Combining world-class training, leading technology, and a genuinely compassionate
            approach to patient care.
          </p>
        </div>

        <div role="group" aria-roledescription="carousel" aria-label="Why choose Dr. Amerasinghe">
          <div ref={viewRef} className="wc-view">
            <div ref={trackRef} className="wc-track">
              {[0, 1, 2].flatMap((set) =>
                reasons.map((reason, i) => {
                  const clone = set !== 1;
                  const extra = clone ? ({ 'aria-hidden': true, inert: '' } as Record<string, unknown>) : {};
                  return (
                    <article key={`${set}-${i}`} className="wc-card" {...extra}>
                      <div className="wc-tile w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                        <reason.icon size={22} />
                      </div>
                      <h3 className="font-bold text-lg mb-2.5">{reason.title}</h3>
                      <p className="text-sm leading-relaxed">{reason.description}</p>
                    </article>
                  );
                })
              )}
            </div>
          </div>

          <div className="wc-controls">
            <button type="button" className="wc-btn wc-nav" aria-label="Previous card" onClick={() => engine.current?.go(-1)}>
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="wc-btn wc-pp"
              aria-label={playing ? 'Pause automatic scrolling' : 'Play automatic scrolling'}
              onClick={() => engine.current?.setPlaying(!playing)}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              <span>{playing ? 'Pause' : 'Play'}</span>
            </button>
            <button type="button" className="wc-btn wc-nav" aria-label="Next card" onClick={() => engine.current?.go(1)}>
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="wc-dots">
            {reasons.map((r, i) => (
              <button
                key={r.title}
                type="button"
                className="wc-dot"
                aria-label={`Show ${r.title}, card ${i + 1} of ${N}`}
                aria-current={centre === i ? 'true' : undefined}
                onClick={() => engine.current?.goTo(i)}
              />
            ))}
          </div>

          <p className="wc-hint">Drag to explore · Click a card to pause</p>
        </div>
      </div>
    </section>
  );
}
