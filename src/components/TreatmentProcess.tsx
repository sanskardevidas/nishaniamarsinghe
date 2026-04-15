import { useEffect, useRef } from 'react';
import { ClipboardList, Search, Stethoscope, CheckCircle, Play } from 'lucide-react';
import tpImg from '../assets/images/tp.png';

const steps = [
  {
    icon: ClipboardList,
    step: '01',
    title: 'Referral & Booking',
    description: 'Receive a GP or optometrist referral, or self-refer privately. Our team will contact you promptly to arrange a convenient appointment.',
  },
  {
    icon: Search,
    step: '02',
    title: 'Comprehensive Assessment',
    description: 'A thorough eye examination including slit-lamp assessment, visual fields testing, OCT imaging, and intraocular pressure measurement.',
  },
  {
    icon: Stethoscope,
    step: '03',
    title: 'Personalised Treatment Plan',
    description: 'Dr. Amerasinghe discusses all findings and options with you, creating a treatment plan tailored to your individual needs and circumstances.',
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Treatment & Follow-Up',
    description: 'Expert treatment delivery with structured follow-up care to monitor outcomes and ensure your vision health is maintained long-term.',
  },
];

export default function TreatmentProcess() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.process-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToAppointment = () => {
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="py-24 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="process-reveal reveal mb-4">
              <span className="inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200">
                Your Journey
              </span>
            </div>
            <h2 className="process-reveal reveal stagger-1 text-4xl font-bold text-brand-dark mb-5 tracking-tight leading-tight">
              From Referral to
              <span className="gradient-text"> Recovery</span>
            </h2>
            <p className="process-reveal reveal stagger-2 text-brand-soft leading-relaxed mb-10">
              A clear, supported pathway from your first appointment through to successful treatment
              and long-term monitoring.
            </p>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className={`process-reveal reveal stagger-${i + 3} flex gap-5`}>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-cta flex items-center justify-center shadow-button flex-shrink-0">
                      <step.icon size={20} className="text-white" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-full min-h-[32px] bg-gradient-to-b from-brand-primary/40 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="text-xs font-bold text-brand-primary/60 mb-1 tracking-widest">STEP {step.step}</div>
                    <h3 className="font-bold text-brand-dark text-base mb-1.5">{step.title}</h3>
                    <p className="text-brand-soft text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="process-reveal reveal-right">
            <div className="relative rounded-3xl overflow-hidden shadow-float group cursor-pointer" onClick={scrollToAppointment}>
              <img
                src={tpImg}
                alt="Eye examination process"
                className="w-full h-[680px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                  <div className="font-semibold text-brand-dark text-sm mb-1">Patient Journey Overview</div>
                  <div className="text-brand-soft text-xs">Learn what to expect at your first consultation with Dr. Amerasinghe</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}