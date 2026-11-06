import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="brands" id="eyewear-brands">
      <div className="bw-head">
        <h2>Frames worth discovering.</h2>
        <p>Find a style that feels like you.</p>
      </div>
      <div className="bw-strip">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            type="button"
            className="bw"
            aria-pressed={selected === i}
            aria-label="Brand logo placeholder"
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <span className="bw-logo">Brand logo</span>
          </button>
        ))}
      </div>
      <div className="bw-foot">
        <Link to="/services#eyewear-styling">
          <b>Explore our eyewear</b>
          <span className="ia" aria-hidden="true"></span>
        </Link>
      </div>
    </section>
  );
}
