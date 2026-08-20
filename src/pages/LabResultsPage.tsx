import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FlaskConical,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye,
  FileCheck,
  Calendar,
  User,
  Activity
} from 'lucide-react';

export const LabResultsPage: React.FC = () => {
  const {
    currentUser,
    labResults,
    setSelectedLabReport,
  } = useApp();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Role filtering
  let visibleLabs = labResults;
  if (currentUser?.role === 'patient') {
    visibleLabs = labResults.filter(
      (l) => l.patientId === currentUser.patientId || l.patientName === currentUser.name
    );
  }

  const filteredLabs = visibleLabs.filter((l) => {
    const matchesSearch =
      l.testName.toLowerCase().includes(search.toLowerCase()) ||
      l.patientName.toLowerCase().includes(search.toLowerCase()) ||
      l.specimenId.toLowerCase().includes(search.toLowerCase()) ||
      l.overallSummary.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || l.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FlaskConical className="w-7 h-7 text-sky-700" />
            Diagnostic Pathology & Laboratory Results
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentUser?.role === 'patient'
              ? 'Access electronic pathology diagnostic reports, test parameters, and clinical interpretations.'
              : 'Laboratory result verification and clinical remark documentation portal for attending physicians.'}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search test name, specimen ID, patient..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 shrink-0">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700"
          >
            <option value="All">All Categories</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Hematology">Hematology</option>
            <option value="Microbiology">Microbiology</option>
            <option value="Urinalysis">Urinalysis</option>
            <option value="Immunology">Immunology</option>
          </select>

          <span className="text-xs text-slate-500 shrink-0 ml-1">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700"
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Completed">Completed</option>
            <option value="Pending Review">Pending Review</option>
          </select>
        </div>
      </div>

      {/* Lab Results Grid */}
      {filteredLabs.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500 space-y-2">
          <FlaskConical className="w-8 h-8 text-slate-300 mx-auto" />
          <p>No laboratory reports found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLabs.map((lab) => {
            const hasElevatedParam = lab.parameters.some((p) => p.flag === 'Elevated' || p.flag === 'Low');

            return (
              <div
                key={lab.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-sky-900 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded">
                        {lab.specimenId}
                      </span>
                      <span className="text-[11px] text-slate-500">{lab.sampleDate}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        lab.status === 'Verified'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {lab.status}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">
                        {lab.testName}
                      </h3>
                      <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {lab.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      <span>Patient: <strong>{lab.patientName}</strong> ({lab.patientId})</span>
                    </div>
                  </div>

                  {/* Summary Callout */}
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-xs space-y-1">
                    <p className="text-slate-700">
                      <strong>Summary:</strong> {lab.overallSummary}
                    </p>
                    {hasElevatedParam && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Note: Contains parameters outside standard reference range
                      </span>
                    )}
                  </div>

                  {/* Parameters snapshot */}
                  <div className="text-[11px] text-slate-500 flex flex-wrap gap-2">
                    <span>Analyzed Parameters: <strong>{lab.parameters.length} markers</strong></span>
                    <span>•</span>
                    <span>Pathologist: {lab.pathologistName}</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {lab.doctorNotes ? 'Physician Review Attached' : 'Awaiting Physician Note'}
                  </span>
                  <button
                    onClick={() => setSelectedLabReport(lab)}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Full Lab Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
