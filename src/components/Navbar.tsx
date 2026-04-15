import { useEffect, useState } from 'react';
import { Eye, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Locations', href: '#locations' },
  { label: 'Contact', href: '#appointment' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'top-0 bg-white/92 backdrop-blur-xl shadow-md border-b border-brand-border'
            : 'top-[40px] md:top-[40px] bg-white/70 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-[72px] md:h-[78px] flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => handleNav('#home')}
              className="flex items-center gap-3 min-w-0 flex-shrink pr-2"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cta flex items-center justify-center shadow-button flex-shrink-0">
                <Eye size={20} className="text-white" />
              </div>

              <div className="min-w-0 text-left">
                <div className="font-bold text-brand-dark text-[15px] sm:text-base leading-tight truncate">
                  Dr. Nishani Amerasinghe
                </div>
                <div className="text-[11px] sm:text-xs text-brand-soft leading-tight truncate">
                  Consultant Ophthalmologist
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-brand-dark text-sm font-medium hover:text-brand-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary rounded-full transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleNav('#appointment')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              aria-label="Toggle menu"
              className="md:hidden w-11 h-11 rounded-xl border border-brand-border bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-dark hover:text-brand-primary transition-colors flex-shrink-0"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-[72px] left-4 right-4 rounded-3xl border border-brand-border bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="px-5 py-5 border-b border-brand-border bg-brand-bg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cta flex items-center justify-center shadow-button">
                <Eye size={18} className="text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-brand-dark text-sm leading-tight">
                  Dr. Nishani Amerasinghe
                </div>
                <div className="text-xs text-brand-soft leading-tight">
                  Consultant Ophthalmologist
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="flex items-center justify-between w-full text-left text-brand-dark font-medium py-3 px-4 rounded-2xl hover:bg-brand-section hover:text-brand-primary transition-all"
              >
                <span>{link.label}</span>
                <span className="text-brand-primary text-sm">→</span>
              </button>
            ))}
          </div>

          <div className="px-4 pb-5">
            <button
              onClick={() => handleNav('#appointment')}
              className="btn-primary w-full justify-center"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}