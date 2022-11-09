import { countries } from '@prisma/client'
import Link from 'next/link'

export const CountryList = ({ path, countries }: { path: '/' | 'ssr' | 'isr' | 'csr'; countries: countries[] }) => {
    return (
        <div>
            {countries.map((country) => (
                <Link key={country.name} href={`/${path === '/' ? 'country' : path}/${country.name}`}>
                    <p>{country.name}</p>
                </Link>
            ))}
        </div>
    )
}
