import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Stethoscope,
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  Bell,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  PlusCircle,
  User,
  Users,
  Activity,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { NewMedicalRecordModal } from '../components/Modals/NewMedicalRecordModal';
import { NewPrescriptionModal } from '../components/Modals/NewPrescriptionModal';

export const DoctorDashboard: React.FC = () => {
  const {
    currentUser,
    appointments,
    medicalRecords,
    prescriptions,
    labResults,
    notifications,
    users,
    setActivePage,
    updateAppointmentStatus,
    setSelectedLabReport,
  } = useApp();

  const [searchPatient, setSearchPatient] = useState('');
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPatientForModal, setSelectedPatientForModal] = useState<string | undefined>(undefined);

  const patients = users.filter((u) => u.role === 'patient');

  // Filter doctor's appointments
  const docAppointments = appointments.filter(
    (a) => a.doctorId === currentUser?.id || a.doctorName.includes(currentUser?.name || 'Mitchell')
  );

  const todayStr = '2026-08-25'; // Simulated current date matching the mock dataset
  const todayAppointments = docAppointments.filter(
    (a) => a.date === todayStr || a.status === 'Upcoming' || a.status === 'Confirmed' || a.status === 'Scheduled'
  );

  const filteredTodayQueue = todayAppointments.filter((a) =>
    a.patientName.toLowerCase().includes(searchPatient.toLowerCase()) ||
    a.patientId.toLowerCase().includes(searchPatient.toLowerCase()) ||
    a.reason.toLowerCase().includes(searchPatient.toLowerCase())
  );

  const myRecentRecords = medicalRecords.filter(
    (r) => r.doctorId === currentUser?.id || r.doctorName.includes(currentUser?.name || 'Mitchell')
  );

  const openNewRecordForPatient = (patId: string) => {
    setSelectedPatientForModal(patId);
    setIsRecordModalOpen(true);
  };

  const openNewRxForPatient = (patId: string) => {
    setSelectedPatientForModal(patId);
    setIsPrescriptionModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header Banner */}
      <div className="bg-[#1a2b3c] text-white rounded border border-[#2c3e50] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Doctor'}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#3498db] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {currentUser?.name || 'Dr. Sarah Mitchell'}
                </h1>
                <span className="bg-[#3498db]/30 text-[#3498db] border border-[#3498db]/40 text-[11px] font-mono px-2 py-0.5 rounded font-bold">
                  {currentUser?.licenseNumber || 'MD-MED-84920'}
                </span>
              </div>
              <p className="text-xs text-[#bdc3c7] mt-1">
                {currentUser?.specialization || 'General Medicine & Family Health'} • {currentUser?.department || 'Internal Medicine'}
              </p>
              <p className="text-[11px] text-[#7f8c8d] font-mono mt-0.5">
                Clinic Schedule: {currentUser?.availability || 'Mon - Thu (08:00 AM - 02:00 PM)'}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedPatientForModal(undefined);
                setIsRecordModalOpen(true);
              }}
              className="bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold px-4 py-2 rounded flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Document Encounter</span>
            </button>
            <button
              onClick={() => {
                setSelectedPatientForModal(undefined);
                setIsPrescriptionModalOpen(true);
              }}
              className="bg-[#2c3e50] hover:bg-[#34495e] text-white border border-[#34495e] text-xs font-semibold px-4 py-2 rounded flex items-center gap-1.5 transition-colors"
            >
              <Pill className="w-4 h-4" />
              <span>Write Prescription</span>
            </button>
          </div>
        </div>

        {/* Doctor Summary Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#2c3e50] text-xs">
          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50]">
            <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Outpatient Queue</span>
            <strong className="text-xl text-white font-bold">{todayAppointments.length} Appointments</strong>
          </div>
          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50]">
            <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Registered Patients</span>
            <strong className="text-xl text-white font-bold">{patients.length} Profiles</strong>
          </div>
          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50]">
            <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Medical Records Logged</span>
            <strong className="text-xl text-white font-bold">{myRecentRecords.length} Encounters</strong>
          </div>
          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50]">
            <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Prescriptions Issued</span>
            <strong className="text-xl text-white font-bold">
              {prescriptions.filter((p) => p.doctorId === currentUser?.id || p.doctorName.includes('Mitchell')).length} Active RX
            </strong>
          </div>
        </div>
      </div>

      {/* Main Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Consultation Queue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Queue & Patient Search */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3498db]" />
                  Clinical Consultation Queue
                </h2>
                <p className="text-xs text-[#7f8c8d]">
                  Scheduled outpatient visits assigned to your consultation room.
                </p>
              </div>

              {/* Patient Search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#7f8c8d] absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchPatient}
                  onChange={(e) => setSearchPatient(e.target.value)}
                  placeholder="Filter patient queue..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f8f9fa] border border-[#e1e8ed] rounded text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db]"
                />
              </div>
            </div>

            {filteredTodayQueue.length === 0 ? (
              <div className="bg-[#f8f9fa] border border-[#e1e8ed] rounded p-8 text-center text-xs text-[#7f8c8d]">
                No appointment records found in queue.
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                {filteredTodayQueue.map((apt) => {
                  const isCompleted = apt.status === 'Completed';
                  const isCancelled = apt.status === 'Cancelled' || apt.status === 'Canceled';

                  return (
                    <div
                      key={apt.id}
                      className={`border rounded p-4 transition-all ${
                        isCompleted
                          ? 'bg-[#f8f9fa] border-[#e1e8ed] opacity-75'
                          : isCancelled
                          ? 'bg-red-50/50 border-red-200 opacity-75'
                          : 'bg-white border-[#e1e8ed] shadow-xs hover:border-[#3498db]'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[11px] font-bold text-[#2c3e50] bg-[#f8f9fa] border border-[#e1e8ed] px-2 py-0.5 rounded">
                              {apt.time} • {apt.date}
                            </span>
                            <span className="font-bold text-[#2c3e50] text-sm">
                              {apt.patientName}
                            </span>
                            <span className="font-mono text-[#7f8c8d] text-[11px]">
                              ({apt.patientId})
                            </span>
                          </div>

                          <p className="text-[#555] mt-1.5">
                            <strong>Chief Reason:</strong> {apt.reason}
                          </p>
                          {apt.symptoms && (
                            <p className="text-[#7f8c8d] text-[11px] mt-0.5">
                              Reported Symptoms: {apt.symptoms}
                            </p>
                          )}
                          <div className="flex items-center gap-3 text-[11px] text-[#7f8c8d] mt-1">
                            <span>Phone: {apt.patientPhone || '+234 800 000 0000'}</span>
                            <span>•</span>
                            <span>{apt.roomNumber || 'Clinic Room 3B'}</span>
                            <span>•</span>
                            <span className="font-bold uppercase">
                              Status: {apt.status}
                            </span>
                          </div>
                        </div>

                        {/* Actions for this appointment */}
                        {!isCompleted && !isCancelled && (
                          <div className="flex sm:flex-col gap-2 shrink-0">
                            <button
                              onClick={() => openNewRecordForPatient(apt.patientId)}
                              className="bg-[#3498db] hover:bg-[#2980b9] text-white font-bold px-3 py-1.5 rounded text-xs flex items-center justify-center gap-1 transition-colors"
                              title="Document Clinical Encounter"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Clinical Note</span>
                            </button>
                            <button
                              onClick={() => openNewRxForPatient(apt.patientId)}
                              className="bg-[#2c3e50] hover:bg-[#34495e] text-white font-bold px-3 py-1.5 rounded text-xs flex items-center justify-center gap-1 transition-colors"
                              title="Issue Prescription"
                            >
                              <Pill className="w-3.5 h-3.5" />
                              <span>Issue Rx</span>
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                              className="border border-green-600 text-green-700 hover:bg-green-50 font-bold px-2 py-1 rounded text-[11px] flex items-center justify-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Done</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Patient Records written by this doctor */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3498db]" />
                Recent Clinical Encounters Logged
              </h2>
              <button
                onClick={() => setActivePage('medical-records')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold flex items-center gap-1"
              >
                <span>Full Records Database</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-[#e1e8ed] text-xs">
              {myRecentRecords.slice(0, 3).map((rec) => (
                <div key={rec.id} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-[#2c3e50]">{rec.patientName}</span>{' '}
                      <span className="font-mono text-[#7f8c8d]">({rec.recordNumber})</span>
                    </div>
                    <span className="text-[#7f8c8d]">{rec.visitDate}</span>
                  </div>
                  <p className="text-[#555]">
                    <strong>Diagnosis:</strong> {rec.diagnosis} (ICD: {rec.icdCode || 'N/A'})
                  </p>
                  <p className="text-[#7f8c8d] text-[11px]">
                    Plan: {rec.treatmentPlan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Laboratory Review & Fast Actions */}
        <div className="space-y-6">
          {/* Lab Reports to Review */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#3498db]" />
                Diagnostic Lab Reviews
              </h2>
              <button
                onClick={() => setActivePage('lab-results')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold"
              >
                All Labs
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {labResults.slice(0, 3).map((lab) => (
                <div
                  key={lab.id}
                  onClick={() => setSelectedLabReport(lab)}
                  className="border border-[#e1e8ed] rounded p-3 hover:bg-[#f8f9fa] cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2c3e50]">{lab.patientName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#f8f9fa] text-[#7f8c8d] border border-[#e1e8ed]">
                      {lab.category}
                    </span>
                  </div>
                  <p className="text-[#333] font-medium">{lab.testName}</p>
                  <p className="text-[11px] text-[#7f8c8d] line-clamp-1">{lab.overallSummary}</p>
                  <div className="pt-1 flex justify-between text-[10px] text-[#3498db] font-bold">
                    <span>Date: {lab.sampleDate}</span>
                    <span>Review & Annotate →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doctor Notifications */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2 mb-3">
              <Bell className="w-4 h-4 text-[#3498db]" />
              Physician Alerts
            </h2>

            <div className="space-y-2.5 text-xs">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="p-2.5 rounded bg-[#f8f9fa] border border-[#e1e8ed] space-y-1">
                  <h4 className="font-bold text-[#2c3e50] text-xs">{n.title}</h4>
                  <p className="text-[#555] text-[11px]">{n.message}</p>
                  <span className="text-[10px] text-[#7f8c8d] block font-mono">{n.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals for Record and Prescription */}
      <NewMedicalRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        prefilledPatientId={selectedPatientForModal}
      />
      <NewPrescriptionModal
        isOpen={isPrescriptionModalOpen}
        onClose={() => setIsPrescriptionModalOpen(false)}
        prefilledPatientId={selectedPatientForModal}
      />
    </div>
  );
};
