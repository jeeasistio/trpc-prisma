import Link from 'next/link'
import { getAllCountries } from '../../helpers/queries'
import { LoadMore } from '../../ui/LoadMore'

export const dynamic = 'force-dynamic'

export default async function SSR({ searchParams }: { searchParams?: { page?: string } }) {
    const countries = await getAllCountries({ take: Number(searchParams?.page ?? 1) * 10 })
    const newPage = Number(searchParams?.page ?? 1) + 1

    return (
        <div>
            {countries.map((country) => (
                <Link key={country.name} href={`/ssr/${country.name}`}>
                    <p>{country.name}</p>
                </Link>
            ))}
            <LoadMore path="ssr" newPage={newPage} />
        </div>
    )
}
