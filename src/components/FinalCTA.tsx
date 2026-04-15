import { useEffect, useRef } from 'react';
import { ArrowRight, Phone, Calendar } from 'lucide-react';

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);

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

  const scrollToAppointment = () => {
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-24 bg-brand-section">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-brand-primary to-brand-cta rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-24 translate-x-24" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-20 -translate-x-20" />

          <div className="relative z-10">
            <div className="cta-reveal reveal mb-4">
              <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30">
                <Calendar size={12} />
                Ready to Get Started?
              </span>
            </div>

            <h2 className="cta-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
              Book Your Consultation Today
            </h2>

            <p className="cta-reveal reveal stagger-2 text-white/80 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Don't delay your eye health. Whether you have concerns about glaucoma, cataracts, or simply
              want a specialist review — Dr. Amerasinghe is here to help.
            </p>

            <div className="cta-reveal reveal stagger-3 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={scrollToAppointment}
                className="flex items-center gap-2 bg-white text-brand-cta font-bold px-8 py-4 rounded-xl hover:scale-103 hover:shadow-2xl transition-all duration-200 text-base"
              >
                Book Appointment
                <ArrowRight size={18} />
              </button>
              <a
                href="tel:+442380000000"
                className="flex items-center gap-2 bg-white/20 border-2 border-white/40 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/30 transition-all duration-200 text-base"
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>

            <div className="cta-reveal reveal stagger-4 flex flex-wrap justify-center gap-8 mt-10 pt-10 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">Same Week</div>
                <div className="text-white/60 text-sm">Appointments Available</div>
              </div>
              <div className="w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">All Insurers</div>
                <div className="text-white/60 text-sm">Accepted</div>
              </div>
              <div className="w-px bg-white/20 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">NHS & Private</div>
                <div className="text-white/60 text-sm">Pathways Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
