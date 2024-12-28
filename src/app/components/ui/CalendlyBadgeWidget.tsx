import React, { useEffect } from 'react';

interface CalendlyBadgeWidgetProps { }

const CalendlyBadgeWidget: React.FC<CalendlyBadgeWidgetProps> = ({ }) => {
    useEffect(() => {
        const head = document.querySelector("head");
        if (head) {
            const script = document.createElement("script");
            script.setAttribute(
                "src",
                "https://assets.calendly.com/assets/external/widget.js"
            );
            head.appendChild(script);

            const style = document.createElement("link");
            style.href = "https://assets.calendly.com/assets/external/widget.css";
            style.rel = "stylesheet";
            head.appendChild(style);

            return () => {
                if (script.parentNode) script.parentNode.removeChild(script);
                if (style.parentNode) style.parentNode.removeChild(style);
            };
        } else {
            console.error("Head element not found");
        }
    }, []);

    useEffect(() => {
        const initCalendly = () => {
            const calendly = (window as any).Calendly;
            if (typeof calendly === 'undefined' || !calendly) {
                return;
            }            
            calendly.initBadgeWidget({
                url: 'https://calendly.com/benbrahim-elmahdi/30min?primary_color=34499a',
                text: 'Schedule time with me',
                color: '#111624',
                textColor: '#ffffff',
            });

        };
        window.addEventListener('load', initCalendly);
    }, []);

    return <div id="calendly-badge-widget"></div>;
};

export default CalendlyBadgeWidget;
