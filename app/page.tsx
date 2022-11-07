import { countries } from '@prisma/client';
import Link from 'next/link';
import { useState, ChangeEventHandler } from 'react';
import prismaClient from '../helpers/prisma';
import { trpc } from '../helpers/trpc';
import styles from '../styles/Home.module.css';

// import styles from '../styles/Home.module.css'

export default async function Home() {
	const countries = await prismaClient.countries.findMany({ take: 100 });
	return (
		<div className={styles.container}>
			{countries.map((country) => (
				<div key={country.name}>
					<Link href={`/${country.name}`}>
						<p>{country.name}</p>
					</Link>
				</div>
			))}

			<div>
				<button disabled={undefined} onClick={undefined}>
					Load more
				</button>
			</div>
		</div>
	);
}
