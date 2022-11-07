import { countries } from '@prisma/client'
import Link from 'next/link'

export const CountryList = ({
    page,
    countries,
}: {
    page: 'country' | 'ssr' | 'isr' | 'csr'
    countries: countries[]
}) => {
    return (
        <div>
            {countries.map((country) => (
                <Link key={country.name} href={`/${page}/${country.name}`}>
                    <p>{country.name}</p>
                </Link>
            ))}
        </div>
    )
}
