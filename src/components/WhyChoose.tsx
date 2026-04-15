import { useEffect, useRef } from 'react';
import { Target, Microscope, Heart, Users, ShieldCheck, Clock } from 'lucide-react';

const reasons = [
  {
    icon: Target,
    title: 'Subspecialty Expertise',
    description: 'Focused specialist training in glaucoma with extensive experience managing complex and challenging cases.',
    color: 'text-brand-primary',
    bg: 'bg-brand-accent',
  },
  {
    icon: Microscope,
    title: 'Advanced Techniques',
    description: 'Access to the latest surgical technologies including MIGS, selective laser trabeculoplasty, and modern cataract platforms.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Heart,
    title: 'Personalised Care',
    description: 'Every treatment plan is tailored to the individual patient\'s needs, lifestyle, and long-term vision goals.',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Users,
    title: 'Trusted Referrals',
    description: 'A preferred specialist for GP and optometrist referrals across Hampshire and the South Coast.',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: ShieldCheck,
    title: 'NHS & Private',
    description: 'Seamless care across NHS and private pathways, ensuring the right treatment in the right setting for every patient.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Clock,
    title: 'Prompt Access',
    description: 'Short waiting times for private consultations and urgent review pathways for time-sensitive conditions.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
];

export default function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.why-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-brand-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="why-reveal reveal inline-flex items-center gap-2 bg-white text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-brand-border shadow-card mb-4">
            <ShieldCheck size={12} className="text-brand-primary" />
            Why Choose Dr. Amerasinghe
          </div>
          <h2 className="why-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            The Standard of Care You Deserve
          </h2>
          <p className="why-reveal reveal stagger-2 text-brand-soft text-lg max-w-2xl mx-auto leading-relaxed">
            Combining world-class training, leading technology, and a genuinely compassionate
            approach to patient care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className={`why-reveal reveal stagger-${(i % 6) + 1}`}
            >
              <div className="h-full card-hover bg-white rounded-2xl p-7 border border-brand-border shadow-card">
                <div className={`w-12 h-12 rounded-xl ${reason.bg} flex items-center justify-center mb-5`}>
                  <reason.icon size={22} className={reason.color} />
                </div>
                <h3 className="font-bold text-brand-dark text-lg mb-2.5">{reason.title}</h3>
                <p className="text-brand-soft text-sm leading-relaxed">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
