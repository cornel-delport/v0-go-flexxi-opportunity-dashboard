import { NextApiRequest, NextApiResponse } from 'next';
import { roleService } from '../../../lib/services/role.service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const role = await roleService.getRoleById(id as string);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } else if (req.method === 'PUT') {
    const role = await roleService.updateRole(id as string, req.body);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
