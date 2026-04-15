import { useEffect, useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function Appointment() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = ref.current?.querySelectorAll('.appt-reveal');
            els?.forEach((el, i) => setTimeout(() => el.classList.add('visible'), i * 100));
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClass = `w-full px-4 py-3.5 rounded-xl border border-brand-border bg-brand-section text-brand-dark text-sm placeholder:text-brand-soft focus:bg-white transition-all`;

  return (
    <section id="appointment" ref={ref} className="py-24 bg-brand-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2">
            <div className="appt-reveal reveal mb-4">
              <span className="inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200">
                Get In Touch
              </span>
            </div>
            <h2 className="appt-reveal reveal stagger-1 text-4xl font-bold text-brand-dark mb-5 tracking-tight leading-tight">
              Request Your
              <span className="gradient-text"> Appointment</span>
            </h2>
            <p className="appt-reveal reveal stagger-2 text-brand-soft leading-relaxed mb-8">
              Take the first step towards better eye health. Complete the form and our team will
              be in touch to confirm your appointment at your preferred location.
            </p>

            <div className="appt-reveal reveal stagger-3 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-xs text-brand-soft mb-0.5">Call Us</div>
                  <a href="tel:+442380000000" className="font-semibold text-brand-dark hover:text-brand-primary transition-colors">
                    +44 (0) 238 000 0000
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-xs text-brand-soft mb-0.5">Email Us</div>
                  <a href="mailto:hello@themedicalpa.co.uk" className="font-semibold text-brand-dark hover:text-brand-primary transition-colors text-sm">
                    hello@themedicalpa.co.uk
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-xs text-brand-soft mb-0.5">Primary Location</div>
                  <div className="font-semibold text-brand-dark text-sm">Southampton & South Coast</div>
                </div>
              </div>
            </div>
          </div>

          <div className="appt-reveal reveal-right stagger-2 lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-float border border-brand-border p-8 sm:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Request Received!</h3>
                  <p className="text-brand-soft text-sm max-w-sm mx-auto">
                    Thank you for getting in touch. Our team will contact you within one business day to confirm your appointment.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1.5">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-dark mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+44 7000 000000"
                        className={inputClass}
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1.5">Service Required</label>
                    <select
                      className={inputClass}
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                    >
                      <option value="">Select a service...</option>
                      <option>Glaucoma Consultation</option>
                      <option>Cataract Assessment</option>
                      <option>MIGS Procedure</option>
                      <option>General Eye Consultation</option>
                      <option>Post-operative Review</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-dark mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Please briefly describe your symptoms or reason for consultation..."
                      className={`${inputClass} resize-none`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Request Appointment
                        <Send size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-brand-soft text-center">
                    Your information is kept strictly confidential and never shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
