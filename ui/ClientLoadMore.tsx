'use client'

export default function ClientLoadMore({ handleLoadMore }: { handleLoadMore: () => void }) {
    return <button onClick={handleLoadMore}>Load More</button>
}
