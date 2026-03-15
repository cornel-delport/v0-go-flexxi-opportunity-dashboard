import { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '../../../lib/services/auth.service';
import { serialize } from 'cookie';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const result = await authService.signIn(req.body);

    if (result) {
      const { user, session } = result;
      const cookie = serialize('sessionToken', session.sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      res.setHeader('Set-Cookie', cookie);
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
