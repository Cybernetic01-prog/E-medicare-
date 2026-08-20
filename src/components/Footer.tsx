import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, ShieldCheck, FileText, Phone, MapPin, Clock, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-[#1a2b3c] text-[#bdc3c7] border-t border-[#2c3e50] text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: System Info & Academic Context */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#3498db] text-white flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                E-MediCare <span className="text-[#3498db] font-normal">System</span>
              </span>
            </div>
            <p className="text-xs text-[#95a5a6] leading-relaxed">
              Design and Implementation of a Dynamic E-Health Management System. An academic software implementation for hospital outpatient automation and clinical EMR indexing.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14212d] border border-[#2c3e50] text-[11px] text-[#bdc3c7]">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                Academic Capstone System v1.0
              </span>
            </div>
          </div>

          {/* Col 2: Project Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              System Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActivePage('appointments')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]"></span>
                  Appointment Booking & Scheduling
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('medical-records')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]"></span>
                  Electronic Medical Records (EMR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('prescriptions')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]"></span>
                  Digital Prescription System
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('lab-results')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]"></span>
                  Pathology & Laboratory Diagnostic Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('doctors')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]"></span>
                  Medical Staff Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Navigation & Documentation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('home')} className="hover:text-white transition-colors">
                  System Overview
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-white transition-colors">
                  Project Abstract & Problem Statement
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-white transition-colors">
                  Clinical Services
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="hover:text-white transition-colors">
                  Hospital & Helpdesk Contact
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('login')} className="hover:text-white transition-colors">
                  User Authentication
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('register')} className="hover:text-white transition-colors">
                  Account Registration
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Helpdesk & Hours */}
          <div className="space-y-2.5 text-xs text-[#95a5a6]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Hospital Helpdesk
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#3498db] shrink-0 mt-0.5" />
              <span>Campus Medical Centre & Teaching Annex, Academic District</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#3498db] shrink-0" />
              <span>Emergency Hotline: +234 800 911 0000</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#3498db] shrink-0 mt-0.5" />
              <div>
                <span>Outpatient Clinics: Mon - Fri (08:00 - 18:00)</span>
                <span className="block text-[11px] text-[#7f8c8d]">Emergency Unit: 24 Hours / 7 Days</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-[#2c3e50] text-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-[#7f8c8d]">
          <p>
            Project: Design and Implementation of a Dynamic E-Health Management System
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Developed by: [Student Name / ID: 2024-CSC-001]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
