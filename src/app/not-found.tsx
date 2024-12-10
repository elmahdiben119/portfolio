import ErrorLayout from './error-layout'

export default function NotFound() {
    return (
        <ErrorLayout>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        </ErrorLayout>
    )
}