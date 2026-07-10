"use client";
import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Add loading-active class to body when preloader starts
    document.body.classList.add("loading-active");

    const handleLoad = () => {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setLoading(false);
        // Remove loading-active class when preloader completes
        document.body.classList.remove("loading-active");
      }, 300);
      return () => clearTimeout(timer);
    };

    // If document is already loaded (client-side transition / fast load)
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      
      // Fallback timeout to ensure the site isn't blocked forever if load event fires late
      const fallback = setTimeout(handleLoad, 3000);
      
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`loader-wrapper ${fadeOut ? "fade-out" : ""}`}>
      <div className="loadingspinner">
        <div id="square1"></div>
        <div id="square2"></div>
        <div id="square3"></div>
        <div id="square4"></div>
        <div id="square5"></div>
      </div>
    </div>
  );
}
