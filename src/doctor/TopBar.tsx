import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { PRACTICE } from './practice';

export default function TopBar() {
  return (
    <div className="bg-brand-dark py-2.5 px-4 hidden md:block">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-white">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-white" />
            <span>{PRACTICE.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-white" />
            <span>{PRACTICE.hours}</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a href={PRACTICE.phoneHref} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Phone size={13} className="text-white" />
            <span>{PRACTICE.phone}</span>
          </a>
          <a href={`mailto:${PRACTICE.email}`} className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Mail size={13} className="text-white" />
            <span>{PRACTICE.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
