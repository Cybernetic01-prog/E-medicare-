import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import {
  UserPlus,
  User,
  Stethoscope,
  Shield,
  CheckCircle2,
  AlertCircle,
  Activity,
  ArrowRight,
  Info,
  Lock,
  Mail,
  Phone,
  Calendar,
  Sparkles
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register, setActivePage, departments } = useApp();

  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  // Common Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [dob, setDob] = useState('1998-04-12');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Patient Fields
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [genotype, setGenotype] = useState('AA');
  const [allergiesInput, setAllergiesInput] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Doctor Fields
  const [specialization, setSpecialization] = useState('General Internal Medicine');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [department, setDepartment] = useState('Internal Medicine');
  const [yearsExperience, setYearsExperience] = useState<number>(5);
  const [qualificationsInput, setQualificationsInput] = useState('MBBS, FWACP');

  const handleFillDemo = () => {
    if (role === 'patient') {
      setName('Ngozi Amadi');
      setEmail('ngozi.amadi@example.com');
      setPassword('password123');
      setConfirmPassword('password123');
      setPhone('+234 803 456 7890');
      setGender('Female');
      setDob('1995-08-22');
      setAddress('Block 4, University Staff Quarters, Academic District');
      setBloodGroup('A+');
      setGenotype('AS');
      setAllergiesInput('Ciprofloxacin, Dust');
      setEmergencyName('Emeka Amadi (Spouse)');
      setEmergencyPhone('+234 803 111 2233');
    } else {
      setName('Dr. Anthony Balogun');
      setEmail('a.balogun@ehealth.edu');
      setPassword('password123');
      setConfirmPassword('password123');
      setPhone('+234 802 888 9900');
      setGender('Male');
      setDob('1984-11-03');
      setAddress('Department of Surgery, Clinical Sciences Annex');
      setSpecialization('Consultant General Surgeon');
      setLicenseNumber('MD-SURG-77821');
      setDepartment('General Surgery');
      setYearsExperience(12);
      setQualificationsInput('MBBS, FMCS, FWACS');
    }
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation
    if (!name.trim() || name.trim().length < 3) {
      setErrorMsg('Please enter a valid full name (at least 3 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMsg('Please provide a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!phone.trim() || phone.trim().length < 7) {
      setErrorMsg('Please provide a valid contact phone number.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMsg('Password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Account passwords do not match. Please verify.');
      return;
    }

    if (role === 'doctor' && !specialization.trim()) {
      setErrorMsg('Physician specialization is required.');
      return;
    }

    const allergies = allergiesInput
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const qualifications = qualificationsInput
      .split(',')
      .map((q) => q.trim())
      .filter((q) => q.length > 0);

    register({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role,
      phone: phone.trim(),
      gender,
      dateOfBirth: dob,
      address: address.trim() || 'Not specified',
      bloodGroup: role === 'patient' ? bloodGroup : undefined,
      genotype: role === 'patient' ? genotype : undefined,
      allergies: role === 'patient' ? (allergies.length > 0 ? allergies : ['None declared']) : undefined,
      emergencyContact:
        role === 'patient' && emergencyName
          ? { name: emergencyName, relationship: 'Next of Kin', phone: emergencyPhone || phone }
          : undefined,
      specialization: role === 'doctor' ? specialization : undefined,
      licenseNumber: role === 'doctor' ? (licenseNumber || 'MD-' + Math.floor(10000 + Math.random() * 90000)) : undefined,
      department: role === 'doctor' ? department : undefined,
      yearsOfExperience: role === 'doctor' ? Number(yearsExperience) : undefined,
      qualifications: role === 'doctor' ? qualifications : undefined,
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      {/* Top Header */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#1a2b3c] text-white shadow-xs border border-[#2c3e50]">
          <UserPlus className="w-6 h-6 text-[#3498db]" />
        </div>
        <h1 className="text-2xl font-bold text-[#2c3e50] tracking-tight">
          Create E-MediCare Account
        </h1>
        <p className="text-xs text-[#7f8c8d]">
          Self-registration portal for Patients and Clinical Medical Staff
        </p>
      </div>

      {/* Role Selector Tabs */}
      <div className="bg-[#e1e8ed]/60 p-1 rounded grid grid-cols-2 gap-1 text-xs border border-[#e1e8ed]">
        <button
          type="button"
          onClick={() => {
            setRole('patient');
            setErrorMsg('');
          }}
          className={`py-2.5 rounded font-bold flex items-center justify-center gap-2 transition-all ${
            role === 'patient'
              ? 'bg-[#3498db] text-white shadow-xs'
              : 'text-[#2c3e50] hover:text-[#3498db] hover:bg-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Register as Patient</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setRole('doctor');
            setErrorMsg('');
          }}
          className={`py-2.5 rounded font-bold flex items-center justify-center gap-2 transition-all ${
            role === 'doctor'
              ? 'bg-[#16a085] text-white shadow-xs'
              : 'text-[#2c3e50] hover:text-[#16a085] hover:bg-white'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Register as Doctor / Medical Staff</span>
        </button>
      </div>

      {/* Security Notice on Administrator Account Access */}
      <div className="bg-[#f8f9fa] border border-[#e1e8ed] rounded p-3.5 flex items-start gap-3 text-xs text-[#555]">
        <Info className="w-4 h-4 text-[#3498db] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[#2c3e50]">Institutional Security Constraint:</strong> Administrator level privileges (Hospital Administrative Director & IT Supervisor) cannot be created via public web registration. Admin accounts are provisioned directly in the institutional backend database.
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white border border-[#e1e8ed] rounded p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#e1e8ed]">
          <h3 className="text-xs font-bold text-[#2c3e50] uppercase tracking-wider">
            {role === 'patient' ? 'Patient Intake & Clinical Information' : 'Medical Officer Professional Credentials'}
          </h3>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-bold text-[#3498db] hover:text-[#2980b9] flex items-center gap-1 bg-[#f4f7f9] px-2.5 py-1 rounded border border-[#e1e8ed]"
          >
            <Sparkles className="w-3 h-3 text-[#3498db]" />
            <span>Auto-Fill Sample Data</span>
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Section 1: Basic Identity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={role === 'doctor' ? 'Dr. Anthony Balogun' : 'Ngozi Amadi'}
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={role === 'doctor' ? 'a.balogun@ehealth.edu' : 'ngozi.amadi@example.com'}
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+234 800 000 0000"
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">Gender *</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">Date of Birth *</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#2c3e50] mb-1">Residential / Contact Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 14 University Staff Quarters, Academic District"
              className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
            />
          </div>

          {/* Section 2: Role-Specific Details */}
          {role === 'patient' ? (
            <div className="space-y-3 pt-2">
              <div className="border-b border-[#e1e8ed] pb-1">
                <span className="font-bold text-[#2c3e50] uppercase text-[11px]">
                  Clinical Baseline & Emergency Contact
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#f8f9fa] p-3 rounded border border-[#e1e8ed]">
                <div>
                  <label className="block font-semibold text-[#2c3e50] mb-1">Blood Group</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-white border border-[#e1e8ed] rounded px-2.5 py-1.5 text-[#2c3e50]"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#2c3e50] mb-1">Genotype</label>
                  <select
                    value={genotype}
                    onChange={(e) => setGenotype(e.target.value)}
                    className="w-full bg-white border border-[#e1e8ed] rounded px-2.5 py-1.5 text-[#2c3e50]"
                  >
                    <option value="AA">AA</option>
                    <option value="AS">AS</option>
                    <option value="SS">SS</option>
                    <option value="AC">AC</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#2c3e50] mb-1">Known Drug Allergies</label>
                  <input
                    type="text"
                    value={allergiesInput}
                    onChange={(e) => setAllergiesInput(e.target.value)}
                    placeholder="e.g. Penicillin, Sulfa, Dust"
                    className="w-full bg-white border border-[#e1e8ed] rounded px-2.5 py-1.5 text-[#2c3e50]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Emergency Next of Kin Name</label>
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Relative or guardian full name"
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Next of Kin Phone</label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+234 802 000 0000"
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 pt-2">
              <div className="border-b border-[#e1e8ed] pb-1">
                <span className="font-bold text-[#2c3e50] uppercase text-[11px]">
                  Clinical Department & Medical Registration
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Specialization / Clinical Focus *</label>
                  <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    required
                    placeholder="e.g. Consultant Cardiologist"
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Medical Council License Number *</label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="e.g. MD-MED-99412"
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Assigned Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  >
                    {departments.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Years in Practice</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={yearsExperience}
                    onChange={(e) => setYearsExperience(Number(e.target.value))}
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2c3e50] mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={qualificationsInput}
                    onChange={(e) => setQualificationsInput(e.target.value)}
                    placeholder="e.g. MBBS, FWACP"
                    className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Passwords */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">Account Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Min. 6 characters"
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2c3e50] mb-1">Confirm Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Re-type password"
                className="w-full bg-[#f8f9fa] border border-[#e1e8ed] rounded px-3 py-2 text-[#2c3e50] focus:bg-white focus:ring-1 focus:ring-[#3498db]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#3498db] hover:bg-[#2980b9] text-white text-xs font-bold py-3 px-4 rounded flex items-center justify-center gap-2 shadow-xs transition-colors mt-4"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete Registration & Launch Workspace</span>
          </button>
        </form>
      </div>

      {/* Footer link */}
      <p className="text-center text-xs text-[#7f8c8d]">
        Already registered in the hospital database?{' '}
        <button
          onClick={() => setActivePage('login')}
          className="text-[#3498db] font-bold hover:underline"
        >
          Sign In Here
        </button>
      </p>
    </div>
  );
};
