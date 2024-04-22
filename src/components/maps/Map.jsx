import React, { useEffect } from 'react';

let map;

export const Map = () => {
  useEffect(() => {
    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(document.getElementById("map"), {
        center: { lat: 35.925, lng: -86.580 },
        zoom: 7,
      });
    }

    initMap();
  }, []);

  return <div id="map" style={{ width: '90%', height: '400px', margin: '0 auto'}}></div>;
};