import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const res = await axios.get('https://restcountries.com/v3.1/all')
    await prisma.countries.deleteMany({})
    res.data.map(async (country: any) => {
        await prisma.countries.create({
            data: {
                name: country.name.common,
                continent: country?.continents[0],
                capital: country.capital?.[0] ?? 'Unknown',
                region: country.region,
                population: country.population,
            },
        })
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
