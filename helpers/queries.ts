import prisma from './prisma'

export const getAllCountries = async ({
    take = 10,
    cursor,
    skip,
    name,
}: {
    take?: number
    cursor?: number
    skip?: number
    name?: string
}) => {
    return await prisma.countries.findMany({
        where: { name: { contains: name } },
        orderBy: { id: 'asc' },
        take,
        cursor: cursor ? { id: cursor } : undefined,
        skip,
    })
}

export const getCountry = async (name: string) => await prisma.countries.findFirst({ where: { name } })
