import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Pill,
  Search,
  Filter,
  PlusCircle,
  Clock,
  Printer,
  CheckCircle2,
  AlertCircle,
  Calendar,
  User,
  Stethoscope
} from 'lucide-react';
import { NewPrescriptionModal } from '../components/Modals/NewPrescriptionModal';

export const PrescriptionsPage: React.FC = () => {
  const {
    currentUser,
    prescriptions,
    addToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isNewRxModalOpen, setIsNewRxModalOpen] = useState(false);

  // Role filtering
  let visiblePrescriptions = prescriptions;
  if (currentUser?.role === 'patient') {
    visiblePrescriptions = prescriptions.filter(
      (p) => p.patientId === currentUser.patientId || p.patientName === currentUser.name
    );
  }

  const filteredPrescriptions = visiblePrescriptions.filter((p) => {
    const matchesSearch =
      p.medication.toLowerCase().includes(search.toLowerCase()) ||
      p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.doctorName.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handlePrintSlip = (med: string) => {
    addToast('Print Document', `Generating pharmacy dispensing slip for ${med}.`, 'info');
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Pill className="w-7 h-7 text-sky-700" />
            Prescription & Pharmacy Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentUser?.role === 'patient'
              ? 'View your active doctor medications, dosage frequencies, and pharmacy dispensing instructions.'
              : 'Digital issuance and dispensing oversight for outpatient pharmaceuticals and authorized refills.'}
          </p>
        </div>

        {currentUser?.role !== 'patient' && (
          <button
            onClick={() => setIsNewRxModalOpen(true)}
            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Write New Prescription</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medication, patient, doctor..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-sky-500"
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
            <option value="All">All Statuses ({visiblePrescriptions.length})</option>
            <option value="Active">Active</option>
            <option value="Dispensed">Dispensed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Prescriptions List */}
      {filteredPrescriptions.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500 space-y-2">
          <Pill className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No prescription records found matching your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPrescriptions.map((rx) => {
            const isActive = rx.status === 'Active';
            const isDispensed = rx.status === 'Dispensed';

            return (
              <div
                key={rx.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Top line */}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-base text-slate-900 leading-tight">
                      {rx.medication}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : isDispensed
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {rx.status}
                    </span>
                  </div>

                  {/* Dosage & Frequency details */}
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 grid grid-cols-2 gap-2 text-xs text-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Dosage & Strength</span>
                      <strong className="text-slate-900">{rx.dosage}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Frequency</span>
                      <strong className="text-slate-900">{rx.frequency}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Duration</span>
                      <span>{rx.duration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Administration Route</span>
                      <span>{rx.route || 'Oral'}</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="text-xs space-y-1">
                    <span className="font-semibold text-slate-800">Dispensing & Usage Instructions:</span>
                    <p className="text-slate-600 bg-white p-2.5 rounded border border-slate-200 italic leading-relaxed">
                      "{rx.instructions}"
                    </p>
                  </div>

                  {/* Prescribed By & Patient */}
                  <div className="pt-2 text-xs text-slate-500 space-y-1 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>Patient: <strong>{rx.patientName}</strong> ({rx.patientId})</span>
                      <span>Date: {rx.prescribedDate}</span>
                    </div>
                    <div>
                      Prescribed by: <strong className="text-slate-700">{rx.doctorName}</strong>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Refills Left: <strong>{rx.refillsRemaining ?? 0}</strong>
                  </span>
                  <button
                    onClick={() => handlePrintSlip(rx.medication)}
                    className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1 text-[11px]"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Rx Order</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for writing prescription */}
      <NewPrescriptionModal
        isOpen={isNewRxModalOpen}
        onClose={() => setIsNewRxModalOpen(false)}
      />
    </div>
  );
};
