import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  LogIn,
  Shield,
  Stethoscope,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Activity,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, setActivePage, switchUserRole } = useApp();

  const [role, setRole] = useState<UserRole>('patient');
  const [identifier, setIdentifier] = useState('emmanuel.kalu@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setErrorMsg('');
    if (newRole === 'patient') {
      setIdentifier('emmanuel.kalu@example.com');
      setPassword('password123');
    } else if (newRole === 'doctor') {
      setIdentifier('s.mitchell@ehealth.edu');
      setPassword('password123');
    } else if (newRole === 'admin') {
      setIdentifier('admin@ehealth.edu');
      setPassword('admin2026');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation checks
    const trimmedId = identifier.trim();
    if (!trimmedId) {
      setErrorMsg('Please enter your registered email address or username.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }

    // Role-specific validation
    if (role === 'patient' && !trimmedId.includes('@') && !trimmedId.startsWith('PID-')) {
      setErrorMsg('Please enter a valid Patient Email (e.g. emmanuel.kalu@example.com) or Patient ID.');
      return;
    }

    login(trimmedId, role);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="max-w-md w-full space-y-6">
        {/* Top Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#1a2b3c] text-white shadow-xs border border-[#2c3e50]">
            <Activity className="w-6 h-6 text-[#3498db]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2c3e50] tracking-tight">
            E-MediCare Portal Sign In
          </h1>
          <p className="text-xs text-[#7f8c8d]">
            Dynamic E-Health Management System • Academic Prototype
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-[#e1e8ed]/60 p-1 rounded grid grid-cols-3 gap-1 text-xs border border-[#e1e8ed]">
          <button
            type="button"
            onClick={() => handleRoleSelect('patient')}
            className={`py-2 rounded font-semibold flex items-center justify-center gap-1.5 transition-all ${
              role === 'patient'
                ? 'bg-[#3498db] text-white shadow-xs'
                : 'text-[#2c3e50] hover:text-[#3498db] hover:bg-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Patient</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('doctor')}
            className={`py-2 rounded font-semibold flex items-center justify-center gap-1.5 transition-all ${
              role === 'doctor'
                ? 'bg-[#16a085] text-white shadow-xs'
                : 'text-[#2c3e50] hover:text-[#16a085] hover:bg-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`py-2 rounded font-semibold flex items-center justify-center gap-1.5 transition-all ${
              role === 'admin'
                ? 'bg-[#1a2b3c] text-white shadow-xs'
                : 'text-[#2c3e50] hover:text-[#1a2b3c] hover:bg-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Form Box */}
        <div className="bg-white border border-[#e1e8ed] rounded p-6 sm:p-8 shadow-sm">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">
                {role === 'patient'
                  ? 'Patient Email Address / Patient ID'
                  : role === 'doctor'
                  ? 'Staff Email Address / Medical License'
                  : 'System Administrator Username'} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7f8c8d] absolute left-3 top-3" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  placeholder={
                    role === 'patient'
                      ? 'emmanuel.kalu@example.com'
                      : role === 'doctor'
                      ? 's.mitchell@ehealth.edu'
                      : 'admin@ehealth.edu'
                  }
                  className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded pl-9 pr-3 py-2.5 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db] focus:border-[#3498db]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-[#2c3e50]">Account Password *</label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-[#3498db] hover:text-[#2980b9] font-semibold text-[11px]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#7f8c8d] absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded pl-9 pr-10 py-2.5 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db] focus:border-[#3498db]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#7f8c8d] hover:text-[#2c3e50]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#555]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#3498db] focus:ring-[#3498db] border-[#e1e8ed]"
                />
                <span>Remember session</span>
              </label>
              <span className="text-[10px] text-[#7f8c8d] font-mono uppercase font-bold">
                Auth Scope: {role}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold py-3 px-4 rounded flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </button>
          </form>

          {/* Quick 1-Click Evaluation Logins */}
          <div className="mt-6 pt-4 border-t border-[#e1e8ed]">
            <span className="block text-[11px] font-bold text-[#7f8c8d] mb-2 uppercase tracking-wider text-center">
              Quick 1-Click Academic Evaluation Logins:
            </span>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => switchUserRole('patient')}
                className="bg-[#f4f7f9] hover:bg-[#e1e8ed] text-[#3498db] font-bold py-1.5 px-2 rounded border border-[#e1e8ed] text-center transition-colors"
              >
                Patient Demo
              </button>
              <button
                type="button"
                onClick={() => switchUserRole('doctor')}
                className="bg-[#f4f7f9] hover:bg-[#e1e8ed] text-[#16a085] font-bold py-1.5 px-2 rounded border border-[#e1e8ed] text-center transition-colors"
              >
                Doctor Demo
              </button>
              <button
                type="button"
                onClick={() => switchUserRole('admin')}
                className="bg-[#f4f7f9] hover:bg-[#e1e8ed] text-[#1a2b3c] font-bold py-1.5 px-2 rounded border border-[#e1e8ed] text-center transition-colors"
              >
                Admin Demo
              </button>
            </div>
          </div>
        </div>

        {/* Link to Register */}
        <p className="text-center text-xs text-[#7f8c8d]">
          New patient or attending doctor?{' '}
          <button
            onClick={() => setActivePage('register')}
            className="text-[#3498db] font-bold hover:underline"
          >
            Create New Account
          </button>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-[#1a2b3c]/60 flex items-center justify-center p-4">
          <div className="bg-white rounded max-w-sm w-full p-6 shadow-xl border border-[#e1e8ed] space-y-4 text-xs">
            <div className="flex items-center gap-2 text-[#2c3e50] font-bold text-sm">
              <HelpCircle className="w-5 h-5 text-[#3498db]" />
              <span>Academic Demo Authentication Credentials</span>
            </div>
            <p className="text-[#555] leading-relaxed">
              In this academic software prototype, all accounts use sample credentials. You can log in directly using the <strong>1-Click Demo buttons</strong> or the credentials below:
            </p>
            <div className="bg-[#f8f9fa] p-3 rounded font-mono text-[11px] text-[#2c3e50] border border-[#e1e8ed] space-y-1.5">
              <div><strong>Patient:</strong> emmanuel.kalu@example.com (Pass: password123)</div>
              <div><strong>Doctor:</strong> s.mitchell@ehealth.edu (Pass: password123)</div>
              <div><strong>Admin:</strong> admin@ehealth.edu (Pass: admin2026)</div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="bg-[#3498db] hover:bg-[#2980b9] text-white font-bold px-4 py-2 rounded"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
