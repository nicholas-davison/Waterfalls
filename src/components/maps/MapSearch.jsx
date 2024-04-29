import React, { useEffect, useRef } from 'react';

export const MapSearch = ({ newLocationInput, setNewLocationInput, inputRef, newWaterfall, setNewWaterfall}) => {
  const mapRef = useRef(null); // Ref for the map container

  useEffect(() => {
    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
      const map = new Map(mapRef.current, {
        center: { lat: 35.925, lng: -86.580 },
        zoom: 7,
        mapTypeId: "terrain"
      });

      const searchBox = new window.google.maps.places.SearchBox(inputRef.current);

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
        const place = places[0];
        if (map) {
          map.setCenter(place.geometry.location);
          map.setZoom(15);
        }
        if (newWaterfall) {
          const newWaterfallInputCopy = {...newWaterfall}
          newWaterfallInputCopy.name = place.name
          setNewWaterfall(newWaterfallInputCopy)
        } else {
          const locationInputCopy = {...newLocationInput}
          locationInputCopy.lat = place.geometry.location.lat(),
          locationInputCopy.lng = place.geometry.location.lng()
          locationInputCopy.name = place.name
          setNewLocationInput(locationInputCopy)
        }

    });

      // Clean up event listener when component unmounts
      return () => {
        window.google.maps.event.clearInstanceListeners(searchBox);
      };
    };

    initMap();
  }, [setNewLocationInput, inputRef, setNewWaterfall]);

  return (
    <>
      {/* Use the ref for the map container */}
      <div ref={mapRef} id="map" style={{ width: '90%', height: '400px', margin: '0 auto'}}></div>
    </>
  );
};

  