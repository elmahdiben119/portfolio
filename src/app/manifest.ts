import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'El Mahdi Benbrahim',
        short_name: 'Benbrahim',
        description: 'El Mahdi Benbrahim - Software Engineer Portfolio',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/images/elmahdibenbrahim.jpeg',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/images/elmahdibenbrahim.jpeg',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}