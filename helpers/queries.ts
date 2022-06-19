import prismaClient from './prisma';

export const getAllCountries = async (name: string, take: number, cursor: { id: number }, skip: number) =>
	await prismaClient.countries.findMany({
		where: { name: { contains: name } },
		take,
		cursor,
		skip,
	});

export const getCountry = async (name: string) => await prismaClient.countries.findFirst({ where: { name } });
