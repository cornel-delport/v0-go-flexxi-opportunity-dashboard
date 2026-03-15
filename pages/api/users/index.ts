import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../../../lib/services/user.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
