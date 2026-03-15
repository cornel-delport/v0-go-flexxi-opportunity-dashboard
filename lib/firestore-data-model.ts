export namespace FirestoreData {
    export interface User {
        id: string;
        displayName: string | null;
        email: string | null;
        photoURL: string | null;
        role: string;
        organizationId: string | null;
        teamId: string | null;
        createdAt: any;
        updatedAt: any;
        lastLoginAt: any;
        disabled?: boolean;
        password?: string;
    }

    export interface UserProfile extends User {
        // Keeping it compatible with User for now
    }

    export interface Opportunity {
        id: string;
        title: string;
        description: string;
        status: string;
        source: string;
        type: string;
        createdAt: any;
        updatedAt: any;
        complianceStatus: string;
        sourceUrl: string;
        eventDate: string;
        location: string;
        groupSize: number;
        estimatedRevenue: number;
        confidence: number;
        assignedTo: string;
        tags: string[];
    }

    export interface Review {
        id: string;
        opportunityId: string;
        userId: string;
        rating: number;
        comment: string;
        createdAt: any;
        status: string;
        reviewer: string;
        opportunityTitle: string;
        notes: string;
    }

    export interface SourceConfig {
        id: string;
        name: string;
        type: string;
        config: any;
        createdAt: any;
        status: string;
        opportunitiesFound: number;
        lastSync: string;
        url: string;
    }

    export interface Audit {
        id: string;
        actorUserId: string;
        actorEmail: string;
        actionType: string;
        entityType: string;
        entityId: string;
        oldValueSummary?: string;
        newValueSummary?: string;
        timestamp: any;
        source: string;
        ipAddress: string;
    }

    export interface AuditLog extends Audit {
        // Inherits from Audit
    }

    export interface Session {
        id: string;
        userId: string;
        expiresAt: any;
        sessionToken: string;
    }

    export interface Integration {
        id: string;
        name: string;
        type: string;
        config: any;
        createdAt: any;
    }

    export interface Webhook {
        id: string;
        url: string;
        event: string;
        createdAt: any;
    }

    export interface WorkerJob {
        id: string;
        name: string;
        payload: any;
        status: string;
        createdAt: any;
        updatedAt: any;
    }

    export interface Role {
        id: string;
        name: string;
        permissions: string[];
        createdAt: any;
    }
}
