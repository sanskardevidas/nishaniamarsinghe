import { useState } from 'react';
import { Link } from 'react-router-dom';
import about1 from '../../assets/images/about1.jpg';
import { services } from '../../data/services';

export default function ServicesSection() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="services" id="services">
      <div className="sv-head">
        <h2>Services made for you</h2>
        <Link className="all" to="/services">All services</Link>
      </div>
      <div className="sv-grid">
        <article className="feat">
          <div className="ph">
            <img src={about1} alt="" />
          </div>
          <div className="tx">
            <h3>
              Care that starts <br />
              with you
            </h3>
            <p>Explore our eyecare services.</p>
            <div className="go">
              <Link className="fa" to="/services">
                Find out more <span className="ia" aria-hidden="true"></span>
              </Link>
            </div>
          </div>
        </article>
        <div className="rows">
          {services.map((s, i) => (
            <article key={s.id} className={`row${selected === i ? ' is-selected' : ''}`}>
              <button
                type="button"
                className="pick"
                aria-pressed={selected === i}
                aria-label={`Select ${s.title}`}
                onClick={() => setSelected(i)}
              ></button>
              <div>
                <h3>{s.title}</h3>
                <div className="go">
                  <Link to={`/services#${s.id}`}>
                    <b>Find out more</b>
                  </Link>
                </div>
              </div>
              <span className="arr" aria-hidden="true"></span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
