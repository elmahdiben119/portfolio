import React from 'react';
import './globals.css';
import Script from 'next/script';
import { Button } from './components/ui/button';

const GTM_ID = 'GTM-TRRM5VK4';

export const metadata = {
  title: 'El Mahdi Benbrahim',
  description: 'El Mahdi Benbrahim is a software engineer specializing in web development, mobile apps, and problem-solving. Explore his skills and projects.',
  keywords: 'El Mahdi Benbrahim, software engineer, web development, mobile apps, React, Vue, Node.js, TypeScript',
  authors: [{ name: 'El Mahdi Benbrahim' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.elmahdibenbrahim.com',
    title: 'El Mahdi Benbrahim',
    description: 'Explore the projects and skills of El Mahdi Benbrahim, a passionate software engineer.',
    images: [
      {
        url: 'https://www.elmahdibenbrahim.com/_next/image?url=%2Fimages%2Felmahdibenbrahim.jpeg&w=640&q=40',
        width: 1200,
        height: 630,
        alt: 'El Mahdi Benbrahim',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Metadata is applied server-side */}
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
        <ClientSideContent />
        {children}
      </body>
    </html>
  );
}

function ClientSideContent() {
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