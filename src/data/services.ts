import atRisk from '../assets/images/atRisk.jpg';
import glaucoma from '../assets/images/glaucoma.jpg';
import tp from '../assets/images/tp.jpg';

export interface Service {
  id: string;
  title: string;
  cta: string;
  image?: string;
  imageAlt?: string;
  intro: string;
  points: string[];
}

export const services: Service[] = [
  {
    id: 'eye-examinations',
    title: 'Eye examinations',
    cta: 'Book an eye test',
    image: atRisk,
    imageAlt: "An optometrist examining a patient's eyes with a slit lamp in a bright consulting room",
    intro:
      'From your first eye test to every check-up that follows, we take time to listen, explain and help you feel at ease.',
    points: [
      'Your visit starts with a conversation about your eyes, your health and how you use your eyes day to day.',
      'We explain what we find in plain language, so you leave knowing what happens next.',
      'Getting ready: bring your current glasses or contact lenses, and any questions you would like to ask.',
    ],
  },
  {
    id: 'contact-lenses',
    title: 'Contact lenses',
    cta: 'Book an appointment',
    image: glaucoma,
    imageAlt: 'A close-up of a human eye',
    intro: 'Contact lenses fitted around your eyes and your routine.',
    points: [
      'An introduction to your lens options, so you can decide what suits you.',
      'We talk through how you plan to wear them and what matters most to you.',
      'Ask us about getting started, or about changing your current lenses.',
    ],
  },
  {
    id: 'eyewear-styling',
    title: 'Eyewear styling',
    cta: 'Book an appointment',
    intro: 'Frames you love. Lenses for the way you live.',
    points: [
      'A little inspiration for your next pair, whether you want something new or a familiar favourite.',
      'We help you find frames that feel like you, and choose lenses to suit the way you live.',
      'Come and explore styles with us in the practice.',
    ],
  },
  {
    id: 'ongoing-eyecare',
    title: 'Ongoing eyecare',
    cta: 'Book an appointment',
    image: tp,
    imageAlt: 'A smiling clinician making notes on a clipboard at a desk',
    intro:
      'Personal care does not stop at your first visit. We are here to keep looking after your eyes and your eyewear.',
    points: [
      'Regular visits let us get to know you and notice what matters to you.',
      'Simple, everyday habits for looking after your glasses and your lenses.',
      'Independent eyecare, centred around you.',
    ],
  },
];
