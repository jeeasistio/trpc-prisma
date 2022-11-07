import { getAllCountries } from '../helpers/queries'
import { CountryList } from '../ui/CountryList'

export default async function Home() {
    const countries = await getAllCountries({ take: 100 })

    return (
        <div>
            <CountryList page="country" countries={countries} />
        </div>
    )
}
