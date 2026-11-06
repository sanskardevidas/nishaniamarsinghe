import { Link } from 'react-router-dom';

export default function BookBanner() {
  return (
    <section className="book" id="book-eye-test">
      <div className="bk-grid">
        <div className="bk-txt">
          <h2>Your next step to clearer vision.</h2>
          <p>Personal eyecare starts with a conversation.</p>
        </div>
        <Link className="btn pbtn bk-btn" to="/book-appointment">Book an eye test</Link>
      </div>
    </section>
  );
}
