import { useEffect, useRef } from 'react';
import {
  ArrowRight,
  Star,
  Shield,
  Users,
  ChevronDown,
} from 'lucide-react';
import nishaniImg from '../assets/images/nishani.png';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const elements =
        containerRef.current?.querySelectorAll('.hero-animate');

      elements?.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, i * 120);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const scrollToServices = () => {
    document
      .querySelector('#services')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAppointment = () => {
    document
      .querySelector('#appointment')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient pt-24 sm:pt-28 pb-12 sm:pb-16"
    >
      <div className="blue-orb w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] -top-20 sm:-top-40 -right-20 sm:-right-40 opacity-60 pointer-events-none" />
      <div className="blue-orb w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bottom-0 left-0 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Text Section */}
          <div className="order-1 lg:order-1">
            <div className="hero-animate reveal mb-4 sm:mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse-soft" />
                NHS Consultant Ophthalmologist
              </span>
            </div>

            <div className="hero-animate reveal stagger-1 space-y-1 sm:space-y-2 mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-brand-dark leading-[1.15] sm:leading-[1.1] tracking-tight">
                Precision Eye Care,
              </h1>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold leading-[1.15] sm:leading-[1.1] tracking-tight">
                <span className="gradient-text">
                  Delivered with
                </span>
              </h1>

              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold text-brand-dark leading-[1.15] sm:leading-[1.1] tracking-tight">
                Expertise
              </h1>
            </div>

            <p className="hero-animate reveal stagger-2 text-brand-soft text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Specialist in Glaucoma, Cataract Surgery & MIGS across
              South England. Led by{' '}
              <strong className="text-brand-dark">
                Dr. Nishani Amerasinghe
              </strong>
              , Consultant Ophthalmologist at NHS Southampton and
              leading private hospitals.
            </p>

            <div className="hero-animate reveal stagger-3 flex flex-wrap gap-3 sm:gap-4 mb-8 sm:mb-10">
              <button
                onClick={scrollToAppointment}
                className="btn-primary text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8"
              >
                Book Appointment
                <ArrowRight size={16} />
              </button>

              <button
                onClick={scrollToServices}
                className="btn-secondary text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8"
              >
                Explore Services
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero-animate reveal stagger-4 flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-brand-border">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-brand-dark">
                  10+
                </div>
                <div className="text-xs text-brand-soft">
                  Years Experience
                </div>
              </div>

              <div className="w-px h-8 sm:h-10 bg-brand-border" />

              <div>
                <div className="text-xl sm:text-2xl font-bold text-brand-dark">
                  5,000+
                </div>
                <div className="text-xs text-brand-soft">
                  Patients Treated
                </div>
              </div>

              <div className="w-px h-8 sm:h-10 bg-brand-border" />

              <div>
                <div className="text-xl sm:text-2xl font-bold text-brand-dark">
                  4
                </div>
                <div className="text-xs text-brand-soft">
                  Hospital Locations
                </div>
              </div>
            </div>
          </div>

          {/* Doctor Visual Section (Perfectly Centered Organic Frame) */}
          <div className="order-2 lg:order-2 relative mt-2 sm:mt-0">
            <div className="hero-animate reveal-scale relative w-full max-w-[330px] sm:max-w-[480px] lg:max-w-[540px] mx-auto">
              
              <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[580px] flex items-end justify-center">
                
                {/* Soft Glow */}
                <div className="absolute inset-0 m-auto w-[85%] h-[85%] rounded-full bg-blue-300/25 blur-[50px] sm:blur-[80px] pointer-events-none" />

                {/* Primary Organic Shape - Centered Behind Doctor */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-2
                    top-4
                    m-auto
                    w-[90%]
                    h-[92%]
                    bg-gradient-to-br
                    from-cyan-100
                    via-blue-100
                    to-indigo-100
                    opacity-95
                    pointer-events-none
                  "
                  style={{
                    borderRadius: '58% 42% 48% 52% / 42% 52% 48% 58%',
                  }}
                />

                {/* Subtle Outline Around Organic Shape */}
                <div
                  className="
                    absolute
                    inset-x-0
                    bottom-1
                    top-2
                    m-auto
                    w-[95%]
                    h-[96%]
                    border
                    border-blue-200/70
                    pointer-events-none
                  "
                  style={{
                    borderRadius: '55% 45% 51% 49% / 45% 54% 46% 55%',
                  }}
                />

                {/* Doctor Portrait Image */}
                <img
                  src={nishaniImg}
                  alt="Dr. Nishani Amerasinghe - Consultant Ophthalmologist"
                  className="
                    relative
                    z-10
                    w-auto
                    h-[98%]
                    max-w-full
                    object-contain
                    object-bottom
                    drop-shadow-[0_20px_35px_rgba(30,64,175,0.18)]
                    transition-transform
                    duration-700
                    hover:scale-[1.02]
                  "
                />

                {/* Floating Badge 1: Rating */}
                <div className="absolute top-[8%] -left-2 sm:-left-6 animate-float z-20 scale-90 sm:scale-100">
                  <div className="glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-card flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Star
                        size={16}
                        className="text-amber-500 fill-amber-500"
                      />
                    </div>

                    <div>
                      <div className="font-bold text-brand-dark text-xs sm:text-sm">
                        4.9 / 5.0
                      </div>
                      <div className="text-[10px] sm:text-xs text-brand-soft">
                        Patient Rating
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 2: Patients */}
                <div className="absolute bottom-[6%] -left-2 sm:-left-4 animate-float-delayed z-20 scale-90 sm:scale-100">
                  <div className="glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-card flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Users
                        size={16}
                        className="text-green-500"
                      />
                    </div>

                    <div>
                      <div className="font-bold text-brand-dark text-xs sm:text-sm">
                        5,000+
                      </div>
                      <div className="text-[10px] sm:text-xs text-brand-soft">
                        Trusted Patients
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 3: NHS Consultant */}
                <div className="absolute top-[32%] -right-2 sm:-right-6 animate-float-slow z-20 scale-90 sm:scale-100">
                  <div className="glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-card flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                      <Shield
                        size={16}
                        className="text-brand-primary"
                      />
                    </div>

                    <div>
                      <div className="font-bold text-brand-dark text-xs sm:text-sm">
                        NHS
                      </div>
                      <div className="text-[10px] sm:text-xs text-brand-soft">
                        Consultant
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="flex justify-center mt-10 sm:mt-16">
          <button
            onClick={scrollToServices}
            className="flex flex-col items-center gap-2 text-brand-soft hover:text-brand-primary transition-colors group"
          >
            <span className="text-xs font-medium tracking-widest uppercase">
              Discover More
            </span>

            <ChevronDown
              size={20}
              className="animate-bounce"
            />
          </button>
        </div>
      </div>
    </section>
  );
}