import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Pill, PlusCircle, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefilledPatientId?: string;
}

export const NewPrescriptionModal: React.FC<Props> = ({ isOpen, onClose, prefilledPatientId }) => {
  const { users, currentUser, addPrescription } = useApp();
  const patients = users.filter((u) => u.role === 'patient');

  const [patientId, setPatientId] = useState(prefilledPatientId || patients[0]?.patientId || 'PID-2024-0418');
  const [medication, setMedication] = useState('');
  const [genericName, setGenericName] = useState('');
  const [dosage, setDosage] = useState('500 mg');
  const [route, setRoute] = useState('Oral');
  const [frequency, setFrequency] = useState('Twice daily after meals (BD)');
  const [duration, setDuration] = useState('7 days');
  const [instructions, setInstructions] = useState('');
  const [refills, setRefills] = useState<number>(0);
  const [diagnosisReference, setDiagnosisReference] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPat = patients.find((p) => p.patientId === patientId) || patients[0];

    addPrescription({
      patientId: selectedPat.patientId || 'PID-2024-0418',
      patientName: selectedPat.name,
      doctorId: currentUser?.id || 'user-doc-1',
      doctorName: currentUser?.name || 'Dr. Sarah Mitchell',
      medication: medication || 'Amoxicillin-Clavulanate',
      genericName: genericName || medication,
      dosage,
      route,
      frequency,
      duration,
      instructions: instructions || 'Take medication strictly as directed with water.',
      refillsRemaining: Number(refills),
      diagnosisReference: diagnosisReference || 'Outpatient clinical diagnosis',
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Pill className="w-5 h-5 text-sky-400" />
            <h3 className="text-base font-bold tracking-tight">
              Issue Medical Prescription (RX)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Patient Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
              <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.patientId}>
                    {p.name} ({p.patientId})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Indication / Diagnosis</label>
              <input
                type="text"
                value={diagnosisReference}
                onChange={(e) => setDiagnosisReference(e.target.value)}
                placeholder="e.g. Essential Hypertension / Tonsillitis"
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              />
            </div>
          </div>

          {/* Medication details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Medication Brand Name *
              </label>
              <input
                type="text"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                required
                placeholder="e.g. Augmentin 625mg or Lipitor 20mg"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Generic Name (Active Ingredient)
              </label>
              <input
                type="text"
                value={genericName}
                onChange={(e) => setGenericName(e.target.value)}
                placeholder="e.g. Amoxicillin / Clavulanic Acid"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Dosage *</label>
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                required
                placeholder="e.g. 500 mg"
                className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Route</label>
              <select
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              >
                <option value="Oral">Oral</option>
                <option value="Topical">Topical</option>
                <option value="Intravenous (IV)">Intravenous (IV)</option>
                <option value="Intramuscular (IM)">Intramuscular (IM)</option>
                <option value="Sublingual">Sublingual</option>
                <option value="Inhalation">Inhalation</option>
                <option value="Ophthalmic">Ophthalmic</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration *</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                placeholder="e.g. 7 days"
                className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Authorized Refills</label>
              <input
                type="number"
                min="0"
                max="5"
                value={refills}
                onChange={(e) => setRefills(Number(e.target.value))}
                className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Frequency / Timing *</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            >
              <option value="Once daily in the morning (OD)">Once daily in the morning (OD)</option>
              <option value="Once daily at night (Nocte)">Once daily at night (Nocte)</option>
              <option value="Twice daily after meals (BD)">Twice daily after meals (BD)</option>
              <option value="Three times daily after meals (TDS)">Three times daily after meals (TDS)</option>
              <option value="Four times daily (QDS)">Four times daily (QDS)</option>
              <option value="Every 4 to 6 hours as needed for pain (PRN)">Every 4 to 6 hours as needed for pain (PRN)</option>
              <option value="Once weekly">Once weekly</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Special Dispensing / Patient Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={2}
              placeholder="e.g. Take with plenty of water. Avoid alcohol during therapy. Complete all doses."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-sky-500 resize-none"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" />
              Sign & Issue Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
