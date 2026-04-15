import { useEffect, useRef, useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

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
  const ref = useRef<HTMLDivElement>(null);

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
    <section ref={ref} className="py-24 bg-brand-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="faq-reveal reveal inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200 mb-4">
            <HelpCircle size={12} />
            Frequently Asked Questions
          </div>
          <h2 className="faq-reveal reveal stagger-1 text-4xl sm:text-5xl font-bold text-brand-dark mb-4 tracking-tight">
            Common Questions Answered
          </h2>
          <p className="faq-reveal reveal stagger-2 text-brand-soft text-lg">
            Everything you need to know before your appointment
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-reveal reveal stagger-${(i % 6) + 1}`}>
              <div
                className="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-brand-section/50 transition-colors"
                >
                  <span className="font-semibold text-brand-dark text-base">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-brand-primary flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <div className={`accordion-content ${open === i ? 'open' : ''}`}>
                  <div className="px-6 pb-6">
                    <div className="w-full h-px bg-brand-border mb-4" />
                    <p className="text-brand-soft text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
