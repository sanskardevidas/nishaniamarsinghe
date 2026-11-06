import { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Intro from '../components/home/Intro';
import ServicesSection from '../components/home/ServicesSection';
import Personal from '../components/home/Personal';
import Clarity from '../components/home/Clarity';
import Brands from '../components/home/Brands';
import Faces from '../components/home/Faces';
import Voices from '../components/home/Voices';
import Journal from '../components/home/Journal';
import BookBanner from '../components/home/BookBanner';

export default function Home() {
  useEffect(() => {
    document.title = 'Amera Eyecare | Independent eyecare, centred around you';
  }, []);
  return (
    <main>
      <Hero />
      <Intro />
      <ServicesSection />
      <Personal />
      <Clarity />
      <Brands />
      <Faces />
      <Voices />
      <Journal />
      <BookBanner />
    </main>
  );
}
