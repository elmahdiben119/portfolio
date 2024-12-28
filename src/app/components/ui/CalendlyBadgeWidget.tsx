'use client'

import { useEffect } from 'react'

declare global {
    interface Window {
        Calendly: any;
    }
}

export default function CalendlyWidget() {
    useEffect(() => {
        if (window.Calendly) {
            window.Calendly.initBadgeWidget({
                url: 'https://calendly.com/benbrahim-elmahdi/30min?primary_color=34499a',
                text: 'Schedule time with me',
                color: '#111624',
                textColor: '#ffffff',
            })
        }
    }, [])

    return null
}