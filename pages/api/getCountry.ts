import { NextApiRequest, NextApiResponse } from 'next'
import { getCountry } from '../../helpers/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.json({ country: await getCountry(req.query.name as string) })
}
