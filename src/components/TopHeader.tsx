import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Calendar,
  FilePlus,
  Menu,
  CheckCircle2,
  Shield,
  Stethoscope,
  User
} from 'lucide-react';

interface TopHeaderProps {
  onToggleMobileSidebar?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onToggleMobileSidebar }) => {
  const {
    currentUser,
    switchUserRole,
    activePage,
    setActivePage,
    notifications,
    setIsBookModalOpen,
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPageTitle = () => {
    switch (activePage) {
      case 'patient-dashboard':
        return 'Patient Health Workspace';
      case 'doctor-dashboard':
        return 'Doctor Clinical Consultation Suite';
      case 'admin-dashboard':
        return 'Administrator Control Panel';
      case 'appointments':
        return 'Appointments & Outpatient Scheduling';
      case 'medical-records':
        return 'Electronic Medical Records (EMR)';
      case 'prescriptions':
        return 'Pharmacy & Medication Orders';
      case 'lab-results':
        return 'Diagnostic Laboratory Reports';
      case 'profile':
        return 'Profile & Account Settings';
      case 'notifications':
        return 'System Notifications & Alerts';
      default:
        return 'Hospital Management System';
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'US';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <header className="h-16 bg-white border-b border-[#e1e8ed] flex items-center justify-between px-6 sm:px-8 shrink-0 z-30 shadow-xs">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-1.5 text-[#7f8c8d] hover:text-[#2c3e50] rounded hover:bg-[#f4f7f9]"
            aria-label="Toggle navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-[#2c3e50] leading-tight">
            {getPageTitle()}
          </h2>
          <p className="text-xs text-[#95a5a6] hidden sm:block">
            Academic Project: Final Year Implementation Module
          </p>
        </div>
      </div>

      {/* Right Section: Evaluator Quick Switcher & User Avatar */}
      <div className="flex items-center gap-4">
        {/* Quick Role Switcher */}
        <div className="hidden md:flex items-center bg-[#f4f7f9] p-1 rounded border border-[#e1e8ed] text-xs">
          <span className="text-[11px] font-semibold text-[#7f8c8d] px-2 uppercase">Role:</span>
          <button
            onClick={() => switchUserRole('patient')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              currentUser?.role === 'patient'
                ? 'bg-[#3498db] text-white shadow-xs'
                : 'text-[#7f8c8d] hover:text-[#2c3e50] hover:bg-white'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => switchUserRole('doctor')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              currentUser?.role === 'doctor'
                ? 'bg-[#16a085] text-white shadow-xs'
                : 'text-[#7f8c8d] hover:text-[#2c3e50] hover:bg-white'
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => switchUserRole('admin')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              currentUser?.role === 'admin'
                ? 'bg-[#2c3e50] text-white shadow-xs'
                : 'text-[#7f8c8d] hover:text-[#2c3e50] hover:bg-white'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Quick Action Button */}
        {currentUser?.role === 'patient' && (
          <button
            onClick={() => setIsBookModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold px-3.5 py-2 rounded shadow-xs transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Visit</span>
          </button>
        )}

        {/* Notifications Icon */}
        <button
          onClick={() => setActivePage('notifications')}
          className="relative p-2 text-[#7f8c8d] hover:text-[#2c3e50] rounded-lg hover:bg-[#f4f7f9] transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#e74c3c] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Identity Display */}
        <div
          onClick={() => setActivePage('profile')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-[#2c3e50] leading-tight group-hover:text-[#3498db] transition-colors">
              {currentUser?.name || 'Dr. Samuel Adebayo'}
            </p>
            <p className="text-[11px] text-[#7f8c8d] capitalize">
              {currentUser?.role === 'admin'
                ? 'System Administrator'
                : currentUser?.role === 'doctor'
                ? 'Consultant Physician'
                : 'Registered Patient'}
            </p>
          </div>
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border border-[#e1e8ed] shadow-xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#3498db] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              {getInitials(currentUser?.name)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
