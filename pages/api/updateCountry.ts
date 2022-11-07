import { NextApiRequest, NextApiResponse } from 'next'
import { updateCountry } from '../../helpers/mutations'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, ...data } = JSON.parse(req.body)
    const updatedCountry = await updateCountry(id, data)
    res.revalidate(`/isr/${updatedCountry.name}`)
    return res.json({ updatedCountry })
}
