import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Pause, Play } from 'lucide-react';

const testimonials = [
  {
    name: 'Margaret T.',
    location: 'Southampton',
    rating: 5,
    text: 'Dr. Amerasinghe has been managing my glaucoma for three years now. She\'s incredibly thorough, explains everything clearly, and I always leave feeling confident my eyes are in safe hands.',
    procedure: 'Glaucoma Management',
  },
  {
    name: 'Robert H.',
    location: 'Winchester',
    rating: 5,
    text: 'Had my cataract surgery done by Dr. Amerasinghe at Nuffield. The whole experience was excellent — from the initial consultation to the follow-up. My vision is better than it\'s been in years.',
    procedure: 'Cataract Surgery',
  },
  {
    name: 'Patricia L.',
    location: 'Eastleigh',
    rating: 5,
    text: 'After my GP referred me, I saw Dr. Amerasinghe privately. She was patient, kind, and clearly very knowledgeable. The MIGS procedure has made a real difference to my quality of life.',
    procedure: 'MIGS Procedure',
  },
  {
    name: 'David F.',
    location: 'Fareham',
    rating: 5,
    text: 'I was very anxious about eye surgery but Dr. Amerasinghe put me completely at ease. Her expertise and warm manner are remarkable. I cannot recommend her highly enough.',
    procedure: 'Cataract Surgery',
  },
  {
    name: 'Susan M.',
    location: 'Bournemouth',
    rating: 5,
    text: 'Exceptional care from start to finish. Dr. Amerasinghe took time to understand my concerns and tailored the treatment to suit me. The results have been outstanding.',
    procedure: 'Glaucoma Management',
  },
];

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(false);
  const [suppress, setSuppress] = useState(false); // hides hover/focus colour after a deselect, until the pointer/focus leaves
  const [playing, setPlaying] = useState(!reduce);
  const [hover, setHover] = useState(false);
  const [kbdFocus, setKbdFocus] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const n = testimonials.length;

  const goTo = (index: number) => {
    setActive(((index % n) + n) % n);
    setSelected(false);
    setSuppress(false);
  };

  const holdForReading = hover || kbdFocus || selected;
  useEffect(() => {
    if (!playing || holdForReading) return;
    const id = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, playing, holdForReading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.testimonial-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const onFocusIn = (e: React.FocusEvent) => {
    try {
      if ((e.target as HTMLElement).matches(':focus-visible')) setKbdFocus(true);
    } catch {
      /* :focus-visible unsupported */
    }
  };
  const onFocusOut = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKbdFocus(false);
  };

  return (
    <section ref={ref} className="py-24 bg-[#f3f2ef]" onFocus={onFocusIn} onBlur={onFocusOut}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="testimonial-reveal reveal inline-flex items-center gap-2 bg-[#a5b387] text-brand-dark text-xs font-semibold px-4 py-2 rounded-full border border-[#a5b387] mb-4">
            <Star size={12} className="fill-brand-dark text-brand-dark" />
            Patient Reviews
          </div>
          <h2 className="testimonial-reveal reveal stagger-1 text-4xl sm:text-5xl font-normal text-brand-dark mb-4 tracking-normal">
            What our patients say
          </h2>
          <p className="testimonial-reveal reveal stagger-2 text-brand-dark font-light text-lg">
            Real experiences from patients who trust us with their vision
          </p>
        </div>

        <div className="testimonial-reveal reveal stagger-3 max-w-4xl mx-auto">
          <div
            className="rt-card rounded-3xl shadow-card p-8 sm:p-12 relative overflow-hidden"
            data-selected={selected}
            data-suppress={suppress}
            onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
            onPointerLeave={(e) => {
              if (e.pointerType === 'mouse') setHover(false);
              setSuppress(false);
            }}
            onBlur={() => setSuppress(false)}
          >
            {/* Whole-card toggle sits behind the content, so the carousel controls below never reach it */}
            <button
              type="button"
              className="rt-hit absolute inset-0 z-0 w-full h-full rounded-3xl"
              aria-pressed={selected}
              aria-label="Keep this review highlighted"
              onClick={() => {
                if (selected) setSuppress(true);
                setSelected(!selected);
              }}
            />
            <div className="relative z-10 pointer-events-none">
              <Quote size={40} className="rt-icon mb-6" aria-hidden="true" />
              <div className="rt-stack">
                {testimonials.map((t, i) => (
                  <figure key={t.name} className={`rt-slide${i === active ? ' on' : ''}`} aria-hidden={i === active ? undefined : true} style={{ margin: 0 }}>
                    <div className="flex gap-1 mb-5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                      {[...Array(t.rating)].map((_, k) => (
                        <Star key={k} size={20} className="rt-icon" fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="rt-text text-xl sm:text-2xl leading-relaxed font-light mb-8" style={{ margin: 0, marginBottom: '2rem' }}>
                      "{t.text}"
                    </blockquote>
                    <figcaption className="rt-rule pt-6 flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#a5b387] text-brand-dark flex items-center justify-center flex-shrink-0">
                          <span className="font-semibold text-lg">{t.name[0]}</span>
                        </div>
                        <div>
                          <div className="rt-name font-semibold">{t.name}</div>
                          <div className="rt-loc font-light text-sm">{t.location}</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold bg-[#a5b387] text-brand-dark px-3 py-1.5 rounded-full">
                        {t.procedure}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4 mt-8">
            <div className="rt-dots">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show testimonial ${i + 1} of ${n}`}
                  aria-current={i === active ? 'true' : undefined}
                  className="rt-dot"
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="rt-btn rt-pp"
                aria-label={playing ? 'Pause automatic review rotation' : 'Play automatic review rotation'}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button type="button" className="rt-btn rt-prev" aria-label="Previous testimonial" onClick={() => goTo(active - 1)}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="rt-btn rt-next" aria-label="Next testimonial" onClick={() => goTo(active + 1)}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
