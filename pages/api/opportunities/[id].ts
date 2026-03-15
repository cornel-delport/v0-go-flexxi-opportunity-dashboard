import { NextApiRequest, NextApiResponse } from 'next';
import { opportunityService } from '../../../lib/services/opportunity.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const opportunity = await opportunityService.getOpportunityById(id as string);
    if (opportunity) {
      res.status(200).json(opportunity);
    } else {
      res.status(404).json({ message: 'Opportunity not found' });
    }
  } else if (req.method === 'PUT') {
    const opportunity = await opportunityService.updateOpportunity(id as string, req.body);
    if (opportunity) {
      res.status(200).json(opportunity);
    } else {
      res.status(404).json({ message: 'Opportunity not found' });
    }
  } else if (req.method === 'DELETE') {
    await opportunityService.deleteOpportunity(id as string);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
