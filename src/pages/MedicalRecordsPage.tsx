import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Search,
  Filter,
  PlusCircle,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Calendar,
  User,
  Stethoscope,
  Printer,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { NewMedicalRecordModal } from '../components/Modals/NewMedicalRecordModal';

export const MedicalRecordsPage: React.FC = () => {
  const {
    currentUser,
    medicalRecords,
    departments,
    addToast
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [isNewRecordModalOpen, setIsNewRecordModalOpen] = useState(false);
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(medicalRecords[0]?.id || null);

  // Role filtering
  let visibleRecords = medicalRecords;
  if (currentUser?.role === 'patient') {
    visibleRecords = medicalRecords.filter(
      (r) => r.patientId === currentUser.patientId || r.patientName === currentUser.name
    );
  }

  const filteredRecords = visibleRecords.filter((r) => {
    const matchesSearch =
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(search.toLowerCase()) ||
      r.recordNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.doctorName.toLowerCase().includes(search.toLowerCase());

    const matchesDept = selectedDept === 'All' || r.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const handlePrintRecord = (recordNumber: string) => {
    addToast('Print Document', `Preparing printable clinical summary for ${recordNumber}.`, 'info');
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-sky-700" />
            Electronic Medical Records (EMR)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentUser?.role === 'patient'
              ? 'Complete chronological history of your clinical outpatient visits, diagnoses, and treatments.'
              : 'Secure patient clinical history repository with vitals monitoring and standardized ICD-10 diagnostic indexing.'}
          </p>
        </div>

        {currentUser?.role !== 'patient' && (
          <button
            onClick={() => setIsNewRecordModalOpen(true)}
            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Document New Encounter</span>
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
            placeholder="Search patient, diagnosis, record #..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 shrink-0">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Departments ({visibleRecords.length})</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Medical Records List */}
      {filteredRecords.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500 space-y-2">
          <FileText className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No electronic medical records match your query.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((rec) => {
            const isExpanded = expandedRecordId === rec.id;

            return (
              <div
                key={rec.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                {/* Header Summary Row */}
                <div
                  onClick={() => setExpandedRecordId(isExpanded ? null : rec.id)}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer bg-slate-50/50 hover:bg-slate-100/60 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-sky-900 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded">
                        {rec.recordNumber}
                      </span>
                      <span className="text-xs text-slate-500">{rec.visitDate}</span>
                      <span className="text-[11px] text-slate-600 font-medium">({rec.department})</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">
                      {rec.patientName} — <span className="text-sky-800 font-semibold">{rec.diagnosis}</span>
                      {rec.icdCode && (
                        <span className="text-[11px] font-mono text-slate-400 font-normal ml-2">
                          [ICD-10: {rec.icdCode}]
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right hidden md:block text-xs">
                      <span className="block font-semibold text-slate-800">{rec.doctorName}</span>
                      <span className="text-slate-400 text-[11px]">Attending Physician</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Detailed Encounter Content */}
                {isExpanded && (
                  <div className="p-5 border-t border-slate-200 space-y-5 text-xs">
                    {/* Vitals Panel */}
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                      <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-sky-700" />
                        Clinical Examination Vital Signs
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-slate-700">
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                          <strong className="font-mono text-xs text-slate-900">{rec.vitals.bloodPressure}</strong>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                          <strong className="font-mono text-xs text-slate-900">{rec.vitals.heartRate}</strong>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Temperature</span>
                          <strong className="font-mono text-xs text-slate-900">{rec.vitals.temperature}</strong>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">Weight</span>
                          <strong className="font-mono text-xs text-slate-900">{rec.vitals.weight}</strong>
                        </div>
                        <div className="bg-white p-2 rounded border border-slate-200">
                          <span className="text-[10px] text-slate-400 block">SpO2 Oxygen</span>
                          <strong className="font-mono text-xs text-slate-900">{rec.vitals.respiratoryRate || '98% on RA'}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Chief Complaint & Symptoms */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                          Chief Clinical Complaint:
                        </h4>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                          {rec.chiefComplaint}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                          Reported Symptoms:
                        </h4>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {rec.symptoms.map((s, idx) => (
                            <span
                              key={idx}
                              className="bg-sky-50 text-sky-800 border border-sky-200 px-2 py-0.5 rounded font-medium text-[11px]"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Treatment Plan & Doctor's Notes */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                          Therapeutic Treatment Plan:
                        </h4>
                        <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                          {rec.treatmentPlan}
                        </p>
                      </div>

                      {rec.doctorNotes && (
                        <div>
                          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-1">
                            Physician Clinical Notes:
                          </h4>
                          <p className="text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-200">
                            "{rec.doctorNotes}"
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer Info & Print */}
                    <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-slate-500 text-[11px]">
                      <div>
                        Next Recommended Follow-Up:{' '}
                        <strong className="text-slate-700">{rec.followUpDate || 'As needed in 4 weeks'}</strong>
                      </div>

                      <button
                        onClick={() => handlePrintRecord(rec.recordNumber)}
                        className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors self-end"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print EMR Summary</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for creating a new record */}
      <NewMedicalRecordModal
        isOpen={isNewRecordModalOpen}
        onClose={() => setIsNewRecordModalOpen(false)}
      />
    </div>
  );
};
