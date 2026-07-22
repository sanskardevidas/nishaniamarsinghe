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
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient pt-28 pb-16"
    >
      <div className="blue-orb w-[700px] h-[700px] -top-40 -right-40 opacity-60" />
      <div className="blue-orb w-[400px] h-[400px] bottom-0 left-0 opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="hero-animate reveal mb-6">
              <span className="inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse-soft" />
                NHS Consultant Ophthalmologist
              </span>
            </div>

            <div className="hero-animate reveal stagger-1 space-y-2 mb-6">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-brand-dark leading-[1.1] tracking-tight">
                Precision Eye Care,
              </h1>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-[1.1] tracking-tight">
                <span className="gradient-text">
                  Delivered with
                </span>
              </h1>

              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-brand-dark leading-[1.1] tracking-tight">
                Expertise
              </h1>
            </div>

            <p className="hero-animate reveal stagger-2 text-brand-soft text-lg leading-relaxed mb-8 max-w-lg">
              Specialist in Glaucoma, Cataract Surgery & MIGS across
              South England. Led by{' '}
              <strong className="text-brand-dark">
                Dr. Nishani Amerasinghe
              </strong>
              , Consultant Ophthalmologist at NHS Southampton and
              leading private hospitals.
            </p>

            <div className="hero-animate reveal stagger-3 flex flex-wrap gap-4 mb-10">
              <button
                onClick={scrollToAppointment}
                className="btn-primary"
              >
                Book Appointment
                <ArrowRight size={16} />
              </button>

              <button
                onClick={scrollToServices}
                className="btn-secondary"
              >
                Explore Services
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="hero-animate reveal stagger-4 flex flex-wrap items-center gap-6 pt-4 border-t border-brand-border">
              <div>
                <div className="text-2xl font-bold text-brand-dark">
                  10+
                </div>
                <div className="text-xs text-brand-soft">
                  Years Experience
                </div>
              </div>

              <div className="w-px h-10 bg-brand-border" />

              <div>
                <div className="text-2xl font-bold text-brand-dark">
                  5,000+
                </div>
                <div className="text-xs text-brand-soft">
                  Patients Treated
                </div>
              </div>

              <div className="w-px h-10 bg-brand-border" />

              <div>
                <div className="text-2xl font-bold text-brand-dark">
                  4
                </div>
                <div className="text-xs text-brand-soft">
                  Hospital Locations
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="hero-animate reveal-scale relative min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex items-end justify-center">
              {/* Soft glow behind the organic shape */}
              <div className="absolute left-1/2 top-1/2 w-[420px] h-[420px] sm:w-[500px] sm:h-[500px] lg:w-[560px] lg:h-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-[90px] pointer-events-none" />

              {/* Organic background element */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  w-[360px]
                  h-[430px]
                  sm:w-[440px]
                  sm:h-[500px]
                  lg:w-[510px]
                  lg:h-[560px]
                  -translate-x-1/2
                  -translate-y-1/2
                  bg-gradient-to-br
                  from-cyan-100
                  via-blue-100
                  to-indigo-100
                  opacity-95
                  pointer-events-none
                "
                style={{
                  borderRadius:
                    '58% 42% 48% 52% / 42% 52% 48% 58%',
                }}
              />

              {/* Secondary decorative organic shape */}
              <div
                className="
                  absolute
                  right-[2%]
                  top-[18%]
                  w-36
                  h-44
                  sm:w-44
                  sm:h-52
                  bg-blue-100/70
                  pointer-events-none
                "
                style={{
                  borderRadius:
                    '62% 38% 55% 45% / 44% 58% 42% 56%',
                }}
              />

              {/* Bottom-left decorative shape */}
              <div
                className="
                  absolute
                  left-[4%]
                  bottom-[10%]
                  w-32
                  h-36
                  sm:w-40
                  sm:h-44
                  bg-cyan-100/60
                  pointer-events-none
                "
                style={{
                  borderRadius:
                    '46% 54% 38% 62% / 52% 42% 58% 48%',
                }}
              />

              {/* Subtle outline around the organic element */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  w-[390px]
                  h-[460px]
                  sm:w-[470px]
                  sm:h-[530px]
                  lg:w-[540px]
                  lg:h-[590px]
                  -translate-x-1/2
                  -translate-y-1/2
                  border
                  border-blue-200/70
                  pointer-events-none
                "
                style={{
                  borderRadius:
                    '55% 45% 51% 49% / 45% 54% 46% 55%',
                }}
              />

              {/* Decorative dots and lines */}
              <div className="absolute top-[20%] left-[11%] w-2 h-2 rounded-full bg-brand-primary/70 pointer-events-none" />
              <div className="absolute top-[18%] left-[12%] w-28 h-px bg-gradient-to-r from-brand-primary/40 to-transparent rotate-[18deg] origin-left pointer-events-none" />

              <div className="absolute right-[8%] top-[30%] w-2 h-2 rounded-full bg-brand-primary/60 pointer-events-none" />
              <div className="absolute right-[9%] top-[31%] w-24 h-px bg-gradient-to-l from-brand-primary/40 to-transparent -rotate-[16deg] origin-right pointer-events-none" />

              <div className="absolute bottom-[16%] right-[13%] w-2 h-2 rounded-full bg-cyan-500/60 pointer-events-none" />

              {/* Transparent doctor image */}
              <div className="relative z-10 flex items-end justify-center w-full h-full">
                <img
                  src={nishaniImg}
                  alt="Dr. Nishani Amerasinghe - Consultant Ophthalmologist"
                  className="
                    relative
                    z-10
                    w-auto
                    h-[900px]
                    sm:h-[560px]
                    lg:h-[620px]
                    max-w-full
                    object-contain
                    object-bottom
                    drop-shadow-[0_30px_45px_rgba(30,64,175,0.18)]
                    transition-transform
                    duration-700
                    hover:scale-[1.03]
                    scale-[2]
                  "
                />
              </div>

              <div className="absolute top-[10%] left-0 sm:left-[2%] lg:-left-8 animate-float z-20">
                <div className="glass-card rounded-2xl px-4 py-3 shadow-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                    <Star
                      size={18}
                      className="text-amber-500 fill-amber-500"
                    />
                  </div>

                  <div>
                    <div className="font-bold text-brand-dark text-sm">
                      4.9 / 5.0
                    </div>
                    <div className="text-xs text-brand-soft">
                      Patient Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[8%] left-0 sm:left-[3%] lg:-left-6 animate-float-delayed z-20">
                <div className="glass-card rounded-2xl px-4 py-3 shadow-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Users
                      size={18}
                      className="text-green-500"
                    />
                  </div>

                  <div>
                    <div className="font-bold text-brand-dark text-sm">
                      5,000+
                    </div>
                    <div className="text-xs text-brand-soft">
                      Trusted Patients
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-[36%] right-0 sm:right-[1%] lg:-right-8 animate-float-slow z-20">
                <div className="glass-card rounded-2xl px-4 py-3 shadow-card flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center">
                    <Shield
                      size={18}
                      className="text-brand-primary"
                    />
                  </div>

                  <div>
                    <div className="font-bold text-brand-dark text-sm">
                      NHS
                    </div>
                    <div className="text-xs text-brand-soft">
                      Consultant
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
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