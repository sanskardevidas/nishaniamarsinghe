import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import VisionSimulator from './components/VisionSimulator';
import About from './components/About';
import WhyChoose from './components/WhyChoose';
import DoctorSpotlight from './components/DoctorSpotlight';
import Testimonials from './components/Testimonials';
import Locations from './components/Locations';
import TreatmentProcess from './components/TreatmentProcess';
import Appointment from './components/Appointment';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-bg relative">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <VisionSimulator />
        <About />
        <WhyChoose />
        <DoctorSpotlight />
        <TreatmentProcess />
        <Testimonials />
        <Locations />
        <Appointment />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
