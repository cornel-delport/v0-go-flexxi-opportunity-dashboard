import { db } from '@/lib/firebase';
import { Review, ReviewStatus } from '@/lib/types';

class ReviewService {
  async getReviewsByOpportunityId(opportunityId: string): Promise<Review[]> {
    const snapshot = await db.collection('reviews').where('opportunityId', '==', opportunityId).get();
    return snapshot.docs.map(doc => doc.data() as Review);
  }

  async getReviewById(id: string): Promise<Review | null> {
    const doc = await db.collection('reviews').doc(id).get();
    return doc.exists ? doc.data() as Review : null;
  }

  async createReview(opportunityId: string, userId: string, rating: number, comment: string): Promise<Review> {
    const review: Review = {
      id: db.collection('reviews').doc().id,
      opportunityId,
      userId,
      rating,
      comment,
      createdAt: new Date(),
      status: ReviewStatus.Pending,
    };
    await db.collection('reviews').doc(review.id).set(review);
    return review;
  }

  async updateReviewStatus(id: string, status: ReviewStatus): Promise<void> {
    await db.collection('reviews').doc(id).update({ status });
  }
}

export const reviewService = new ReviewService();
