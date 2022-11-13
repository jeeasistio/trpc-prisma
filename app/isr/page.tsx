import Link from 'next/link'
import { getAllCountries } from '../../helpers/queries'
import { LoadMore } from '../../ui/LoadMore'

export const revalidate = 10

export default async function Home({ searchParams }: { searchParams?: { page?: string } }) {
    const countries = await getAllCountries({ take: Number(searchParams?.page ?? 1) * 10 })
    const newPage = Number(searchParams?.page ?? 1) + 1

    return (
        <div>
            {countries.map((country) => (
                <Link key={country.name} href={`/isr/${country.name}`}>
                    <p>{country.name}</p>
                </Link>
            ))}
            <LoadMore path="isr" newPage={newPage} />
        </div>
    )
}
