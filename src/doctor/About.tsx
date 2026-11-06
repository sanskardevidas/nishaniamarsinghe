import { useEffect, useRef, useState } from 'react';
import aboutImg from '../assets/images/about.jpg';
import about1 from '../assets/images/about1.jpg';
import about2 from '../assets/images/about2.jpg';
import about3 from '../assets/images/about3.jpg';
import {
  CheckCircle,
  Award,
  Stethoscope,
  Building2,
  ArrowRight,
  X,
  GraduationCap,
  BookOpen,
  Mic,
  FileText,
  ExternalLink,
} from 'lucide-react';

const expertisePoints = [
  'Full-time Consultant Ophthalmic Surgeon at University Hospital Southampton NHS Foundation Trust',
  'Specialising in Glaucoma and Cataract Surgery',
  'Expert in SLT, trabeculectomy, tube surgery, and MIGS',
  'Complex cataract surgeon using innovative modern techniques',
  'President of the UK & Eire Glaucoma Society',
  'Thousands of cataract and glaucoma procedures with a very low complication rate',
];

const hospitals = [
  {
    name: 'Southampton University Hospital Trust',
    role: 'Consultant Eye Surgeon & Glaucoma Lead',
    type: 'NHS',
    color: 'bg-brand-dark text-white border-brand-dark',
  },
  {
    name: 'Nuffield Health Wessex Hospital',
    role: 'Private Consultant',
    type: 'Private',
    color: 'bg-brand-primary text-black border-brand-primary',
  },
  {
    name: 'Spire Southampton Hospital',
    role: 'Private Consultant',
    type: 'Private',
    color: 'bg-[#a5b387] text-brand-dark border-[#a5b387]',
  },
  {
    name: 'Practice Plus Group Hospital Portsmouth',
    role: 'Private Consultant',
    type: 'Private',
    color: 'bg-[#e07856] text-brand-dark border-[#e07856]',
  },
];

const qualifications = [
  'BSc (Hons) — University of London, 1995',
  'MB BS — University of London, 1998',
  'MRCOphth — London, 2002',
  'FRCOphth — London, 2011',
];

const memberships = [
  'General Medical Council',
  'Fellow of the Royal College of Ophthalmologists',
  'British Medical Association',
  'Medical Defence Union',
  'UK & Eire Glaucoma Society',
];

const aboutSections = [
  {
    heading: 'About Ms Amerasinghe',
    image: about1,
    content: [
      'Ms Amerasinghe is a full time Consultant Ophthalmic Surgeon based at the University Hospital Southampton NHS Foundation Trust, specialising in Glaucoma and Cataract Surgery.',
      'She is one of the leading experts in Glaucoma in the UK, employing the latest medical and surgical techniques including lasers (SLT), conventional glaucoma surgery (tube and trabeculectomy), and minimally invasive glaucoma surgery (MIGS). She is also an expert complex cataract surgeon using the latest innovative techniques.',
      'The role of President of the UK & Eire Glaucoma Society is a testament to the respect Ms Amerasinghe holds within the Glaucoma speciality. She is working hard to promote the exchange of knowledge between glaucoma specialists, stimulate glaucoma research, promote the sub-speciality to trainees, and protect the interests of those touched by glaucoma.',
    ],
  },
  {
    heading: 'Experience, Training & Research',
    image: about2,
    content: [
      'Ms Amerasinghe has been performing cataract and glaucoma surgery for more than 20 years, having done thousands of procedures with a very low complication rate.',
      'She graduated from the Imperial College School of Medicine at St Mary’s, London, in 1998.',
      'She trained on the Wessex Ophthalmology Rotation where she additionally completed an Advanced Speciality (Glaucoma) Training Opportunity between Southampton and Portsmouth Hospitals.',
      'Subsequently, she undertook a further 2 years advanced training as a Clinical Glaucoma Research Fellow at the world renowned Singapore National Eye Centre, and a Clinical Glaucoma fellowship at the internationally acclaimed Moorfields Eye Hospital, London.',
      'Her research projects include a large study into the Heritability of Primary Angle Closure Glaucoma, a joint project with Singapore National Eye Centre and the Institute of Ophthalmology, University College London.',
      'Recently she authored the British Medical Journal Best Practice of Primary Open Angle Glaucoma 2023 and is currently the principal investigator of a large multi-centre research project looking at real-world data in Open Angle Glaucoma Management.',
    ],
  },
  {
    heading: 'Teaching, Recognition & Media',
    image: about3,
    content: [
      'Teaching and training are a major passion, both locally with trainees and allied healthcare professionals, and internationally with peers. This includes training on the West African College of Surgeons / Moorfields Trabeculectomy Course in Ghana and The Alcon Basic Glaucoma Surgical Course in Barcelona.',
      'This dedication is reflected in the consistently high feedback scores Ms Amerasinghe receives.',
      'She has won academic scholarships and prizes throughout her career, published many papers, and reviewed for major Ophthalmology journals.',
      'Ms Amerasinghe is invited regularly to speak at national and international meetings, especially on Angle Closure and the surgical treatment of Glaucoma.',
      'She can be found on the General Medical Council Specialist Register for Ophthalmology.',
      'She recently undertook the Everest in Alps 2023 endurance challenge to raise money and awareness for Glaucoma, and is often invited to do media interviews on eyecare and glaucoma, including Mail on Sunday, Sky News, ITV, BBC Radio, and others.',
      'She is happily married with three children.',
    ],
  },
];

const internationalLectures = [
  'More than Meets the Eye — Speaker, Singapore, September 2023',
  'More than Meets the Eye — Speaker, Singapore, August 2023',
  'Pigment Dispersion; Glaucoma in Young Patients — World Glaucoma Congress, Rome, June 2023',
  'What is XEN and how to perform XEN implantation (Dry Lab) — World Glaucoma Conference, Helsinki, 2017',
  'XEN - My Experience — World Glaucoma Conference, Helsinki, 2017',
  'Primary Angle Closure Genetics — Moorfields International Glaucoma Symposium, London, January 2016',
  'Refractive Lens Surgery, making the jump — UKICRS Cornea & Cataract Day, Birmingham, 2016',
  'Cataract Surgery to Refractive Lens Surgery Stepping Up — Topcon User Group Meeting, London, 2015',
  'Out of the Frying Pan into the Fire — Moorfields International Glaucoma Symposium, London, 2015',
  'Dragon’s Den - Complex Glaucoma — Moorfields International Glaucoma Symposium (MIGS), Royal College of Physicians, London, 2012',
  'Sibling Risk of Narrow Angles in Asian Patients with Primary Angle Closure Glaucoma or Acute Primary Angle Closure — ARVO, USA, 2009',
  'Retinal Vascular Caliber and Glaucoma in Asians: The Singapore Malay Eye Study — SNEC International Meeting, Singapore, 2008 (Best Poster)',
  'Variation of Angle Parameters in Asians: An Anterior Segment Optical Coherence Tomography Study in a Population of Singapore Malays — ARVO, USA, 2008 (Award Winner)',
  'Determinants of Optic Cup-to-Disc Ratio in an Asian Population: The Singapore Malay Eye Study — Asia Pacific Association of Cataract and Refractive Surgeons Congress, Vietnam, 2007',
];

const nationalLectures = [
  'Wessex Glaucoma Forum — Chair, September 2023',
  'Trabecular Bypass Update — Co-Chair & Presenter, September 2023',
  'Wessex Preserflo Meeting — Chair, May 2023',
  'Cataract and Minimally Invasive Glaucoma Surgery Scope Meeting — May 2023',
  'Artificial Intelligence in Glaucoma — Chair, UK & Ireland Glaucoma Society Meeting, October 2022',
  'Cataract Patient Information Evening — October 2022',
  'Ocular Surface Disease — Optometry Event, October 2022',
  'Glaucoma for Patients — Glaucoma UK Conference, September 2022',
  'Selective Laser Trabeculoplasty — Optometry Event, September 2022',
  'A Career in Ophthalmology — Sixth Form Event, June 2022',
  'What is XEN, and the Art of Glaucoma Management — SAS Update Meeting, London, 2017',
  'Steroid Response in Glaucoma — SAS Update Meeting, London, 2017',
  'XEN User Group - What Have We Learnt About the Bleb? — London, 2017',
  'Itchy and Scratchy in Glaucoma — Southampton, 2017',
  'Steroid Response — Wessex Regional Retinal Meeting, 2016',
  'Primary Angle Closure — Undergraduate Optometry MSc Course, Manchester University, 2016',
  'Glaucoma Regional Study Day — Chairperson, Salisbury, 2014',
  'The Heritability and Sibling Risk of Narrow Angles — UK Angle Closure Association Meeting, Birmingham, 2010',
  'Increased Peripheral Iris Thickness and Association with Primary Angle Closure Glaucoma — UK Angle Closure Association Meeting, Birmingham, 2010',
  'A Singapore Fling – Research and Work at Singapore National Eye Centre — Glaucoma Regional Study Day, Salisbury, 2009',
  'Numerous talks to local GPs, patient groups and optometrists',
];

const bookChapters = [
  'Angle closure glaucoma. Perera SA, Amerasinghe N, Aung T. In: Levin L and Albert D (eds). Ocular Disease: Mechanisms and Management. Elsevier Publications, 2010: Chapter 25, Page 193-9.',
  'Angle-closure: risk factors, diagnosis and treatment. Amerasinghe N, Aung T. In: Nucci C, Cerulli L, Osbourne NN, Bagetta G (eds). Glaucoma an Open-Window to Neurodegeneration and Neuroprotection. Elsevier Publications, 2008: Chapter 4, Page 31-47.',
  'Open Angle Glaucoma Best Practice. Amerasinghe N. Author 2015 - Present.',
];

const pubmedLink = 'https://pubmed.ncbi.nlm.nih.gov/?term=amerasinghe+n';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openPublicationsModal, setOpenPublicationsModal] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.about-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!openModal && !openPublicationsModal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPublicationsModal(false);
        setOpenModal(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openModal, openPublicationsModal]);

  useEffect(() => {
    if (openModal || openPublicationsModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openModal, openPublicationsModal]);

  return (
    <>
      <section id="about" ref={ref} className="py-24 bg-[#f3f2ef]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="about-reveal reveal-left relative order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-[#a5b387] rounded-3xl" />

                <div className="relative rounded-3xl overflow-hidden shadow-float">
                  <img
                    src={aboutImg}
                    alt="Ms Nishani Amerasinghe"
                    className="w-full h-[680px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                <div className="absolute -bottom-6 -right-6 bg-brand-dark text-white rounded-2xl shadow-float border border-brand-dark p-5 max-w-[240px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={18} className="text-white" />
                    <span className="font-bold text-white text-sm">Professional Focus</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-white">Glaucoma</div>
                    <div className="text-xs text-white">Cataract Surgery</div>
                    <div className="text-xs text-white">MIGS</div>
                  </div>
                </div>

                <div className="absolute top-8 -right-4 bg-white rounded-2xl shadow-float border border-brand-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope size={16} className="text-brand-primary" />
                    <span className="font-semibold text-brand-dark text-xs">Glaucoma Specialist</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="about-reveal reveal mb-4">
                <span className="inline-flex items-center gap-2 bg-[#e9eddf] text-brand-dark text-xs font-semibold px-4 py-2 rounded-full border border-[#a5b387]">
                  About Ms Amerasinghe
                </span>
              </div>

              <h2 className="about-reveal reveal stagger-1 text-4xl font-bold text-brand-dark mb-5 tracking-tight leading-tight">
                Dedicated to Excellence in
                <span className="gradient-text"> Ophthalmic Care</span>
              </h2>

              <p className="about-reveal reveal stagger-2 text-brand-dark leading-relaxed mb-4">
                Ms Amerasinghe is a full time Consultant Ophthalmic Surgeon based at the University
                Hospital Southampton NHS Foundation Trust, specialising in Glaucoma and Cataract Surgery.
              </p>

              <p className="about-reveal reveal stagger-3 text-brand-dark leading-relaxed mb-4">
                She is one of the leading experts in Glaucoma in the UK, employing the latest medical
                and surgical techniques including lasers (SLT), conventional glaucoma surgery
                (tube and trabeculectomy), and minimally invasive glaucoma surgery (MIGS).
              </p>

              <p className="about-reveal reveal stagger-4 text-brand-dark leading-relaxed mb-7">
                Ms Amerasinghe has been performing cataract and glaucoma surgery for more than 20 years,
                having done thousands of procedures with a very low complication rate.
              </p>

              <div className="about-reveal reveal stagger-5 space-y-2.5 mb-8">
                {expertisePoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-brand-primary flex-shrink-0" />
                    <span className="text-sm text-brand-dark">{point}</span>
                  </div>
                ))}
              </div>

              <div className="about-reveal reveal stagger-6 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 size={16} className="text-brand-primary" />
                  <span className="font-semibold text-brand-dark text-sm">Hospital Appointments</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hospitals.map((h, i) => (
                    <div key={i} className={`rounded-xl border ${h.color} p-3`}>
                      <div className="font-semibold text-sm">{h.name}</div>
                      <div className="text-xs mt-0.5">{h.role}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-reveal reveal stagger-6 flex flex-wrap gap-4">
                <button onClick={() => setOpenModal(true)} className="btn-primary btn-teal">
                  Know More
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setOpenPublicationsModal(true)}
                  className="btn-secondary"
                >
                  Publications
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {openModal && (
        <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="About Ms Amerasinghe">
          <div
            className="absolute inset-0 bg-brand-dark/55 backdrop-blur-sm"
            onClick={() => setOpenModal(false)}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-border animate-fade-in">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-brand-border bg-brand-bg">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-1">
                    About Ms Amerasinghe
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark">
                    Consultant Ophthalmic Surgeon
                  </h3>
                </div>

                <button
                  onClick={() => setOpenModal(false)}
                  className="w-11 h-11 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-section transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-92px)] px-6 sm:px-8 py-6 sm:py-8">
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    Glaucoma Specialist
                  </span>
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    Cataract Surgeon
                  </span>
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    MIGS
                  </span>
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    20+ Years Experience
                  </span>
                </div>

                <div className="space-y-10">
                  {aboutSections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        {section.heading}
                      </h4>

                      <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden">
                        <img
                          src={section.image}
                          alt={section.heading}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                      </div>

                      <div className="space-y-4">
                        {section.content.map((paragraph, pIndex) => (
                          <p
                            key={pIndex}
                            className="text-brand-soft leading-8 text-[15px] sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap size={18} className="text-brand-primary" />
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        Qualifications
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {qualifications.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-brand-border bg-brand-bg p-4 text-sm text-brand-dark"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Award size={18} className="text-brand-primary" />
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        Memberships
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {memberships.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-brand-border bg-white p-4 text-sm text-brand-dark"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-brand-border flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                      setTimeout(() => {
                        document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
                      }, 150);
                    }}
                    className="btn-primary"
                  >
                    Book Appointment
                    <ArrowRight size={16} />
                  </button>

                  <button
                    onClick={() => setOpenModal(false)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {openPublicationsModal && (
        <div className="fixed inset-0 z-[110]" role="dialog" aria-modal="true" aria-label="Publications and presentations">
          <div
            className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
            onClick={() => setOpenPublicationsModal(false)}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-border animate-fade-in">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-brand-border bg-brand-bg">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-1">
                    Publications / Presentations
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark">
                    Academic & Speaking Highlights
                  </h3>
                </div>

                <button
                  onClick={() => setOpenPublicationsModal(false)}
                  className="w-11 h-11 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-section transition-colors"
                  aria-label="Close publications modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-92px)] px-6 sm:px-8 py-6 sm:py-8">
                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    International Speaker
                  </span>
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    Glaucoma Research
                  </span>
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    Book Chapters
                  </span>
                  <span className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full">
                    National & Regional Teaching
                  </span>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mic size={18} className="text-brand-primary" />
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        Invited International Lectures / Presentations
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {internationalLectures.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-brand-border bg-white p-4 text-sm text-brand-dark leading-7"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mic size={18} className="text-brand-primary" />
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        Invited Regional / National Lectures / Presentations
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {nationalLectures.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-brand-border bg-brand-bg p-4 text-sm text-brand-dark leading-7"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen size={18} className="text-brand-primary" />
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        Book Chapters
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {bookChapters.map((item, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-brand-border bg-white p-4 text-sm text-brand-dark leading-7"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-brand-primary" />
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        Publications
                      </h4>
                    </div>

                    <a
                      href={pubmedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="overflow-hidden rounded-2xl border border-brand-border bg-white shadow-card hover:shadow-card-hover transition-all duration-500">
                        <div className="relative h-64 sm:h-80 overflow-hidden">
                          <img
                            src="https://images.pexels.com/photos/5726698/pexels-photo-5726698.jpeg?auto=compress&cs=tinysrgb&w=1200"
                            alt="View publications on PubMed"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />

                          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 mb-4">
                              <FileText size={14} className="text-white" />
                              <span className="text-white text-xs font-semibold">
                                PubMed Profile
                              </span>
                            </div>

                            <h5 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                              View Full Publications List
                            </h5>

                            <p className="text-white/85 text-sm sm:text-base max-w-2xl leading-7">
                              Explore Miss Amerasinghe’s indexed publications and research listings on
                              PubMed.
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                              Open Publications
                              <ExternalLink size={16} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-brand-border flex flex-wrap gap-4">
                  <button
                    onClick={() => setOpenPublicationsModal(false)}
                    className="btn-primary"
                  >
                    Close Publications
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}