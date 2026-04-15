import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-brand-section border-b border-brand-border py-2.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-brand-soft">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-brand-primary" />
            <span>Southampton & South Coast, England</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-brand-primary" />
            <span>Mon–Fri: 9:00am – 5:00pm</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href="tel:+442380000000" className="flex items-center gap-1.5 hover:text-brand-primary transition-colors">
            <Phone size={13} className="text-brand-primary" />
            <span>+44 (0) 238 000 0000</span>
          </a>
          <a href="mailto:hello@themedicalpa.co.uk" className="flex items-center gap-1.5 hover:text-brand-primary transition-colors">
            <Mail size={13} className="text-brand-primary" />
            <span>hello@themedicalpa.co.uk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
