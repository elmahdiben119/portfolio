'use client'

import { useEffect } from 'react'
import { Button } from './components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-6">Something went wrong!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                We're sorry, but there was an error processing your request. Our team has been notified and we're working to fix it.
            </p>
            <Button onClick={() => reset()}>
                Try again
            </Button>
        </div>
    )
}