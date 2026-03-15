
import { firestore } from './firebase-admin';
import { AuditLog } from './firestore-data-model';
import { Timestamp as FirestoreTimestamp } from 'firebase-admin/firestore';
import { Timestamp } from 'firebase/firestore';

const AUDIT_LOG_COLLECTION = 'audit_logs';

export type AuditAction = 
  | 'user.login' 
  | 'user.logout' 
  | 'user.status_change'
  | 'role.assignment' 
  | 'review.approval' 
  | 'review.rejection'
  | 'settings.update'
  | 'integration.update'
  | 'source.config_change'
  | 'opportunity.manual_creation'
  | 'opportunity.status_change';

export interface AuditLogEntry {
  actorUserId: string;
  actorEmail: string;
  actionType: AuditAction;
  entityType: string;
  entityId: string;
  oldValueSummary?: string;
  newValueSummary?: string;
  source: string;
  ipPlaceholder?: string;
}

export async function logAuditEvent(entry: AuditLogEntry): Promise<void> {
  try {
    const auditLog: Omit<AuditLog, 'id'> = {
      ...entry,
      createdAt: FirestoreTimestamp.now() as unknown as Timestamp,
    };
    await firestore.collection(AUDIT_LOG_COLLECTION).add(auditLog);
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Optional: Add more robust error handling, like sending to a monitoring service
  }
}
