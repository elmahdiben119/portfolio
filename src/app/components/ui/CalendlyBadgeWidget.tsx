import React, { useEffect } from 'react';

interface CalendlyBadgeWidgetProps {}

const CalendlyBadgeWidget: React.FC<CalendlyBadgeWidgetProps> = ({}) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    const style = document.createElement('link');
    style.href = 'https://assets.calendly.com/assets/external/widget.css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    window.onload = function () {
      Calendly.initBadgeWidget({
        url: 'https://calendly.com/benbrahim-elmahdi/30min?primary_color=34499a',
        text: 'Schedule time with me',
        color: '#111624',
        textColor: '#ffffff',
      });
    };
  }, []);

  return <div id="calendly-badge-widget"></div>;
};

export default CalendlyBadgeWidget;
