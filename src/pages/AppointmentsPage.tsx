import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Building2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  PlusCircle,
  Printer
} from 'lucide-react';

export const AppointmentsPage: React.FC = () => {
  const {
    currentUser,
    appointments,
    updateAppointmentStatus,
    setIsBookModalOpen,
    addToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAppointmentForPrint, setSelectedAppointmentForPrint] = useState<typeof appointments[0] | null>(null);

  // Filter based on role
  let visibleAppointments = appointments;
  if (currentUser?.role === 'patient') {
    visibleAppointments = appointments.filter(
      (a) => a.patientId === currentUser.patientId || a.patientName === currentUser.name
    );
  } else if (currentUser?.role === 'doctor') {
    visibleAppointments = appointments.filter(
      (a) => a.doctorId === currentUser.id || a.doctorName.includes(currentUser.name)
    );
  }

  const filteredAppointments = visibleAppointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      a.reason.toLowerCase().includes(search.toLowerCase()) ||
      a.patientId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handlePrintSlip = (apt: typeof appointments[0]) => {
    setSelectedAppointmentForPrint(apt);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-sky-700" />
            Clinic Appointments Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentUser?.role === 'patient'
              ? 'View, book and manage your outpatient doctor consultations.'
              : currentUser?.role === 'doctor'
              ? 'Manage your assigned daily clinical consultation queue and patient schedules.'
              : 'Institutional appointment scheduling registry across all hospital departments.'}
          </p>
        </div>

        <button
          onClick={() => setIsBookModalOpen(true)}
          className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Appointment</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by doctor, patient, reason..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 shrink-0">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Statuses ({visibleAppointments.length})</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500 space-y-3">
          <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No appointment records found matching your current filter.</p>
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="bg-sky-700 text-white font-semibold px-4 py-2 rounded-lg text-xs"
          >
            Book New Appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAppointments.map((apt) => {
            const isUpcoming = apt.status === 'Upcoming';
            const isCompleted = apt.status === 'Completed';
            const isCancelled = apt.status === 'Cancelled';
            const isRescheduled = apt.status === 'Rescheduled';

            return (
              <div
                key={apt.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {apt.date} • {apt.time}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {apt.roomNumber || 'Room 4A'}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isUpcoming
                          ? 'bg-sky-100 text-sky-800'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCancelled
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  {/* Doctor & Patient info */}
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-sky-700 shrink-0" />
                      <span className="font-bold text-slate-900">{apt.doctorName}</span>
                      <span className="text-slate-500">({apt.department})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-700 font-medium">{apt.patientName}</span>
                      <span className="font-mono text-slate-400 text-[11px]">({apt.patientId})</span>
                    </div>
                  </div>

                  {/* Consultation Reason & Symptoms */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1">
                    <p className="text-slate-800">
                      <strong>Reason:</strong> {apt.reason}
                    </p>
                    {apt.symptoms && (
                      <p className="text-slate-600 text-[11px]">
                        <strong>Reported Symptoms:</strong> {apt.symptoms}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => handlePrintSlip(apt)}
                    className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 text-[11px]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    {isUpcoming && (
                      <>
                        {currentUser?.role !== 'patient' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-2.5 py-1 rounded text-[11px] transition-colors"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                          className="border border-rose-300 text-rose-700 hover:bg-rose-50 font-semibold px-2 py-1 rounded text-[11px] transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
