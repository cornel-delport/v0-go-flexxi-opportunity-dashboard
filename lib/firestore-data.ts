export interface FirestoreData {
  UserProfile: UserProfile;
  AuditLog: AuditLog;
  User: User;
}

export interface UserProfile {}
export interface AuditLog {}

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: string;
  organizationId: null;
  teamId: null;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}
