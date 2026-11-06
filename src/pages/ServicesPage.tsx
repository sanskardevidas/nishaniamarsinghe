import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';

export default function ServicesPage() {
  useEffect(() => {
    document.title = 'Our services | Amera Eyecare';
  }, []);
  return (
    <main>
      <section className="pg-hero">
        <p className="pg-lbl">Our services</p>
        <h1>Services made for you</h1>
        <p className="pg-intro">
          Independent eyecare, centred around you. Explore what we offer, then book when you are
          ready.
        </p>
        <nav className="pg-jump" aria-label="Services on this page">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.title}
            </a>
          ))}
        </nav>
      </section>
      {services.map((s, i) => (
        <section
          key={s.id}
          className={`svc${i % 2 ? ' svc-alt' : ''}`}
          id={s.id}
          aria-labelledby={`${s.id}-h`}
        >
          <div className="svc-grid">
            <div className="svc-img">
              <div className="svc-ph">
                {s.image ? (
                  <img src={s.image} alt={s.imageAlt} />
                ) : (
                  <div className="ph">Image placeholder</div>
                )}
              </div>
            </div>
            <div className="svc-txt">
              <h2 id={`${s.id}-h`}>{s.title}</h2>
              <p className="svc-intro">{s.intro}</p>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link className="btn pbtn" to="/book-appointment">
                {s.cta}
              </Link>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
