import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  Stethoscope,
  Heart,
  Droplet,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Save,
  CheckCircle2,
  Lock,
  Plus,
  X,
  AlertTriangle
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateUserProfile, addToast, departments } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [gender, setGender] = useState(currentUser?.gender || 'Male');
  const [dob, setDob] = useState(currentUser?.dateOfBirth || '1995-01-01');

  // Patient Fields
  const [bloodGroup, setBloodGroup] = useState(currentUser?.bloodGroup || 'O+');
  const [genotype, setGenotype] = useState(currentUser?.genotype || 'AA');
  const [allergies, setAllergies] = useState<string[]>(currentUser?.allergies || ['Penicillin']);
  const [newAllergyInput, setNewAllergyInput] = useState('');
  const [emergencyName, setEmergencyName] = useState(currentUser?.emergencyContact?.name || '');
  const [emergencyPhone, setEmergencyPhone] = useState(currentUser?.emergencyContact?.phone || '');
  const [emergencyRel, setEmergencyRel] = useState(currentUser?.emergencyContact?.relationship || 'Spouse');

  // Doctor Fields
  const [specialization, setSpecialization] = useState(currentUser?.specialization || '');
  const [licenseNumber, setLicenseNumber] = useState(currentUser?.licenseNumber || '');
  const [department, setDepartment] = useState(currentUser?.department || '');
  const [availability, setAvailability] = useState(currentUser?.availability || '');

  // Password test
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
      setGender(currentUser.gender || 'Male');
      setDob(currentUser.dateOfBirth || '1995-01-01');
      if (currentUser.bloodGroup) setBloodGroup(currentUser.bloodGroup);
      if (currentUser.genotype) setGenotype(currentUser.genotype);
      if (currentUser.allergies) setAllergies(currentUser.allergies);
      if (currentUser.emergencyContact) {
        setEmergencyName(currentUser.emergencyContact.name);
        setEmergencyPhone(currentUser.emergencyContact.phone);
        setEmergencyRel(currentUser.emergencyContact.relationship);
      }
      if (currentUser.specialization) setSpecialization(currentUser.specialization);
      if (currentUser.licenseNumber) setLicenseNumber(currentUser.licenseNumber);
      if (currentUser.department) setDepartment(currentUser.department);
      if (currentUser.availability) setAvailability(currentUser.availability);
    }
  }, [currentUser]);

  const handleAddAllergy = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAllergyInput.trim() && !allergies.includes(newAllergyInput.trim())) {
      setAllergies([...allergies, newAllergyInput.trim()]);
      setNewAllergyInput('');
    }
  };

  const handleRemoveAllergy = (allergyToRemove: string) => {
    setAllergies(allergies.filter((a) => a !== allergyToRemove));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      phone,
      address,
      gender,
      dateOfBirth: dob,
      bloodGroup: currentUser?.role === 'patient' ? bloodGroup : undefined,
      genotype: currentUser?.role === 'patient' ? genotype : undefined,
      allergies: currentUser?.role === 'patient' ? allergies : undefined,
      emergencyContact:
        currentUser?.role === 'patient'
          ? { name: emergencyName, phone: emergencyPhone, relationship: emergencyRel }
          : undefined,
      specialization: currentUser?.role === 'doctor' ? specialization : undefined,
      licenseNumber: currentUser?.role === 'doctor' ? licenseNumber : undefined,
      department: currentUser?.role === 'doctor' ? department : undefined,
      availability: currentUser?.role === 'doctor' ? availability : undefined,
    });
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      addToast('Password Mismatch', 'New password and confirmation do not match.', 'warning');
      return;
    }
    addToast('Security Updated', 'Your portal security password has been changed.', 'success');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  if (!currentUser) {
    return (
      <div className="p-12 text-center text-slate-500 text-xs">
        Please sign in to view and edit your profile.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <User className="w-7 h-7 text-sky-700" />
            User Account & Clinical Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal contact information, medical emergency history, and security credentials.
          </p>
        </div>

        <span className="font-mono text-xs font-bold uppercase px-3 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
          Role: {currentUser.role}
        </span>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* 1. Basic Personal Information */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-sky-700" />
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              1. Basic Personal Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>
        </div>

        {/* 2. Patient Specific: Medical Profile */}
        {currentUser.role === 'patient' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Heart className="w-4 h-4 text-rose-600" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                2. Medical Triage & Emergency Info
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Genotype</label>
                <select
                  value={genotype}
                  onChange={(e) => setGenotype(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                >
                  <option value="AA">AA (Normal Hemoglobin)</option>
                  <option value="AS">AS (Carrier)</option>
                  <option value="SS">SS (Sickle Cell)</option>
                  <option value="AC">AC</option>
                </select>
              </div>
            </div>

            {/* Allergies tag manager */}
            <div className="space-y-2">
              <label className="block font-semibold text-slate-700">Documented Drug / Food Allergies</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {allergies.map((allergy, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 text-rose-800 px-2.5 py-1 rounded-md text-xs font-medium"
                  >
                    <span>{allergy}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAllergy(allergy)}
                      className="text-rose-500 hover:text-rose-800"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                {allergies.length === 0 && (
                  <span className="text-slate-400 italic text-[11px]">No allergies declared.</span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAllergyInput}
                  onChange={(e) => setNewAllergyInput(e.target.value)}
                  placeholder="Add another allergy (e.g. Sulfa, Peanuts)"
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddAllergy}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold"
                >
                  Add Allergy
                </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-2">Next of Kin / Emergency Contact:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={emergencyName}
                    onChange={(e) => setEmergencyName(e.target.value)}
                    placeholder="Blessing Kalu"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Relationship</label>
                  <input
                    type="text"
                    value={emergencyRel}
                    onChange={(e) => setEmergencyRel(e.target.value)}
                    placeholder="Spouse / Parent / Sibling"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    placeholder="+234 802 000 0000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Doctor Specific: Clinical Credentials */}
        {currentUser.role === 'doctor' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Stethoscope className="w-4 h-4 text-teal-700" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                2. Medical Council Credentials & Department
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specialization</label>
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medical License Number</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinic Availability Days & Hours</label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  placeholder="Mon - Fri (08:00 AM - 02:00 PM)"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>

      {/* Security: Password Change Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Lock className="w-4 h-4 text-slate-700" />
          <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
            Portal Password & Terminal Authentication
          </h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-3 max-w-md">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors"
          >
            Update Security Password
          </button>
        </form>
      </div>
    </div>
  );
};
