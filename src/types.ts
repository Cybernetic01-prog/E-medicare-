export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  genotype?: string;
  allergies?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  address?: string;
  // Doctor specific
  specialization?: string;
  licenseNumber?: string;
  department?: string;
  yearsOfExperience?: number;
  consultationFee?: number;
  availability?: string;
  bio?: string;
  qualifications?: string[];
  // Patient specific
  patientId?: string;
  registeredDate?: string;
}

export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Cancelled' | 'Rescheduled' | 'Pending';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone?: string;
  doctorId: string;
  doctorName: string;
  department: string;
  specialization: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  reason: string;
  symptoms?: string;
  status: AppointmentStatus;
  notes?: string;
  roomNumber?: string;
  createdAt: string;
}

export interface MedicalRecord {
  id: string;
  recordNumber: string; // e.g. EMR-2024-001
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  visitDate: string;
  department: string;
  chiefComplaint: string;
  symptoms: string[];
  diagnosis: string;
  icdCode?: string;
  treatmentPlan: string;
  clinicalNotes: string;
  vitals: {
    bloodPressure: string; // e.g. 120/80 mmHg
    heartRate: string; // e.g. 74 bpm
    temperature: string; // e.g. 36.8 °C
    respiratoryRate?: string; // e.g. 16 bpm
    spO2?: string; // e.g. 98%
    weight: string; // e.g. 70 kg
    height?: string; // e.g. 175 cm
  };
  followUpDate?: string;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string; // e.g. RX-2024-884
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  dateIssued: string;
  medication: string;
  genericName?: string;
  dosage: string; // e.g. 500mg
  frequency: string; // e.g. Twice daily after meals (BD)
  duration: string; // e.g. 7 days
  route: string; // Oral, Topical, IV, etc.
  instructions: string;
  status: 'Active' | 'Completed' | 'Dispensed' | 'Cancelled';
  refillsRemaining: number;
  diagnosisReference?: string;
}

export type LabStatus = 'Completed' | 'Pending' | 'In Progress' | 'Verified';
export type LabResultFlag = 'Normal' | 'Elevated' | 'Low' | 'Abnormal';

export interface LabParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  flag: LabResultFlag;
}

export interface LabResult {
  id: string;
  labNumber: string; // e.g. LAB-2024-419
  patientId: string;
  patientName: string;
  requestedByDoctor: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Microbiology' | 'Radiology' | 'Urinalysis' | 'Immunology';
  sampleDate: string;
  completionDate?: string;
  status: LabStatus;
  overallSummary: string;
  parameters: LabParameter[];
  pathologistNotes: string;
  doctorComments?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  category: 'Appointment' | 'MedicalRecord' | 'Prescription' | 'Laboratory' | 'System';
  actionLink?: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  ipAddress?: string;
}

export interface Department {
  id: string;
  name: string;
  headOfDepartment: string;
  description: string;
  doctorCount: number;
  contactExtension: string;
}

export interface SystemStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  pendingAppointments: number;
  activePrescriptions: number;
  completedLabTests: number;
}
