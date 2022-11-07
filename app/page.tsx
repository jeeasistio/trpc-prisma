'use client'

import { countries } from '@prisma/client'
import Link from 'next/link'
import { useState, ChangeEventHandler } from 'react'
import { trpc } from '../helpers/trpc'
import styles from '../styles/Home.module.css'

// import styles from '../styles/Home.module.css'

export default function Home() {
    const [text, setText] = useState('')
    // const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = trpc.getAllCountries.useInfiniteQuery(
    //     { name: text },
    //     { getNextPageParam: (lastCursor) => lastCursor.nextCursor }
    // )

    // const handleLoadMore = async () => {
    //     await fetchNextPage()
    // }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setText(e.target.value)
    }

    return (
        <div className={styles.container}>
            {/* {data?.pages
                .reduce((acc, page) => {
                    page.countries.forEach((country) => {
                        acc.push(country)
                    })

                    return acc
                }, [] as countries[])
                .map((country) => (
                    <div key={country.name}>
                        <Link href={`/${country.name}`}>
                            <p>{country.name}</p>
                        </Link>
                    </div>
                ))}

            <div>
                <button disabled={!hasNextPage || isFetchingNextPage} onClick={handleLoadMore}>
                    Load more
                </button>
            </div> */}
        </div>
    )
}
