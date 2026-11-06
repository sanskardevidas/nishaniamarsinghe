import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowRight, Check, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { services } from '../data/services';
import { PRACTICE } from './practice';

/**
 * Requests are sent as a JSON POST to VITE_BOOKING_ENDPOINT when it is configured.
 * No booking backend is connected yet: with it empty, a valid request is NOT sent and the
 * form says so plainly (never a fake success).
 */
const BOOKING_ENDPOINT: string = import.meta.env.VITE_BOOKING_ENDPOINT ?? '';

const LOCATION = 'Amera Eyecare';
const TIMES = ['Morning', 'Afternoon', 'No preference'];
const STEP_TITLES = ['Service & location', 'Preferred date & time', 'Your details'];

type Values = { service: string; date: string; time: string; name: string; email: string; phone: string; notes: string };
type Errors = Partial<Record<keyof Values, string>>;
type Status = { kind: 'success' | 'notice' | 'error'; text: string } | null;

const empty: Values = { service: '', date: '', time: '', name: '', email: '', phone: '', notes: '' };

const todayISO = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
};

const rules: Record<Exclude<keyof Values, 'notes'>, { msg: string; ok: (v: string, min: string) => boolean }> = {
  service: { msg: 'Select a service.', ok: (v) => v !== '' },
  date: { msg: 'Choose a preferred date that is today or later.', ok: (v, min) => /^\d{4}-\d{2}-\d{2}$/.test(v) && v >= min },
  time: { msg: 'Select a preferred time.', ok: (v) => v !== '' },
  name: { msg: 'Enter your full name.', ok: (v) => v.trim().length > 1 },
  email: { msg: 'Enter a valid email address, for example name@example.com.', ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) },
  phone: {
    msg: 'Enter a phone number with at least 7 digits.',
    ok: (v) => /^\+?[\d\s().-]+$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7 && v.replace(/\D/g, '').length <= 15,
  },
};
const stepFields: (keyof typeof rules)[][] = [['service'], ['date', 'time'], ['name', 'email', 'phone']];
const fieldId = (k: string) => `ap-${k}`;

export default function Appointment() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const sendingRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const shownStep = useRef(0);
  const min = todayISO();

  const hasAddress = Boolean(PRACTICE.address && PRACTICE.postcode);

  // Move focus to the new step's heading (without scrolling the page).
  useEffect(() => {
    if (shownStep.current === step) return; // nothing changed (e.g. first render / StrictMode re-run)
    shownStep.current = step;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (status) statusRef.current?.focus({ preventScroll: true });
  }, [status]);

  const set = (k: keyof Values, v: string) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    if (k !== 'notes' && errors[k] && rules[k].ok(v, min)) {
      setErrors((prev) => {
        const n = { ...prev };
        delete n[k];
        return n;
      });
    }
  };

  const validate = (fields: (keyof typeof rules)[]) => {
    const next: Errors = {};
    fields.forEach((k) => {
      if (!rules[k].ok(values[k], min)) next[k] = rules[k].msg;
    });
    setErrors((prev) => {
      const n = { ...prev };
      fields.forEach((k) => delete n[k]);
      return { ...n, ...next };
    });
    const first = fields.find((k) => next[k]);
    if (first) setTimeout(() => document.getElementById(first === 'time' ? 'ap-time-0' : fieldId(first))?.focus(), 0);
    return !first;
  };

  const next = () => {
    if (validate(stepFields[step])) setStep(step + 1);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (step !== 2 || sendingRef.current) return;
    if (!validate(stepFields[2])) return;
    setStatus(null);
    if (!BOOKING_ENDPOINT) {
      setStatus({
        kind: 'notice',
        text: 'Your request has not been sent. This form is not connected to a booking service yet, so no appointment request has been made. Your details are still here if you want to go back and check them.',
      });
      return;
    }
    sendingRef.current = true;
    setSending(true);
    try {
      const res = await fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, location: LOCATION }),
      });
      if (!res.ok) throw new Error('bad status');
      setValues(empty);
      setStatus({
        kind: 'success',
        text: 'Thank you. We have received your appointment request. Your appointment is confirmed only when our team contacts you.',
      });
    } catch {
      setStatus({ kind: 'error', text: 'Sorry, your request could not be sent. Your details have been kept, so please try again.' });
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  };

  const err = (k: keyof typeof rules) => (
    <p className="ap-err" id={`${fieldId(k)}-err`} hidden={!errors[k]}>
      {errors[k] ? `Error: ${errors[k]}` : ''}
    </p>
  );
  const common = (k: keyof typeof rules) => ({
    id: fieldId(k),
    'aria-invalid': errors[k] ? true : false,
    'aria-describedby': `${fieldId(k)}-err`,
    className: errors[k] ? 'ap-in bad' : 'ap-in',
  });

  const done = status?.kind === 'success';

  return (
    <section id="appointment" className="py-24 bg-[#f3f2ef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ap-grid">
          <div className="ap-intro">
            <span className="ap-tag font-semibold text-xs">Easy booking</span>
            <h2 className="font-normal text-4xl sm:text-5xl text-white leading-tight mt-5 mb-5 tracking-normal">Request your appointment</h2>
            <p className="font-light text-lg text-[#e7e4de] mb-10">
              Choose your service and preferred date. Our team will contact you to confirm your appointment.
            </p>
            <ul className="ap-contact">
              <li>
                <Phone size={20} className="ap-ico" aria-hidden="true" />
                <span>{PRACTICE.phone ? <a href={PRACTICE.phoneHref}>{PRACTICE.phone}</a> : '[Phone number]'}</span>
              </li>
              <li>
                <Mail size={20} className="ap-ico" aria-hidden="true" />
                <span>{PRACTICE.email ? <a href={`mailto:${PRACTICE.email}`}>{PRACTICE.email}</a> : '[Email address]'}</span>
              </li>
              <li>
                <MapPin size={20} className="ap-ico" aria-hidden="true" />
                <span>
                  {LOCATION}
                  <br />
                  {hasAddress ? `${PRACTICE.address}, ${PRACTICE.postcode}` : PRACTICE.location || '[Practice address and postcode]'}
                </span>
              </li>
              <li>
                <Clock size={20} className="ap-ico" aria-hidden="true" />
                <span>{PRACTICE.hours || '[Opening hours]'}</span>
              </li>
            </ul>
          </div>

          <div className="ap-panel">
            {done ? (
              <div className="ap-done" role="status" tabIndex={-1} ref={statusRef}>
                <h3 className="font-normal text-3xl tracking-normal mb-3">Appointment request received</h3>
                <p className="font-light text-lg">{status?.text}</p>
              </div>
            ) : (
              <form noValidate onSubmit={submit} aria-labelledby="ap-step-title">
                <p className="ap-count font-semibold text-sm">Step {step + 1} of 3</p>
                <div className="ap-bar" role="progressbar" aria-label="Booking progress" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1} aria-valuetext={`Step ${step + 1} of 3`}>
                  <span style={{ width: `${((step + 1) / 3) * 100}%` }} />
                </div>

                {status && (
                  <div className={`ap-status ${status.kind}`} role="status" aria-live="polite" tabIndex={-1} ref={statusRef}>
                    {status.text}
                  </div>
                )}

                <div className="ap-step" key={step}>
                  <h3 id="ap-step-title" className="font-semibold text-2xl mb-6" tabIndex={-1} ref={headingRef}>
                    {STEP_TITLES[step]}
                  </h3>

                  {step === 0 && (
                    <>
                      <div className="ap-fld">
                        <label htmlFor="ap-service">Service <span>(required)</span></label>
                        <select {...common('service')} value={values.service} onChange={(e) => set('service', e.target.value)} required>
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                        </select>
                        {err('service')}
                      </div>
                      <div className="ap-fld">
                        <p className="ap-lbl">Location</p>
                        <p className="ap-fixed">
                          <MapPin size={18} className="ap-ico" aria-hidden="true" />
                          {LOCATION}
                        </p>
                      </div>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <div className="ap-fld">
                        <label htmlFor="ap-date">Preferred date <span>(required)</span></label>
                        <input type="date" min={min} {...common('date')} value={values.date} onChange={(e) => set('date', e.target.value)} required />
                        {err('date')}
                      </div>
                      <fieldset className="ap-fld ap-times" aria-describedby="ap-time-err">
                        <legend>Preferred time <span>(required)</span></legend>
                        <div className="ap-opts">
                          {TIMES.map((t, i) => (
                            <label key={t} className={`ap-opt${values.time === t ? ' on' : ''}`}>
                              <input
                                type="radio"
                                name="time"
                                id={`ap-time-${i}`}
                                value={t}
                                checked={values.time === t}
                                onChange={() => set('time', t)}
                              />
                              {values.time === t && <Check size={16} strokeWidth={3} aria-hidden="true" />}
                              <span>{t}</span>
                            </label>
                          ))}
                        </div>
                        {err('time')}
                      </fieldset>
                      <p className="ap-note">These are requested preferences, not guaranteed appointments.</p>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="ap-fld">
                        <label htmlFor="ap-name">Full name <span>(required)</span></label>
                        <input type="text" autoComplete="name" {...common('name')} value={values.name} onChange={(e) => set('name', e.target.value)} required />
                        {err('name')}
                      </div>
                      <div className="ap-fld">
                        <label htmlFor="ap-email">Email address <span>(required)</span></label>
                        <input type="email" autoComplete="email" {...common('email')} value={values.email} onChange={(e) => set('email', e.target.value)} required />
                        {err('email')}
                      </div>
                      <div className="ap-fld">
                        <label htmlFor="ap-phone">Phone number <span>(required)</span></label>
                        <input type="tel" autoComplete="tel" {...common('phone')} value={values.phone} onChange={(e) => set('phone', e.target.value)} required />
                        {err('phone')}
                      </div>
                      <div className="ap-fld">
                        <label htmlFor="ap-notes">Additional notes <span>(optional)</span></label>
                        <textarea id="ap-notes" className="ap-in" rows={4} value={values.notes} onChange={(e) => set('notes', e.target.value)} />
                      </div>
                    </>
                  )}
                </div>

                <div className="ap-actions">
                  {step > 0 && (
                    <button type="button" className="ap-btn ap-back" onClick={() => setStep(step - 1)} disabled={sending}>
                      Back
                    </button>
                  )}
                  {step < 2 ? (
                    <button type="button" className="ap-btn ap-go" onClick={next}>
                      Next step <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button type="submit" className="ap-btn ap-go ap-submit" disabled={sending} aria-busy={sending}>
                      {sending ? 'Sending…' : 'Submit request'}
                      {!sending && <ArrowRight size={18} />}
                    </button>
                  )}
                </div>
                {step === 2 && <p className="ap-confirm font-light text-sm">Your appointment is confirmed only when our team contacts you.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
