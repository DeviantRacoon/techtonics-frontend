import type { NextApiRequest, NextApiResponse } from 'next'

const roles = [
  {
    roleId: 1,
    roleName: 'Administrador',
    status: 'ACTIVO',
    permissions: [
      { permissionId: 1, permissionName: 'user_create' },
      { permissionId: 2, permissionName: 'user_edit' },
      { permissionId: 3, permissionName: 'session_view' },
    ],
    createdAt: new Date().toISOString(),
  },
  {
    roleId: 2,
    roleName: 'Invitado',
    status: 'ACTIVO',
    permissions: [],
    createdAt: new Date().toISOString(),
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ data: roles })
  }

  return res.status(200).json({ data: {} })
}
