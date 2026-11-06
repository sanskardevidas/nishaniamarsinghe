import { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

const faqs = [
  {
    question: 'Do I need a referral to see Dr. Amerasinghe?',
    answer: 'For NHS care, you will need a referral from your GP or optometrist. For private consultations, you can self-refer by contacting us directly. We also accept referrals from other specialists.',
  },
  {
    question: 'What should I expect at my first appointment?',
    answer: 'Your first appointment will typically last 45–60 minutes. Dr. Amerasinghe will take a full medical history, perform a comprehensive eye examination including visual acuity, pressure measurements, OCT scan, and visual fields testing as appropriate.',
  },
  {
    question: 'Is cataract surgery covered by the NHS?',
    answer: 'Yes, cataract surgery is available on the NHS when your cataracts are significantly affecting your quality of life. Private surgery offers shorter waiting times and access to premium lens implants that may not be available on the NHS.',
  },
  {
    question: 'How long does glaucoma treatment take?',
    answer: 'Glaucoma is typically a long-term condition requiring ongoing management. Initial assessment and treatment planning usually takes 1–3 appointments. Most patients are then reviewed every 3–12 months depending on stability.',
  },
  {
    question: 'What is MIGS and who is it suitable for?',
    answer: 'Minimally Invasive Glaucoma Surgery (MIGS) refers to a group of procedures that lower eye pressure with less risk and faster recovery than traditional glaucoma surgery. It is often performed alongside cataract surgery and is suitable for mild-to-moderate glaucoma.',
  },
  {
    question: 'Which private health insurance is accepted?',
    answer: 'We work with all major private health insurers including BUPA, AXA Health, Aviva, Vitality, and Cigna. Please contact us with your insurance details prior to your appointment and we can verify your cover.',
  },
  {
    question: 'How quickly can I get a private appointment?',
    answer: 'Private appointments are typically available within 1–2 weeks. For urgent clinical concerns, we aim to accommodate patients as quickly as possible. Please contact us to discuss your needs.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.faq-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 80));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-[#f3f2ef]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="faq-reveal reveal inline-flex items-center bg-[#a5b387] text-brand-dark text-xs font-semibold px-4 py-2 mb-4">
            Frequently asked questions
          </div>
          <h2 className="faq-reveal reveal stagger-1 text-[34px] sm:text-5xl lg:text-[52px] font-normal text-brand-dark mb-4 tracking-normal leading-tight">
            Common questions answered
          </h2>
          <p className="faq-reveal reveal stagger-2 text-brand-dark font-light text-lg sm:text-xl">
            Everything you need to know before your appointment
          </p>
        </div>

        <div className="fq-list">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className="faq-reveal reveal">
                <div className={`fq-item${isOpen ? ' open' : ''}`}>
                  <h3 className="fq-h">
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      className="fq-btn"
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      <span className="fq-q">{faq.question}</span>
                      <span className="fq-ico" aria-hidden="true">
                        {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="fq-panel">
                    <div className="fq-inner">
                      <div className="fq-rule" />
                      <p className="fq-a">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
