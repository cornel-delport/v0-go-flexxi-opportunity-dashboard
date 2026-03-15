import { NextApiRequest, NextApiResponse } from 'next';
import { reviewService } from '../../../lib/services/review.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const review = await reviewService.createReview(req.body);
    res.status(201).json(review);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
