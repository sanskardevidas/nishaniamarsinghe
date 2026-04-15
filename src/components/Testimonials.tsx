import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(index);
      setAnimating(false);
    }, 300);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [active]);

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

  const t = testimonials[active];

  return (
    <section ref={ref} className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="testimonial-reveal reveal inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200 mb-4">
            <Star size={12} className="fill-brand-cta" />
            Patient Reviews
          </div>
          <h2 className="testimonial-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            What Our Patients Say
          </h2>
          <p className="testimonial-reveal reveal stagger-2 text-brand-soft text-lg">
            Real experiences from patients who trust us with their vision
          </p>
        </div>

        <div className="testimonial-reveal reveal stagger-3 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-float border border-brand-border p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-accent rounded-full opacity-30 -translate-y-12 translate-x-12" />
            <div className="relative z-10">
              <Quote size={40} className="text-brand-primary/20 mb-6" />

              <div
                className="transition-all duration-300"
                style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(8px)' : 'translateY(0)' }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-brand-dark text-xl sm:text-2xl leading-relaxed font-medium mb-8 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-brand-cta flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="font-bold text-brand-dark">{t.name}</div>
                      <div className="text-brand-soft text-sm">{t.location}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold bg-brand-accent text-brand-cta px-3 py-1.5 rounded-full border border-blue-200">
                    {t.procedure}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? 'w-8 h-2.5 bg-brand-primary'
                      : 'w-2.5 h-2.5 bg-brand-border hover:bg-brand-soft'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-brand-border bg-white shadow-card hover:border-brand-primary hover:text-brand-primary transition-all flex items-center justify-center text-brand-soft"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-primary to-brand-cta shadow-button hover:shadow-button-hover transition-all flex items-center justify-center text-white"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
