import React, { useRef, useEffect } from "react";
import "./Map.css";

const Map = ({ center, zoom, className }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`}></div>;
};
//dummy comment
export default Map;
