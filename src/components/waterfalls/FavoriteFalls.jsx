import { useEffect, useState } from "react"
import { getUserWaterfallsByUserId, getWaterfallsByUserId } from "../../services/WaterfallService"
import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Map } from "../maps/Map"
import "./Waterfall.css" 
import { Directions } from "../maps/Directions"

export const FavoriteFalls = ({ currentUser, userProfile, allWaterfalls, getRegionNameById, authoredWaterfalls, allLocations }) => {
    const [favoriteWaterfalls, setFavoriteWaterfalls] = useState([])
    const navigate = useNavigate()
    const [itinerary, setItinerary] = useState([])
    const [directionsRequestObj, setDirectionsRequestObj] = useState(null)

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

    const handleSetItinerary = (locationId) => {
        const locale = allLocations.find((location) => location.id === locationId)
        const itineraryCopy = [...itinerary]
        const wayPoint = {lat: locale.lat, lng: locale.lng}
        itineraryCopy.push(wayPoint)
        setItinerary(itineraryCopy)
    }

    useEffect(() => {
        getAndSetFavoriteWaterfalls()
    }, [allWaterfalls, currentUser, authoredWaterfalls])
    


    //handle route on click
    const handleRouteClick = () => {
       const directionsRequest = Directions(itinerary, userProfile)
        setDirectionsRequestObj(directionsRequest)
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
            const regionName = getRegionNameById(waterfallObj.location.regionId);
                
            return (
                <Card className="card-waterfall" style={{ width: '18rem' }} key={waterfallObj.id}>
                <Card.Img 
                    className="img-waterfall-card" 
                    variant="top" 
                    src={`${waterfallObj.imageUrl}`}
                    />
                <Card.Body>
                  <Card.Title>{waterfallObj.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{regionName} Tennessee</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{waterfallObj.location.name}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{waterfallObj.difficultyLevel.type}</Card.Subtitle>
                    <div className="waterfallcard-btn-container">
                        <Button variant="outline-success" onClick={() => navigate(`/${waterfallObj.id}`)}>View Details</Button>
                        {!authoredWaterfalls ? (
                            <Button variant="outline-warning" onClick={() => handleSetItinerary(waterfallObj.locationId)}>Add to Trip</Button>
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

