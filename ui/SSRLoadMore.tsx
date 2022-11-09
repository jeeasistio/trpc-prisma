'use client'

import { useRouter } from 'next/navigation'

export default function SSRLoadMore({ newPage }: { newPage?: number }) {
    const router = useRouter()
    const handleLoadMore = () => {
        router.replace(`/ssr?page=${newPage}`)
    }

    return <button onClick={handleLoadMore}>Load More</button>
}
