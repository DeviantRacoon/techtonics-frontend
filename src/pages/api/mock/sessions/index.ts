import type { NextApiRequest, NextApiResponse } from 'next'

const sessions = [
  {
    sessionId: 1,
    userId: 1,
    device: 'Chrome',
    ip: '127.0.0.1',
    status: 'ACTIVO',
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
    user: {
      username: 'Demo User',
    },
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ data: sessions })
  }

  return res.status(200).json({ data: {} })
}
