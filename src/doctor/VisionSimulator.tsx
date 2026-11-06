import { useState, useRef, useEffect } from 'react';
import { Eye, Sliders, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import aboutImg from '../assets/images/glaucoma.jpg';
import cataractImg from '../assets/images/cataracts.jpg';
import eyeGeneralImg from '../assets/images/ophthalmology.jpg';

interface ConditionOption {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  treatmentName: string;
  treatmentDetails: string;
  blurAmount: string;
  tunnelVision: boolean;
  clearImg: string;
}

const conditions: ConditionOption[] = [
  {
    id: 'cataract',
    name: 'Cataract Vision Blur',
    subtitle: 'Cloudy, hazy vision & nighttime light glare',
    description: 'Cataracts cause the natural eye lens to cloud over time, leading to foggy vision, dulled colors, and halos around lights.',
    treatmentName: 'Micro-Incision Cataract Surgery',
    treatmentDetails: 'Replaces cloudy lens with a crystal-clear premium intraocular lens (IOL) in under 20 minutes.',
    blurAmount: 'blur(7px) brightness(0.85) contrast(0.8)',
    tunnelVision: false,
    clearImg: cataractImg,
  },
  {
    id: 'glaucoma',
    name: 'Glaucoma Peripheral Loss',
    subtitle: 'Gradual loss of side vision (Tunnel Vision)',
    description: 'Glaucoma damages the optic nerve due to fluid pressure, gradually reducing peripheral vision without early pain.',
    treatmentName: 'MIGS & Selective Laser Trabeculoplasty',
    treatmentDetails: 'Restores fluid drainage and stabilizes intraocular pressure to protect remaining eyesight.',
    blurAmount: 'blur(2px) contrast(0.9)',
    tunnelVision: true,
    clearImg: aboutImg,
  },
  {
    id: 'refractive',
    name: 'General Refractive Blur',
    subtitle: 'Loss of sharp focus for daily tasks',
    description: 'Refractive errors cause strain, difficulty reading, and inability to recognize fine details clearly.',
    treatmentName: 'Personalised Ophthalmic Consultation',
    treatmentDetails: 'Comprehensive assessment and tailored prescription or surgical options.',
    blurAmount: 'blur(9px) saturate(0.8)',
    tunnelVision: false,
    clearImg: eyeGeneralImg,
  },
];

export default function VisionSimulator() {
  const [selectedId, setSelectedId] = useState('cataract');
  const containerRef = useRef<HTMLDivElement>(null);
  // The slider follows the pointer directly (no click needed). Position is applied through CSS
  // variables and eased in a rAF loop, so moving a cursor or finger never re-renders React.
  const targetRef = useRef(50);
  const posRef = useRef(50);
  const rafRef = useRef(0);
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const selectedCondition = conditions.find((c) => c.id === selectedId) || conditions[0];

  const paint = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty('--pos', posRef.current.toFixed(3));
    el.setAttribute('aria-valuenow', String(Math.round(posRef.current)));
  };
  const tick = () => {
    const d = targetRef.current - posRef.current;
    if (reduce || Math.abs(d) < 0.03) {
      posRef.current = targetRef.current;
      paint();
      rafRef.current = 0;
      return;
    }
    posRef.current += d * 0.22;
    paint();
    rafRef.current = requestAnimationFrame(tick);
  };
  const aim = (pct: number) => {
    targetRef.current = Math.min(95, Math.max(5, pct));
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
  };
  const aimAt = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    aim(((clientX - rect.left) / rect.width) * 100);
  };
  const resetSlider = () => {
    targetRef.current = 50;
    posRef.current = 50;
    paint();
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => el.style.setProperty('--cw', `${el.clientWidth}px`);
    measure();
    paint();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="vision-simulator" className="py-24 bg-[#f3f2ef] border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark text-xs font-semibold px-4 py-2 rounded-full border border-brand-primary mb-4">
            <Sparkles size={13} className="text-brand-primary animate-pulse" />
            Interactive Tool
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight mb-4">
            Vision Clarity <span className="gradient-text">Simulator</span>
          </h2>
          <p className="text-brand-soft text-base sm:text-lg max-w-2xl mx-auto">
            Drag the slider below to compare how vision looks with untreated eye conditions versus restored clarity after specialist treatment.
          </p>
        </div>

        {/* Condition Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {conditions.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selectedId === item.id}
              onClick={() => {
                setSelectedId(item.id);
                resetSlider();
              }}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2.5 ${
                selectedId === item.id
                  ? 'bg-[#dda731] text-brand-dark border border-[#dda731] shadow-button scale-105'
                  : 'bg-[#f3f2ef] text-brand-dark border border-brand-border'
              }`}
            >
              <Eye size={16} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Comparison Slider Frame */}
        <div className="max-w-4xl mx-auto bg-brand-primary rounded-3xl p-4 sm:p-6 shadow-card border border-brand-primary">
          <div
            ref={containerRef}
            onPointerMove={(e) => aimAt(e.clientX)}
            onPointerDown={(e) => aimAt(e.clientX)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                e.preventDefault();
                aim(targetRef.current + (e.key === 'ArrowRight' ? 5 : -5));
              }
            }}
            tabIndex={0}
            role="slider"
            aria-label="Compare vision with the condition and after treatment"
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={50}
            style={{ touchAction: 'pan-y pinch-zoom' }}
            className="relative h-[340px] sm:h-[440px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-brand-border shadow-inner"
          >
            {/* Clear Image (After / Right Side) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={selectedCondition.clearImg}
                alt="Restored Clear Vision"
                draggable={false}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-brand-primary text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                Post-Treatment Clear Vision
              </div>
            </div>

            {/* Affected Image (Before / Left Side Clipping) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: 'calc(var(--pos, 50) * 1%)' }}
            >
              <div className="relative w-full h-full">
                <img
                  src={selectedCondition.clearImg}
                  alt={selectedCondition.name}
                  draggable={false}
                  className="w-full h-full object-cover"
                  style={{
                    filter: selectedCondition.blurAmount,
                    width: 'var(--cw, 100%)',
                    maxWidth: 'none',
                  }}
                />
                {/* Tunnel Vision Effect for Glaucoma */}
                {selectedCondition.tunnelVision && (
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.85) 75%)'
                  }} />
                )}
                <div className="absolute top-4 left-4 bg-brand-dark text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                  <Info size={13} />
                  {selectedCondition.name}
                </div>
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: 'calc(var(--pos, 50) * 1%)' }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-dark text-white shadow-xl flex items-center justify-center border-2 border-white">
                <Sliders size={18} />
              </div>
            </div>
          </div>

          {/* Condition Details Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4 border-t border-black/20">
            <div>
              <div className="text-xs font-semibold text-black uppercase tracking-wider mb-1">
                Condition Overview
              </div>
              <h3 className="text-lg font-bold text-black mb-1">{selectedCondition.name}</h3>
              <p className="text-black text-sm leading-relaxed">{selectedCondition.description}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-brand-border">
              <div className="text-xs font-semibold text-brand-dark uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles size={12} className="text-brand-dark" />
                Specialist Solution
              </div>
              <div className="font-bold text-brand-dark text-sm">{selectedCondition.treatmentName}</div>
              <div className="text-xs text-[#3d445a] mt-1 leading-normal">{selectedCondition.treatmentDetails}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
