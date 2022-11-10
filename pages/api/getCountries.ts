import { NextApiRequest, NextApiResponse } from 'next'
import { getAllCountries } from '../../helpers/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    return res.json(await getAllCountries({ take: Number(req.query.page) * 10 }))
}
