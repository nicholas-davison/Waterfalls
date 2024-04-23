import React, { useEffect } from 'react';

let map;

const initMap = async () => {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
  map = new Map(document.getElementById("map"), {
    center: { lat: 35.925, lng: -86.580 },
    zoom: 7,
    mapTypeId: "terrain"
  });
}
export const Map = () => {
  useEffect(() => {
    
    
    initMap();
  }, []);

  return <div id="map" style={{ width: '90%', height: '400px', margin: '0 auto'}}></div>;
};