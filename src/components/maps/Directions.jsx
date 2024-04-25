
 export const Directions = (itinerary, userProfile) => {

    const lastStop = itinerary[itinerary.length - 1]
    
    const tripWaypoints = itinerary.slice(0, -1);
    
    const waypoints = tripWaypoints.map((waypoint) => ({
        location: waypoint, 
        stopover: true 
    }))
    
    const DirectionsRequest = {
                origin: userProfile.address,
                destination: lastStop,
                waypoints: waypoints,
                provideRouteAlternatives: false,
                travelMode: 'DRIVING',
                drivingOptions: {
                departureTime: new Date(),
                trafficModel: 'pessimistic'
                },
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }
            
    
            const directionsService = new google.maps.DirectionsService()
            const directionsRenderer = new google.maps.DirectionsRenderer()
    
            directionsService.route(DirectionsRequest, () => {
                directionsRenderer.setMap(Map);
            })
        }
      
      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService
          .route(DirectionsRequest)
          .then((response) => {
            directionsRenderer.setDirections(response);
          })
          .catch((e) => window.alert("Directions request failed"));
      }
