'use client'

import { useEffect, useState } from 'react'

export default function ErrorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
        </div>
    )
}