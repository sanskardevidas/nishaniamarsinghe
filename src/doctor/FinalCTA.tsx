import { useEffect, useRef } from 'react';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
import { PRACTICE } from './practice';

const hasPhone = Boolean(PRACTICE.phone && PRACTICE.phoneHref);

// Existing source claims, carried over as written; not verified for Amera.
const facts = [
  { title: 'Same Week', label: 'Appointments Available' },
  { title: 'All Insurers', label: 'Accepted' },
  { title: 'NHS & Private', label: 'Pathways Available' },
];

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.cta-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const callContent = (
    <>
      <Phone size={20} />
      Call Us Now
    </>
  );

  return (
    <section ref={ref} className="py-24 bg-[#f3f2ef]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="fc-panel">
          <span className="fc-arc fc-arc-tr" aria-hidden="true" />
          <span className="fc-arc fc-arc-bl" aria-hidden="true" />

          <div className="fc-body">
            <div className="cta-reveal reveal mb-5">
              <span className="fc-label font-semibold text-sm sm:text-base">
                <Calendar size={16} className="text-white" aria-hidden="true" />
                Ready to get started?
              </span>
            </div>

            <h2 className="cta-reveal reveal stagger-1 fc-h2 font-normal text-white tracking-normal">
              Book your consultation today
            </h2>

            <p className="cta-reveal reveal stagger-2 fc-p font-light text-[#e7e4de]">
              Don't delay your eye health. Whether you have concerns about glaucoma, cataracts, or simply
              want a specialist review — Dr. Amerasinghe is here to help.
            </p>

            <div className="cta-reveal reveal stagger-3 fc-actions">
              <a className="fc-btn fc-book" href="#appointment">
                Book Appointment
                <ArrowRight size={20} className="fc-arrow" />
              </a>
              {hasPhone ? (
                <a className="fc-btn fc-call" href={PRACTICE.phoneHref}>
                  {callContent}
                </a>
              ) : (
                <button type="button" className="fc-btn fc-call" disabled title="Available once the practice phone number is configured">
                  {callContent}
                </button>
              )}
            </div>

            <div className="cta-reveal reveal stagger-4 fc-facts">
              {facts.map((f) => (
                <div key={f.title} className="fc-fact">
                  <div className="fc-fact-h font-semibold">{f.title}</div>
                  <div className="fc-fact-l font-light">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
