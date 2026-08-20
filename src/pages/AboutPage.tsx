import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  FileCheck,
  AlertOctagon,
  CheckCircle2,
  Server,
  Users,
  Shield,
  Layers,
  GraduationCap
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-800 text-xs font-semibold uppercase tracking-wider mb-3">
          <GraduationCap className="w-4 h-4" />
          Academic Software Documentation
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Design and Implementation of a Dynamic E-Health Management System
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Final-Year Academic Project • Department of Computer Science & Information Technology
        </p>
      </div>

      {/* Abstract / Project Executive Summary */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-700" />
          Project Abstract
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
          The rapid advancement of web technologies has created viable pathways for transforming institutional healthcare delivery. In many conventional health institutions and university clinics, healthcare administration continues to depend heavily on manual, paper-based operations. This project presents the design and implementation of a <strong>Dynamic E-Health Management System</strong>: a modular, role-governed web application engineered to consolidate patient registration, electronic medical records (EMR), doctor appointment booking, prescription dispensing, diagnostic laboratory reporting, and real-time administrative auditing into a single accessible portal.
        </p>
      </section>

      {/* The Problem with Manual Healthcare Management */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-600" />
          Background & Statement of the Problem
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Healthcare facilities managing clinical workflows through physical folders face chronic operational vulnerabilities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">1. Physical Folder Degradation & Loss</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paper folders are vulnerable to misfiling, duplicate file creation, physical wear, and catastrophic data loss during relocation or storage accidents.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">2. Appointment Conflicts & Long Queues</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Manual appointment registers lead to overlapping time slots, patient overcrowding in outpatient waiting areas, and inefficient specialist allocation.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">3. Delayed Laboratory Dissemination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Diagnostic test results frequently experience courier delays between pathology laboratories and consulting physician offices, slowing down urgent treatment.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
            <h3 className="text-xs font-bold text-slate-900">4. Disjointed Prescription Tracking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Handwritten prescriptions risk dispensing errors due to illegibility and lack audit trails for authorized refills or active patient allergy checks.
            </p>
          </div>
        </div>
      </section>

      {/* How the Proposed System Addresses the Problem */}
      <section className="bg-sky-50/70 border border-sky-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-sky-700" />
          Proposed System Solutions
        </h2>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          The developed dynamic software prototype resolves these challenges through targeted digital modules:
        </p>

        <ul className="space-y-2.5 text-xs text-slate-700">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0"></span>
            <div>
              <strong>Structured Electronic Medical Records (EMR):</strong> Standardized visit encounters, vital signs logs (BP, pulse, temp, weight), ICD-10 diagnostic indexing, and chronological patient history available in milliseconds.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0"></span>
            <div>
              <strong>Automated Clinic Scheduling:</strong> Real-time doctor availability checks with distinct time slots, booking confirmation codes, and instant patient notifications.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0"></span>
            <div>
              <strong>Integrated Pathology & Lab Result Module:</strong> Immediate electronic posting of test values with color-coded reference ranges and direct doctor clinical interpretation.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-700 mt-1.5 shrink-0"></span>
            <div>
              <strong>Role-Based Access Control (RBAC):</strong> Strict separation of privileges between Patients, Medical Doctors, and System Administrators ensuring clinical confidentiality.
            </div>
          </li>
        </ul>
      </section>

      {/* System Architecture & Modules */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-slate-700" />
          System Modules & Functional Scope
        </h2>

        <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Module Permissions & Functional Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-white">
                <td className="py-3 px-3 font-bold text-sky-800">Patient</td>
                <td className="py-3 px-3 text-slate-600">
                  Book/Reschedule appointments, view personal medical history and diagnoses, check active prescriptions, review laboratory test results, update profile/allergies.
                </td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-3 px-3 font-bold text-teal-800">Doctor / Physician</td>
                <td className="py-3 px-3 text-slate-600">
                  Manage daily outpatient queue, document clinical encounters, record vitals and ICD-10 diagnoses, write electronic prescriptions, review and annotate pathology tests.
                </td>
              </tr>
              <tr className="bg-white">
                <td className="py-3 px-3 font-bold text-indigo-800">Administrator</td>
                <td className="py-3 px-3 text-slate-600">
                  Hospital metrics overview, doctor verification and credentialing, patient directory management, department management, system security logs audit.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Project Metadata & Defense Information */}
      <section className="bg-slate-900 text-white rounded-xl p-6 space-y-3 text-xs">
        <h3 className="font-bold text-slate-200 text-sm uppercase tracking-wider">
          Academic Project Metadata
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
          <div>
            <span className="text-slate-400 block text-[11px]">Institution & Department:</span>
            <span>Department of Computer Science & Information Technology</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Academic Session:</span>
            <span>2025 / 2026 Academic Session</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">System Status:</span>
            <span className="text-emerald-400 font-semibold">Fully Functional Prototype (Version 1.0)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Demonstration Portal:</span>
            <span>Ready for Examination & Defense</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setActivePage('home')}
            className="bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
          >
            Return to Homepage
          </button>
        </div>
      </section>
    </div>
  );
};
