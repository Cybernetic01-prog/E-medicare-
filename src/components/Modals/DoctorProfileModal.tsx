import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Award, Clock, Phone, Mail, Calendar, CheckCircle2, Stethoscope, Building2 } from 'lucide-react';

export const DoctorProfileModal: React.FC = () => {
  const {
    selectedDoctorProfile,
    setSelectedDoctorProfile,
    setSelectedDoctorForBooking,
    setIsBookModalOpen,
  } = useApp();

  if (!selectedDoctorProfile) return null;

  const handleBookWithThisDoctor = () => {
    setSelectedDoctorForBooking(selectedDoctorProfile);
    setSelectedDoctorProfile(null);
    setIsBookModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white p-6 relative">
          <button
            onClick={() => setSelectedDoctorProfile(null)}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={selectedDoctorProfile.avatar}
              alt={selectedDoctorProfile.name}
              className="w-20 h-20 rounded-xl object-cover border-2 border-white/20 shadow-md"
            />
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {selectedDoctorProfile.name}
              </h3>
              <p className="text-sky-300 text-xs font-medium mt-0.5">
                {selectedDoctorProfile.specialization}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-sky-500/20 text-sky-200 border border-sky-400/30 text-[10px] px-2 py-0.5 rounded font-mono">
                  {selectedDoctorProfile.licenseNumber}
                </span>
                <span className="text-[11px] text-slate-300">
                  {selectedDoctorProfile.yearsOfExperience}+ Years Experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Biography */}
          <div>
            <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1">
              Physician Biography & Focus
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {selectedDoctorProfile.bio || 'Consultant specialist providing comprehensive diagnostic and clinical therapeutic care.'}
            </p>
          </div>

          {/* Department & Hours */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Department: <strong>{selectedDoctorProfile.department || 'Clinical Medicine'}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Clinic Availability: <strong>{selectedDoctorProfile.availability}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Phone className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Direct Hospital Line: <strong>{selectedDoctorProfile.phone}</strong></span>
            </div>
          </div>

          {/* Academic Qualifications */}
          {selectedDoctorProfile.qualifications && (
            <div>
              <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Academic & Medical Qualifications
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedDoctorProfile.qualifications.map((q, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-100 border border-slate-200 text-slate-700 px-2 py-1 rounded text-[11px] font-medium"
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Booking Action */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setSelectedDoctorProfile(null)}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={handleBookWithThisDoctor}
              className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Schedule Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
