import { useRouter } from 'next/router';
import prismaClient from '../../helpers/prisma';
import styles from '../../styles/Home.module.css';

interface Props {
	params: { name: string };
}
export default async function Country({ params }: Props) {
	const country = await prismaClient.countries.findFirst({ where: params });
	return (
		<div className={styles.container}>
			<h1>params</h1>
			<pre>{JSON.stringify(params, null, '\t')}</pre>
			<h1>country</h1>
			<pre>{JSON.stringify(country, null, '\t')}</pre>
			{/* {country && (
                <div>
                    <h1>{country.name}</h1>
                    <p>Capital: {country.capital}</p>
                    <p>Continent: {country.continent}</p>
                    <p>Region: {country.region}</p>
                    <p>Population: {country.population}</p>
                </div>
            )} */}
		</div>
	);
}
