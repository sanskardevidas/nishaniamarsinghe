import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';

/**
 * Booking requests are sent to this URL (JSON POST) when it is configured, e.g. via
 * VITE_BOOKING_ENDPOINT in a .env file. No booking provider is connected yet, so when it is
 * empty the form validates but reports honestly that nothing was sent.
 */
const BOOKING_ENDPOINT: string = import.meta.env.VITE_BOOKING_ENDPOINT ?? '';

type Field = 'name' | 'email' | 'phone' | 'type' | 'date' | 'time';

const todayISO = () => {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, '0')}-${String(n.getDate()).padStart(2, '0')}`;
};

const rules: { id: Field; message: string; ok: (v: string, min: string) => boolean }[] = [
  { id: 'name', message: 'Enter your full name.', ok: (v) => v.trim().length > 1 },
  {
    id: 'email',
    message: 'Enter a valid email address, for example name@example.com.',
    ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  },
  {
    id: 'phone',
    message: 'Enter a phone number with at least 7 digits.',
    ok: (v) => /^[+()\d\s-]+$/.test(v.trim()) && v.replace(/\D/g, '').length >= 7,
  },
  { id: 'type', message: 'Select an appointment type.', ok: (v) => v !== '' },
  {
    id: 'date',
    message: 'Choose a preferred date that is today or later.',
    ok: (v, min) => v !== '' && v >= min,
  },
  { id: 'time', message: 'Select a preferred time.', ok: (v) => v !== '' },
];

const types = ['Eye examination', 'Contact lenses', 'Eyewear styling', 'Ongoing eyecare', 'Not sure yet'];

type Status = { kind: 'success' | 'notice' | 'error'; text: string } | null;

export default function BookAppointment() {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<Status>(null);
  const [sending, setSending] = useState(false);
  const min = todayISO();

  useEffect(() => {
    document.title = 'Book an appointment | Amera Eyecare';
  }, []);

  const valueOf = (id: Field) =>
    (formRef.current?.elements.namedItem(id) as HTMLInputElement | null)?.value ?? '';

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    rules.forEach((r) => {
      if (!r.ok(valueOf(r.id), min)) next[r.id] = r.message;
    });
    setErrors(next);
    return next;
  };

  const focusField = (id: Field) =>
    (formRef.current?.elements.namedItem(id) as HTMLElement | null)?.focus();

  useEffect(() => {
    if (status) statusRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const bad = validate();
    if (Object.keys(bad).length) {
      setTimeout(() => summaryRef.current?.focus(), 0);
      return;
    }
    if (!BOOKING_ENDPOINT) {
      setStatus({
        kind: 'notice',
        text: 'Your request has not been sent. This form is not connected to a booking service yet, so no appointment request has been made. Please check back soon.',
      });
      return;
    }
    setSending(true);
    try {
      const body = Object.fromEntries(new FormData(formRef.current!));
      const res = await fetch(BOOKING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error('bad status');
      formRef.current?.reset();
      setStatus({
        kind: 'success',
        text: 'Thank you. We have received your appointment request. Your preferred date and time are subject to confirmation, and we will be in touch to confirm.',
      });
    } catch {
      setStatus({ kind: 'error', text: 'Sorry, your request could not be sent. Please try again.' });
    } finally {
      setSending(false);
    }
  };

  const bad = rules.filter((r) => errors[r.id]);
  const field = (id: Field) => ({
    id,
    name: id,
    required: true,
    'aria-invalid': errors[id] ? true : false,
    'aria-describedby': `${id}-err`,
    className: errors[id] ? 'bad' : undefined,
    onChange: () => {
      if (!errors[id]) return;
      const r = rules.find((x) => x.id === id)!;
      if (r.ok(valueOf(id), min)) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      }
    },
  });
  const err = (id: Field) => (
    <p className="ferr" id={`${id}-err`} hidden={!errors[id]}>
      {errors[id] ? `Error: ${errors[id]}` : ''}
    </p>
  );

  return (
    <main className="bkp">
      <div className="bkp-grid">
        <div className="bkp-intro">
          <p className="pg-lbl">Appointments</p>
          <h1>Book an appointment</h1>
          <p className="pg-intro">
            Tell us what you need and when suits you. This is an appointment request: your
            preferred date and time are subject to confirmation, and your appointment is not
            booked until we confirm it with you.
          </p>
          <p className="bkp-note">
            Personal eyecare starts with a conversation. We will be in touch to agree a time.
          </p>
        </div>
        <div className="bkp-panel">
          <div id="err-summary" className="bkp-err" role="alert" tabIndex={-1} ref={summaryRef} hidden={bad.length === 0}>
            <p>
              Please fix {bad.length} {bad.length > 1 ? 'fields' : 'field'} before sending your request:
            </p>
            <ul>
              {bad.map((r) => (
                <li key={r.id}>
                  <a
                    href={`#${r.id}`}
                    onClick={(ev) => {
                      ev.preventDefault();
                      focusField(r.id);
                    }}
                  >
                    {r.message}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div
            id="form-status"
            className="bkp-status"
            role="status"
            aria-live="polite"
            tabIndex={-1}
            ref={statusRef}
            hidden={!status}
          >
            {status?.text}
          </div>
          <form id="booking-form" noValidate ref={formRef} onSubmit={onSubmit}>
            <div className="fld">
              <label htmlFor="name">Full name <span>(required)</span></label>
              <input type="text" autoComplete="name" {...field('name')} />
              {err('name')}
            </div>
            <div className="fld">
              <label htmlFor="email">Email address <span>(required)</span></label>
              <input type="email" autoComplete="email" {...field('email')} />
              {err('email')}
            </div>
            <div className="fld">
              <label htmlFor="phone">Phone number <span>(required)</span></label>
              <input type="tel" autoComplete="tel" {...field('phone')} />
              {err('phone')}
            </div>
            <div className="fld">
              <label htmlFor="type">Appointment type <span>(required)</span></label>
              <select defaultValue="" {...field('type')}>
                <option value="">Select an appointment type</option>
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {err('type')}
            </div>
            <div className="fld-row">
              <div className="fld">
                <label htmlFor="date">Preferred date <span>(required)</span></label>
                <input type="date" min={min} {...field('date')} />
                {err('date')}
              </div>
              <div className="fld">
                <label htmlFor="time">Preferred time <span>(required)</span></label>
                <select defaultValue="" {...field('time')}>
                  <option value="">Select a time</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>No preference</option>
                </select>
                {err('time')}
              </div>
            </div>
            <div className="fld">
              <label htmlFor="message">Message <span>(optional)</span></label>
              <textarea id="message" name="message" rows={4} aria-describedby="msg-hint"></textarea>
              <p className="fhint" id="msg-hint">Anything you would like us to know before your visit.</p>
            </div>
            <p className="fhint">
              Your preferred date and time are subject to confirmation. Sending this form does not
              book an appointment.
            </p>
            <button type="submit" className="btn pbtn bkp-submit" disabled={sending}>
              Request appointment
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
