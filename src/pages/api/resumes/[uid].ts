import db from '../../../utils/db';
import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const uid = String(req.query['uid']);
    if (uid) {
      const doc = await db.collection('resumes').doc(uid).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    }
  }

  res.status(404).end()
}