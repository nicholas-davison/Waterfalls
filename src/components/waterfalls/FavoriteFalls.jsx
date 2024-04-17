import { useEffect, useState } from "react"
import { getUserWaterfallsByUserId } from "../../services/WaterfallService"
import { Button, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const FavoriteFalls = ({ currentUser, allWaterfalls, getRegionNameById }) => {
    const [favoriteWaterfalls, setFavoriteWaterfalls] = useState([])
    const navigate = useNavigate()

    const getAndSetFavoriteWaterfalls = () => {
        getUserWaterfallsByUserId(currentUser.id).then((userFavorites) => {
            const userWaterfallsIds = userFavorites.map(favorite => favorite.waterfallId)
            const favoriteFalls = allWaterfalls.filter((falls) => userWaterfallsIds.includes(falls.id))
            setFavoriteWaterfalls(favoriteFalls)
        })
    }

    useEffect(() => {
        getAndSetFavoriteWaterfalls()
    }, [allWaterfalls, currentUser])

/*     // Function to get region name by region ID
    const getRegionNameById = (regionId) => {
        const region = allRegions.find(region => region.id === regionId);
        return region ? region.regionName : "Unknown Region";
    } */
    
    return (
        <div>
            <h1>Favorites</h1>
            <Container className="card-container">
            {favoriteWaterfalls.map((waterfallObj) => {
                 // Get region name for this waterfall
            const regionName = getRegionNameById(waterfallObj.location.regionId);
                
            return (
                <Card style={{ width: '18rem' }} key={waterfallObj.id}>
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
                  <Button variant="primary" onClick={() => navigate(`/${waterfallObj.id}`)}>View Details</Button>
                </Card.Body>
              </Card>
            )
        })}
        </Container>
        </div>
    )
}