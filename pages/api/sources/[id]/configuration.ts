import { NextApiRequest, NextApiResponse } from 'next';
import { sourceService } from '../../../../lib/services/source.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const newConfiguration = req.body;
    const actor = {
      id: 'mock-user-id',
      email: 'mock-user@example.com',
      ip: req.socket.remoteAddress || 'unknown',
    };

    const updatedSource = await sourceService.updateSourceConfiguration(id as string, newConfiguration, actor);
    return res.status(200).json(updatedSource);
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
