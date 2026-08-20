import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  FileText,
  Pill,
  FlaskConical,
  Bell,
  Clock,
  User,
  Activity,
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  Shield,
  Phone,
  Heart,
  Droplet
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const {
    currentUser,
    appointments,
    medicalRecords,
    prescriptions,
    labResults,
    notifications,
    setActivePage,
    setIsBookModalOpen,
    setSelectedLabReport,
  } = useApp();

  // Filter for current patient
  const patientId = currentUser?.patientId || 'PID-2024-0418';
  const myAppointments = appointments.filter(
    (a) => a.patientId === patientId || a.patientName === currentUser?.name
  );
  const myRecords = medicalRecords.filter(
    (r) => r.patientId === patientId || r.patientName === currentUser?.name
  );
  const myPrescriptions = prescriptions.filter(
    (p) => p.patientId === patientId || p.patientName === currentUser?.name
  );
  const myLabs = labResults.filter(
    (l) => l.patientId === patientId || l.patientName === currentUser?.name
  );
  const unreadNotifs = notifications.filter((n) => !n.read).slice(0, 3);

  const nextAppointment = myAppointments.find((a) => a.status === 'Upcoming' || a.status === 'Confirmed' || a.status === 'Scheduled');

  return (
    <div className="space-y-6 pb-10">
      {/* Welcome Banner */}
      <div className="bg-[#1a2b3c] text-white rounded border border-[#2c3e50] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser?.name || 'Patient'}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#3498db] shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  Welcome back, {currentUser?.name || 'Emmanuel O. Kalu'}
                </h1>
                <span className="bg-[#3498db]/30 text-[#3498db] border border-[#3498db]/40 text-[11px] font-mono px-2 py-0.5 rounded font-bold">
                  {currentUser?.patientId || 'PID-2024-0418'}
                </span>
              </div>
              <p className="text-xs text-[#bdc3c7] mt-1">
                Your medical records, upcoming consultations, and prescriptions are synchronized.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold px-4 py-2.5 rounded flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => setActivePage('medical-records')}
              className="bg-[#2c3e50] hover:bg-[#34495e] text-white border border-[#34495e] text-xs font-semibold px-4 py-2.5 rounded transition-colors"
            >
              View My EMR
            </button>
          </div>
        </div>

        {/* Quick Patient Profile Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#2c3e50] text-xs">
          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50] flex items-center gap-2.5">
            <Droplet className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Blood / Genotype</span>
              <strong className="text-white">{currentUser?.bloodGroup || 'O+'} ({currentUser?.genotype || 'AA'})</strong>
            </div>
          </div>

          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50] flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Known Allergies</span>
              <strong className="text-white truncate block max-w-[120px]">
                {currentUser?.allergies ? currentUser.allergies.join(', ') : 'Penicillin'}
              </strong>
            </div>
          </div>

          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50] flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-green-400 shrink-0" />
            <div>
              <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Emergency Contact</span>
              <strong className="text-white truncate block max-w-[120px]">
                {currentUser?.emergencyContact?.name || 'Blessing Kalu'}
              </strong>
            </div>
          </div>

          <div className="bg-[#14212d] p-3 rounded border border-[#2c3e50] flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-[#3498db] shrink-0" />
            <div>
              <span className="text-[10px] text-[#7f8c8d] block font-semibold uppercase">Active Prescriptions</span>
              <strong className="text-white">{myPrescriptions.filter(p => p.status === 'Active').length} Medications</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Upcoming Appointment */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#3498db]" />
                Next Scheduled Clinic Visit
              </h2>
              <button
                onClick={() => setActivePage('appointments')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold flex items-center gap-1"
              >
                <span>All Appointments ({myAppointments.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {nextAppointment ? (
              <div className="bg-[#f8f9fa] border border-[#e1e8ed] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#3498db] text-white font-bold px-2 py-0.5 rounded text-[11px]">
                      {nextAppointment.date} at {nextAppointment.time}
                    </span>
                    <span className="text-[#2c3e50] font-semibold font-mono text-[11px]">
                      {nextAppointment.roomNumber}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#2c3e50] text-sm">
                    {nextAppointment.doctorName} — <span className="text-[#7f8c8d] font-normal">{nextAppointment.department}</span>
                  </h4>
                  <p className="text-[#555]">
                    Reason: <strong>{nextAppointment.reason}</strong>
                  </p>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => setActivePage('appointments')}
                    className="bg-white border border-[#e1e8ed] hover:bg-[#f4f7f9] text-[#2c3e50] text-xs font-semibold px-3 py-1.5 rounded transition-colors text-center"
                  >
                    Manage / Reschedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#f8f9fa] border border-[#e1e8ed] rounded p-6 text-center text-xs text-[#7f8c8d] space-y-2">
                <p>You have no pending upcoming clinic appointments scheduled.</p>
                <button
                  onClick={() => setIsBookModalOpen(true)}
                  className="text-[#3498db] font-bold hover:underline"
                >
                  Book a Consultation Now
                </button>
              </div>
            )}
          </div>

          {/* Recent Medical Records */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3498db]" />
                Recent Medical Encounter History (EMR)
              </h2>
              <button
                onClick={() => setActivePage('medical-records')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold flex items-center gap-1"
              >
                <span>View Full EMR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {myRecords.length === 0 ? (
              <p className="text-xs text-[#7f8c8d] py-4 text-center">No medical records documented yet.</p>
            ) : (
              <div className="divide-y divide-[#e1e8ed] text-xs">
                {myRecords.slice(0, 2).map((rec) => (
                  <div key={rec.id} className="py-3.5 first:pt-0 last:pb-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-[#2c3e50] bg-[#f8f9fa] border border-[#e1e8ed] px-2 py-0.5 rounded">
                          {rec.recordNumber}
                        </span>
                        <span className="text-[#7f8c8d]">{rec.visitDate}</span>
                      </div>
                      <span className="text-[#3498db] font-bold">{rec.doctorName}</span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-bold text-[#2c3e50]">
                        Diagnosis: {rec.diagnosis}
                      </h4>
                      <p className="text-[#555]">
                        Treatment: {rec.treatmentPlan}
                      </p>
                    </div>

                    {/* Vitals preview */}
                    <div className="flex flex-wrap gap-2 text-[11px] text-[#555] bg-[#f8f9fa] border border-[#e1e8ed] p-2 rounded">
                      <span>BP: <strong className="text-[#2c3e50]">{rec.vitals.bloodPressure}</strong></span>
                      <span>•</span>
                      <span>Pulse: <strong className="text-[#2c3e50]">{rec.vitals.heartRate}</strong></span>
                      <span>•</span>
                      <span>Temp: <strong className="text-[#2c3e50]">{rec.vitals.temperature}</strong></span>
                      <span>•</span>
                      <span>Weight: <strong className="text-[#2c3e50]">{rec.vitals.weight}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Prescriptions */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#3498db]" />
                Active Prescriptions & Medications
              </h2>
              <button
                onClick={() => setActivePage('prescriptions')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold flex items-center gap-1"
              >
                <span>Pharmacy Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {myPrescriptions.length === 0 ? (
              <p className="text-xs text-[#7f8c8d] py-4 text-center">No active medication prescriptions.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {myPrescriptions.slice(0, 2).map((rx) => (
                  <div
                    key={rx.id}
                    className="border border-[#e1e8ed] rounded p-3 bg-[#f8f9fa] space-y-1.5"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-[#2c3e50]">{rx.medication}</h4>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        rx.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {rx.status}
                      </span>
                    </div>
                    <p className="text-[#333] font-medium">{rx.dosage} — {rx.frequency}</p>
                    <p className="text-[11px] text-[#7f8c8d] italic">{rx.instructions}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Lab Results & Notifications */}
        <div className="space-y-6">
          {/* Laboratory Diagnostic Results */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#3498db]" />
                Laboratory Test Results
              </h2>
              <button
                onClick={() => setActivePage('lab-results')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold"
              >
                All Labs
              </button>
            </div>

            {myLabs.length === 0 ? (
              <p className="text-xs text-[#7f8c8d] text-center py-4">No diagnostic reports uploaded.</p>
            ) : (
              <div className="space-y-3 text-xs">
                {myLabs.slice(0, 3).map((lab) => (
                  <div
                    key={lab.id}
                    onClick={() => setSelectedLabReport(lab)}
                    className="border border-[#e1e8ed] rounded p-3 hover:bg-[#f8f9fa] cursor-pointer transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#2c3e50] truncate max-w-[180px]">
                        {lab.testName}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase bg-blue-100 text-blue-700">
                        {lab.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#555] line-clamp-2">
                      {lab.overallSummary}
                    </p>
                    <div className="text-[10px] text-[#7f8c8d] pt-1 flex justify-between">
                      <span>Date: {lab.sampleDate}</span>
                      <span className="text-[#3498db] font-bold">Click to inspect</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Unread Notifications Box */}
          <div className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#3498db]" />
                Healthcare Alerts
              </h2>
              <button
                onClick={() => setActivePage('notifications')}
                className="text-xs text-[#3498db] hover:text-[#2980b9] font-bold"
              >
                View Center
              </button>
            </div>

            {unreadNotifs.length === 0 ? (
              <p className="text-xs text-[#7f8c8d] text-center py-3">All healthcare alerts have been read.</p>
            ) : (
              <div className="space-y-2.5 text-xs">
                {unreadNotifs.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded bg-[#f8f9fa] border border-[#e1e8ed] space-y-1"
                  >
                    <h4 className="font-bold text-[#2c3e50] text-xs">{n.title}</h4>
                    <p className="text-[#555] text-[11px] leading-snug">{n.message}</p>
                    <span className="text-[10px] text-[#7f8c8d] block font-mono">{n.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
