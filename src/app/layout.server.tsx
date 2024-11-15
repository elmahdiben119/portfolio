import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'El Mahdi Benbrahim - Software Engineer Portfolio',
    description: 'El Mahdi Benbrahim is a software engineer specializing in web development, mobile apps, and problem-solving. Explore his skills and projects.',
    keywords: 'El Mahdi Benbrahim, software engineer, web development, mobile apps, React, Vue, Node.js, TypeScript',
    authors: [{ name: 'El Mahdi Benbrahim' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.elmahdibenbrahim.com',
        title: 'El Mahdi Benbrahim - Software Engineer Portfolio',
        description: 'Explore the projects and skills of El Mahdi Benbrahim, a passionate software engineer.',
        images: [
            {
                url: 'https://www.elmahdibenbrahim.com/_next/image?url=%2Fimages%2Felmahdibenbrahim.jpeg&w=640&q=40',
                width: 1200,
                height: 630,
                alt: 'El Mahdi Benbrahim Portfolio',
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}