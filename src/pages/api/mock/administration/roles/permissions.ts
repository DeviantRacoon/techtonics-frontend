import type { NextApiRequest, NextApiResponse } from 'next'

const permissions = [
  { permissionId: 1, permissionName: 'user_create' },
  { permissionId: 2, permissionName: 'user_edit' },
  { permissionId: 3, permissionName: 'session_view' },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ data: permissions })
  }

  return res.status(200).json({ data: {} })
}
