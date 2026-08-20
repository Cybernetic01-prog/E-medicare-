import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  Filter,
  Stethoscope,
  Clock,
  Award,
  Calendar,
  Building2,
  Phone,
  UserCheck
} from 'lucide-react';

export const DoctorsPage: React.FC = () => {
  const { users, departments, setSelectedDoctorProfile, setSelectedDoctorForBooking, setIsBookModalOpen } = useApp();
  const doctors = users.filter((u) => u.role === 'doctor');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.specialization && doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.department && doc.department.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'All' || doc.department === selectedDept;

    return matchesSearch && matchesDept;
  });

  const handleBook = (doc: typeof doctors[0]) => {
    setSelectedDoctorForBooking(doc);
    setIsBookModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hospital Medical Staff & Doctors Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse qualified clinical specialists and schedule outpatient consultation appointments.
          </p>
        </div>
        <div className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
          Total Doctors Available: <strong>{doctors.length}</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor by name, specialty..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 shrink-0">Department:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Clinical Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-xs">
          No medical doctors found matching your search criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="p-5 space-y-4">
                {/* Doctor Head */}
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-sky-700 font-semibold mt-0.5">
                      {doc.specialization}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                      {doc.licenseNumber}
                    </span>
                  </div>
                </div>

                {/* Details List */}
                <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Department: <strong>{doc.department}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Experience: <strong>{doc.yearsOfExperience} Years Clinical Practice</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Availability: <strong>{doc.availability}</strong></span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed italic">
                  "{doc.bio}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedDoctorProfile(doc)}
                  className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 px-3 rounded-lg transition-colors text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleBook(doc)}
                  className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
