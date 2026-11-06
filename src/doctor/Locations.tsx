import { useEffect, useRef } from 'react';
import { MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { PRACTICE } from './practice';

const full = [PRACTICE.address, PRACTICE.postcode].filter(Boolean).join(', ');
const hasAddress = Boolean(PRACTICE.address && PRACTICE.postcode);
const hasPhone = Boolean(PRACTICE.phone && PRACTICE.phoneHref);

export default function Locations() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.location-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionsBtn = (
    <>
      <Navigation size={18} />
      Get directions
    </>
  );
  const callBtn = (
    <>
      <Phone size={18} />
      Call the practice
    </>
  );

  return (
    <section ref={ref} id="locations" className="py-24 bg-[#f3f2ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="location-reveal reveal inline-flex items-center bg-[#a5b387] text-brand-dark text-xs font-semibold px-4 py-2 rounded-sm mb-4">
            Our practice
          </div>
          <h2 className="location-reveal reveal stagger-1 text-4xl sm:text-5xl font-normal text-brand-dark mb-4 tracking-normal">
            Visit Amera Eyecare
          </h2>
          <p className="location-reveal reveal stagger-2 text-brand-dark font-light text-lg">
            Personal eyecare, in a welcoming space.
          </p>
        </div>

        <div className="location-reveal reveal stagger-3 lc-panel">
          <div className="lc-info">
            <span className="inline-flex self-start bg-[#a5b387] text-brand-dark text-xs font-semibold px-3 py-1.5 rounded-sm">
              Independent eyecare
            </span>
            <h3 className="font-normal text-4xl text-white mt-5 mb-3 tracking-normal leading-tight">Amera Eyecare</h3>
            <p className="font-light text-lg text-[#e7e4de] mb-8">Your visit starts here.</p>

            <ul className="lc-list">
              <li>
                <MapPin size={20} className="lc-ico" aria-hidden="true" />
                <span>{hasAddress ? full : PRACTICE.location || '[Practice address and postcode]'}</span>
              </li>
              <li>
                <Clock size={20} className="lc-ico" aria-hidden="true" />
                <span>{PRACTICE.hours || '[Opening hours]'}</span>
              </li>
              <li>
                <Phone size={20} className="lc-ico" aria-hidden="true" />
                <span>{hasPhone ? <a href={PRACTICE.phoneHref}>{PRACTICE.phone}</a> : '[Phone number]'}</span>
              </li>
            </ul>

            <hr className="lc-rule" />

            <div className="lc-actions">
              {hasAddress ? (
                <a
                  className="lc-btn"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(full)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {directionsBtn}
                </a>
              ) : (
                <button type="button" className="lc-btn" disabled title="Available once the practice address is configured">
                  {directionsBtn}
                </button>
              )}
              {hasPhone ? (
                <a className="lc-btn" href={PRACTICE.phoneHref}>
                  {callBtn}
                </a>
              ) : (
                <button type="button" className="lc-btn" disabled title="Available once the practice phone number is configured">
                  {callBtn}
                </button>
              )}
            </div>
          </div>

          <div className="lc-map">
            {hasAddress ? (
              <iframe
                title={`Map showing the location of Amera Eyecare, ${full}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(full)}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="lc-ph" role="img" aria-label="Map preview — location to be confirmed">
                <svg className="lc-grid" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" fill="none" stroke="#d9d5cd" strokeWidth="6">
                  <path d="M-10 90 H410 M-10 200 H410 M120 -10 V310 M280 -10 V310 M-10 250 L200 120 L410 40" />
                </svg>
                <div className="lc-pin" aria-hidden="true">
                  <MapPin size={56} strokeWidth={1.75} />
                </div>
                <p className="lc-ph-text font-semibold text-sm">Map preview — location to be confirmed</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
