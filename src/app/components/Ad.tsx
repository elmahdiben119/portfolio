import { useEffect } from "react";
import Script from "next/script";

const Ad = () => {
  useEffect(() => {

  }, []);

  return (
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4809710414384113"
        crossOrigin="anonymous"
      />
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4809710414384113"
        data-ad-slot="4709013182"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};

export default Ad;
