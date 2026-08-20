import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  Users,
  UserCheck,
  Calendar,
  Clock,
  Activity,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Download,
  Search,
  Filter,
  BarChart3,
  Server,
  PlusCircle,
  FlaskConical,
  UserPlus
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUser,
    stats,
    users,
    departments,
    appointments,
    systemLogs,
    setActivePage,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'doctors' | 'logs' | 'settings'>('overview');
  const [searchUser, setSearchUser] = useState('');

  const doctors = users.filter((u) => u.role === 'doctor');
  const patients = users.filter((u) => u.role === 'patient');

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      (u.patientId && u.patientId.toLowerCase().includes(searchUser.toLowerCase())) ||
      (u.licenseNumber && u.licenseNumber.toLowerCase().includes(searchUser.toLowerCase()))
  );

  const handleExportSystemSummary = () => {
    addToast('Report Exported', 'Hospital activity and clinical audit summary exported to print/PDF format.', 'success');
    window.print();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase">Confirmed</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">Pending</span>;
      case 'Scheduled':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase">Scheduled</span>;
      case 'Canceled':
      case 'Cancelled':
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-bold rounded uppercase">Canceled</span>;
      case 'Completed':
        return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">Completed</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded uppercase">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 4 Metric Cards (Matching Professional Polish Theme) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border border-[#e1e8ed] shadow-sm">
          <p className="text-xs text-[#7f8c8d] uppercase font-bold tracking-wider">Total Patients</p>
          <h3 className="text-2xl font-bold text-[#2c3e50] mt-1">{stats.totalPatients || 1284}</h3>
          <div className="mt-2 text-[11px] text-green-600 font-medium">+12 New this week</div>
        </div>

        <div className="bg-white p-4 rounded border border-[#e1e8ed] shadow-sm">
          <p className="text-xs text-[#7f8c8d] uppercase font-bold tracking-wider">Active Doctors</p>
          <h3 className="text-2xl font-bold text-[#2c3e50] mt-1">{stats.totalDoctors || 42}</h3>
          <div className="mt-2 text-[11px] text-[#3498db] font-medium">{departments.length} Depts represented</div>
        </div>

        <div className="bg-white p-4 rounded border border-[#e1e8ed] shadow-sm">
          <p className="text-xs text-[#7f8c8d] uppercase font-bold tracking-wider">Appointments Today</p>
          <h3 className="text-2xl font-bold text-[#2c3e50] mt-1">{stats.totalAppointments || 18}</h3>
          <div className="mt-2 text-[11px] text-[#e67e22] font-medium">{stats.pendingAppointments || 4} Pending Review</div>
        </div>

        <div className="bg-white p-4 rounded border border-[#e1e8ed] shadow-sm">
          <p className="text-xs text-[#7f8c8d] uppercase font-bold tracking-wider">System Uptime</p>
          <h3 className="text-2xl font-bold text-[#2c3e50] mt-1">99.9%</h3>
          <div className="mt-2 text-[11px] text-[#7f8c8d]">Local Server Stability</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-[#e1e8ed] flex items-center gap-2 overflow-x-auto text-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'overview'
              ? 'border-[#3498db] text-[#3498db]'
              : 'border-transparent text-[#7f8c8d] hover:text-[#2c3e50]'
          }`}
        >
          Dashboard & Task Management
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'users'
              ? 'border-[#3498db] text-[#3498db]'
              : 'border-transparent text-[#7f8c8d] hover:text-[#2c3e50]'
          }`}
        >
          User Accounts Directory ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'doctors'
              ? 'border-[#3498db] text-[#3498db]'
              : 'border-transparent text-[#7f8c8d] hover:text-[#2c3e50]'
          }`}
        >
          Clinical Department Staffing
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'logs'
              ? 'border-[#3498db] text-[#3498db]'
              : 'border-transparent text-[#7f8c8d] hover:text-[#2c3e50]'
          }`}
        >
          Audit Logs ({systemLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 px-3 font-semibold transition-colors border-b-2 ${
            activeTab === 'settings'
              ? 'border-[#3498db] text-[#3498db]'
              : 'border-transparent text-[#7f8c8d] hover:text-[#2c3e50]'
          }`}
        >
          Academic Metadata & Settings
        </button>
      </div>

      {/* Tab 1: Overview (Matching the 3-column Bento in Design HTML) */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Appointments Log Table (Col Span 2) */}
          <div className="lg:col-span-2 bg-white border border-[#e1e8ed] rounded flex flex-col shadow-sm overflow-hidden">
            <div className="p-4 bg-[#fcfcfc] border-b border-[#e1e8ed] flex justify-between items-center">
              <h4 className="font-bold text-sm text-[#2c3e50]">Recent Appointments Log</h4>
              <button
                onClick={handleExportSystemSummary}
                className="text-[11px] bg-white border px-3 py-1 rounded text-[#3498db] border-[#3498db] hover:bg-[#3498db] hover:text-white transition-colors"
              >
                Export CSV
              </button>
            </div>

            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f8f9fa] sticky top-0">
                  <tr>
                    <th className="p-3 text-[11px] font-bold text-[#7f8c8d] border-b border-[#e1e8ed]">PATIENT NAME</th>
                    <th className="p-3 text-[11px] font-bold text-[#7f8c8d] border-b border-[#e1e8ed]">DOCTOR</th>
                    <th className="p-3 text-[11px] font-bold text-[#7f8c8d] border-b border-[#e1e8ed]">DATE</th>
                    <th className="p-3 text-[11px] font-bold text-[#7f8c8d] border-b border-[#e1e8ed]">STATUS</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {appointments.slice(0, 7).map((apt) => (
                    <tr key={apt.id} className="border-b border-[#e1e8ed] hover:bg-gray-50">
                      <td className="p-3 font-medium text-[#2c3e50]">
                        {apt.patientName} <span className="text-[11px] text-[#7f8c8d]">({apt.patientId})</span>
                      </td>
                      <td className="p-3 text-[#333]">{apt.doctorName}</td>
                      <td className="p-3 text-xs text-[#7f8c8d] font-mono">{apt.date} {apt.timeSlot}</td>
                      <td className="p-3">{getStatusBadge(apt.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Task Management (Col Span 1) */}
          <div className="bg-white border border-[#e1e8ed] rounded flex flex-col shadow-sm">
            <div className="p-4 border-b border-[#e1e8ed]">
              <h4 className="font-bold text-sm text-[#2c3e50]">System Task Management</h4>
            </div>
            <div className="p-4 space-y-4">
              <div className="p-3 bg-[#f8f9fa] border border-[#e1e8ed] rounded">
                <p className="text-[12px] font-semibold text-[#2c3e50] mb-1">Create New Patient Profile</p>
                <p className="text-[11px] text-[#7f8c8d] mb-3">Standard intake form for new registrants.</p>
                <button
                  onClick={() => setActivePage('register')}
                  className="w-full py-2 bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold rounded transition-colors"
                >
                  Launch Form
                </button>
              </div>

              <div className="p-3 bg-[#f8f9fa] border border-[#e1e8ed] rounded">
                <p className="text-[12px] font-semibold text-[#2c3e50] mb-1">Laboratory Diagnostic Request</p>
                <p className="text-[11px] text-[#7f8c8d] mb-3">Issue pathology test orders for active patients.</p>
                <button
                  onClick={() => setActivePage('lab-results')}
                  className="w-full py-2 border border-[#3498db] text-[#3498db] hover:bg-[#3498db] hover:text-white text-xs font-bold rounded transition-colors"
                >
                  Request Lab
                </button>
              </div>

              <div className="mt-4 p-3 border-t border-[#e1e8ed]">
                <p className="text-[10px] text-[#95a5a6] mb-1 italic">Project Metadata</p>
                <p className="text-[10px] text-[#95a5a6] uppercase font-mono">Module: HospitalAdmin.js</p>
                <p className="text-[10px] text-[#95a5a6] uppercase font-mono">Auth: Level 4 Administrator</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Users Management Table */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#e1e8ed] rounded shadow-sm p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#3498db]" />
              Registered System Users (Patients, Doctors & Staff)
            </h3>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#7f8c8d] absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Search user name, email, ID..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#f8f9fa] border border-[#e1e8ed] rounded text-[#2c3e50]"
              />
            </div>
          </div>

          <div className="border border-[#e1e8ed] rounded overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#7f8c8d] font-bold border-b border-[#e1e8ed]">
                  <th className="py-2.5 px-3">USER / IDENTITY</th>
                  <th className="py-2.5 px-3">ROLE</th>
                  <th className="py-2.5 px-3">IDENTIFIER / REF</th>
                  <th className="py-2.5 px-3">CONTACT</th>
                  <th className="py-2.5 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e8ed]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={u.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#e1e8ed]"
                        />
                        <div>
                          <span className="font-bold text-[#2c3e50]">{u.name}</span>
                          <span className="block text-[11px] text-[#7f8c8d]">{u.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          u.role === 'doctor'
                            ? 'bg-teal-100 text-teal-800'
                            : u.role === 'admin'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[#2c3e50]">
                      {u.patientId || u.licenseNumber || 'SYSTEM_ADMIN'}
                    </td>
                    <td className="py-2.5 px-3 text-[#7f8c8d] font-mono">
                      {u.phone || 'N/A'}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Department Staffing */}
      {activeTab === 'doctors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {departments.map((dept) => {
            const deptDocs = doctors.filter((d) => d.department === dept.name);
            return (
              <div key={dept.id} className="bg-white border border-[#e1e8ed] rounded p-5 shadow-sm space-y-3 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#2c3e50] text-sm">{dept.name}</h4>
                    <p className="text-[#7f8c8d] text-[11px]">Head of Unit: {dept.headOfDepartment}</p>
                  </div>
                  <span className="bg-[#f8f9fa] text-[#7f8c8d] font-mono px-2 py-0.5 rounded text-[11px] border border-[#e1e8ed]">
                    {dept.contactExtension}
                  </span>
                </div>
                <p className="text-[#555] leading-relaxed">{dept.description}</p>
                <div className="pt-2 border-t border-[#e1e8ed]">
                  <span className="font-semibold text-[#2c3e50] block mb-1">Assigned Medical Officers:</span>
                  <div className="space-y-1">
                    {deptDocs.map((doc) => (
                      <div key={doc.id} className="flex justify-between items-center bg-[#f8f9fa] p-2 rounded">
                        <span className="font-medium text-[#2c3e50]">{doc.name}</span>
                        <span className="font-mono text-[10px] text-[#7f8c8d]">{doc.licenseNumber}</span>
                      </div>
                    ))}
                    {deptDocs.length === 0 && (
                      <span className="text-[#7f8c8d] italic">Resident rotational staff assigned.</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-[#e1e8ed] rounded shadow-sm p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#3498db]" />
            System Activity & Security Audit Trail
          </h3>

          <div className="border border-[#e1e8ed] rounded overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9fa] text-[#7f8c8d] font-bold border-b border-[#e1e8ed]">
                  <th className="py-2.5 px-3">TIMESTAMP</th>
                  <th className="py-2.5 px-3">USER</th>
                  <th className="py-2.5 px-3">ROLE</th>
                  <th className="py-2.5 px-3">ACTION EVENT</th>
                  <th className="py-2.5 px-3">EVENT DETAILS</th>
                  <th className="py-2.5 px-3">CLIENT IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1e8ed] font-mono text-[11px]">
                {systemLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="py-2.5 px-3 text-[#7f8c8d] whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-semibold text-[#2c3e50] font-sans">{log.user}</td>
                    <td className="py-2.5 px-3 text-[#7f8c8d]">{log.role}</td>
                    <td className="py-2.5 px-3 font-semibold text-[#3498db] font-sans">{log.action}</td>
                    <td className="py-2.5 px-3 text-[#555] font-sans">{log.details}</td>
                    <td className="py-2.5 px-3 text-[#7f8c8d]">{log.ipAddress || '127.0.0.1'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: System Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white border border-[#e1e8ed] rounded shadow-sm p-6 space-y-4 max-w-2xl text-xs">
          <h3 className="text-sm font-bold text-[#2c3e50] flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#3498db]" />
            Hospital System Parameters & Academic Configuration
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-[#2c3e50] mb-1">Academic Project Title</label>
              <input
                type="text"
                readOnly
                value="Design and Implementation of a Dynamic E-Health Management System"
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50] font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#2c3e50] mb-1">Academic Session</label>
                <input
                  type="text"
                  readOnly
                  value="2025 / 2026 Academic Year"
                  className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#2c3e50] mb-1">Database Node Persistence</label>
                <input
                  type="text"
                  readOnly
                  value="Browser LocalStorage + State Cache"
                  className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#e1e8ed] text-[#7f8c8d]">
              <p>System configuration values are locked in demonstration mode for academic defense integrity.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
