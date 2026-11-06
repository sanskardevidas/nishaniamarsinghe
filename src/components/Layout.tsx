import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ScrollManager from './ScrollManager';
import logo from '../assets/images/amera-logo.svg';
import logoReversed from '../assets/images/amera-logo-reversed.svg';
import { PRACTICE } from '../doctor/practice';

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <div className="util">
        <span>A warm welcome to new patients</span>
        <div>
          <span>{PRACTICE.hours}</span>
          <a href={PRACTICE.phoneHref}>{PRACTICE.phone}</a>
        </div>
      </div>
      <nav>
        <input
          type="checkbox"
          id="tg"
          aria-hidden="true"
          checked={open}
          onChange={(e) => setOpen(e.target.checked)}
        />
        <Link className="logo" to="/" aria-label="Amera Eyecare, home" onClick={close}>
          <img src={logo} alt="" />
        </Link>
        <label className="burger" htmlFor="tg" aria-label="Menu">
          <i></i>
          <i></i>
          <i></i>
        </label>
        <div className="menu">
          <div className="links">
            <a>About us</a>
            <a>Eyecare</a>
            <Link to="/services#eyewear-styling" onClick={close}>Eyewear</Link>
            <Link to="/services#contact-lenses" onClick={close}>Contact lenses</Link>
            <a>Contact</a>
          </div>
          <Link className="btn nbtn" to="/book-appointment" onClick={close}>
            Book an appointment
          </Link>
        </div>
      </nav>
    </>
  );
}

function Footer() {
  return (
    <footer className="ft" id="site-footer">
      <div className="ft-grid">
        <div className="ft-brand">
          <img className="ft-logo" src={logoReversed} alt="Amera Eyecare" width={180} />
          <p className="ft-tag">
            Personal eyecare.
            <br />A familiar face.
          </p>
          <p className="ft-sup">Independent eyecare, centred around you.</p>
        </div>
        <nav aria-label="Footer">
          <h3>Explore</h3>
          <ul>
            <li><Link to="/services">Our services</Link></li>
            <li><Link to="/#eyewear-brands">Eyewear</Link></li>
            <li><Link to="/#everyday-clarity">Contact lenses</Link></li>
            <li><Link to="/#familiar-faces">Meet the team</Link></li>
            <li><Link to="/#eyecare-journal">Eyecare journal</Link></li>
          </ul>
        </nav>
        <div>
          <h3>Visit us</h3>
          <address>
            Amera Eyecare
            <br />
            {PRACTICE.location}
          </address>
          <span className="ft-ph">
            Get directions <span className="ia" aria-hidden="true"></span>
          </span>
        </div>
        <div>
          <h3>Get in touch</h3>
          <p className="ft-det"><a href={PRACTICE.phoneHref}>{PRACTICE.phone}</a></p>
          <p className="ft-det"><a href={`mailto:${PRACTICE.email}`}>{PRACTICE.email}</a></p>
          <p className="ft-sub">Opening hours</p>
          <p className="ft-det">{PRACTICE.hours}</p>
        </div>
      </div>
      <div className="ft-bot">
        <span>&copy; Amera Eyecare {new Date().getFullYear()}</span>
        <span className="pol">
          <span>Privacy policy</span>
          <span>Cookie policy</span>
        </span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
