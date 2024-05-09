// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TradingViewWidget({symbol}) {
  const container = useRef();
  const stock = `BSE:${symbol}`
  useEffect(
    () => {
      const existingScript = document.getElementById('tv-widget-script');
      if(!existingScript){
      const script = document.createElement("script");
      script.id = 'tv-widget-script';
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      
      console.log(stock);

      script.innerHTML = `
        {
          "width": "1290",
          "height": "600",
          "symbol": "${stock}",
          "interval": "D",
          "timezone": "Asia/Kolkata",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    }
    //remove previous script and add new one with new data.
    else{
      console.log("Existing script found!");
      // container.current.removeChild(existingScript);
      existingScript.innerHTML = `
        {
          "width": "1290",
          "height": "600",
          "symbol": "${stock}",
          "interval": "D",
          "timezone": "Asia/Kolkata",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
        
    }
  
  },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div>
    </div>
  );
}

export default memo(TradingViewWidget);
