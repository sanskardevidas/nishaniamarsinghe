import { Eye, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const quickLinks = ['Home', 'About', 'Services', 'Locations', 'Contact'];
const services = ['Glaucoma Management', 'Cataract Surgery', 'MIGS Procedures', 'Eye Consultations'];
const hospitals = ['University Hospital Southampton', 'Nuffield Health Southampton', 'Spire Southampton', 'Practice Plus Group'];

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white">

      {/* ================= MOBILE FOOTER ================= */}
      <div className="block md:hidden px-4 py-10 space-y-8">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-cta flex items-center justify-center">
              <Eye size={16} />
            </div>
            <div>
              <div className="font-bold text-sm">Dr. Nishani Amerasinghe</div>
              <div className="text-xs text-white/60">Consultant Ophthalmologist</div>
            </div>
          </div>

          <p className="text-white/60 text-xs leading-relaxed">
            Specialist glaucoma and cataract care across Southampton and the South Coast.
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-white/70">
            <Phone size={14} /> +44 (0) 238 000 0000
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <Mail size={14} /> hello@themedicalpa.co.uk
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <MapPin size={14} /> Southampton, UK
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            {quickLinks.map((link) => (
              <button key={link} onClick={() => scrollTo(`#${link.toLowerCase().replace(' ', '-')}`)}>
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-white/40 pt-4 border-t border-white/10">
          © {new Date().getFullYear()} Dr. Nishani Amerasinghe
        </div>
      </div>

      {/* ================= DESKTOP FOOTER ================= */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="grid grid-cols-4 gap-10 mb-12">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-primary to-brand-cta flex items-center justify-center">
                  <Eye size={18} />
                </div>
                <div>
                  <div className="font-bold text-sm">Dr. Nishani Amerasinghe</div>
                  <div className="text-xs text-white/50">Consultant Ophthalmologist</div>
                </div>
              </div>

              <p className="text-white/60 text-sm mb-5">
                Specialist eye care delivered with expertise across Southampton.
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Phone size={14}/> +44 (0) 238 000 0000</div>
                <div className="flex items-center gap-2"><Mail size={14}/> hello@themedicalpa.co.uk</div>
                <div className="flex items-center gap-2"><MapPin size={14}/> Southampton</div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-5">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <button onClick={() => scrollTo(`#${link.toLowerCase().replace(' ', '-')}`)}>
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold mb-5">Services</h4>
              <ul className="space-y-2">
                {services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h4 className="font-bold mb-5">Locations</h4>
              <ul className="space-y-2">
                {hospitals.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-6 flex justify-between text-xs text-white/40">
            <span>© {new Date().getFullYear()} Dr. Nishani Amerasinghe</span>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}