import { useEffect, useState } from "react"
import { getUserWaterfallsByUserId, getWaterfallsByUserId } from "../../services/WaterfallService"
import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Map } from "../maps/Map"
import "./Waterfall.css" 

export const FavoriteFalls = ({ currentUser, userProfile, allWaterfalls, getRegionNameById, authoredWaterfalls, allLocations, itinerary, setItinerary, directionsRequestObj, setDirectionsRequestObj }) => {
    const [favoriteWaterfalls, setFavoriteWaterfalls] = useState([])
    const navigate = useNavigate()


    const getAndSetFavoriteWaterfalls = async () => {
        if (authoredWaterfalls) {
            await getWaterfallsByUserId(currentUser.id).then((userAuthoredWaterfalls) => {setFavoriteWaterfalls(userAuthoredWaterfalls)})
        } else {
            await getUserWaterfallsByUserId(currentUser.id).then((userFavorites) => {
                const userWaterfallsIds = userFavorites.map(favorite => favorite.waterfallId)
                const favoriteFalls = allWaterfalls.filter((falls) => userWaterfallsIds.includes(falls.id))
                setFavoriteWaterfalls(favoriteFalls)
            })
        }
    }
    const handleSetItinerary = (locale) => {
        if (itinerary.some((waypoint) => waypoint.lat === locale.lat && waypoint.lng === locale.lng)) {
            const updatedItinerary = itinerary.filter((waypoint) => !(waypoint.lat === locale.lat && waypoint.lng === locale.lng));
            setItinerary(updatedItinerary);
        } else {
            const itineraryCopy = [...itinerary];
            const wayPoint = { lat: locale.lat, lng: locale.lng };
            itineraryCopy.push(wayPoint);
            setItinerary(itineraryCopy);
        }
    }

    useEffect(() => {
        getAndSetFavoriteWaterfalls()
    }, [allWaterfalls, currentUser, authoredWaterfalls])
    


    //handle route on click
    const handleRouteClick = () => {
        const lastStop = itinerary[itinerary.length - 1]
    
        const tripWaypoints = itinerary.slice(0, -1);
        
        const waypoints = tripWaypoints.map((waypoint) => ({
            location: waypoint, 
            stopover: true 
        }))
    
    
    const directionsRequest = {
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
            
            setDirectionsRequestObj(directionsRequest)
            navigate('/directions')
        }
    
    
    
    return (
        <div>
            {authoredWaterfalls ? (
            <h1>Authored Waterfalls</h1>
            ) : (
            <>
            <div className="page-header">
                <h1>Favorites</h1>
                {itinerary.length !== 0 ? (
                    <Button variant="outline-success" onClick={handleRouteClick}>Route Trip</Button>
                ) : (
                    ""
                )}
            </div>
            <Map favoriteWaterfalls={favoriteWaterfalls} allLocations={allLocations} directionsRequestObj={directionsRequestObj}/>  
            </> 
            )}
               
            <Container className="card-container">
            {favoriteWaterfalls.map((waterfallObj) => {
                 // Get region name for this waterfall
            const locale = allLocations.find((location) => location.id === waterfallObj.locationId)
            const localeWaypoint = {lat: locale.lat, lng: locale.lng}
            const regionName = getRegionNameById(waterfallObj.location.regionId);
                
            return (
                <Card className="card-waterfall" style={{ width: '20rem' }} key={waterfallObj.id}>
                <Card.Img 
                    className="img-waterfall-card" 
                    variant="top" 
                    src={`${waterfallObj.imageUrl[0]}`}
                    />
                <Card.Body>
                  <Card.Title>{waterfallObj.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{regionName} Tennessee</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{waterfallObj.location.name}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{waterfallObj.difficultyLevel.type}</Card.Subtitle>
                    <div className="waterfallcard-btn-container">
                        <Button variant="outline-success" onClick={() => navigate(`/${waterfallObj.id}`)}>View Details</Button>
                        {!authoredWaterfalls ? (
                           itinerary.some((waypoint) => waypoint.lat === localeWaypoint.lat && waypoint.lng === localeWaypoint.lng) ? (
                            <Button variant="outline-danger" onClick={() => handleSetItinerary(locale)}>Remove from Trip</Button>
                           ) : (

                               <Button variant="outline-warning" onClick={() => handleSetItinerary(locale)}>Add to Trip</Button>
                           )
                            ) : (
                                ""
                            )}
                    </div>
                </Card.Body>
              </Card>
            )
        })}
        </Container>
        </div>
    )
}

