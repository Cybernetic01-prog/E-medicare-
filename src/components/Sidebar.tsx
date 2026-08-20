import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Calendar,
  UserCheck,
  FileText,
  Pill,
  FlaskConical,
  Bell,
  User,
  LogOut,
  Shield,
  Activity,
  Home,
  ChevronRight,
  Server
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activePage, setActivePage, currentUser, logout, notifications } = useApp();

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const getDashboardId = () => {
    if (!currentUser) return 'patient-dashboard';
    if (currentUser.role === 'patient') return 'patient-dashboard';
    if (currentUser.role === 'doctor') return 'doctor-dashboard';
    return 'admin-dashboard';
  };

  const navItems = [
    {
      id: getDashboardId(),
      matchIds: ['patient-dashboard', 'doctor-dashboard', 'admin-dashboard'],
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'appointments',
      matchIds: ['appointments'],
      label: 'Appointments',
      icon: Calendar,
    },
    {
      id: 'medical-records',
      matchIds: ['medical-records'],
      label: 'Medical Records',
      icon: FileText,
    },
    {
      id: 'lab-results',
      matchIds: ['lab-results'],
      label: 'Lab Results',
      icon: FlaskConical,
    },
    {
      id: 'prescriptions',
      matchIds: ['prescriptions'],
      label: 'Inventory/Pharmacy',
      icon: Pill,
    },
    {
      id: 'doctors',
      matchIds: ['doctors'],
      label: 'Doctor Directory',
      icon: UserCheck,
    },
  ];

  const accountItems = [
    {
      id: 'profile',
      matchIds: ['profile'],
      label: 'Profile Settings',
      icon: User,
    },
    {
      id: 'notifications',
      matchIds: ['notifications'],
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotifCount > 0 ? unreadNotifCount : undefined,
    },
  ];

  return (
    <aside className="w-64 bg-[#1a2b3c] flex flex-col shrink-0 min-h-screen shadow-lg select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#2c3e50]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#3498db] text-white flex items-center justify-center font-bold shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-white font-bold text-lg tracking-tight block leading-tight truncate">
              E-MediCare <span className="text-[#3498db] text-xs font-normal">System</span>
            </span>
          </div>
        </div>
        <p className="text-[#7f8c8d] text-[10px] mt-1.5 uppercase tracking-wider font-semibold">
          E-Health Management System
        </p>
      </div>

      {/* User Role Card */}
      {currentUser && (
        <div className="px-5 py-3.5 bg-[#14212d]/80 border-b border-[#2c3e50] flex items-center gap-3">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-[#34495e] shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white truncate leading-tight">{currentUser.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded font-bold ${
                  currentUser.role === 'doctor'
                    ? 'bg-teal-900 text-teal-300'
                    : currentUser.role === 'admin'
                    ? 'bg-indigo-900 text-indigo-300'
                    : 'bg-[#3498db]/30 text-[#3498db]'
                }`}
              >
                {currentUser.role}
              </span>
              <span className="text-[10px] text-[#7f8c8d] font-mono truncate">
                {currentUser.patientId || currentUser.licenseNumber || 'ADMIN_LVL4'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-5 mb-2 text-[11px] text-[#7f8c8d] font-semibold uppercase tracking-wider">
          System Navigation
        </div>

        {navItems.map((item) => {
          const isActive = item.matchIds.includes(activePage);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm transition-colors text-left ${
                isActive
                  ? 'bg-[#3498db] text-white font-medium shadow-xs'
                  : 'text-[#bdc3c7] hover:bg-[#2c3e50] hover:text-white'
              }`}
            >
              {isActive ? (
                <span className="w-2 h-2 rounded-full bg-white mr-3 shrink-0"></span>
              ) : (
                <Icon className="w-4 h-4 mr-3 text-[#7f8c8d] shrink-0" />
              )}
              <span className="flex-1 truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="px-5 mt-6 mb-2 text-[11px] text-[#7f8c8d] font-semibold uppercase tracking-wider">
          Account Control
        </div>

        {accountItems.map((item) => {
          const isActive = item.matchIds.includes(activePage);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center px-6 py-3 text-sm transition-colors text-left ${
                isActive
                  ? 'bg-[#3498db] text-white font-medium shadow-xs'
                  : 'text-[#bdc3c7] hover:bg-[#2c3e50] hover:text-white'
              }`}
            >
              {isActive ? (
                <span className="w-2 h-2 rounded-full bg-white mr-3 shrink-0"></span>
              ) : (
                <Icon className="w-4 h-4 mr-3 text-[#7f8c8d] shrink-0" />
              )}
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge !== undefined && (
                <span className="bg-[#e74c3c] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="px-5 mt-4 pt-4 border-t border-[#2c3e50]/60">
          <button
            onClick={() => setActivePage('home')}
            className="w-full flex items-center px-6 py-2.5 text-xs text-[#bdc3c7] hover:bg-[#2c3e50] hover:text-white transition-colors rounded"
          >
            <Home className="w-3.5 h-3.5 mr-2.5 text-[#7f8c8d]" />
            <span>Public Website Home</span>
          </button>
        </div>
      </nav>

      {/* Development / System Status Box */}
      <div className="p-4 bg-[#14212d] border-t border-[#2c3e50]">
        <div className="p-3 bg-[#2c3e50] rounded border border-[#34495e] space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-[#bdc3c7] font-semibold uppercase tracking-wider">Development Status</p>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          </div>
          <p className="text-[12px] text-green-400 font-mono underline">DB_CONNECTED: 200 OK</p>
          <p className="text-[10px] text-[#95a5a6] pt-0.5">Capstone Module: HospitalCore</p>
        </div>

        <button
          onClick={logout}
          className="mt-3 w-full flex items-center justify-center gap-2 py-1.5 text-xs text-[#bdc3c7] hover:text-[#e74c3c] hover:bg-[#2c3e50] rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit / Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
