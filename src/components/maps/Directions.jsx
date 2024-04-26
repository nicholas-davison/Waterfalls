
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
                optimizeWaypoints: true,
                provideRouteAlternatives: false,
                travelMode: 'DRIVING',
                drivingOptions: {
                departureTime: new Date(),
                trafficModel: 'pessimistic'
                },
                unitSystem: google.maps.UnitSystem.IMPERIAL
            }
            return DirectionsRequest
            
        }
/*     
            const directionsService = new google.maps.DirectionsService()
            const directionsRenderer = new google.maps.DirectionsRenderer()
    
            directionsService.route(DirectionsRequest, function(result, status) {
                debugger
                if (status == 'OK') {
                  directionsRenderer.setDirections(result);
                }
              })
        }
      
      function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService
          .route(DirectionsRequest)
          .then((response) => {
            directionsRenderer.setDirections(response);
          })
          .catch((e) => window.alert("Directions request failed")); */
      
