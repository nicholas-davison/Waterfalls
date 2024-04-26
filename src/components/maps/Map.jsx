import React, { useEffect } from 'react';

export const Map = ({favoriteWaterfalls, allLocations, directionsRequestObj}) => {
  
  useEffect(() => {
    initMap(favoriteWaterfalls);
  }, [favoriteWaterfalls, directionsRequestObj]);

let map;

const initMap = async (fallsArray) => {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")
  const { PinElement } = await google.maps.importLibrary("marker")
  const directionsService = new google.maps.DirectionsService()
  const directionsRenderer = new google.maps.DirectionsRenderer()


  map = new Map(document.getElementById("map"), {
    center: { lat: 35.925, lng: -86.580 },
    zoom: 7,
    mapId: "e2757e6ac8541d64",
    mapTypeId: "terrain"
  });

  directionsRenderer.setMap(map);

  function calcRoute() {
    directionsService.route(directionsRequestObj, function(result, status) {
      if (status == 'OK') {
        directionsRenderer.setDirections(result);
      }
    })
  }
  
 if (directionsRequestObj) {
   calcRoute()
   window.initMap = initMap
 }

  fallsArray.forEach((falls) => {

    const customPin = new PinElement({
      glyphColor: "#50C878",
      background: "#0077BE",
      borderColor: "#40E0D0"
    })

    const fallsLocationMarker = allLocations.find((location) => location.id === falls.locationId);
    const position = { lat: fallsLocationMarker.lat, lng: fallsLocationMarker.lng };
    
    const marker = new AdvancedMarkerElement({
      map: map,
      position: position,
      title: `${falls.name}\n${fallsLocationMarker.name}`,
      content: customPin.element
    });

    const contentString = 
      `<div>
        <h4>${falls.name}</h4>
        <img src="${falls.imageUrl}" alt="${falls.name}" style="max-width: 200px;" />
      </div>`;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: `${falls.name}`,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
  });
};


  return <div id="map" style={{ width: '90%', height: '400px', margin: '0 auto'}}></div>;
  
};