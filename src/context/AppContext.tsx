import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Appointment,
  AppointmentStatus,
  MedicalRecord,
  Prescription,
  LabResult,
  NotificationItem,
  SystemLog,
  Department,
  SystemStats
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_DEPARTMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_PRESCRIPTIONS,
  INITIAL_LAB_RESULTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_SYSTEM_LOGS
} from '../mockData';

export interface Toast {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentUser: User | null;
  users: User[];
  departments: Department[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  prescriptions: Prescription[];
  labResults: LabResult[];
  notifications: NotificationItem[];
  systemLogs: SystemLog[];
  stats: SystemStats;
  activePage: string;
  setActivePage: (page: string) => void;
  toasts: Toast[];
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  switchUserRole: (role: UserRole) => void;
  login: (email: string, role: UserRole) => boolean;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  // Actions
  addAppointment: (data: Partial<Appointment>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string) => void;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  addMedicalRecord: (data: Partial<MedicalRecord>) => MedicalRecord;
  addPrescription: (data: Partial<Prescription>) => Prescription;
  updatePrescriptionStatus: (id: string, status: Prescription['status']) => void;
  addDoctorCommentToLab: (labId: string, comment: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  // Modal helpers
  selectedDoctorForBooking: User | null;
  setSelectedDoctorForBooking: (doc: User | null) => void;
  isBookModalOpen: boolean;
  setIsBookModalOpen: (open: boolean) => void;
  selectedLabReport: LabResult | null;
  setSelectedLabReport: (lab: LabResult | null) => void;
  selectedDoctorProfile: User | null;
  setSelectedDoctorProfile: (doc: User | null) => void;
  selectedRecordForView: MedicalRecord | null;
  setSelectedRecordForView: (rec: MedicalRecord | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePage] = useState<string>('home');

  // Persistence helpers
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ehealth_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('ehealth_current_user');
    if (saved) return JSON.parse(saved);
    // Default to the primary patient for previewing
    return INITIAL_USERS[0];
  });

  const [departments] = useState<Department[]>(INITIAL_DEPARTMENTS);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('ehealth_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('ehealth_medical_records');
    return saved ? JSON.parse(saved) : INITIAL_MEDICAL_RECORDS;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('ehealth_prescriptions');
    return saved ? JSON.parse(saved) : INITIAL_PRESCRIPTIONS;
  });

  const [labResults, setLabResults] = useState<LabResult[]>(() => {
    const saved = localStorage.getItem('ehealth_lab_results');
    return saved ? JSON.parse(saved) : INITIAL_LAB_RESULTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ehealth_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(() => {
    const saved = localStorage.getItem('ehealth_system_logs');
    return saved ? JSON.parse(saved) : INITIAL_SYSTEM_LOGS;
  });

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modals state
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<User | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedLabReport, setSelectedLabReport] = useState<LabResult | null>(null);
  const [selectedDoctorProfile, setSelectedDoctorProfile] = useState<User | null>(null);
  const [selectedRecordForView, setSelectedRecordForView] = useState<MedicalRecord | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('ehealth_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('ehealth_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('ehealth_medical_records', JSON.stringify(medicalRecords));
  }, [medicalRecords]);

  useEffect(() => {
    localStorage.setItem('ehealth_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem('ehealth_lab_results', JSON.stringify(labResults));
  }, [labResults]);

  useEffect(() => {
    localStorage.setItem('ehealth_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ehealth_system_logs', JSON.stringify(systemLogs));
  }, [systemLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('ehealth_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('ehealth_current_user');
    }
  }, [currentUser]);

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addLog = (action: string, details: string) => {
    const newLog: SystemLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: currentUser?.name || 'System Operator',
      role: currentUser?.role ? currentUser.role.toUpperCase() : 'ANONYMOUS',
      action,
      details,
      ipAddress: '192.168.1.' + Math.floor(Math.random() * 200 + 10),
    };
    setSystemLogs((prev) => [newLog, ...prev]);
  };

  const switchUserRole = (role: UserRole) => {
    const match = users.find((u) => u.role === role);
    if (match) {
      setCurrentUser(match);
      addToast('Role Switched', `Now operating as ${match.name} (${match.role.toUpperCase()})`, 'info');
      addLog('Session Switch', `Switched active role session to ${match.name} (${match.role})`);
      if (role === 'patient') setActivePage('patient-dashboard');
      else if (role === 'doctor') setActivePage('doctor-dashboard');
      else if (role === 'admin') setActivePage('admin-dashboard');
    }
  };

  const login = (email: string, role: UserRole) => {
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
    if (match) {
      setCurrentUser(match);
      addToast('Login Successful', `Welcome back, ${match.name}`, 'success');
      addLog('User Login', `Authenticated ${match.name} via ${match.email}`);
      if (role === 'patient') setActivePage('patient-dashboard');
      else if (role === 'doctor') setActivePage('doctor-dashboard');
      else if (role === 'admin') setActivePage('admin-dashboard');
      return true;
    } else {
      // Fallback: pick any user with that role or create a session
      const anyOfRole = users.find((u) => u.role === role);
      if (anyOfRole) {
        setCurrentUser(anyOfRole);
        addToast('Login Successful', `Welcome back, ${anyOfRole.name}`, 'success');
        addLog('User Login', `Demo login for role ${role}`);
        if (role === 'patient') setActivePage('patient-dashboard');
        else if (role === 'doctor') setActivePage('doctor-dashboard');
        else if (role === 'admin') setActivePage('admin-dashboard');
        return true;
      }
      addToast('Login Failed', 'Invalid credentials or user record not found.', 'error');
      return false;
    }
  };

  const register = (userData: Partial<User>) => {
    const isDoctor = userData.role === 'doctor';
    const newId = 'user-' + (userData.role || 'pat') + '-' + Date.now();
    const newUser: User = {
      id: newId,
      name: userData.name || 'New Registered User',
      email: userData.email || 'user@ehealth.edu',
      role: userData.role || 'patient',
      phone: userData.phone || '+234 800 000 0000',
      patientId: !isDoctor ? 'PID-2024-' + Math.floor(1000 + Math.random() * 9000) : undefined,
      gender: userData.gender || 'Male',
      dateOfBirth: userData.dateOfBirth || '1995-01-01',
      bloodGroup: userData.bloodGroup || 'O+',
      genotype: userData.genotype || 'AA',
      allergies: userData.allergies || ['None declared'],
      address: userData.address || 'Academic District, Campus Gate',
      registeredDate: new Date().toISOString().substring(0, 10),
      specialization: userData.specialization,
      licenseNumber: userData.licenseNumber,
      department: userData.department,
      yearsOfExperience: userData.yearsOfExperience || 3,
      availability: isDoctor ? 'Mon - Fri (09:00 AM - 02:00 PM)' : undefined,
      bio: userData.bio || (isDoctor ? 'Clinical doctor in hospital health portal.' : 'Registered patient.'),
      avatar: userData.avatar || (isDoctor ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast('Registration Successful', `Account created for ${newUser.name}. Welcome to the portal!`, 'success');
    addLog('User Registered', `New ${newUser.role} registered: ${newUser.name} (${newUser.email})`);

    // Add welcome notification
    const welcomeNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: newUser.id,
      title: 'Welcome to Dynamic E-Health System',
      message: `Your registration as a ${newUser.role} is complete. Your reference ID is ${newUser.patientId || newUser.licenseNumber || newUser.id}.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      category: 'System',
    };
    setNotifications((prev) => [welcomeNotif, ...prev]);

    if (newUser.role === 'patient') setActivePage('patient-dashboard');
    else if (newUser.role === 'doctor') setActivePage('doctor-dashboard');
    else setActivePage('admin-dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Logged Out', 'You have been safely signed out of the system.', 'info');
    setActivePage('home');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    addToast('Profile Updated', 'Your profile details have been saved.', 'success');
    addLog('Profile Edit', `Updated profile records for ${currentUser.name}`);
  };

  const addAppointment = (data: Partial<Appointment>): Appointment => {
    const newApt: Appointment = {
      id: 'apt-' + Date.now(),
      patientId: data.patientId || currentUser?.patientId || 'PID-2024-0418',
      patientName: data.patientName || currentUser?.name || 'Emmanuel O. Kalu',
      patientPhone: data.patientPhone || currentUser?.phone || '+234 803 241 9870',
      doctorId: data.doctorId || 'user-doc-1',
      doctorName: data.doctorName || 'Dr. Sarah Mitchell',
      department: data.department || 'Internal Medicine',
      specialization: data.specialization || 'General Medicine',
      date: data.date || new Date().toISOString().substring(0, 10),
      time: data.time || '10:00',
      reason: data.reason || 'Routine consultation',
      symptoms: data.symptoms || 'General clinical review',
      status: 'Upcoming',
      roomNumber: data.roomNumber || 'Clinic Room 2',
      createdAt: new Date().toISOString().substring(0, 10),
    };

    setAppointments((prev) => [newApt, ...prev]);
    addToast('Appointment Booked', `Scheduled with ${newApt.doctorName} for ${newApt.date} at ${newApt.time}`, 'success');
    addLog('Appointment Creation', `Appointment booked for ${newApt.patientName} with ${newApt.doctorName} on ${newApt.date}`);

    // Notify patient
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: currentUser?.id || 'user-pat-1',
      title: 'Appointment Confirmation',
      message: `Your appointment with ${newApt.doctorName} (${newApt.department}) has been booked for ${newApt.date} at ${newApt.time}.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      category: 'Appointment',
      actionLink: 'appointments',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newApt;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, notes?: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status, notes: notes || apt.notes } : apt))
    );
    addToast('Status Updated', `Appointment marked as ${status}`, 'info');
    addLog('Appointment Status Update', `Updated appointment ${id} to status: ${status}`);
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, date: newDate, time: newTime, status: 'Rescheduled' } : apt
      )
    );
    addToast('Appointment Rescheduled', `Updated to ${newDate} at ${newTime}`, 'success');
    addLog('Appointment Rescheduled', `Rescheduled appointment ${id} to ${newDate} ${newTime}`);
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id ? { ...apt, status: 'Cancelled', notes: reason ? `Cancelled: ${reason}` : 'Cancelled by patient' } : apt
      )
    );
    addToast('Appointment Cancelled', 'The scheduled appointment has been cancelled.', 'warning');
    addLog('Appointment Cancelled', `Cancelled appointment ${id}. Reason: ${reason || 'Patient request'}`);
  };

  const addMedicalRecord = (data: Partial<MedicalRecord>): MedicalRecord => {
    const newRec: MedicalRecord = {
      id: 'rec-' + Date.now(),
      recordNumber: 'EMR-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      patientId: data.patientId || 'PID-2024-0418',
      patientName: data.patientName || 'Emmanuel O. Kalu',
      doctorId: currentUser?.id || data.doctorId || 'user-doc-1',
      doctorName: currentUser?.name || data.doctorName || 'Dr. Sarah Mitchell',
      visitDate: data.visitDate || new Date().toISOString().substring(0, 10),
      department: data.department || 'Internal Medicine',
      chiefComplaint: data.chiefComplaint || 'Consultation visit',
      symptoms: data.symptoms || ['General malaise'],
      diagnosis: data.diagnosis || 'Clinical evaluation',
      icdCode: data.icdCode || 'R69',
      treatmentPlan: data.treatmentPlan || 'Rest and observation',
      clinicalNotes: data.clinicalNotes || 'Patient examined in clinic.',
      vitals: data.vitals || {
        bloodPressure: '120/80 mmHg',
        heartRate: '75 bpm',
        temperature: '36.8 °C',
        weight: '70 kg',
        spO2: '98%',
      },
      followUpDate: data.followUpDate,
    };

    setMedicalRecords((prev) => [newRec, ...prev]);
    addToast('Medical Record Saved', `Record ${newRec.recordNumber} added for ${newRec.patientName}`, 'success');
    addLog('EMR Record Created', `Clinical encounter record ${newRec.recordNumber} logged by ${newRec.doctorName}`);

    // Notify patient
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: newRec.patientId,
      title: 'New Clinical Record Added',
      message: `A new clinical encounter summary (${newRec.recordNumber}) has been documented by ${newRec.doctorName}.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      category: 'MedicalRecord',
      actionLink: 'medical-records',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newRec;
  };

  const addPrescription = (data: Partial<Prescription>): Prescription => {
    const newRx: Prescription = {
      id: 'rx-' + Date.now(),
      prescriptionNumber: 'RX-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
      patientId: data.patientId || 'PID-2024-0418',
      patientName: data.patientName || 'Emmanuel O. Kalu',
      doctorId: currentUser?.id || data.doctorId || 'user-doc-1',
      doctorName: currentUser?.name || data.doctorName || 'Dr. Sarah Mitchell',
      dateIssued: new Date().toISOString().substring(0, 10),
      medication: data.medication || 'Amoxicillin-Clavulanate',
      genericName: data.genericName || 'Amoxicillin',
      dosage: data.dosage || '625 mg',
      frequency: data.frequency || 'Twice daily after meals (BD)',
      duration: data.duration || '7 days',
      route: data.route || 'Oral',
      instructions: data.instructions || 'Take with food. Complete entire course.',
      status: 'Active',
      refillsRemaining: data.refillsRemaining ?? 1,
      diagnosisReference: data.diagnosisReference || 'Bacterial infection management',
    };

    setPrescriptions((prev) => [newRx, ...prev]);
    addToast('Prescription Issued', `Prescription ${newRx.prescriptionNumber} written for ${newRx.medication}`, 'success');
    addLog('Prescription Issued', `Issued ${newRx.medication} (${newRx.dosage}) to patient ${newRx.patientName}`);

    // Notify patient
    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      userId: newRx.patientId,
      title: 'New Prescription Issued',
      message: `Dr. ${newRx.doctorName} prescribed ${newRx.medication} (${newRx.dosage}). Check pharmacy instructions.`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      read: false,
      category: 'Prescription',
      actionLink: 'prescriptions',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newRx;
  };

  const updatePrescriptionStatus = (id: string, status: Prescription['status']) => {
    setPrescriptions((prev) => prev.map((rx) => (rx.id === id ? { ...rx, status } : rx)));
    addToast('Prescription Status Updated', `Status changed to ${status}`, 'info');
  };

  const addDoctorCommentToLab = (labId: string, comment: string) => {
    setLabResults((prev) =>
      prev.map((lab) => (lab.id === labId ? { ...lab, doctorComments: comment, status: 'Verified' } : lab))
    );
    addToast('Clinical Comment Added', 'Doctor interpretation saved to laboratory result.', 'success');
    addLog('Lab Comment Added', `Doctor reviewed and commented on lab report ${labId}`);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('Notifications Marked', 'All notifications marked as read.', 'info');
  };

  const stats: SystemStats = {
    totalPatients: users.filter((u) => u.role === 'patient').length,
    totalDoctors: users.filter((u) => u.role === 'doctor').length,
    totalAppointments: appointments.length,
    pendingAppointments: appointments.filter((a) => a.status === 'Upcoming' || a.status === 'Pending').length,
    activePrescriptions: prescriptions.filter((p) => p.status === 'Active').length,
    completedLabTests: labResults.filter((l) => l.status === 'Completed' || l.status === 'Verified').length,
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        departments,
        appointments,
        medicalRecords,
        prescriptions,
        labResults,
        notifications,
        systemLogs,
        stats,
        activePage,
        setActivePage,
        toasts,
        addToast,
        removeToast,
        switchUserRole,
        login,
        register,
        logout,
        updateUserProfile,
        addAppointment,
        updateAppointmentStatus,
        rescheduleAppointment,
        cancelAppointment,
        addMedicalRecord,
        addPrescription,
        updatePrescriptionStatus,
        addDoctorCommentToLab,
        markNotificationRead,
        markAllNotificationsRead,
        selectedDoctorForBooking,
        setSelectedDoctorForBooking,
        isBookModalOpen,
        setIsBookModalOpen,
        selectedLabReport,
        setSelectedLabReport,
        selectedDoctorProfile,
        setSelectedDoctorProfile,
        selectedRecordForView,
        setSelectedRecordForView,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
