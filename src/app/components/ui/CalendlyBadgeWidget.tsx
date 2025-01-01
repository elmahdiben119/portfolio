'use client'

import { useState, useEffect } from 'react'
import { Button } from './button'
import { debugLog } from '@/utils/debug'

declare global {
    interface Window {
        Calendly?: {
            initBadgeWidget: (config: any) => void;
        };
    }
}

export default function CalendlyWidget() {
    const [isLoaded, setIsLoaded] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        debugLog('CalendlyWidget mounted')

        const initializeCalendly = () => {
            debugLog('Attempting to initialize Calendly')
            if (window.Calendly) {
                try {
                    window.Calendly.initBadgeWidget({
                        url: 'https://calendly.com/benbrahim-elmahdi/30min?primary_color=34499a',
                        text: 'Schedule time with me',
                        color: '#aebaff',
                        textColor: '#ffffff',
                    })
                    setIsLoaded(true)
                    debugLog('Calendly initialized successfully')
                } catch (err) {
                    debugLog('Error initializing Calendly widget:', err)
                    setError('Failed to initialize Calendly widget')
                }
            } else {
                debugLog('Calendly object not found on window')
                setError('Calendly script not loaded')
            }
        }

        const checkCalendlyLoaded = () => {
            debugLog('Checking if Calendly is loaded')
            if (window.Calendly) {
                debugLog('Calendly found on window')
                initializeCalendly()
            } else {
                debugLog('Calendly not found, setting up MutationObserver')
                const observer = new MutationObserver((mutations, obs) => {
                    if (window.Calendly) {
                        debugLog('Calendly detected by MutationObserver')
                        initializeCalendly()
                        obs.disconnect()
                    }
                })

                observer.observe(document, {
                    childList: true,
                    subtree: true,
                })

                return () => observer.disconnect()
            }
        }

        checkCalendlyLoaded()

        return () => {
            debugLog('CalendlyWidget unmounted')
        }
    }, [])

    if (error) {
        return (
            <Button
                className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                    debugLog('Reload button clicked')
                    window.location.reload()
                }}
            >
                Calendly Error - Click to Reload
            </Button>
        )
    }

    if (!isLoaded) {
        return (
            <Button
                className="fixed bottom-4 right-4 z-50 bg-gray-500 hover:bg-gray-600 text-white"
                disabled
            >
                Loading Calendly...
            </Button>
        )
    }

    return null
}