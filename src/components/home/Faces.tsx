import about2 from '../../assets/images/about2.jpg';

export default function Faces() {
  return (
    <section className="faces" id="familiar-faces">
      <div className="fc-grid">
        <div className="fc-img">
          <div className="fc-ph">
            <img
              src={about2}
              alt="A smiling optometrist in a white coat working at a laptop in a bright clinic, with colleagues in the background"
            />
          </div>
        </div>
        <div className="fc-txt">
          <div className="fc-lbl">The people behind Amera</div>
          <h2>Familiar faces. Personal care.</h2>
          <p>
            We believe good eyecare starts with getting to know you. Meet the people who will
            welcome you, listen to your needs and help you feel at ease.
          </p>
          <div className="go2">
            <a href="#placeholder-meet-the-team">
              <b>Meet the team</b>
              <span className="ia" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
