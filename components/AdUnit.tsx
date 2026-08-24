'use client';
import { useEffect } from 'react';

export default function AdUnit() {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.log("Ad error", e);
    }
  }, []);

  return (
    <div className="my-6 flex justify-center min-h-[100px]">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // ← CHANGE THIS LATER
        data-ad-slot="YOUR_AD_UNIT_ID"            // ← CHANGE THIS LATER
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}