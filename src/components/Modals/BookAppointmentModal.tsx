import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, Clock, User, Stethoscope, AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { User as UserType } from '../../types';

export const BookAppointmentModal: React.FC = () => {
  const {
    isBookModalOpen,
    setIsBookModalOpen,
    selectedDoctorForBooking,
    setSelectedDoctorForBooking,
    users,
    departments,
    currentUser,
    addAppointment,
  } = useApp();

  const doctors = users.filter((u) => u.role === 'doctor');
  const patients = users.filter((u) => u.role === 'patient');

  const [doctorId, setDoctorId] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientId, setPatientId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('09:30');
  const [reason, setReason] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [department, setDepartment] = useState<string>('Internal Medicine');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [createdAptId, setCreatedAptId] = useState<string>('');

  const timeSlots = [
    '08:30', '09:15', '10:00', '10:45',
    '11:30', '13:00', '13:45', '14:30', '15:15'
  ];

  useEffect(() => {
    if (isBookModalOpen) {
      setIsSubmitted(false);
      // set tomorrow as default date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow.toISOString().substring(0, 10));

      if (selectedDoctorForBooking) {
        setDoctorId(selectedDoctorForBooking.id);
        setDepartment(selectedDoctorForBooking.department || 'Internal Medicine');
      } else if (doctors.length > 0) {
        setDoctorId(doctors[0].id);
        setDepartment(doctors[0].department || 'Internal Medicine');
      }

      if (currentUser && currentUser.role === 'patient') {
        setPatientName(currentUser.name);
        setPatientPhone(currentUser.phone || '');
        setPatientId(currentUser.patientId || 'PID-2024-0418');
      } else if (patients.length > 0) {
        setPatientName(patients[0].name);
        setPatientPhone(patients[0].phone || '');
        setPatientId(patients[0].patientId || 'PID-2024-0418');
      }
    }
  }, [isBookModalOpen, selectedDoctorForBooking, currentUser]);

  const handleDoctorChange = (id: string) => {
    setDoctorId(id);
    const doc = doctors.find((d) => d.id === id);
    if (doc && doc.department) {
      setDepartment(doc.department);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === doctorId);

    const newApt = addAppointment({
      patientId: patientId || 'PID-2024-0418',
      patientName: patientName || 'Emmanuel O. Kalu',
      patientPhone,
      doctorId: doc?.id || 'user-doc-1',
      doctorName: doc?.name || 'Dr. Sarah Mitchell',
      department: department || doc?.department || 'Internal Medicine',
      specialization: doc?.specialization || 'General Consultation',
      date,
      time,
      reason: reason || 'General clinical consultation and review',
      symptoms,
      roomNumber: 'Room ' + Math.floor(Math.random() * 5 + 1) + (Math.random() > 0.5 ? 'A' : 'B'),
    });

    setCreatedAptId(newApt.id);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsBookModalOpen(false);
    setSelectedDoctorForBooking(null);
    setIsSubmitted(false);
  };

  if (!isBookModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-xl w-full overflow-hidden transition-all">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold tracking-tight">
              {isSubmitted ? 'Appointment Confirmation' : 'Schedule Clinic Appointment'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation Screen */
          <div className="p-6 space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">
                  Appointment Successfully Confirmed
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Your appointment booking has been registered into the E-Health database. An SMS notification has been scheduled.
                </p>
              </div>
            </div>

            {/* Slip Summary */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Booking Reference:</span>
                <span className="font-mono font-semibold text-slate-800">{createdAptId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-semibold text-slate-800">{patientName} ({patientId})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Attending Physician:</span>
                <span className="font-semibold text-slate-800">
                  {doctors.find((d) => d.id === doctorId)?.name}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-slate-800">{department}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Scheduled Date & Time:</span>
                <span className="font-semibold text-sky-800">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Reason for Visit:</span>
                <span className="font-medium text-slate-700 text-right max-w-[240px] truncate">{reason || 'Clinical check-up'}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleClose}
                className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                Done & View Appointments
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Doctor Selection */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Doctor / Specialist *
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                >
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialization}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department / Unit
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.name}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Date */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Available Clinic Slot *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} (Morning/Afternoon Outpatient)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  placeholder="e.g. Emmanuel Kalu"
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Phone Number *
                </label>
                <input
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  required
                  placeholder="+234 803 000 0000"
                  className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Reason for Appointment */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Reason for Appointment *
              </label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="e.g. Routine check-up, blood pressure review, recurrent headaches"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Symptoms Description */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Symptoms or Prior Medical Notes (Optional)
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                rows={2}
                placeholder="Briefly describe what you are experiencing (e.g. duration of symptoms, fever, pain level)..."
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-semibold shadow-xs transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
