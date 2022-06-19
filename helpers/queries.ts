import prismaClient from "./prisma"

export const getAllCountries = async () => await prismaClient.countries.findMany()
export const getCountry = async (name: string) => await prismaClient.countries.findFirst({ where: { name } })