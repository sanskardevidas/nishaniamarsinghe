import { useState } from 'react';
import type { FocusEvent } from 'react';
import { Link } from 'react-router-dom';
import atRisk from '../../assets/images/atRisk.jpg';

export default function Clarity() {
  const [swapped, setSwapped] = useState(false);
  const [suppress, setSuppress] = useState(false);

  const toggle = () => {
    if (swapped) {
      setSwapped(false);
      setSuppress(true);
    } else {
      setSwapped(true);
    }
  };
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSuppress(false);
  };

  return (
    <section className="clarity" id="everyday-clarity">
      <h2>Find your everyday clarity.</h2>
      <div className="cl-grid">
        <div className="cl-img">
          <div className="cl-photo">
            <img
              src={atRisk}
              alt="An optometrist examining a patient's eyes with a slit lamp in a bright consulting room"
            />
          </div>
        </div>
        <div
          className={`cl-cards${swapped ? ' is-swapped' : ''}${suppress ? ' suppress' : ''}`}
          onMouseLeave={() => setSuppress(false)}
          onBlur={onBlur}
        >
          <article className="fy fy-t">
            <button
              type="button"
              className="pick"
              aria-pressed={swapped}
              aria-label="Select Glasses, with personality"
              onClick={toggle}
            ></button>
            <h3>Glasses, with personality.</h3>
            <p>Frames you love. Lenses for the way you live.</p>
            <div className="go">
              <Link to="/services#eyewear-styling">
                <b>Explore eyewear</b>
              </Link>
            </div>
            <span className="arr2" aria-hidden="true"></span>
          </article>
          <article className="fy fy-n">
            <button
              type="button"
              className="pick"
              aria-pressed={swapped}
              aria-label="Select Freedom to see differently"
              onClick={toggle}
            ></button>
            <h3>Freedom to see differently.</h3>
            <p>Contact lenses fitted around your eyes and your routine.</p>
            <div className="go">
              <Link to="/services#contact-lenses">
                <b>Explore contact lenses</b>
              </Link>
            </div>
            <span className="arr2" aria-hidden="true"></span>
          </article>
        </div>
      </div>
    </section>
  );
}
