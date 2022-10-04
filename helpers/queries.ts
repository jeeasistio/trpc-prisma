import prismaClient from './prisma';

export const getAllCountries = async ({
    take,
    cursor,
    skip,
    name
}: {
    take?: number
    cursor?: { id: number }
    skip?: number
    name?: string
}) =>
    await prismaClient.countries.findMany({
        where: { name: { contains: name } },
        take,
        cursor,
        skip
    })

export const getCountry = async (name: string) => await prismaClient.countries.findFirst({ where: { name } });
