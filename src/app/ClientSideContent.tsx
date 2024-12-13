'use client';

import React from 'react';
import { Button } from './components/ui/button';

export default function ClientSideContent() {
    const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

    React.useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                setDeferredPrompt(null);
            });
        }
    };

    return (
        <>
            {deferredPrompt && (
                <Button onClick={handleInstallClick} className="fixed bottom-4 right-0 left-0 mx-auto z-50 min-w-14 max-w-16">
                    Install
                </Button>
            )}
        </>
    );
}
