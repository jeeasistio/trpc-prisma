import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../helpers/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, ...data } = JSON.parse(req.body)
    const updatedCountry = await prisma.countries.update({ where: { id }, data })
    return res.json({ updatedCountry })
}
