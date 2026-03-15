import { NextApiRequest, NextApiResponse } from 'next';
import { opportunityService } from '../../../lib/services/opportunity.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const opportunity = await opportunityService.createOpportunity(req.body);
    res.status(201).json(opportunity);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
