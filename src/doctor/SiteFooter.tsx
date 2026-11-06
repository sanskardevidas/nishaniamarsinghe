import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import logo from '../assets/images/amera-logo-reversed.svg';
import { services } from '../data/services';
import { PRACTICE } from './practice';

// Contact details come from the shared practice config.
const PHONE_TEXT = PRACTICE.phone;
const PHONE_HREF = PRACTICE.phoneHref;
const EMAIL = PRACTICE.email;

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our practice', href: '#locations' },
  { label: 'Contact', href: '#appointment' },
];

const serviceLinks = [
  { label: 'Eye examinations', id: 'eye-examinations' },
  { label: 'Contact lenses', id: 'contact-lenses' },
  { label: 'Eyewear styling', id: 'eyewear-styling' },
  { label: 'Ongoing eyecare', id: 'ongoing-eyecare' },
].filter((l) => services.some((s) => s.id === l.id));

const hasAddress = Boolean(PRACTICE.address && PRACTICE.postcode);
const directionsHref = hasAddress
  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${PRACTICE.address}, ${PRACTICE.postcode}`)}`
  : '#locations'; // no confirmed map destination yet: send visitors to the practice section

export default function SiteFooter() {
  return (
    <footer className="fo">
      <div className="fo-wrap">
        <div className="fo-grid">
          <div className="fo-col">
            <img className="fo-logo" src={logo} alt="Amera Eyecare" width={160} height={75} />
            <p className="fo-desc">Thoughtful eyecare. A more personal approach.</p>
            <ul className="fo-list">
              <li>
                <Phone size={18} className="fo-ico" aria-hidden="true" />
                <a href={PHONE_HREF}>{PHONE_TEXT}</a>
              </li>
              <li>
                <Mail size={18} className="fo-ico" aria-hidden="true" />
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <MapPin size={18} className="fo-ico" aria-hidden="true" />
                <span>{PRACTICE.location}</span>
              </li>
            </ul>
          </div>

          <nav className="fo-col" aria-label="Quick links">
            <h2 className="fo-h">Quick links</h2>
            <ul className="fo-nav">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="fo-col" aria-label="Eyecare services">
            <h2 className="fo-h">Eyecare services</h2>
            <ul className="fo-nav">
              {serviceLinks.map((l) => (
                <li key={l.id}>
                  <Link to={`/services#${l.id}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="fo-col">
            <h2 className="fo-h">Visit Amera</h2>
            <p className="fo-name">Amera Eyecare</p>
            <p className="fo-desc fo-loc">{PRACTICE.location}</p>
            {PRACTICE.hours && <p className="fo-desc fo-loc">{PRACTICE.hours}</p>}
            <a className="fo-dir" href={directionsHref} {...(hasAddress ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <span>Get directions</span>
              <ArrowRight size={18} aria-hidden="true" className="fo-arrow" />
            </a>
            <a className="fo-book" href="#appointment">
              Book an appointment
            </a>
          </div>
        </div>

        <div className="fo-bottom">
          <p>© {new Date().getFullYear()} Amera Eyecare. All rights reserved.</p>
          {/* No privacy or terms pages exist yet, so these are text only: no fake links. */}
          <p className="fo-legal">
            <span>Privacy policy</span>
            <span>Terms &amp; conditions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
