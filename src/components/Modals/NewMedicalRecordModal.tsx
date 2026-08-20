import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, Activity, Stethoscope, User, Calendar, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefilledPatientId?: string;
}

export const NewMedicalRecordModal: React.FC<Props> = ({ isOpen, onClose, prefilledPatientId }) => {
  const { users, currentUser, addMedicalRecord } = useApp();
  const patients = users.filter((u) => u.role === 'patient');

  const [patientId, setPatientId] = useState(prefilledPatientId || patients[0]?.patientId || 'PID-2024-0418');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().substring(0, 10));
  const [department, setDepartment] = useState('Internal Medicine');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');

  // Vitals
  const [bp, setBp] = useState('120/80 mmHg');
  const [heartRate, setHeartRate] = useState('72 bpm');
  const [temp, setTemp] = useState('36.7 °C');
  const [spO2, setSpO2] = useState('98%');
  const [weight, setWeight] = useState('72.0 kg');
  const [followUpDate, setFollowUpDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPat = patients.find((p) => p.patientId === patientId) || patients[0];

    const symptomsList = symptomsInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    addMedicalRecord({
      patientId: selectedPat.patientId || 'PID-2024-0418',
      patientName: selectedPat.name,
      doctorId: currentUser?.id || 'user-doc-1',
      doctorName: currentUser?.name || 'Dr. Sarah Mitchell',
      visitDate,
      department,
      chiefComplaint: chiefComplaint || 'Clinical consultation visit',
      symptoms: symptomsList.length > 0 ? symptomsList : ['Clinical review'],
      diagnosis: diagnosis || 'General medical examination',
      icdCode: icdCode || 'R69',
      treatmentPlan: treatmentPlan || 'Prescribed symptomatic therapy and observation.',
      clinicalNotes: clinicalNotes || 'Patient examined in outpatient clinic.',
      vitals: {
        bloodPressure: bp,
        heartRate,
        temperature: temp,
        spO2,
        weight,
      },
      followUpDate: followUpDate || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-3xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-teal-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-teal-300" />
            <h3 className="text-base font-bold tracking-tight">
              Create New Clinical Encounter / EMR Record
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-teal-200 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
          {/* Patient Selection & Visit Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient *</label>
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
              <label className="block font-semibold text-slate-700 mb-1">Visit Date *</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                required
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Clinical Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
              >
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Surgery & Orthopedics">Surgery & Orthopedics</option>
                <option value="Women's Health">Women's Health</option>
              </select>
            </div>
          </div>

          {/* Vitals Grid */}
          <div className="border border-slate-200 rounded-lg p-3 bg-white">
            <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-rose-600" />
              Patient Clinical Vitals
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Blood Pressure</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  placeholder="120/80 mmHg"
                  className="w-full border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Heart Rate</label>
                <input
                  type="text"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  placeholder="75 bpm"
                  className="w-full border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Temperature</label>
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  placeholder="36.8 °C"
                  className="w-full border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Oxygen (SpO2)</label>
                <input
                  type="text"
                  value={spO2}
                  onChange={(e) => setSpO2(e.target.value)}
                  placeholder="98%"
                  className="w-full border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-0.5">Weight</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70 kg"
                  className="w-full border border-slate-300 rounded px-2 py-1 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Chief Complaint */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Chief Complaint *</label>
            <input
              type="text"
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              required
              placeholder="e.g. Severe throbbing frontal headache and photophobia for 3 days"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Symptoms (comma separated) */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Observed Symptoms (comma-separated tags)
            </label>
            <input
              type="text"
              value={symptomsInput}
              onChange={(e) => setSymptomsInput(e.target.value)}
              placeholder="e.g. Headache, Nausea, Dizziness, Fatigue"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Diagnosis & ICD-10 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Clinical Diagnosis *
              </label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                required
                placeholder="e.g. Tension-Type Headache / Cervicogenic Cephalea"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">ICD-10 Code</label>
              <input
                type="text"
                value={icdCode}
                onChange={(e) => setIcdCode(e.target.value)}
                placeholder="e.g. G44.2"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Treatment Plan */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Prescribed Treatment & Management Plan *
            </label>
            <textarea
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              rows={2}
              required
              placeholder="e.g. Prescribed Ibuprofen 400mg TDS for 3 days, adequate hydration, posture ergonomic correction..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Doctor's Clinical Notes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Physician Examination & Progression Notes
            </label>
            <textarea
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              rows={3}
              placeholder="Detailed physical exam findings, palpation, neurological reflexes, systemic review..."
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>

          {/* Follow Up Date */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Recommended Follow-Up Date (Optional)
            </label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="w-full sm:w-1/2 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
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
              className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" />
              Save Record to EMR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
