import db from '../../../utils/db';
import type {NextApiRequest, NextApiResponse} from 'next'

const RESUMES_PATH = 'resumes'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ADMINS_UID: Array<string> = [
    process.env.FIREBASE_ADMIN_RICK_UID!,
    process.env.FIREBASE_ADMIN_MARITO_UID!,
    process.env.FIREBASE_ADMIN_TUTE_UID!
  ]
  const uid = String(req.headers['ola-uid'] || '')

  if (req.method === 'GET') {
    if (uid) {
      if (ADMINS_UID.includes(uid)) {
        const response = await db.collection(RESUMES_PATH).get()
        const data = response.docs.map(entry => ({
          uid: entry.id,
          ...entry.data()
        }));
        res.status(200).json(data)
      }
    }
  }


  if (req.method === 'POST') {
    const data = {
      ...req.body,
      created: new Date().toISOString(),
    }
    if (uid) {
      await db.collection(RESUMES_PATH).doc(uid).set(data);
      res.status(200).json({uid})
    } else {
      const {id} = await db.collection(RESUMES_PATH).add(data);
      res.status(200).json({uid: id})
    }
  }

  res.status(404).end()
}