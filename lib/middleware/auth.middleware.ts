import { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '../services/auth.service';

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => void) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { sessionToken } = req.cookies;

    if (sessionToken) {
      const session = await authService.getUserSession({ headers: { authorization: `Bearer ${sessionToken}` } });

      if (session) {
        return handler(req, res);
      }
    }

    res.status(401).json({ message: 'Unauthorized' });
  };
}
