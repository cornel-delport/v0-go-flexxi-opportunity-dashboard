import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../lib/middleware/auth.middleware';

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: 'This is a protected route' });
}

export default withAuth(handler);
