import { useEffect, useRef } from 'react';
import { MapPin, Clock, Phone, ExternalLink } from 'lucide-react';

const locations = [
  {
    name: 'Wessex Nuffield Hospital',
    type: 'Private',
    address: "Winchester Road, Chandler's Ford, Eastleigh, Hampshire, SO53 2DW",
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      "https://www.google.com/maps?ll=50.995072,-1.362025&z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=SO53+2DW+Chandler%27s+Ford+Eastleigh",
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    img: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Spire Healthcare Southampton',
    type: 'Private',
    address: 'Chalybeate Close, Southampton, SO16 6UY',
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      'https://google.com/maps?ll=50.930266,-1.432487&z=15&t=m&hl=en&gl=GB&mapclient=embed&cid=17109593531270908050',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    img: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Southampton Eye Unit',
    type: 'NHS',
    address: 'University Hospital, Southampton, Hampshire, SO16 6YD',
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      'https://www.google.com/maps?ll=50.933019,-1.435104&z=15&t=m&hl=en-US&gl=US&mapclient=embed&q=SO16+6YD+Southampton',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    img: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'LaserVision Prema Portsmouth',
    type: 'Independent',
    address: 'Compass Road, North Harbour Business Park, Portsmouth, PO6 4RP',
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      'https://www.google.com/maps?ll=50.84495,-1.093084&z=15&t=m&hl=en&gl=GB&mapclient=embed&cid=9990544906308702884',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    img: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Locations() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.loc-reveal');
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
    <section id="locations" ref={ref} className="py-24 bg-brand-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="loc-reveal reveal inline-flex items-center gap-2 bg-white text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-brand-border shadow-card mb-4">
            <MapPin size={12} className="text-brand-primary" />
            Clinic Locations
          </div>
          <h2 className="loc-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            Convenient Locations Across the South
          </h2>
          <p className="loc-reveal reveal stagger-2 text-brand-soft text-lg max-w-2xl mx-auto">
            Seeing patients at leading NHS and private hospitals across Southampton and the South Coast
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <div key={i} className={`loc-reveal reveal stagger-${i + 1}`}>
              <div className="h-full card-hover bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={loc.img}
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                  <span className={`absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full border ${loc.badge}`}>
                    {loc.type}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-brand-dark text-base mb-3 leading-tight">
                    {loc.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-brand-soft text-sm">
                      <MapPin size={13} className="text-brand-primary mt-0.5 flex-shrink-0" />
                      <span>{loc.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-brand-soft text-sm">
                      <Clock size={13} className="text-brand-primary flex-shrink-0" />
                      <span>{loc.hours}</span>
                    </div>

                    <div className="flex items-center gap-2 text-brand-soft text-sm">
                      <Phone size={13} className="text-brand-primary flex-shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>

                  <a
                    href={loc.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full text-center text-brand-primary text-sm font-semibold flex items-center justify-center gap-1.5 hover:gap-2.5 transition-all"
                  >
                    Get Directions <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}