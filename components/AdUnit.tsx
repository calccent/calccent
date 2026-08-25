'use client';
import { useEffect, useRef, useState } from 'react';

export default function AdUnit() {
  const [isVisible, setIsVisible] = useState(false);
  const adContainerRef = useRef<HTMLDivElement>(null);
  const adRenderedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (adContainerRef.current) {
      observer.observe(adContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && adContainerRef.current && !adRenderedRef.current) {
      try {
        const container = adContainerRef.current;
        const rect = container.getBoundingClientRect();
        if (rect.width === 0) return;

        const existingAds = container.querySelectorAll('ins.adsbygoogle');
        if (existingAds.length > 0) return;

        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        adRenderedRef.current = true;
      } catch (e) {
        console.log("Ad error", e);
      }
    }
  }, [isVisible]);

  return (
    <div 
      ref={adContainerRef} 
      className="my-6 flex justify-center min-h-[90px] min-w-[200px] bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
        data-ad-slot="YOUR_AD_UNIT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}