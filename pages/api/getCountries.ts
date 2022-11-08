import { NextApiRequest, NextApiResponse } from 'next'
import { getAllCountries } from '../../helpers/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.json({ countries: await getAllCountries({ take: 10, cursor: Number(req.query.cursor ?? 0) }) })
}
