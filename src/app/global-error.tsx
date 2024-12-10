'use client'

import { Button } from './components/ui/button'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                    <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">Oops!</h1>
                    <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-6">Something went seriously wrong</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                        We're experiencing some technical difficulties. Our team has been notified and we're working to resolve the issue.
                    </p>
                    <Button onClick={() => reset()}>
                        Try again
                    </Button>
                </div>
            </body>
        </html>
    )
}