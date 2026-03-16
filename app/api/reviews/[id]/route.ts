
import { NextResponse, NextRequest } from 'next/server';
import { authorize } from '@/lib/roles/utils';
import { RESOURCES, ACTIONS, ROLES } from '@/lib/roles/constants';
import { dbAdmin as db } from '@/lib/firebase/admin';
import { logAuditEvent } from '@/lib/audit';

// Create a new review
export async function POST(request: NextRequest, context: { params: { id: string } }) {
    const { id: opportunityId } = context.params;
    const { notes } = await request.json();

    try {
        const actor = await authorize(request, RESOURCES.REVIEWS, ACTIONS.CREATE);

        const reviewRef = db.collection('reviews').doc();
        const review = {
            id: reviewRef.id,
            opportunityId,
            reviewerId: actor.id,
            reviewerEmail: actor.email,
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
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
    const { status } = (await request.json()) as { status: 'approved' | 'rejected' };

    if (!['approved', 'rejected'].includes(status)) {
        return new NextResponse('Invalid status provided', { status: 400 });
    }

    try {
        const actor = await authorize(request, RESOURCES.REVIEWS, ACTIONS.UPDATE);

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
            actorUserId: actor.id,
            actorEmail: actor.email || '',
            actionType: status === 'approved' ? 'review.approval' : 'review.rejection',
            entityType: 'review',
            entityId: id,
            oldValueSummary: `Status: ${oldStatus}`,
            newValueSummary: `Status: ${status}`,
            source: 'web-app',
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
