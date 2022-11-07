import Link from 'next/link'
import { getAllCountries } from '../helpers/queries'

export default async function Home() {
    const countries = await getAllCountries({ take: 100 })

    return (
        <div>
            <div>
                {countries.map((country) => (
                    <div key={country.name}>
                        <Link href={`/${country.name}`}>
                            <p>{country.name}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
