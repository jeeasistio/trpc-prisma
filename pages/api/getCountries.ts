import { NextApiRequest, NextApiResponse } from 'next'
import { getAllCountries } from '../../helpers/queries'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const countries = await getAllCountries({ take: Number(req.query.page) * 10 })
    res.revalidate(`/isr?page=${Number(req.query.page)}`)
    return res.json({ countries })
}
