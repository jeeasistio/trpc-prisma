'use client'

import { useRouter } from 'next/navigation'

export default function SSRLoadMore({ newCursor }: { oldCursor?: number; newCursor?: number }) {
    const router = useRouter()
    const handleLoadMore = () => {
        router.replace(`/ssr?cursor=${newCursor}`)
    }

    return <button onClick={handleLoadMore}>Load More</button>
}
