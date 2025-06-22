import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return res.status(200).json({ data: {} })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
