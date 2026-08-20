import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Building2,
  HelpCircle
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('General Inquiries');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Inquiry Submitted', 'Your message has been sent to the hospital administrative helpdesk.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Hospital Contact & Administrative Helpdesk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Have an inquiry regarding clinic appointments, medical records, or portal technical support? Reach out below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-700" />
              Facility Location
            </h2>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Campus Health Services & Teaching Clinic</p>
              <p>Academic District, Main Campus Boulevard</p>
              <p>Building Block 4, South Wing</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Phone className="w-4 h-4 text-sky-700" />
              Phone & Emergency Lines
            </h2>
            <div className="text-xs text-slate-600 space-y-2">
              <div>
                <span className="text-slate-500 block text-[11px]">Emergency 24/7 Triage:</span>
                <span className="font-mono font-bold text-rose-700 text-sm">+234 800 911 0000</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Records & Appointments Desk:</span>
                <span className="font-mono text-slate-800">+234 803 123 4567</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Laboratory Inquiry Desk:</span>
                <span className="font-mono text-slate-800">+234 803 987 6543 (Ext. 420)</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-700" />
              Clinic Working Hours
            </h2>
            <div className="text-xs text-slate-600 space-y-1.5">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span>General Outpatient (GOPD):</span>
                <strong>Mon - Fri (08:00 - 18:00)</strong>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span>Specialist Clinics:</span>
                <strong>Tue & Thu (09:00 - 15:00)</strong>
              </div>
              <div className="flex justify-between">
                <span>Emergency Unit:</span>
                <strong className="text-emerald-700">24 Hours / 7 Days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Send an Official Inquiry or Report a Problem
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Please provide complete details. Your inquiry will be forwarded to the corresponding department.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Message Received</h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Your inquiry regarding <strong>{subject || department}</strong> has been logged into the hospital helpdesk queue.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors inline-block"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Samuel Adebayo"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="s.adebayo@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Target Department *</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="General Inquiries">General Hospital Inquiries</option>
                      <option value="Medical Records Department">Medical Records (EMR) Unit</option>
                      <option value="Appointment Helpdesk">Appointment Scheduling Helpdesk</option>
                      <option value="Pathology Laboratory">Pathology Diagnostic Lab</option>
                      <option value="Pharmacy Desk">Hospital Pharmacy</option>
                      <option value="Portal Technical Support">Portal IT Support / Webmaster</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Inquiry Subject *</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="e.g. Rescheduling request or Missing lab report"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message Content *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Provide detailed description of your question or concern..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
