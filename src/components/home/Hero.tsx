import { Link } from 'react-router-dom';
import nishani from '../../assets/images/nishani.jpg';

export default function Hero() {
  return (
    <section className="hero">
      <div className="copy">
        <h1>
          A clearer view.
          <br />
          A more personal
          <br />
          approach.
        </h1>
        <p className="sub">
          Thoughtful eyecare and carefully chosen eyewear, centred around you.
        </p>
        <div className="acts">
          <Link className="btn pbtn" to="/book-appointment">Book an eye test</Link>
          <Link className="btn sbtn" to="/#services">Discover our services</Link>
        </div>
      </div>
      <div className="imgwrap">
        <img className="imgfill" src={nishani} alt="Dr. Nishani Amerasinghe" />
      </div>
    </section>
  );
}
