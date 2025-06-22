import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const user = {
    userId: 1,
    email: 'demo@example.com',
    code: 'USER001',
    username: 'Demo User',
    status: 'ACTIVO',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    token: 'mock-token',
    role: {
      roleId: 1,
      roleName: 'Administrador',
      status: 'ACTIVO',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: [
        { permissionId: 1, permissionName: 'user_create' },
        { permissionId: 2, permissionName: 'user_edit' },
        { permissionId: 3, permissionName: 'session_view' }
      ]
    }
  }

  return res.status(200).json({ data: user })
}
