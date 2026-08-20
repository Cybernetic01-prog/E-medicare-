import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FlaskConical, AlertTriangle, CheckCircle, FileText, Send, User, Calendar, Printer } from 'lucide-react';

export const LabReportDetailModal: React.FC = () => {
  const { selectedLabReport, setSelectedLabReport, currentUser, addDoctorCommentToLab } = useApp();
  const [commentText, setCommentText] = useState('');

  if (!selectedLabReport) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addDoctorCommentToLab(selectedLabReport.id, commentText);
    setCommentText('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <FlaskConical className="w-5 h-5 text-sky-400" />
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Diagnostic Laboratory Report
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Sample Specimen ID: {selectedLabReport.labNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
              title="Print Lab Summary"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedLabReport(null)}
              className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs flex-1">
          {/* Institutional Letterhead / Meta */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block text-[11px]">Patient Details:</span>
              <p className="font-bold text-slate-800 text-sm">{selectedLabReport.patientName}</p>
              <p className="text-slate-600 font-mono">Patient ID: {selectedLabReport.patientId}</p>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px]">Test & Specimen Info:</span>
              <p className="font-semibold text-slate-800">{selectedLabReport.testName}</p>
              <p className="text-slate-600">Department: {selectedLabReport.category}</p>
              <p className="text-slate-600">Sample Collected: {selectedLabReport.sampleDate}</p>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
              <span>Requested by: <strong className="text-slate-700">{selectedLabReport.requestedByDoctor}</strong></span>
              <span className={`px-2 py-0.5 rounded font-semibold ${
                selectedLabReport.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
              }`}>
                Status: {selectedLabReport.status}
              </span>
            </div>
          </div>

          {/* Test Parameters Table */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Quantitative & Qualitative Parameters</h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="py-2.5 px-3">Analyte / Test</th>
                    <th className="py-2.5 px-3">Observed Result</th>
                    <th className="py-2.5 px-3">Units</th>
                    <th className="py-2.5 px-3">Reference Interval</th>
                    <th className="py-2.5 px-3 text-center">Flag</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedLabReport.parameters.map((param, idx) => {
                    const isAbnormal = param.flag !== 'Normal';
                    return (
                      <tr key={idx} className={isAbnormal ? 'bg-amber-50/50' : 'bg-white'}>
                        <td className="py-2.5 px-3 font-medium text-slate-800">{param.name}</td>
                        <td className="py-2.5 px-3 font-bold text-slate-900">{param.value}</td>
                        <td className="py-2.5 px-3 text-slate-500">{param.unit}</td>
                        <td className="py-2.5 px-3 text-slate-600 font-mono">{param.referenceRange}</td>
                        <td className="py-2.5 px-3 text-center">
                          {isAbnormal ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                              <AlertTriangle className="w-3 h-3" />
                              {param.flag}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3 h-3" />
                              Normal
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pathologist Notes */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-1">
            <h5 className="font-semibold text-slate-800">Pathologist Diagnostic Remarks:</h5>
            <p className="text-slate-600 leading-relaxed">{selectedLabReport.overallSummary}</p>
            <p className="text-[11px] text-slate-500 italic mt-1">{selectedLabReport.pathologistNotes}</p>
          </div>

          {/* Doctor Comments Section */}
          <div className="border border-sky-200 bg-sky-50/60 rounded-lg p-3 space-y-2">
            <h5 className="font-semibold text-sky-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-sky-700" />
              Attending Physician Interpretation & Action Notes:
            </h5>
            {selectedLabReport.doctorComments ? (
              <p className="text-sky-900 bg-white p-2.5 rounded border border-sky-200 text-xs leading-relaxed">
                {selectedLabReport.doctorComments}
              </p>
            ) : (
              <p className="text-slate-500 italic text-[11px]">No clinical physician notes entered yet.</p>
            )}

            {/* Doctor can add notes */}
            {currentUser?.role === 'doctor' && (
              <form onSubmit={handleAddComment} className="mt-2 space-y-2">
                <label className="block text-[11px] font-medium text-slate-700">
                  Add / Update Clinical Review Comments (as Dr. {currentUser.name}):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Enter clinical assessment, e.g. 'Values acceptable. Continue current medication regimen.'"
                    className="flex-1 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
                  />
                  <button
                    type="submit"
                    className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-3 py-1.5 rounded flex items-center gap-1 text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Save Note
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Electronic Diagnostic Sign-Off • MedCore E-Health</span>
          <button
            onClick={() => setSelectedLabReport(null)}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded font-medium"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
