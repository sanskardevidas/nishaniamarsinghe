import { useCountUp } from '../hooks/useCountUp';

function MetricCard({ target, suffix, label, description, delay = 0 }: {
  target: number;
  suffix: string;
  label: string;
  description: string;
  delay?: number;
}) {
  const { count, ref } = useCountUp(target, 2000);

  return (
    <div
      ref={ref}
      className="reveal text-center p-8"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="text-5xl sm:text-6xl font-bold gradient-text mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="font-semibold text-brand-dark text-lg mb-2">{label}</div>
      <div className="text-brand-soft text-sm max-w-xs mx-auto leading-relaxed">{description}</div>
    </div>
  );
}

export default function Metrics() {
  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="reveal text-4xl font-bold text-brand-dark mb-3 tracking-tight">
            Trusted by Patients Across the South Coast
          </h2>
          <p className="reveal stagger-1 text-brand-soft text-lg">
            A track record built on clinical excellence and outstanding patient outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
          {[
            { target: 10, suffix: '+', label: 'Years Experience', description: 'Over a decade of specialist ophthalmic practice in the UK', delay: 0 },
            { target: 5000, suffix: '+', label: 'Patients Treated', description: 'Thousands of patients who trust us with their vision care', delay: 0.1 },
            { target: 4, suffix: '', label: 'Hospital Locations', description: 'Across NHS and leading private hospitals in South England', delay: 0.2 },
            { target: 98, suffix: '%', label: 'Patient Satisfaction', description: 'Based on post-treatment patient feedback and reviews', delay: 0.3 },
          ].map((metric, i) => (
            <div key={i} className={`${i < 3 ? 'border-b lg:border-b-0 lg:border-r border-brand-border' : ''} sm:${i === 1 ? 'border-r' : ''}`}>
              <MetricCard {...metric} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
