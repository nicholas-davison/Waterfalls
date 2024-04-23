import React, { useEffect } from 'react';

export const Map = ({favoriteWaterfalls, allLocations}) => {
  useEffect(() => {
    initMap(favoriteWaterfalls);
  }, [favoriteWaterfalls]);

let map;

const initMap = async (fallsArray) => {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
  /* const position = { lat: 36.1627, lng: -86.7816 }; */

  map = new Map(document.getElementById("map"), {
    center: { lat: 35.925, lng: -86.580 },
    zoom: 7,
    mapId: "FAVORITE-FALLS-MAP-ID",
    mapTypeId: "terrain"
  });

  const marker = fallsArray.map((falls) => {
    const fallsLocationMarker = allLocations.find((location) => location.id === falls.locationId)
    const position = { lat: fallsLocationMarker.lat, lng: fallsLocationMarker.lng };
    new AdvancedMarkerElement({
      map: map,
      position: position,
      title: falls.name,
    })
  })
}



  return <div id="map" style={{ width: '90%', height: '400px', margin: '0 auto'}}></div>;
};