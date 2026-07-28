import { useState, useRef, useEffect } from 'react';
import { Eye, Sliders, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import aboutImg from '../assets/images/glaucoma.png';
import cataractImg from '../assets/images/cataracts.png';
import eyeGeneralImg from '../assets/images/ophthalmology.png';

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
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCondition = conditions.find((c) => c.id === selectedId) || conditions[0];

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <section id="vision-simulator" className="py-24 bg-white border-y border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-brand-accent text-brand-cta text-xs font-semibold px-4 py-2 rounded-full border border-blue-200 mb-4">
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
              onClick={() => {
                setSelectedId(item.id);
                setSliderPosition(50);
              }}
              className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all flex items-center gap-2.5 ${
                selectedId === item.id
                  ? 'bg-brand-primary text-white shadow-button scale-105'
                  : 'bg-brand-section text-brand-dark hover:bg-blue-50 border border-brand-border'
              }`}
            >
              <Eye size={16} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Comparison Slider Frame */}
        <div className="max-w-4xl mx-auto bg-brand-section rounded-3xl p-4 sm:p-6 shadow-card border border-brand-border">
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[340px] sm:h-[440px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-brand-border shadow-inner"
          >
            {/* Clear Image (After / Right Side) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={selectedCondition.clearImg}
                alt="Restored Clear Vision"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5">
                <CheckCircle2 size={13} />
                Post-Treatment Clear Vision
              </div>
            </div>

            {/* Affected Image (Before / Left Side Clipping) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <img
                  src={selectedCondition.clearImg}
                  alt={selectedCondition.name}
                  className="w-full h-full object-cover"
                  style={{
                    filter: selectedCondition.blurAmount,
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    maxWidth: 'none',
                  }}
                />
                {/* Tunnel Vision Effect for Glaucoma */}
                {selectedCondition.tunnelVision && (
                  <div className="absolute inset-0 pointer-events-none" style={{
                    background: 'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.85) 75%)'
                  }} />
                )}
                <div className="absolute top-4 left-4 bg-amber-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5">
                  <Info size={13} />
                  {selectedCondition.name}
                </div>
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-primary text-white shadow-xl flex items-center justify-center border-2 border-white">
                <Sliders size={18} />
              </div>
            </div>
          </div>

          {/* Condition Details Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4 border-t border-brand-border">
            <div>
              <div className="text-xs font-semibold text-brand-primary uppercase tracking-wider mb-1">
                Condition Overview
              </div>
              <h3 className="text-lg font-bold text-brand-dark mb-1">{selectedCondition.name}</h3>
              <p className="text-brand-soft text-sm leading-relaxed">{selectedCondition.description}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-brand-border">
              <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles size={12} />
                Specialist Solution
              </div>
              <div className="font-bold text-brand-dark text-sm">{selectedCondition.treatmentName}</div>
              <div className="text-xs text-brand-soft mt-1 leading-normal">{selectedCondition.treatmentDetails}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
