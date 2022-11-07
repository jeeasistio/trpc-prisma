import { countries } from '@prisma/client'
import prismaClient from './prisma'

export const updateCountry = async (countryId: countries['id'], data: Partial<Omit<countries, 'id'>>) => {
    const updatedCountry = await prismaClient.countries.update({
        where: { id: countryId },
        data,
    })

    return updatedCountry
}
