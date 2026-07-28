import { useEffect, useRef, useState } from 'react';
import { Eye, Scissors, Search, ArrowRight, X, Sparkles, Filter } from 'lucide-react';
import aboutImg from '../assets/images/glaucoma.png';
import about1Img from '../assets/images/atRisk.png';
import about2Img from '../assets/images/typesofGlaucoma.png';
import about3Img from '../assets/images/cataracts.png';
import about4Img from '../assets/images/surgeryInvolve.png';
import about5Img from '../assets/images/aftersurgery.png';
import about6Img from '../assets/images/ophthalmology.png';

const services = [
  {
    id: 'glaucoma',
    category: 'Glaucoma & MIGS',
    icon: Eye,
    title: 'Specialist Glaucoma Care & MIGS',
    shortDescription:
      'Providing a comprehensive glaucoma service covering assessment, monitoring, medical and surgical management including advanced MIGS techniques and one stop clinics. Ms Amerasinghe is specialist trained and highly experienced in all aspects of glaucoma care.',
    tags: ['Assessment', 'Monitoring', 'Medical Care', 'Surgery', 'MIGS'],
    bg: 'bg-brand-accent',
    iconColor: 'text-brand-primary',
    modalSections: [
      {
        heading: 'What is Glaucoma?',
        image: aboutImg,
        content: [
          'Glaucoma is a group of eye diseases that affects the optic nerve in the eye. The optic nerve takes visual information from the eye to the brain. Glaucoma damages this nerve and results in vision loss.',
          'When the nerve fibres in the optic nerve are damaged they cannot recover, therefore any vision lost cannot be recovered. Therefore it is important that glaucoma is diagnosed early.',
          'Within the eye, a fluid called aqueous humour flows to allow the eye to function and keep its shape. In glaucoma, optic nerve damage usually occurs if the intraocular pressure rises to an excessive level.',
        ]
      },
      {
        heading: 'Who is at Risk?',
        image: about1Img,
        content: [
          'Risk factors include raised intraocular pressure, increasing age, family history, ethnicity, short sightedness, long sightedness, and diabetes.',
          'If you have a first-degree relative such as a parent or sibling with glaucoma, your risk is significantly increased.'
        ]
      },
      {
        heading: 'Types of Glaucoma & MIGS Surgery',
        image: about2Img,
        content: [
          'Primary Open Angle Glaucoma develops slowly and often without symptoms until optic nerve damage has occurred.',
          'Minimally Invasive Glaucoma Surgery (MIGS) uses micro-incisions to restore fluid drainage, leading to faster recovery and reduced reliance on eye drops.'
        ]
      }
    ]
  },
  {
    id: 'cataract',
    category: 'Cataract Surgery',
    icon: Scissors,
    title: 'Premium Cataract Surgery',
    shortDescription:
      'Ms Amerasinghe provides a personalised service for cataract surgery. She uses the latest safest techniques, including specialist lens insertion, with surgical expertise delivering excellent vision results and minimal recovery downtime.',
    tags: ['Cataract Surgery', 'Specialist Lens', 'Personalised Care', 'Day Case'],
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    modalSections: [
      {
        heading: 'What is a Cataract?',
        image: about3Img,
        content: [
          'A cataract is the clouding of the normally clear lens of the eye. The lens focuses light on the retina at the back of the eye enabling clear sight.',
          'When the lens becomes cloudy, less light passes to the retina and your vision decreases.'
        ]
      },
      {
        heading: 'What Does Surgery Involve?',
        image: about4Img,
        content: [
          'Ms Amerasinghe employs advanced lens replacement techniques, meaning most day-case procedures take under 20 minutes.',
          'The procedure is normally performed awake with local anaesthetic drops in the eye, ensuring a quick recovery and comfortable experience.'
        ]
      },
      {
        heading: 'Post-Operative Recovery',
        image: about5Img,
        content: [
          'A protective shield is worn briefly while the local anaesthetic wears off. Vision improves rapidly within days.'
        ]
      }
    ]
  },
  {
    id: 'general',
    category: 'General Ophthalmology',
    icon: Search,
    title: 'General Ophthalmology',
    shortDescription:
      'Having been an Ophthalmologist for over 2 decades, Ms Amerasinghe has a wealth of experience in comprehensive eye complaints, routine consultations, and emergency eye conditions.',
    tags: ['General Eye Care', 'Urgent Cases', 'Routine Consultations'],
    bg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    modalSections: [
      {
        heading: 'General Ophthalmology Care',
        image: about6Img,
        content: [
          'Ms Amerasinghe offers expert evaluation and management for a wide variety of ocular symptoms and concerns.',
          'Focused on accurate diagnosis, clear explanation, and reassuring, expert-led treatment plans.'
        ]
      }
    ]
  }
];

type ServiceItem = (typeof services)[number];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.service-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 120));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const categories = ['All', 'Glaucoma & MIGS', 'Cataract Surgery', 'General Ophthalmology'];

  const filteredServices = services.filter((s) => {
    const matchesCategory = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const scrollToAppointment = () => {
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSimulator = () => {
    document.querySelector('#vision-simulator')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section id="services" ref={ref} className="py-24 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="service-reveal reveal inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200 mb-4">
              <Eye size={12} />
              Specialist Services
            </div>

            <h2 className="service-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
              Specialist Eye Care Services
            </h2>

            <p className="service-reveal reveal stagger-2 text-brand-soft text-lg max-w-2xl mx-auto leading-relaxed">
              Specialist-led care in glaucoma, cataract treatment, and general ophthalmology delivered with surgical precision.
            </p>
          </div>

          {/* Interactive Search & Category Filter Bar */}
          <div className="mb-12 max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-soft" />
              <input
                type="text"
                placeholder="Search treatments, conditions, MIGS, or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-brand-border bg-white text-sm placeholder:text-brand-soft shadow-card focus:outline-none focus:border-brand-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-brand-soft hover:text-brand-dark"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold text-brand-soft flex items-center gap-1 mr-2">
                <Filter size={12} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-primary text-white shadow-button'
                      : 'bg-white text-brand-dark hover:bg-brand-section border border-brand-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vision Simulator Quick Trigger Box */}
          <div className="mb-10 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-float flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles size={24} className="text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-base">Want to visualize treatment outcomes?</h4>
                <p className="text-xs text-white/80">Try our Vision Clarity Simulator tool to compare before & after vision.</p>
              </div>
            </div>
            <button
              onClick={scrollToSimulator}
              className="px-5 py-2.5 rounded-xl bg-white text-brand-primary text-xs font-bold hover:bg-blue-50 transition-all flex-shrink-0 flex items-center gap-1.5"
            >
              Open Simulator <ArrowRight size={14} />
            </button>
          </div>

          {/* Services Grid */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            onMouseLeave={() => setActiveIndex(0)}
          >
            {filteredServices.map((service, i) => {
              const isActive = activeIndex === i;
              const Icon = service.icon;

              return (
                <div
                  key={service.id}
                  className="service-reveal reveal"
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <div
                    className={`h-full rounded-3xl p-8 relative overflow-hidden group border transform-gpu transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-brand-primary to-brand-cta text-white border-transparent shadow-float scale-[1.02]'
                        : 'bg-white text-brand-dark border-brand-border shadow-card hover:shadow-card-hover'
                    }`}
                  >
                    <div className="relative z-10 flex flex-col h-full">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                          isActive ? 'bg-white/20' : service.bg
                        }`}
                      >
                        <Icon
                          size={26}
                          className={isActive ? 'text-white' : service.iconColor}
                        />
                      </div>

                      <div className="flex-1">
                        <span className={`text-[11px] font-bold uppercase tracking-wider mb-2 block ${
                          isActive ? 'text-white/80' : 'text-brand-primary'
                        }`}>
                          {service.category}
                        </span>

                        <h3 className={`font-bold mb-3 leading-tight ${
                          isActive ? 'text-2xl text-white' : 'text-xl text-brand-dark'
                        }`}>
                          {service.title}
                        </h3>

                        <p className={`leading-relaxed text-sm mb-5 ${
                          isActive ? 'text-white/85' : 'text-brand-soft'
                        }`}>
                          {service.shortDescription}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs px-3 py-1 rounded-full ${
                                isActive ? 'bg-white/20 text-white' : 'bg-brand-section text-brand-soft'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex flex-wrap gap-3 pt-4 border-t border-white/20">
                        <button
                          onClick={scrollToAppointment}
                          className={`inline-flex items-center gap-1.5 font-semibold text-xs transition-all ${
                            isActive ? 'text-white' : 'text-brand-primary'
                          }`}
                        >
                          Book Consultation <ArrowRight size={14} />
                        </button>

                        <button
                          onClick={() => setSelectedService(service)}
                          className={`inline-flex items-center gap-1.5 font-semibold text-xs transition-all ${
                            isActive ? 'text-white/90 hover:text-white' : 'text-brand-primary'
                          }`}
                        >
                          Read Full Details <ArrowRight size={14} />
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

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100]">
          <div
            className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          />

          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl border border-brand-border">
              <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border bg-brand-bg">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary mb-1">
                    {selectedService.category}
                  </p>
                  <h3 className="text-2xl font-bold text-brand-dark">
                    {selectedService.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 rounded-xl bg-white border border-brand-border flex items-center justify-center text-brand-dark hover:bg-brand-section transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(90vh-92px)] px-6 py-6 space-y-8">
                {selectedService.modalSections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h4 className="text-xl font-bold text-brand-dark">{section.heading}</h4>
                    {section.image && (
                      <div className="w-full h-56 rounded-2xl overflow-hidden">
                        <img src={section.image} alt={section.heading} className="w-full h-full object-cover" />
                      </div>
                    )}
                    {section.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-brand-soft leading-relaxed text-sm">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}

                <div className="pt-4 border-t border-brand-border flex gap-4">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      setTimeout(scrollToAppointment, 150);
                    }}
                    className="btn-primary text-xs py-3 px-5"
                  >
                    Request Consultation <ArrowRight size={14} />
                  </button>
                  <button onClick={() => setSelectedService(null)} className="btn-secondary text-xs py-3 px-5">
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