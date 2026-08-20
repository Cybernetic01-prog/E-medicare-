import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Menu, X, LogIn, UserPlus, LayoutDashboard, UserCheck, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activePage, setActivePage, currentUser, switchUserRole } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Project' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'contact', label: 'Contact' },
  ];

  const getDashboardPage = () => {
    if (!currentUser) return 'patient-dashboard';
    if (currentUser.role === 'patient') return 'patient-dashboard';
    if (currentUser.role === 'doctor') return 'doctor-dashboard';
    return 'admin-dashboard';
  };

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-[#e1e8ed] sticky top-0 z-40 shadow-xs">
      {/* Top Academic Project Banner */}
      <div className="bg-[#1a2b3c] text-[#bdc3c7] text-xs py-1.5 px-4 border-b border-[#2c3e50]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#3498db] text-white font-mono px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">
              ACADEMIC PROJECT
            </span>
            <span className="hidden sm:inline text-white text-xs">
              Design & Implementation of a Dynamic E-Health Management System
            </span>
          </div>

          {/* Quick Evaluator Role Switcher */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[#7f8c8d] hidden md:inline font-semibold">Test Role:</span>
            <button
              onClick={() => switchUserRole('patient')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                currentUser?.role === 'patient'
                  ? 'bg-[#3498db] text-white'
                  : 'bg-[#2c3e50] text-[#bdc3c7] hover:bg-[#34495e] hover:text-white'
              }`}
              title="Test as Patient (Emmanuel Kalu)"
            >
              Patient
            </button>
            <button
              onClick={() => switchUserRole('doctor')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                currentUser?.role === 'doctor'
                  ? 'bg-[#16a085] text-white'
                  : 'bg-[#2c3e50] text-[#bdc3c7] hover:bg-[#34495e] hover:text-white'
              }`}
              title="Test as Doctor (Dr. Sarah Mitchell)"
            >
              Doctor
            </button>
            <button
              onClick={() => switchUserRole('admin')}
              className={`px-2 py-0.5 rounded font-medium transition-colors ${
                currentUser?.role === 'admin'
                  ? 'bg-[#34495e] text-white border border-[#3498db]'
                  : 'bg-[#2c3e50] text-[#bdc3c7] hover:bg-[#34495e] hover:text-white'
              }`}
              title="Test as Administrator (Dr. Samuel Adebayo)"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* System Name / Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded bg-[#3498db] text-white flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold text-[#2c3e50] tracking-tight block leading-none">
                E-MediCare <span className="text-[#3498db] font-normal text-sm">Portal</span>
              </span>
              <span className="text-[11px] text-[#7f8c8d] font-medium tracking-wide">
                Dynamic E-Health Management System
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#3498db] bg-[#f4f7f9] font-bold border-b-2 border-[#3498db]'
                      : 'text-[#2c3e50] hover:text-[#3498db] hover:bg-[#f4f7f9]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Auth Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {currentUser ? (
              <button
                onClick={() => handleNavClick(getDashboardPage())}
                className="flex items-center gap-1.5 bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded text-sm font-semibold shadow-xs transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>
                  {currentUser.role === 'patient'
                    ? 'Patient Workspace'
                    : currentUser.role === 'doctor'
                    ? 'Doctor Consultation'
                    : 'Admin Control Panel'}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick('login')}
                  className="flex items-center gap-1.5 text-[#2c3e50] hover:text-[#3498db] px-3.5 py-2 text-sm font-medium rounded hover:bg-[#f4f7f9] transition-colors"
                >
                  <LogIn className="w-4 h-4 text-[#7f8c8d]" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="flex items-center gap-1.5 bg-[#3498db] hover:bg-[#2980b9] text-white px-4 py-2 rounded text-sm font-semibold shadow-xs transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#7f8c8d] hover:text-[#2c3e50] hover:bg-[#f4f7f9] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e1e8ed] bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 rounded text-sm font-medium ${
                activePage === link.id
                  ? 'bg-[#f4f7f9] text-[#3498db] font-bold'
                  : 'text-[#2c3e50] hover:bg-[#f4f7f9]'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div className="pt-3 border-t border-[#e1e8ed] space-y-2">
            {currentUser ? (
              <button
                onClick={() => handleNavClick(getDashboardPage())}
                className="w-full flex items-center justify-center gap-2 bg-[#3498db] text-white px-4 py-2.5 rounded text-sm font-bold"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard ({currentUser.role})</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full flex items-center justify-center gap-1.5 border border-[#e1e8ed] text-[#2c3e50] px-3 py-2 rounded text-sm font-medium hover:bg-[#f4f7f9]"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#3498db] text-white px-3 py-2 rounded text-sm font-bold"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
