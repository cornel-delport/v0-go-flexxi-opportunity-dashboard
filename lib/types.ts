import { User as FirebaseUser } from 'firebase/auth';
import { FirestoreData } from './firestore-data-model';

export type User = FirebaseUser & {
  role: string;
};

export enum OpportunityStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    ARCHIVED = 'archived',
}

export enum SourceType {
    EMAIL = 'email',
    WEBSITE = 'website',
    MANUAL = 'manual',
}

export enum ComplianceStatus {
    COMPLIANT = 'compliant',
    NON_COMPLIANT = 'non-compliant',
    PENDING = 'pending',
}

export type Opportunity = string;

export type OpportunityType = FirestoreData.Opportunity;
export type Review = FirestoreData.Review;
export type Source = FirestoreData.SourceConfig;
