import type { NextApiRequest, NextApiResponse } from 'next'

const users = [
  {
    userId: 1,
    email: 'demo@example.com',
    username: 'Demo User',
    roleId: 1,
    roleName: 'Administrador',
    status: 'ACTIVO',
    createdAt: new Date().toISOString(),
  },
  {
    userId: 2,
    email: 'test@example.com',
    username: 'Test User',
    roleId: 2,
    roleName: 'Invitado',
    status: 'INACTIVO',
    createdAt: new Date().toISOString(),
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ data: users })
  }

  return res.status(200).json({ data: {} })
}
