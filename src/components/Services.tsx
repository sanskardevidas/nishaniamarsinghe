import { useEffect, useRef, useState } from 'react';
import { Eye, Scissors, Search, ArrowRight, X } from 'lucide-react';
import aboutImg from '../assets/images/glaucoma.png';
import about1Img from '../assets/images/atRisk.png';
import about2Img from '../assets/images/typesofGlaucoma.png';
import about3Img from '../assets/images/cataracts.png';
import about4Img from '../assets/images/surgeryInvolve.png';
import about5Img from '../assets/images/aftersurgery.png';
import about6Img from '../assets/images/ophthalmology.png';

const services = [
  {
    icon: Eye,
    title: 'Specialist Glaucoma Care',
    shortDescription:
      'Providing a comprehensive glaucoma service covering assessment, monitoring, medical and surgical management including advanced techniques and one stop clinics. Ms Amerasinghe is specialist trained and highly experienced in all aspects of glaucoma care.',
    tags: ['Assessment', 'Monitoring', 'Medical Care', 'Surgery', 'MIGS'],
    bg: 'bg-brand-accent',
    iconColor: 'text-brand-primary',
    modalSections: [
      {
        heading: 'What is Glaucoma?',
        image: aboutImg,
        content: [
          'Glaucoma is a group of eye diseases that affects the optic nerve in the eye. The optic nerve takes visual information from the eye to the brain. Glaucoma damages this nerve and results in vision loss.',
          'When the nerve fibres in the optic nerve are damaged they cannot recover, therefore any vision lost cannot be recovered. Therefore it is important that glaucoma is diagnosed early. It needs to be monitored and treated carefully so patients can keep their sight.',
          'Within the eye, a fluid called aqueous humour flows to allow the eye to function and keep its shape. This results in a pressure within the eye, called intraocular pressure. In glaucoma, optic nerve damage usually occurs if the intraocular pressure rises to an excessive level that kills the nerve fibres.',
          'However, high pressure does not always cause glaucoma. Some patients have glaucoma damage even with pressures in the normal range, while others may have higher pressure without glaucoma damage and need careful monitoring.'
        ]
      },
      {
        heading: 'Who is at Risk?',
        image: about1Img,
        content: [
          'There is not one single cause of glaucoma. Instead, there are risk factors that have a cumulative effect. These include raised intraocular pressure, increasing age, family history, ethnicity, short sightedness, long sightedness, and diabetes.',
          'If you have a first-degree relative such as a mother, father, brother, sister or child with glaucoma, your risk is significantly increased.'
        ]
      },
      {
        heading: 'Types of Glaucoma',
        image: about2Img,
        content: [
          'Primary Open Angle Glaucoma is the most common form in the UK. It develops slowly and often without symptoms until there has already been damage to the optic nerve.',
          'Primary Angle Closure Glaucoma happens when the drainage angle becomes blocked and pressure rises. This can occur suddenly and may cause pain, redness, blurred vision, halos around lights, nausea, and vomiting.',
          'Normal Tension Glaucoma causes optic nerve damage even though pressure is within the normal range. Ocular Hypertension means pressure is raised but there is no detectable glaucomatous damage yet.',
          'Secondary glaucoma and congenital glaucoma can also occur in certain specific situations.'
        ]
      },
      {
        heading: 'Tests and Assessment',
        image:
          'https://images.pexels.com/photos/8376150/pexels-photo-8376150.jpeg?auto=compress&cs=tinysrgb&w=1200',
        content: [
          'The diagnosis of glaucoma can be difficult and often requires several tests. It may not always be possible to give a definitive diagnosis at the first consultation.',
          'Testing may include tonometry to measure intraocular pressure, slit lamp examination, gonioscopy, pachymetry, visual field perimetry, and optic nerve imaging.'
        ]
      },
      {
        heading: 'Treatment Options Including MIGS',
        image:
          'https://images.pexels.com/photos/7580252/pexels-photo-7580252.jpeg?auto=compress&cs=tinysrgb&w=1200',
        content: [
          'Treatment may include medication, laser treatment, or surgery depending on the type and severity of glaucoma.',
          'Selective Laser Trabeculoplasty (SLT) can help fluid drain from the eye and lower pressure. Trabeculectomy is a surgical procedure used when pressure is not adequately controlled and there is significant risk to sight.',
          'Minimally Invasive Glaucoma Surgery (MIGS) is one of the latest advances in surgical treatment for glaucoma. MIGS procedures use a minimally invasive internal approach, often with micro-incisions through the cornea, resulting in less trauma to surrounding tissues.',
          'MIGS often reduces discomfort and can lead to faster recovery compared with more traditional surgery, while preserving the possibility of future procedures if needed.'
        ]
      }
    ]
  },
  {
    icon: Scissors,
    title: 'Premium Cataract Management',
    shortDescription:
      'Ms Amerasinghe provides a personalised service to all her patients. She uses the latest safest techniques, including specialist lens insertion, with attention to detail and surgical expertise that delivers excellent results and very low complication rates.',
    tags: ['Cataract Surgery', 'Lens Options', 'Personalised Care'],
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    modalSections: [
      {
        heading: 'What is a Cataract?',
        image:
          'https://images.pexels.com/photos/5752287/pexels-photo-5752287.jpeg?auto=compress&cs=tinysrgb&w=1200',
        content: [
          'A cataract is the clouding of the normally clear lens of the eye that is located behind the iris. The lens normally focuses light on the retina at the back of the eye, which then sends a signal to the brain enabling us to see.',
          'When the lens becomes more cloudy, less light passes to the retina and your vision decreases, a bit like being in a car with a steamed-up windscreen.'
        ]
      },
      {
        heading: 'Who Gets Cataracts?',
        image: about3Img,
        content: [
          'Cataracts are very common and most occur as part of the normal ageing process. It is estimated that a large proportion of the population over the age of 65 develop cataracts.',
          'However, cataracts can also develop in younger patients, especially where there is a history of diabetes, steroid use, trauma, or genetic predisposition.'
        ]
      },
      {
        heading: 'What Symptoms May I Notice?',
        image:
          'https://images.pexels.com/photos/7580247/pexels-photo-7580247.jpeg?auto=compress&cs=tinysrgb&w=1200',
        content: [
          'Symptoms vary from patient to patient but the most common include frequent changes of glasses or contact lens prescription, blurred vision, sensitivity to light, glare from bright lights, difficulty reading, and difficulty performing intricate tasks.',
          'These symptoms generally evolve slowly and may be quite subtle to begin with.'
        ]
      },
      {
        heading: 'When Should Cataract Be Treated?',
        image:
          'https://images.pexels.com/photos/8376164/pexels-photo-8376164.jpeg?auto=compress&cs=tinysrgb&w=1200',
        content: [
          'There are no strict rules, but surgery is generally recommended when vision is reduced enough to affect your quality of life, for example reading or driving.'
        ]
      },
      {
        heading: 'What Does Surgery Involve?',
        image: about4Img,
        content: [
          'Ms Amerasinghe employs the latest techniques and uses advanced lenses, meaning most surgical procedures take less than 20 minutes as part of a day case surgery package.',
          'Surgery involves removing the cloudy lens and replacing it with a new highly technical synthetic lens. There are different types of lenses available, and the best choice can be tailored to the individual eye.',
          'A small incision is made in the cornea. A very small instrument is placed through the opening and emits ultrasonic waves to break up the lens before removing the pieces. This process is called phacoemulsification.',
          'The procedure is normally performed awake with local anaesthetic drops placed in the eye. This usually means patients are more comfortable, have a quicker recovery, and avoid the side effects of general anaesthetic.'
        ]
      },
      {
        heading: 'What Happens After Surgery?',
        image: about5Img,
        content: [
          'Immediately after the operation you will go to the recovery room. A protective pad and shield will be placed over the eye for a few hours while the local anaesthetic wears off.',
          'The eye may feel slightly uncomfortable, but simple pain relief is usually enough if needed, and many patients do not need any painkillers at all.',
          'Steroid drops and antibiotic drops are usually required afterwards. The eye often improves within a few days, although it can take longer for everything to settle completely.'
        ]
      }
    ]
  },
  {
    icon: Search,
    title: 'General Ophthalmology',
    shortDescription:
      'Having been an Ophthalmologist for over 2 decades, Ms Amerasinghe has a wealth of experience in more general eye complaints and conditions, whether emergency or less urgent cases.',
    tags: ['General Eye Care', 'Urgent Cases', 'Routine Complaints'],
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    modalSections: [
      {
        heading: 'General Ophthalmology',
        image: about6Img,
        content: [
          'Ms Amerasinghe has extensive experience in the assessment and management of a wide range of general eye complaints and conditions.',
          'This includes both urgent and less urgent concerns, with a specialist-led approach focused on accurate diagnosis, reassurance, and tailored treatment planning.',
          'You can replace this section later with the full General Ophthalmology content from the current website.'
        ]
      }
    ]
  }
];

type ServiceItem = (typeof services)[number];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.service-reveal');
            els?.forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  const scrollToAppointment = () => {
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openServiceModal = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section id="services" ref={ref} className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="service-reveal reveal inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200 mb-4">
              <Eye size={12} />
              Specialist Services
            </div>

            <h2 className="service-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
              Specialist Eye Care Services
            </h2>

            <p className="service-reveal reveal stagger-2 text-brand-soft text-lg max-w-2xl mx-auto leading-relaxed">
              Specialist-led care in glaucoma, cataract treatment, and general ophthalmology,
              delivered with precision and personalised attention.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            onMouseLeave={() => setActiveIndex(0)}
          >
            {services.map((service, i) => {
              const isActive = activeIndex === i;
              const Icon = service.icon;

              return (
                <div
                  key={i}
                  className={`service-reveal reveal ${
                    i === 0 ? 'stagger-1' : i === 1 ? 'stagger-2' : 'stagger-3'
                  }`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div
                    className={`h-full rounded-3xl p-8 relative overflow-hidden group border transform-gpu will-change-transform
                    transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${
                      isActive
                        ? 'bg-gradient-to-br from-brand-primary to-brand-cta text-white border-transparent shadow-float scale-[1.03]'
                        : 'bg-white text-brand-dark border-brand-border shadow-card hover:shadow-card-hover'
                    }`}
                  >
                    {isActive && (
                      <>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-12 translate-x-12 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-10 -translate-x-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                      </>
                    )}

                    <div className="relative z-10 flex flex-col h-full">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                        ${isActive ? 'bg-white/20' : service.bg}`}
                      >
                        <Icon
                          size={26}
                          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive ? 'text-white' : service.iconColor
                          }`}
                        />
                      </div>

                      <div className="flex-1">
                        <span
                          className={`text-xs font-bold uppercase tracking-widest mb-2 block transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? 'text-white/70 opacity-100 translate-y-0'
                              : 'text-transparent opacity-0 -translate-y-1'
                          }`}
                        >
                          Featured Service
                        </span>

                        <h3
                          className={`font-bold mb-3 leading-tight transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive ? 'text-2xl text-white' : 'text-xl text-brand-dark'
                          }`}
                        >
                          {service.title}
                        </h3>

                        <p
                          className={`leading-relaxed text-sm mb-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive ? 'text-white/85' : 'text-brand-soft'
                          }`}
                        >
                          {service.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-3 py-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-brand-section text-brand-soft'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3">
                        <button
                          onClick={scrollToAppointment}
                          className={`inline-flex items-center gap-2 font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive ? 'text-white' : 'text-brand-primary'
                          }`}
                        >
                          Book Consultation
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          />
                        </button>

                        <button
                          onClick={() => openServiceModal(service)}
                          className={`inline-flex items-center gap-2 font-semibold text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive ? 'text-white/90 hover:text-white' : 'text-brand-primary'
                          }`}
                        >
                          Know More
                          <ArrowRight
                            size={16}
                            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {selectedService && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm"
            onClick={closeServiceModal}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-border animate-fade-in">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-brand-border bg-brand-bg">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-1">
                    Specialist Service
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-brand-dark">
                    {selectedService.title}
                  </h3>
                </div>

                <button
                  onClick={closeServiceModal}
                  className="w-11 h-11 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-section transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-92px)] px-6 sm:px-8 py-6 sm:py-8">
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-brand-section text-brand-soft px-3 py-1.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-10">
                  {selectedService.modalSections.map((section, index) => (
                    <div key={index} className="space-y-4">
                      <h4 className="text-xl sm:text-2xl font-bold text-brand-dark">
                        {section.heading}
                      </h4>

                      {section.image && (
                        <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden">
                          <img
                            src={section.image}
                            alt={section.heading}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>
                      )}

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
                </div>

                <div className="mt-10 pt-6 border-t border-brand-border flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      closeServiceModal();
                      setTimeout(() => {
                        scrollToAppointment();
                      }, 150);
                    }}
                    className="btn-primary"
                  >
                    Book Appointment
                    <ArrowRight size={16} />
                  </button>

                  <button onClick={closeServiceModal} className="btn-secondary">
                    Close
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