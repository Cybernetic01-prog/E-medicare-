import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  Bell,
  UserCheck,
  ShieldCheck,
  ArrowRight,
  Clock,
  CheckCircle2,
  Stethoscope,
  Building2,
  BookOpen
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActivePage, currentUser, users, setIsBookModalOpen, setSelectedDoctorProfile, setSelectedDoctorForBooking } = useApp();
  const doctors = users.filter((u) => u.role === 'doctor').slice(0, 4);

  const services = [
    {
      title: 'Appointment Booking',
      desc: 'Allows patients to easily schedule outpatient consultations with specialist physicians based on availability.',
      icon: Calendar,
      page: 'appointments',
      tag: 'Scheduling Module',
    },
    {
      title: 'Patient Medical Records',
      desc: 'Centralized electronic health records (EMR) storing clinical history, examination vitals, diagnoses, and treatments.',
      icon: FileText,
      page: 'medical-records',
      tag: 'Clinical EMR',
    },
    {
      title: 'Doctor Consultation',
      desc: 'Facilitates organized clinical workflows, specialist directory lookup, and outpatient queue management.',
      icon: Stethoscope,
      page: 'doctors',
      tag: 'Clinical Care',
    },
    {
      title: 'Prescription Management',
      desc: 'Digital issuance and tracking of medications, dosage frequencies, routes of administration, and refill authorizations.',
      icon: Pill,
      page: 'prescriptions',
      tag: 'Pharmacy Module',
    },
    {
      title: 'Laboratory Results',
      desc: 'Direct electronic access to biochemistry, hematology, and microbiology pathology reports with reference ranges.',
      icon: FlaskConical,
      page: 'lab-results',
      tag: 'Diagnostics',
    },
    {
      title: 'Healthcare Notifications',
      desc: 'Timely automated alerts for upcoming clinic appointments, ready lab specimens, and prescription status.',
      icon: Bell,
      page: 'notifications',
      tag: 'Alerts System',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Notice Ticker */}
      <div className="bg-[#ecf0f1] border-b border-[#e1e8ed] text-[#2c3e50] py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#3498db] text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase">
              Notice
            </span>
            <span className="truncate">
              Dynamic E-Health System prototype active for academic evaluation. Outpatient clinics operate Mon - Fri (08:00 AM - 04:00 PM).
            </span>
          </div>
          <button
            onClick={() => setActivePage('about')}
            className="text-[#3498db] hover:text-[#2980b9] font-bold underline shrink-0 hidden sm:inline"
          >
            Read Project Abstract
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="bg-white border border-[#e1e8ed] rounded p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#f8f9fa] border border-[#e1e8ed] text-xs text-[#7f8c8d] font-semibold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#3498db]" />
              <span>Final-Year Academic Software Project Prototype</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-[#2c3e50] tracking-tight leading-tight">
              Design & Implementation of a Dynamic E-Health Management System
            </h1>

            <p className="text-sm sm:text-base text-[#555] leading-relaxed">
              A centralized web-based platform designed to facilitate hospital outpatient scheduling, electronic health record (EMR) tracking, digital pharmacy orders, and seamless communication between patients and clinical officers.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              {currentUser ? (
                <button
                  onClick={() => {
                    if (currentUser.role === 'patient') setActivePage('patient-dashboard');
                    else if (currentUser.role === 'doctor') setActivePage('doctor-dashboard');
                    else setActivePage('admin-dashboard');
                  }}
                  className="bg-[#3498db] hover:bg-[#2980b9] text-white text-sm font-bold px-6 py-2.5 rounded shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Open Your Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setActivePage('register')}
                    className="bg-[#3498db] hover:bg-[#2980b9] text-white text-sm font-bold px-6 py-2.5 rounded shadow-xs transition-colors"
                  >
                    Register Account
                  </button>
                  <button
                    onClick={() => setActivePage('about')}
                    className="bg-white border border-[#e1e8ed] hover:bg-[#f8f9fa] text-[#2c3e50] text-sm font-semibold px-5 py-2.5 rounded transition-colors"
                  >
                    Project Abstract
                  </button>
                </>
              )}

              <button
                onClick={() => setIsBookModalOpen(true)}
                className="bg-[#1a2b3c] hover:bg-[#2c3e50] text-white text-sm font-semibold px-5 py-2.5 rounded shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4 text-[#3498db]" />
                <span>Book Appointment</span>
              </button>
            </div>

            {/* Academic Badges */}
            <div className="pt-6 border-t border-[#e1e8ed] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#555]">
              <div>
                <span className="block font-bold text-[#2c3e50] text-sm">24/7</span>
                <span className="text-[#7f8c8d]">Record Availability</span>
              </div>
              <div>
                <span className="block font-bold text-[#2c3e50] text-sm">3 Roles</span>
                <span className="text-[#7f8c8d]">Patient, Doctor, Admin</span>
              </div>
              <div>
                <span className="block font-bold text-[#2c3e50] text-sm">Modular</span>
                <span className="text-[#7f8c8d]">EMR, Rx, Labs, Slots</span>
              </div>
              <div>
                <span className="block font-bold text-[#2c3e50] text-sm">100% Digital</span>
                <span className="text-[#7f8c8d]">Paperless Clinical Flow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2c3e50] tracking-tight">
              Integrated Clinical & Management Services
            </h2>
            <p className="text-xs sm:text-sm text-[#7f8c8d] mt-1">
              Core functional modules engineered to replace manual hospital record management.
            </p>
          </div>
          <button
            onClick={() => setActivePage('services')}
            className="text-xs font-bold text-[#3498db] hover:text-[#2980b9] flex items-center gap-1"
          >
            <span>View All Services Detail</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#e1e8ed] rounded p-5 hover:border-[#3498db] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded bg-[#f4f7f9] text-[#3498db] flex items-center justify-center border border-[#e1e8ed]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-[#7f8c8d] bg-[#f8f9fa] px-2 py-0.5 rounded border border-[#e1e8ed]">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#2c3e50] mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[#555] leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-[#e1e8ed] flex items-center justify-between">
                  <button
                    onClick={() => setActivePage(service.page)}
                    className="text-xs font-bold text-[#3498db] hover:text-[#2980b9] flex items-center gap-1"
                  >
                    <span>Launch Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2c3e50] tracking-tight">
              Hospital Doctors & Clinical Specialists
            </h2>
            <p className="text-xs sm:text-sm text-[#7f8c8d] mt-1">
              Resident consultants and attending physicians available on the portal.
            </p>
          </div>
          <button
            onClick={() => setActivePage('doctors')}
            className="text-xs font-bold text-[#3498db] hover:text-[#2980b9] flex items-center gap-1"
          >
            <span>View Full Directory ({users.filter((u) => u.role === 'doctor').length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-[#e1e8ed] rounded overflow-hidden shadow-sm hover:border-[#3498db] transition-all flex flex-col justify-between"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#e1e8ed]"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#2c3e50] leading-tight">{doc.name}</h3>
                    <p className="text-xs text-[#3498db] font-medium">{doc.department}</p>
                    <span className="text-[10px] text-[#7f8c8d] font-mono block mt-0.5">
                      {doc.licenseNumber}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#555] border-t border-[#e1e8ed] pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#7f8c8d] shrink-0" />
                    <span className="truncate">{doc.specialization}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#7f8c8d] shrink-0" />
                    <span className="text-[11px] text-[#7f8c8d] truncate">{doc.availability}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#f8f9fa] border-t border-[#e1e8ed] flex items-center gap-2">
                <button
                  onClick={() => setSelectedDoctorProfile(doc)}
                  className="flex-1 bg-white border border-[#e1e8ed] hover:bg-[#f4f7f9] text-[#2c3e50] text-xs font-semibold py-1.5 rounded transition-colors text-center"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setSelectedDoctorForBooking(doc);
                    setIsBookModalOpen(true);
                  }}
                  className="flex-1 bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold py-1.5 rounded transition-colors text-center"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Problem Statement Callout Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a2b3c] text-white rounded p-6 sm:p-8 border border-[#2c3e50] shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-2.5">
              <div className="flex items-center gap-2 text-[#3498db] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Project Motivation & Scope</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Addressing Healthcare Inefficiencies Through Software Automation
              </h2>
              <p className="text-xs sm:text-sm text-[#bdc3c7] leading-relaxed">
                Traditional healthcare environments often suffer from misplaced physical case files, scheduling conflicts, delayed laboratory reporting, and illegible hand-written prescriptions. This academic system demonstrates how a dynamic, unified web portal solves these operational bottlenecks.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-end">
              <button
                onClick={() => setActivePage('about')}
                className="bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold px-5 py-2.5 rounded text-center transition-colors"
              >
                Read Project Methodology
              </button>
              <button
                onClick={() => setActivePage('login')}
                className="bg-[#2c3e50] hover:bg-[#34495e] text-white border border-[#34495e] text-xs font-semibold px-5 py-2.5 rounded text-center transition-colors"
              >
                Access System Portal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
