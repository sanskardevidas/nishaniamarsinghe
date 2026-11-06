import './doctor-welcome.css';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Hero from './Hero';
import TrustBar from './TrustBar';
import Services from './Services';
import VisionSimulator from './VisionSimulator';
import About from './About';
import WhyChoose from './WhyChoose';
import DoctorSpotlight from './DoctorSpotlight';
import TreatmentProcess from './TreatmentProcess';
import Testimonials from './Testimonials';
import Locations from './Locations';
import Appointment from './Appointment';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import SiteFooter from './SiteFooter';

export default function DoctorWelcome() {
  return (
    <div className="dw">
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
      <SiteFooter />
    </div>
  );
}
