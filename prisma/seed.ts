import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface CountriesRes {
    name: {
        common: string
    }
    continents: string[]
    capital?: string[]
    region: string
    population: number
}

async function main() {
    const res = await axios.get<CountriesRes[]>('https://restcountries.com/v3.1/all')

    const countries = res.data.map((country) => ({
        name: country.name.common,
        continent: country?.continents[0],
        capital: country.capital?.[0] ?? 'Unknown',
        region: country.region,
        population: country.population
    }))

    await prisma.countries.createMany({ data: countries })
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(() => {
        prisma.$disconnect()
    })
