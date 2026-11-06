import { Link } from 'react-router-dom';
import nishani2 from '../../assets/images/nishani2.jpg';

export default function Personal() {
  return (
    <section className="personal" id="personal-approach">
      <div className="pa-grid">
        <div className="pa-text">
          <div className="pa-lbl">Eyecare, made personal</div>
          <h2>Time for you. Care for your eyes.</h2>
          <p>
            From your first eye test to finding frames you love, we take time to listen, explain
            and help you feel at ease.
          </p>
          <Link className="btn pbtn" to="/book-appointment">Book an eye test</Link>
        </div>
        <div className="pa-img">
          <div className="pa-ph">
            <img src={nishani2} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
