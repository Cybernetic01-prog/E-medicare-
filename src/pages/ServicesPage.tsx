import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  FileText,
  Stethoscope,
  Pill,
  FlaskConical,
  Bell,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { setActivePage, setIsBookModalOpen } = useApp();

  const services = [
    {
      id: 'appointments',
      title: 'Appointment Booking',
      category: 'Outpatient Scheduling',
      icon: Calendar,
      desc: 'Patients can view specialist availability, select appropriate clinic dates and time slots, and submit consultation requests with confirmation slips.',
      features: [
        'Doctor specialization filtering',
        'Real-time date and time slot allocation',
        'Automatic confirmation and reminder triggers',
        'Self-service rescheduling and cancellation',
      ],
      actionText: 'Book An Appointment',
      page: 'appointments',
      primaryAction: () => setIsBookModalOpen(true),
    },
    {
      id: 'records',
      title: 'Patient Medical Records (EMR)',
      category: 'Clinical Informatics',
      icon: FileText,
      desc: 'A secure electronic health records repository containing complete clinical encounter histories, physical vital signs, symptoms, and ICD-10 diagnostic codes.',
      features: [
        'Vital signs tracking (BP, pulse, temp, SpO2, weight)',
        'Chronological visit histories',
        'Standardized ICD-10 diagnostic entries',
        'Searchable clinical encounter archive',
      ],
      actionText: 'Open Medical Records',
      page: 'medical-records',
      primaryAction: () => setActivePage('medical-records'),
    },
    {
      id: 'consultation',
      title: 'Doctor Consultation',
      category: 'Clinical Care Services',
      icon: Stethoscope,
      desc: 'Provides medical doctors with structured outpatient consultation interfaces for patient evaluation, clinical history reviews, and referral notes.',
      features: [
        'Physician profile and credential verification',
        'Daily outpatient consultation queues',
        'Direct encounter note documentation',
        'Departmental cross-referrals',
      ],
      actionText: 'View Doctors Directory',
      page: 'doctors',
      primaryAction: () => setActivePage('doctors'),
    },
    {
      id: 'prescriptions',
      title: 'Prescription Management',
      category: 'Pharmacy Services',
      icon: Pill,
      desc: 'Facilitates electronic prescription issuance by doctors with clear dosage metrics, administration routes, refill counts, and dispensing statuses.',
      features: [
        'Standardized drug dosage and frequency formulas',
        'Patient allergy cross-referencing',
        'Authorized refill tracking',
        'Digital prescription printout generation',
      ],
      actionText: 'View Prescriptions',
      page: 'prescriptions',
      primaryAction: () => setActivePage('prescriptions'),
    },
    {
      id: 'laboratory',
      title: 'Laboratory Results',
      category: 'Diagnostic Services',
      icon: FlaskConical,
      desc: 'Electronic delivery of biochemistry, hematology, microbiology, and urinalysis test results with reference ranges and abnormal result flag warnings.',
      features: [
        'Complete quantitative parameter tables',
        'Visual indicators for Normal/Elevated/Low values',
        'Pathologist summary and remarks',
        'Attending physician interpretation notes',
      ],
      actionText: 'Access Lab Reports',
      page: 'lab-results',
      primaryAction: () => setActivePage('lab-results'),
    },
    {
      id: 'notifications',
      title: 'Healthcare Notifications',
      category: 'Communication System',
      icon: Bell,
      desc: 'Automated notification alerts that keep patients and healthcare providers informed regarding appointments, lab results, and pharmacy status.',
      features: [
        'Appointment booking confirmations and reminders',
        'Laboratory test completion alerts',
        'Prescription refill reminders',
        'Hospital system announcements',
      ],
      actionText: 'View Notifications Center',
      page: 'notifications',
      primaryAction: () => setActivePage('notifications'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          System Clinical Services & Modules
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
          The Dynamic E-Health Management System includes 6 core functional service modules engineered to digitize hospital operations.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {srv.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {srv.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-slate-100">
                <button
                  onClick={srv.primaryAction}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{srv.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
