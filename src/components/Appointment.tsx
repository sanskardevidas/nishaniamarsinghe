import { useEffect, useRef, useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, Clock, ChevronRight, ChevronLeft, Building2 } from 'lucide-react';

const locationsList = [
  { id: 'nuffield', name: 'Wessex Nuffield Hospital', area: 'Chandler\'s Ford, Eastleigh', type: 'Private' },
  { id: 'spire', name: 'Spire Healthcare Southampton', area: 'Southampton', type: 'Private' },
  { id: 'nhs', name: 'Southampton Eye Unit', area: 'University Hospital', type: 'NHS' },
  { id: 'laservision', name: 'LaserVision Prema Portsmouth', area: 'North Harbour, Portsmouth', type: 'Independent' },
];

const serviceOptions = [
  'Glaucoma Consultation',
  'Cataract Assessment & Surgery',
  'MIGS Minimally Invasive Procedure',
  'General Ophthalmology Consultation',
  'Post-operative Review',
];

const timeSlots = [
  { id: 'morning', label: 'Morning Slot', time: '09:00 AM - 12:00 PM' },
  { id: 'afternoon', label: 'Afternoon Slot', time: '12:00 PM - 04:00 PM' },
  { id: 'evening', label: 'Evening Slot', time: '04:00 PM - 07:00 PM' },
];

export default function Appointment() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    service: serviceOptions[0],
    location: locationsList[0].name,
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    timeSlot: timeSlots[0].time,
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!form.service) newErrors.service = 'Please select a service';
      if (!form.location) newErrors.location = 'Please select a hospital location';
    } else if (currentStep === 2) {
      if (!form.date) newErrors.date = 'Please choose a preferred date';
      if (!form.timeSlot) newErrors.timeSlot = 'Please select a preferred time slot';
    } else if (currentStep === 3) {
      if (!form.name.trim()) newErrors.name = 'Full name is required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required';
      if (!form.phone.trim()) newErrors.phone = 'Contact phone number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setLoading(true);
    try {
      const response = await fetch(

        "https://sanskar1819.app.n8n.cloud/webhook-test/appointment-submission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service: form.service,
            hospital: form.location,
            appointmentDate: form.date,
            appointmentTime: form.timeSlot,
            patientName: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
          }),
        }
      );

      if (!response.ok) { 
        throw new Error(`Webhook failed with status ${response.status}`);
      }
      setSubmitted(true);
    } catch (error) {
      console.error("Appointment submission error:", error);
      alert("Unable to submit appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const inputClass = `w-full px-4 py-3 rounded-xl border border-brand-border bg-brand-section text-brand-dark text-sm placeholder:text-brand-soft focus:bg-white transition-all`;

  return (
    <section id="appointment" ref={ref} className="py-24 bg-brand-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Column Info */}
          <div className="lg:col-span-2">
            <div className="appt-reveal reveal mb-4">
              <span className="inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200">
                Easy Booking
              </span>
            </div>
            <h2 className="appt-reveal reveal stagger-1 text-4xl font-bold text-brand-dark mb-5 tracking-tight leading-tight">
              Request Your <span className="gradient-text">Appointment</span>
            </h2>
            <p className="appt-reveal reveal stagger-2 text-brand-soft leading-relaxed mb-8">
              Select your preferred service, clinic location, and convenient date. Our medical secretary will contact you promptly to confirm your consultation.
            </p>

            <div className="appt-reveal reveal stagger-3 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-accent flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-brand-primary" />
                </div>
                <div>
                  <div className="text-xs text-brand-soft mb-0.5">Secretary Telephone</div>
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
                  <div className="text-xs text-brand-soft mb-0.5">Email Inquiries</div>
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
                  <div className="text-xs text-brand-soft mb-0.5">Hospitals</div>
                  <div className="font-semibold text-brand-dark text-sm">Southampton, Eastleigh & Portsmouth</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Interactive Booking Form */}
          <div className="appt-reveal reveal-right stagger-2 lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-float border border-brand-border p-6 sm:p-10">
              
              {/* Submission Confirmation Card */}
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-2">Appointment Request Submitted!</h3>
                  <p className="text-brand-soft text-sm max-w-md mx-auto mb-6">
                    Thank you, <strong className="text-brand-dark">{form.name}</strong>. We have received your request for a <strong className="text-brand-dark">{form.service}</strong> at <strong className="text-brand-dark">{form.location}</strong> on <strong className="text-brand-dark">{form.date} ({form.timeSlot})</strong>.
                  </p>

                  <div className="bg-brand-section p-5 rounded-2xl border border-brand-border text-left max-w-md mx-auto space-y-2 mb-6">
                    <div className="text-xs text-brand-soft uppercase tracking-wider font-semibold">Request Details</div>
                    <div className="text-sm"><strong>Patient:</strong> {form.name} ({form.phone})</div>
                    <div className="text-sm"><strong>Email:</strong> {form.email}</div>
                    <div className="text-sm"><strong>Clinic:</strong> {form.location}</div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                    }}
                    className="btn-secondary text-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <div>
                  {/* Step Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                        Step {step} of 3
                      </span>
                      <span className="text-xs font-semibold text-brand-soft">
                        {step === 1 ? 'Service & Location' : step === 2 ? 'Date & Time Slot' : 'Patient Info'}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-brand-section rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-cta transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* STEP 1: Service & Location */}
                    {step === 1 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                            Select Service Required *
                          </label>
                          <select
                            className={inputClass}
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                          >
                            {serviceOptions.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                            Preferred Hospital Location *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {locationsList.map((loc) => {
                              const selected = form.location === loc.name;
                              return (
                                <button
                                  key={loc.id}
                                  type="button"
                                  onClick={() => setForm({ ...form, location: loc.name })}
                                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                                    selected
                                      ? 'border-brand-primary bg-blue-50/70 shadow-sm'
                                      : 'border-brand-border bg-white hover:bg-brand-section'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-brand-dark text-xs truncate">{loc.name}</span>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                      loc.type === 'NHS' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                                    }`}>
                                      {loc.type}
                                    </span>
                                  </div>
                                  <div className="text-xs text-brand-soft flex items-center gap-1">
                                    <Building2 size={12} className="text-brand-primary" />
                                    {loc.area}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
                        </div>

                        <div className="pt-4 flex justify-end">
                          <button
                            type="button"
                            onClick={handleNext}
                            className="btn-primary text-sm"
                          >
                            Next Step <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Preferred Date & Time Slot */}
                    {step === 2 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className={inputClass}
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                          />
                          {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date}</p>}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                            Preferred Time Window *
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {timeSlots.map((slot) => {
                              const selected = form.timeSlot === slot.time;
                              return (
                                <button
                                  key={slot.id}
                                  type="button"
                                  onClick={() => setForm({ ...form, timeSlot: slot.time })}
                                  className={`p-3.5 rounded-2xl text-center border transition-all ${
                                    selected
                                      ? 'border-brand-primary bg-blue-50/70 shadow-sm'
                                      : 'border-brand-border bg-white hover:bg-brand-section'
                                  }`}
                                >
                                  <div className="font-semibold text-brand-dark text-xs mb-1">{slot.label}</div>
                                  <div className="text-[11px] text-brand-soft flex items-center justify-center gap-1">
                                    <Clock size={11} className="text-brand-primary" />
                                    {slot.time}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          {errors.timeSlot && <p className="text-xs text-red-500 mt-1">{errors.timeSlot}</p>}
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="btn-secondary text-sm"
                          >
                            <ChevronLeft size={16} /> Back
                          </button>

                          <button
                            type="button"
                            onClick={handleNext}
                            className="btn-primary text-sm"
                          >
                            Next Step <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Patient Details & Submission */}
                    {step === 3 && (
                      <div className="space-y-4 animate-fade-in">
                        <div>
                          <label className="block text-xs font-semibold text-brand-dark mb-1">Full Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. John Doe"
                            className={inputClass}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-brand-dark mb-1">Email Address *</label>
                            <input
                              type="email"
                              required
                              placeholder="john@example.com"
                              className={inputClass}
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-brand-dark mb-1">Phone Number *</label>
                            <input
                              type="tel"
                              required
                              placeholder="+44 7123 456789"
                              className={inputClass}
                              value={form.phone}
                              onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            />
                            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-brand-dark mb-1">Additional Notes / Symptoms</label>
                          <textarea
                            rows={3}
                            placeholder="Briefly describe any symptoms or specific questions..."
                            className={`${inputClass} resize-none`}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                          />
                        </div>

                        <div className="pt-4 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={handleBack}
                            className="btn-secondary text-sm"
                          >
                            <ChevronLeft size={16} /> Back
                          </button>

                          <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary py-3 px-6 text-sm disabled:opacity-70"
                          >
                            {loading ? (
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                              </span>
                            ) : (
                              <>
                                Submit Request <Send size={15} />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
