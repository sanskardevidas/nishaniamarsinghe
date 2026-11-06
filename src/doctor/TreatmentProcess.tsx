import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Check, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';

const TEAL = '#3a8d8c';
const SAGE = '#a5b387';
const TERRA = '#e07856';

const steps = [
  {
    title: 'Referral & booking',
    description: 'Receive a GP or optometrist referral, or self-refer privately. Our team will contact you promptly to arrange a convenient appointment.',
  },
  {
    title: 'Comprehensive assessment',
    description: 'A thorough eye examination including slit-lamp assessment, visual fields testing, OCT imaging, and intraocular pressure measurement.',
  },
  {
    title: 'Personalised treatment plan',
    description: 'Dr. Amerasinghe discusses all findings and options with you, creating a treatment plan tailored to your individual needs and circumstances.',
  },
  {
    title: 'Treatment & follow-up',
    description: 'Expert treatment delivery with structured follow-up care to monitor outcomes and ensure your vision health is maintained long-term.',
  },
];

// Per-step clock (ms): text reveal, illustration draw, 500ms hold, connector to next node.
const REVEAL_END = 40;
const DRAW_END = 120;
const HOLD_END = 620;
const CONN_END = 680;
const last = steps.length - 1;
const clamp = (v: number) => Math.min(1, Math.max(0, v));

/** A line that draws between draw-progress a and b (0..1). */
function P({ d, a, b, c = TEAL }: { d: string; a: number; b: number; c?: string }) {
  return <path d={d} pathLength={1} className="ln" stroke={c} style={{ '--a': a, '--b': b } as CSSProperties} />;
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 360 280" aria-hidden="true" focusable="false" className="jp-svg" fill="none" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

const calendar = (
  <>
    <P d="M30 60 H170 V190 H30 Z" a={0} b={0.3} />
    <P d="M30 92 H170" a={0.2} b={0.35} />
    <P d="M65 48 V72 M135 48 V72" a={0.25} b={0.4} />
    <P d="M52 112 h18 M88 112 h18 M124 112 h18" a={0.35} b={0.5} c={SAGE} />
  </>
);

const illustrations = [
  <Svg key="1">
    {calendar}
    <P d="M200 90 H330 V240 H200 Z" a={0.3} b={0.6} />
    <P d="M220 130 h90 M220 160 h90 M220 190 h60" a={0.55} b={0.8} c={SAGE} />
    <P d="M60 150 L85 175 L128 128" a={0.75} b={1} c={TERRA} />
  </Svg>,
  <Svg key="2">
    <defs>
      <clipPath id="jp-eye-clip">
        <path d="M40 140 Q180 40 320 140 Q180 240 40 140 Z" />
      </clipPath>
    </defs>
    <P d="M40 140 Q180 40 320 140 Q180 240 40 140 Z" a={0} b={0.6} />
    <P d="M222 140 a42 42 0 1 1 -84 0 a42 42 0 1 1 84 0" a={0.45} b={0.85} />
    <P d="M196 140 a16 16 0 1 1 -32 0 a16 16 0 1 1 32 0" a={0.75} b={1} c={SAGE} />
    <g clipPath="url(#jp-eye-clip)">
      <line x1="60" y1="60" x2="60" y2="220" className="jp-scan" stroke={TERRA} />
    </g>
  </Svg>,
  <Svg key="3">
    <P d="M90 40 H270 V250 H90 Z" a={0} b={0.3} />
    <P d="M115 75 h70" a={0.2} b={0.35} c={SAGE} />
    <P d="M115 110 h20 v20 h-20 Z M150 120 h90" a={0.3} b={0.5} c={SAGE} />
    <P d="M119 120 l6 6 l10 -12" a={0.45} b={0.58} c={TERRA} />
    <P d="M115 155 h20 v20 h-20 Z M150 165 h90" a={0.52} b={0.72} c={SAGE} />
    <P d="M119 165 l6 6 l10 -12" a={0.67} b={0.8} c={TERRA} />
    <P d="M115 200 h20 v20 h-20 Z M150 210 h90" a={0.74} b={0.92} c={SAGE} />
    <P d="M119 210 l6 6 l10 -12" a={0.87} b={1} c={TERRA} />
  </Svg>,
  <Svg key="4">
    {calendar}
    <P d="M265 60 L335 85 V150 C335 200 300 225 265 240 C230 225 195 200 195 150 V85 Z" a={0.3} b={0.7} />
    <P d="M233 150 L257 174 L300 128" a={0.65} b={1} c={TERRA} />
  </Svg>,
];

export default function TreatmentProcess() {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const [finished, setFinished] = useState(false);

  const st = useRef({
    t: reduce ? DRAW_END : 0,
    active: 0,
    playing: !reduce,
    finished: false,
    inView: false,
    advancing: false,
  });
  const apply = useRef<(t: number) => void>(() => {});

  const sync = (patch: Partial<typeof st.current>) => {
    Object.assign(st.current, patch);
    if ('active' in patch) setActive(patch.active as number);
    if ('playing' in patch) setPlaying(patch.playing as boolean);
    if ('finished' in patch) setFinished(patch.finished as boolean);
  };

  // Once React has committed the new step, the clock may resume.
  useLayoutEffect(() => {
    st.current.advancing = false;
  }, [active]);

  useEffect(() => {
    const root = rootRef.current!;
    const s = st.current;
    const setVar = (k: string, v: number) => root.style.setProperty(k, String(v));
    apply.current = (t: number) => {
      setVar('--reveal', reduce ? 1 : clamp(t / REVEAL_END));
      setVar('--draw', reduce ? 1 : clamp((t - REVEAL_END) / (DRAW_END - REVEAL_END)));
      setVar('--conn', reduce || s.active === last ? 0 : clamp((t - HOLD_END) / (CONN_END - HOLD_END)));
      setVar('--scan', reduce ? 0.5 : 0.5 - 0.5 * Math.cos((2 * Math.PI * Math.max(0, t - DRAW_END)) / 400));
    };
    apply.current(s.t);

    let raf = 0;
    let prev: number | null = null;
    const frame = (now: number) => {
      if (prev === null) prev = now;
      const dt = Math.min(now - prev, 100);
      prev = now;
      const running = s.playing && s.inView && !document.hidden && !s.advancing && !s.finished;
      if (running) {
        s.t += dt;
        if (s.active === last) {
          if (s.t >= HOLD_END) {
            s.t = HOLD_END;
            sync({ finished: true, playing: false });
          }
        } else if (s.t >= (reduce ? HOLD_END : CONN_END)) {
          s.advancing = true;
          s.t = reduce ? DRAW_END : 0;
          setVar('--conn', 1);
          sync({ active: s.active + 1 });
        }
      }
      if (!s.advancing) apply.current(s.t);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => {
      s.inView = e.isIntersecting;
    }, { threshold: 0.35 });
    io.observe(root);

    const onFocusIn = (e: FocusEvent) => {
      try {
        if ((e.target as HTMLElement).matches(':focus-visible') && s.playing) sync({ playing: false });
      } catch {
        /* :focus-visible unsupported */
      }
    };
    root.addEventListener('focusin', onFocusIn);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      root.removeEventListener('focusin', onFocusIn);
    };
  }, [reduce]);

  const select = (i: number) => {
    const s = st.current;
    s.t = DRAW_END;
    s.advancing = false;
    apply.current(s.t);
    sync({ active: i, playing: false, finished: false });
  };
  const replay = () => {
    const s = st.current;
    s.t = reduce ? DRAW_END : 0;
    s.advancing = false;
    sync({ active: 0, playing: true, finished: false });
    apply.current(s.t);
  };
  const toggle = () => sync({ playing: !st.current.playing });

  return (
    <section ref={rootRef} className="jp py-24 bg-[#f3f2ef]" aria-labelledby="jp-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="jp-label font-semibold text-sm text-brand-dark mb-4">Your journey</p>
          <h2 id="jp-title" className="text-4xl sm:text-5xl font-normal text-brand-dark mb-5 tracking-normal leading-tight">
            From referral to recovery
          </h2>
          <p className="font-light text-lg text-brand-dark max-w-2xl mx-auto leading-relaxed">
            A clear, supported pathway from your first appointment through to treatment and ongoing care.
          </p>
        </div>

        <ol className="jp-steps" aria-label="Patient journey steps">
          {steps.map((step, i) => {
            const state = i < active ? 'done' : i === active ? 'now' : 'next';
            const f = i < active ? 1 : i === active ? 'var(--conn)' : 0;
            return (
              <li key={step.title} className="jp-step">
                {i < last && (
                  <span className="jp-line" aria-hidden="true">
                    <span className="jp-fill" style={{ '--f': f } as CSSProperties} />
                  </span>
                )}
                <button
                  type="button"
                  className="jp-btn"
                  aria-current={i === active ? 'step' : undefined}
                  aria-label={`Step ${i + 1} of ${steps.length}: ${step.title}${i < active ? ' (completed)' : ''}`}
                  onClick={() => select(i)}
                >
                  <span className={`jp-node ${state}`} aria-hidden="true">
                    {state === 'done' ? <Check size={20} strokeWidth={2.5} /> : i + 1}
                  </span>
                  <span>{step.title}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="jp-panel" aria-live="off">
          <div className="jp-texts">
            {steps.map((step, i) => (
              <div key={step.title} className={`jp-text${i === active ? ' on' : ''}`} aria-hidden={i === active ? undefined : true}>
                <p className="jp-count font-semibold text-sm">STEP {String(i + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</p>
                <h3 className="font-normal text-3xl sm:text-4xl leading-tight mt-4 mb-5 tracking-normal text-white">{step.title}</h3>
                <p className="font-light text-base sm:text-lg leading-relaxed text-[#e7e4de]">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="jp-art">
            {illustrations.map((ill, i) => (
              <div key={i} className={`jp-ill${i === active ? ' on' : ''}`}>
                {ill}
              </div>
            ))}
          </div>
        </div>

        <div className="jp-controls">
          <button type="button" className="jp-ctl jp-nav" aria-label="Previous step" disabled={active === 0} onClick={() => select(active - 1)}>
            <ChevronLeft size={20} />
          </button>
          {finished ? (
            <button type="button" className="jp-ctl jp-pp" onClick={replay}>
              <RotateCcw size={16} />
              <span>Replay journey</span>
            </button>
          ) : (
            <button
              type="button"
              className="jp-ctl jp-pp"
              aria-label={playing ? 'Pause journey animation' : 'Play journey animation'}
              onClick={toggle}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
              <span>{playing ? 'Pause' : 'Play'}</span>
            </button>
          )}
          <button type="button" className="jp-ctl jp-nav" aria-label="Next step" disabled={active === last} onClick={() => select(active + 1)}>
            <ChevronRight size={20} />
          </button>
        </div>
        <p className="jp-hint font-light text-sm text-brand-dark">Explore each step at your own pace</p>
      </div>
    </section>
  );
}
