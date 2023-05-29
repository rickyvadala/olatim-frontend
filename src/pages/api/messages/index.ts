import db from '../../../utils/db';
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = String(req.query['uid']);
  const ADMINS_UID: Array<string> = [
    process.env.FIREBASE_ADMIN_RICK_UID!,
    process.env.FIREBASE_ADMIN_MARITO_UID!,
    process.env.FIREBASE_ADMIN_TUTE_UID!
  ]

  if (req.method === 'GET') {
    if (ADMINS_UID.includes(uid)) {
      const response = await db.collection('messages').get()
      const data = response.docs.map(entry => entry.data());
      res.status(200).json(data)
    }
  }

  if (req.method === 'POST') {
    const {id} = await db.collection('messages').add({
      ...req.body,
      created: new Date().toISOString(),
    });
    res.status(200).json({id});
  }

  res.status(404).end()
}