import { useState } from 'react';
import { Phone, Calendar, Eye, Moon, Sun, Type, X } from 'lucide-react';

export default function FloatingWidgets() {
  const [open, setOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  const toggleHighContrast = () => {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const cycleFontSize = () => {
    const sizes: ('sm' | 'md' | 'lg' | 'xl')[] = ['sm', 'md', 'lg', 'xl'];
    const currentIndex = sizes.indexOf(fontSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    setFontSize(nextSize);
    document.documentElement.setAttribute('data-font-size', nextSize);
  };

  const scrollToAppointment = () => {
    document.querySelector('#appointment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Sub-Actions Popup Menu */}
      {open && (
        <div className="flex flex-col items-end gap-2.5 animate-fade-in mb-1">
          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            aria-label="Toggle High Contrast Mode"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-float border border-brand-border text-brand-dark hover:text-brand-primary transition-all text-xs font-semibold"
          >
            <span>{highContrast ? 'Standard Contrast' : 'High Contrast Mode'}</span>
            <div className="w-8 h-8 rounded-xl bg-brand-section flex items-center justify-center text-brand-primary">
              {highContrast ? <Sun size={15} /> : <Moon size={15} />}
            </div>
          </button>

          {/* Text Size Resizer */}
          <button
            onClick={cycleFontSize}
            aria-label="Adjust Text Size"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-float border border-brand-border text-brand-dark hover:text-brand-primary transition-all text-xs font-semibold"
          >
            <span>Text Size: <strong className="uppercase">{fontSize}</strong></span>
            <div className="w-8 h-8 rounded-xl bg-brand-section flex items-center justify-center text-brand-primary">
              <Type size={15} />
            </div>
          </button>

          {/* Quick Call */}
          <a
            href="tel:+442380000000"
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white shadow-float border border-brand-border text-brand-dark hover:text-brand-primary transition-all text-xs font-semibold"
          >
            <span>Call Secretary</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone size={15} />
            </div>
          </a>

          {/* Book Appointment Quick Trigger */}
          <button
            onClick={scrollToAppointment}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-primary text-white shadow-float transition-all text-xs font-semibold"
          >
            <span>Book Appointment</span>
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Calendar size={15} />
            </div>
          </button>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Quick Actions & Accessibility Options"
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 transform ${
          open
            ? 'bg-brand-dark text-white rotate-45'
            : 'bg-gradient-to-r from-brand-primary to-brand-cta text-white hover:scale-105 shadow-button'
        }`}
      >
        {open ? <X size={24} /> : <Eye size={24} />}
      </button>
    </div>
  );
}
