import { useEffect } from 'react';

declare global {
  interface Window {
    _waEmbed: (settings: any) => void;
  }
}

const WhatsAppWidget = () => {
  useEffect(() => {
    // Load the WhatsApp widget script
    const script = document.createElement('script');
    script.src = 'https://d2mpatx37cqexb.cloudfront.net/delightchat-whatsapp-widget/embeds/embed.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Initialize the widget once the script is loaded
    script.onload = () => {
      const wa_btnSetting = {
        "btnColor": "#16BE45",
        "ctaText": "WhatsApp CPA Joe",
        "cornerRadius": 40,
        "marginBottom": 20,
        "marginLeft": 20,
        "marginRight": 20,
        "btnPosition": "right",
        "whatsAppNumber": "254717158091",
        "welcomeMessage": "Hi, Joe ...\n\nI'd like to enquire about ...",
        "zIndex": 999999,
        "btnColorScheme": "light"
      };

      if (window._waEmbed) {
        window._waEmbed(wa_btnSetting);
      }
    };

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default WhatsAppWidget;