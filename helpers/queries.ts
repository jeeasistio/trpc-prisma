import prismaClient from './prisma'

export const getAllCountries = async (name: string, take: number, cursor: { id: string }, skip: number) =>
    await prismaClient.countries.findMany({
        where: { name: { contains: name, mode: 'insensitive' } },
        take,
        cursor,
        skip
    })

export const getCountry = async (name: string) => await prismaClient.countries.findFirst({ where: { name } })
