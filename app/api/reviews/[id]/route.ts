
import { NextResponse, NextRequest } from 'next/server';
import { authorize } from '@/lib/roles/utils';
import { RESOURCES, ACTIONS, ROLES } from '@/lib/roles';
import { dbAdmin as db } from '@/lib/firebase/admin';
import { logAuditEvent } from '@/lib/audit';
import { auth } from '@/lib/firebase-admin';

// Create a new review
export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id: opportunityId } = await context.params;
    const { notes } = await request.json();

    try {
        const { uid: userId, email: userEmail } = await authorize(RESOURCES.REVIEWS, ACTIONS.CREATE);

        const reviewRef = db.collection('reviews').doc();
        const review = {
            id: reviewRef.id,
            opportunityId,
            reviewerId: userId,
            reviewerEmail: userEmail,
            status: 'pending',
            notes,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await reviewRef.set(review);

        return NextResponse.json(review, { status: 201 });
    } catch (error) {
        console.error(`Failed to create review:`, (error as Error).message);
        if ((error as Error).message.includes('Unauthorized') || (error as Error).message.includes('Forbidden')) {
            return new NextResponse((error as Error).message, { status: 403 });
        }
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

// Approve or reject a review
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const { status } = (await request.json()) as { status: 'approved' | 'rejected' };

    if (!['approved', 'rejected'].includes(status)) {
        return new NextResponse('Invalid status provided', { status: 400 });
    }

    try {
        const { uid: userId, email: userEmail } = await authorize(RESOURCES.REVIEWS, ACTIONS.UPDATE);

        const reviewRef = db.collection('reviews').doc(id);
        const reviewDoc = await reviewRef.get();
        const review = reviewDoc.data();

        if (!review) {
            return new NextResponse('Review not found', { status: 404 });
        }

        const oldStatus = review.status;

        await reviewRef.update({
            status,
            updatedAt: new Date().toISOString(),
        });

        await logAuditEvent({
            actorUserId: userId,
            actorEmail: userEmail,
            actionType: status === 'approved' ? 'review.approval' : 'review.rejection',
            entityType: 'review',
            entityId: id,
            oldValueSummary: `Status: ${oldStatus}`,
            newValueSummary: `Status: ${status}`,
            source: 'web-app',
            ipPlaceholder: '127.0.0.1',
        });

        return NextResponse.json({ message: `Review ${status} successfully.` });
    } catch (error) {
        console.error(`Failed to update review ${id}:`, (error as Error).message);
        if ((error as Error).message.includes('Unauthorized') || (error as Error).message.includes('Forbidden')) {
            return new NextResponse((error as Error).message, { status: 403 });
        }
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
