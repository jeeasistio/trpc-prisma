'use client'

import Link from 'next/link'
import styles from '../styles/Nav.module.css'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/', label: 'Home' },
    { href: '/ssr', label: 'SSR' },
    { href: '/isr', label: 'ISR' },
    { href: '/csr', label: 'CSR' },
]

export const Nav = () => {
    const pathname = usePathname()

    return (
        <nav>
            <ul className={styles.ul}>
                {links.map(({ href, label }) => (
                    <Link
                        href={href}
                        key={label}
                        className={
                            pathname === '/' && href === '/'
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
    )
}