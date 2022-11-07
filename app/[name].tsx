import { useRouter } from 'next/router'
import { trpc } from '../helpers/trpc'
import styles from '../styles/Home.module.css'

export default function Country() {
    const router = useRouter()
    const { data: country } = trpc.getCountry.useQuery({ name: router.query.name as string })

    return (
        <div className={styles.container}>
            {country && (
                <div>
                    <h1>{country.name}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Continent: {country.continent}</p>
                    <p>Region: {country.region}</p>
                    <p>Population: {country.population}</p>
                </div>
            )}
        </div>
    )
}
