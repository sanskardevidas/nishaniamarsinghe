import { useEffect, useRef } from 'react';
import { Award, Users, Building2, Zap } from 'lucide-react';

const items = [
  { icon: Award, value: '10+', label: 'Years Experience' },
  { icon: Users, value: '5,000+', label: 'Patients Treated' },
  { icon: Building2, value: 'NHS', label: 'Consultant' },
  { icon: Zap, value: 'MIGS', label: 'Advanced Treatment' },
];

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = ref.current?.querySelectorAll('.trust-card');
            cards?.forEach((card, i) => {
              setTimeout(() => card.classList.add('visible'), i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative z-10 -mt-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-float border border-brand-border p-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {items.map(({ icon: Icon, value, label }, i) => (
              <div
                key={i}
                className="trust-card reveal card-hover flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className="text-brand-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <div className="font-bold text-brand-dark text-xl leading-tight">{value}</div>
                  <div className="text-xs text-brand-soft">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
