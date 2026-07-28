import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Phone, ExternalLink, Navigation } from 'lucide-react';

const locations = [
  {
    id: 'nuffield',
    name: 'Wessex Nuffield Hospital',
    type: 'Private',
    address: "Winchester Road, Chandler's Ford, Eastleigh, Hampshire, SO53 2DW",
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      "https://www.google.com/maps?ll=50.995072,-1.362025&z=14&t=m&hl=en-US&gl=US&mapclient=embed&q=SO53+2DW+Chandler%27s+Ford+Eastleigh",
    iframeSrc: "https://maps.google.com/maps?q=Winchester%20Road,%20Chandler's%20Ford,%20Eastleigh,%20SO53%202DW&t=&z=14&ie=UTF8&iwloc=&output=embed",
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    img: 'https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'spire',
    name: 'Spire Healthcare Southampton',
    type: 'Private',
    address: 'Chalybeate Close, Southampton, SO16 6UY',
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      'https://google.com/maps?ll=50.930266,-1.432487&z=15&t=m&hl=en&gl=GB&mapclient=embed&cid=17109593531270908050',
    iframeSrc: "https://maps.google.com/maps?q=Chalybeate%20Close,%20Southampton,%20SO16%206UY&t=&z=14&ie=UTF8&iwloc=&output=embed",
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
    img: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'nhs',
    name: 'Southampton Eye Unit',
    type: 'NHS',
    address: 'University Hospital, Southampton, Hampshire, SO16 6YD',
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      'https://www.google.com/maps?ll=50.933019,-1.435104&z=15&t=m&hl=en-US&gl=US&mapclient=embed&q=SO16+6YD+Southampton',
    iframeSrc: "https://maps.google.com/maps?q=University%20Hospital,%20Southampton,%20SO16%206YD&t=&z=14&ie=UTF8&iwloc=&output=embed",
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    img: 'https://images.pexels.com/photos/1692693/pexels-photo-1692693.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'laservision',
    name: 'LaserVision Prema Portsmouth',
    type: 'Independent',
    address: 'Compass Road, North Harbour Business Park, Portsmouth, PO6 4RP',
    hours: 'Appointments via secretary',
    phone: '0330 1185037',
    mapUrl:
      'https://www.google.com/maps?ll=50.84495,-1.093084&z=15&t=m&hl=en&gl=GB&mapclient=embed&cid=9990544906308702884',
    iframeSrc: "https://maps.google.com/maps?q=Compass%20Road,%20North%20Harbour%20Business%20Park,%20Portsmouth,%20PO6%204RP&t=&z=14&ie=UTF8&iwloc=&output=embed",
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
    img: 'https://images.pexels.com/photos/127873/pexels-photo-127873.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Locations() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState(locations[0].id);

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

  const activeLoc = locations.find((l) => l.id === selectedId) || locations[0];

  return (
    <section id="locations" ref={ref} className="py-24 bg-brand-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="loc-reveal reveal inline-flex items-center gap-2 bg-white text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-brand-border shadow-card mb-4">
            <MapPin size={12} className="text-brand-primary" />
            Clinic Locations
          </div>
          <h2 className="loc-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            Convenient Locations Across the South
          </h2>
          <p className="loc-reveal reveal stagger-2 text-brand-soft text-lg max-w-2xl mx-auto">
            Seeing patients at leading NHS and private hospital clinics across Southampton, Chandler's Ford, and Portsmouth.
          </p>
        </div>

        {/* Tabbed Hospital Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setSelectedId(loc.id)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedId === loc.id
                  ? 'bg-brand-primary text-white shadow-button scale-105'
                  : 'bg-white text-brand-dark hover:bg-blue-50 border border-brand-border'
              }`}
            >
              <Navigation size={14} />
              {loc.name}
            </button>
          ))}
        </div>

        {/* Interactive Selected Location Card with Embedded Map */}
        <div className="bg-white rounded-3xl border border-brand-border shadow-float overflow-hidden p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Location Meta Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeLoc.badge}`}>
                  {activeLoc.type} Clinic
                </span>
                <span className="text-xs text-brand-soft">Hampshire & South Coast</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-3 leading-tight">
                  {activeLoc.name}
                </h3>
                <p className="text-brand-soft text-sm flex items-start gap-2 leading-relaxed">
                  <MapPin size={16} className="text-brand-primary mt-1 flex-shrink-0" />
                  {activeLoc.address}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-brand-border">
                <div className="flex items-center gap-3 text-sm text-brand-dark">
                  <Clock size={16} className="text-brand-primary flex-shrink-0" />
                  <span><strong>Schedule:</strong> {activeLoc.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-brand-dark">
                  <Phone size={16} className="text-brand-primary flex-shrink-0" />
                  <span><strong>Inquiries:</strong> {activeLoc.phone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={activeLoc.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-xs py-3 px-5"
                >
                  Get Directions <ExternalLink size={14} />
                </a>
                <a
                  href="tel:+442380000000"
                  className="btn-secondary text-xs py-3 px-5"
                >
                  Call Secretary <Phone size={14} />
                </a>
              </div>
            </div>

            {/* Embedded Google Map Iframe */}
            <div className="lg:col-span-7 h-[300px] sm:h-[380px] rounded-2xl overflow-hidden border border-brand-border shadow-inner">
              <iframe
                title={activeLoc.name}
                src={activeLoc.iframeSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>

        {/* All Location Cards Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {locations.map((loc) => (
            <div
              key={loc.id}
              onClick={() => setSelectedId(loc.id)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                selectedId === loc.id
                  ? 'border-brand-primary bg-blue-50/60 shadow-md ring-2 ring-brand-primary/20'
                  : 'border-brand-border bg-white hover:border-blue-200'
              }`}
            >
              <div className="font-bold text-brand-dark text-sm mb-1 line-clamp-1">{loc.name}</div>
              <div className="text-xs text-brand-soft flex items-center gap-1">
                <MapPin size={12} className="text-brand-primary flex-shrink-0" />
                <span className="truncate">{loc.address}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}