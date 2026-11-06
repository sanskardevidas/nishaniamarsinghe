import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import BookAppointment from './pages/BookAppointment';
import DoctorWelcome from './doctor/DoctorWelcome';

export default function App() {
  return (
    <Routes>
      <Route index element={<DoctorWelcome />} />
      <Route path="doctor-welcome" element={<DoctorWelcome />} />
      <Route element={<Layout />}>
        <Route path="amera" element={<Home />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="book-appointment" element={<BookAppointment />} />
      </Route>
      <Route path="*" element={<DoctorWelcome />} />
    </Routes>
  );
}
