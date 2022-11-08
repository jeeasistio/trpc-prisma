import { countries } from '@prisma/client'
import prisma from './prisma'

export const updateCountry = async (countryId: countries['id'], data: Partial<Omit<countries, 'id'>>) => {
    const updatedCountry = await prisma.countries.update({
        where: { id: countryId },
        data,
    })

    return updatedCountry
}
