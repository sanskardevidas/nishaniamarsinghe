import { useEffect, useRef } from 'react';
import { Star, Quote } from 'lucide-react';
import nishani2Img from '../assets/images/nishani2.jpg';

export default function DoctorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.spotlight-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-brand-dark overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 spotlight-reveal reveal-left">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="relative rounded-3xl overflow-hidden border-2 border-brand-primary">
                <img
                  src={nishani2Img}
                  alt="Ms Nishani Amerasinghe"
                  className="w-full h-[420px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="font-bold text-white text-xl">Ms Nishani Amerasinghe</div>
                  <div className="text-[#e7e4de] text-sm mt-1">Consultant Ophthalmic Surgeon</div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#e07856] text-[#e07856]" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="spotlight-reveal reveal-right">
              <Quote size={48} className="text-brand-primary mb-4" />
            </div>

            <h2 className="spotlight-reveal reveal-right stagger-1 text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
              “My aim is to give every patient the very best chance of preserving and improving
              their vision — through specialist glaucoma and cataract care delivered with
              precision, innovation, and compassion.”
            </h2>

            <p className="spotlight-reveal reveal-right stagger-2 text-[#a5b387] leading-relaxed mb-4 text-lg">
              — Ms Nishani Amerasinghe
            </p>

            <p className="spotlight-reveal reveal-right stagger-3 text-[#e7e4de] leading-relaxed mb-8 text-base sm:text-lg max-w-3xl">
              Full-time Consultant Ophthalmic Surgeon based at the University Hospital Southampton
              NHS Foundation Trust, specialising in Glaucoma and Cataract Surgery. Expert in SLT,
              trabeculectomy, tube surgery, and minimally invasive glaucoma surgery (MIGS), with
              more than 20 years of surgical experience and thousands of procedures performed.
            </p>

            <div className="spotlight-reveal reveal-right stagger-4 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brand-primary">
              <div>
                <div className="text-2xl font-bold text-[#a5b387] mb-1">20+ Years</div>
                <div className="text-[#e7e4de] text-sm">Surgical Experience</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-[#e07856] mb-1">Thousands</div>
                <div className="text-[#e7e4de] text-sm">Procedures Performed</div>
              </div>

              <div>
                <div className="text-2xl font-bold text-[#a5b387] mb-1">President</div>
                <div className="text-[#e7e4de] text-sm">UK & Eire Glaucoma Society</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}