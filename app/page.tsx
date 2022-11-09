import { getAllCountries } from '../helpers/queries'
import { CountryList } from '../ui/CountryList'
import ServerLoadMore from '../ui/ServerLoadMore'

export default async function Home({ searchParams }: { searchParams?: { page?: string } }) {
    const countries = await getAllCountries({ take: Number(searchParams?.page ?? 1) * 10 })
    const newPage = Number(searchParams?.page ?? 1) + 1

    return (
        <div>
            <CountryList path="/" countries={countries} />
            <ServerLoadMore path="/" newPage={newPage} />
        </div>
    )
}
