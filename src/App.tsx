import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { ToastContainer } from './components/ToastContainer';

// Modals
import { BookAppointmentModal } from './components/Modals/BookAppointmentModal';
import { LabReportDetailModal } from './components/Modals/LabReportDetailModal';
import { DoctorProfileModal } from './components/Modals/DoctorProfileModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicalRecordsPage } from './pages/MedicalRecordsPage';
import { PrescriptionsPage } from './pages/PrescriptionsPage';
import { LabResultsPage } from './pages/LabResultsPage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  // Determine if active page is a public website view or an authenticated portal view
  const isPublicPage = [
    'home',
    'about',
    'services',
    'doctors',
    'contact',
    'login',
    'register',
  ].includes(activePage);

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'doctors':
        return <DoctorsPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'patient-dashboard':
        return <PatientDashboard />;
      case 'doctor-dashboard':
        return <DoctorDashboard />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'appointments':
        return <AppointmentsPage />;
      case 'medical-records':
        return <MedicalRecordsPage />;
      case 'prescriptions':
        return <PrescriptionsPage />;
      case 'lab-results':
        return <LabResultsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'notifications':
        return <NotificationsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] text-[#333333] flex flex-col font-sans antialiased selection:bg-[#3498db] selection:text-white">
      {isPublicPage ? (
        /* Public Academic Website Layout */
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{renderActivePage()}</main>
          <Footer />
        </div>
      ) : (
        /* Authenticated Clinic & Hospital Portal Layout */
        <div className="flex min-h-screen bg-[#f4f7f9]">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 min-h-screen">
            <TopHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
              {renderActivePage()}
            </main>
            <footer className="h-8 bg-[#ecf0f1] border-t border-[#e1e8ed] flex items-center justify-between px-6 text-[10px] text-[#7f8c8d] shrink-0 select-none">
              <div>Project: Design and Implementation of a Dynamic E-Health Management System</div>
              <div className="hidden sm:block">Developed by: [Student Name / ID: 2024-CSC-001]</div>
            </footer>
          </div>
        </div>
      )}

      {/* Global Clinical Modals */}
      <BookAppointmentModal />
      <LabReportDetailModal />
      <DoctorProfileModal />

      {/* Real-time Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
