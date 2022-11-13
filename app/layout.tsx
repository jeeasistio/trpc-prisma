'use client'

import Link from 'next/link'
import styles from './RootLayout.module.css'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/ssr', label: 'SSR' },
    { href: '/isr', label: 'ISR' },
    { href: '/csr', label: 'CSR' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <html>
            <head></head>
            <body>
                <nav>
                    <ul className={styles.ul}>
                        {links.map(({ href, label }) => (
                            <Link
                                href={href}
                                key={label}
                                className={
                                    pathname === '/' && href === '/ssr'
                                        ? styles.active
                                        : href === `/${pathname?.split('/')[1]}`
                                        ? styles.active
                                        : styles.inactive
                                }
                            >
                                <li className={styles.li}>{label}</li>
                            </Link>
                        ))}
                    </ul>
                </nav>

                {children}
            </body>
        </html>
    )
}
