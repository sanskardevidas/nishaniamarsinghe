import { useEffect, useRef } from 'react';
import { ArrowRight, Star, Shield, Users, ChevronDown } from 'lucide-react';
import nishaniImg from '../assets/images/nishani.jpg';

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '1000s', label: 'Procedures Performed' },
  { value: 'Amera', label: 'Southampton' },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // One-time entrance: each .hero-animate block fades up in turn.
  useEffect(() => {
    const timer = setTimeout(() => {
      containerRef.current?.querySelectorAll('.hero-animate').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // "Discover more" goes to whichever section follows the hero.
  const discover = (e: React.MouseEvent) => {
    const next = containerRef.current?.nextElementSibling;
    if (next) {
      e.preventDefault();
      next.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden dw-hero-bg pt-32 sm:pt-32 pb-14 sm:pb-16"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <div className="hero-animate reveal mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 bg-transparent text-brand-dark text-xs font-semibold px-4 py-2 rounded-full border border-brand-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                NHS Consultant Ophthalmologist
              </span>
            </div>

            <h1 className="hero-animate reveal stagger-1 font-normal tracking-normal leading-[1.08] text-[40px] sm:text-[56px] xl:text-[68px] mb-5 sm:mb-6">
              <span className="block text-brand-dark">Precision Eye Care,</span>
              <span className="block text-brand-primary">Delivered with</span>
              <span className="block text-brand-dark">Expertise</span>
            </h1>

            <p className="hero-animate reveal stagger-2 font-light text-brand-dark text-base sm:text-lg leading-[1.75] mb-7 sm:mb-8 max-w-lg">
              Specialist in Glaucoma, Cataract Surgery & MIGS across South England. Led by Dr. Nishani Amerasinghe,
              Consultant Ophthalmologist at NHS Southampton and leading private hospitals.
            </p>

            <div className="hero-animate reveal stagger-3 flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a href="#appointment" className="btn-primary hero-btn text-sm sm:text-base py-3 px-4 sm:py-3.5 sm:px-8">
                Book Appointment
                <ArrowRight size={16} />
              </a>
              <a href="#services" className="btn-secondary hero-btn text-sm sm:text-base py-3 px-4 sm:py-3.5 sm:px-8">
                Explore Services
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="hero-animate reveal stagger-4 hero-stats pt-6">
              {stats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <div className="font-normal text-brand-dark text-xl sm:text-3xl leading-tight">{s.value}</div>
                  <div className="font-light text-[#3d445a] text-xs sm:text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait */}
          <div className="relative mt-2 lg:mt-0">
            <div className="hero-animate reveal-scale relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[540px] mx-auto">
              <div className="relative w-full h-[390px] sm:h-[490px] lg:h-[540px] p-5">
                <div className="relative w-full h-full">
                  {/* sage shape (up-left) and thin teal frame (down-right), both behind the photo */}
                  <div className="absolute inset-0 -translate-x-4 -translate-y-4 rounded-[2rem] bg-[#a5b387]" aria-hidden="true" />
                  <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-brand-primary" aria-hidden="true" />

                  <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                    <img
                      src={nishaniImg}
                      alt="Dr. Nishani Amerasinghe - Consultant Ophthalmologist"
                      className="w-full h-full object-cover object-[center_24%]"
                    />
                  </div>

                  <div className="hero-badge absolute top-[7%] -left-1 sm:-left-8 animate-float z-20">
                    <div className="bg-white rounded-2xl shadow-card flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                        <Star size={16} className="text-brand-primary fill-brand-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-brand-dark text-xs sm:text-sm">President</div>
                        <div className="font-light text-[#3d445a] text-[10px] sm:text-xs">UK &amp; Eire Glaucoma Society</div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-badge absolute top-[40%] -right-1 sm:-right-8 animate-float-slow z-20">
                    <div className="bg-white rounded-2xl shadow-card flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                        <Shield size={16} className="text-brand-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-brand-dark text-xs sm:text-sm">NHS</div>
                        <div className="font-light text-[#3d445a] text-[10px] sm:text-xs">Consultant</div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-badge absolute bottom-[6%] -left-1 sm:-left-6 animate-float-delayed z-20">
                    <div className="bg-white rounded-2xl shadow-card flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                        <Users size={16} className="text-brand-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-brand-dark text-xs sm:text-sm">20+ Years</div>
                        <div className="font-light text-[#3d445a] text-[10px] sm:text-xs">Surgical Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-10 sm:mt-14">
          <a href="#services" onClick={discover} className="hero-discover flex flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase">Discover More</span>
            <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
