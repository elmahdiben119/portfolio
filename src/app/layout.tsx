'use client'

import React from 'react'
import './globals.css'
import Script from 'next/script';
import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'

const GTM_ID = 'GTM-TRRM5VK4';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "El Mahdi Benbrahim",
    "url": "https://www.elmahdibenbrahim.com/",
    "image": "https://www.elmahdibenbrahim.com/_next/image?url=%2Fimages%2Felmahdibenbrahim.jpeg&w=640&q=75",
    "jobTitle": "Software Engineer",
    "worksFor": {
      "@type": "Company",
      "name": "Smart4 Engineering",
    },
    "sameAs": [
      "https://www.linkedin.com/in/benbrahimelmahdi/",
      "https://github.com/elmahdiben119",
      "https://x.com/MahdiBenbrahim1"
    ]
  };

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
  }
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />

      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        {deferredPrompt && (
          <Button onClick={handleInstallClick} className="fixed bottom-4 right-4 z-50">
            Install
          </Button>
        )}
      </body>
    </html>
  )
}