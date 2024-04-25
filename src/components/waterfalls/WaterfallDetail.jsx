import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteWaterfall, getExpandedWaterfallById } from "../../services/WaterfallService"
import { Button, Col, Container, Image } from "react-bootstrap"
import { postNewFavorite, deleteFavoriteById } from "../../services/FavoriteFallsService"
import "./Waterfall.css"


export const WaterfallDetail = ({ currentUser, getAndSetAllWaterfalls }) => {
    const navigate = useNavigate()
    const { waterfallId } = useParams()
    const [currentWaterfall, setCurrentWaterfall] = useState({})

    //set state with waterfall by id used in useParams
    const getAndSetCurrentWaterfall = async () => {
        await getExpandedWaterfallById(waterfallId).then(res => setCurrentWaterfall(res))
    }
    useEffect(() => {
        getAndSetCurrentWaterfall()
    }, [waterfallId, currentUser])


    //declare a variable for the like relationship between user and waterfall, which will return an id if it exists and if it doesnt it will be undefined
        const matchingUserWaterfall = currentWaterfall.userWaterfalls && currentWaterfall.userWaterfalls.find((like) => like.userId === currentUser.id)
   


    //Post new favorite relationship
    const handleAddFavorite = async () => {
        const newFavorite = {
            "userId": currentUser.id,
            "waterfallId": parseInt(waterfallId)
        }
            await postNewFavorite(newFavorite).then(() => {
                getAndSetCurrentWaterfall()
            })
    }

    //find the post that has the matching userId and waterfallId and delete it
    const handleRemoveFavorite = async () => {
        await deleteFavoriteById(matchingUserWaterfall.id).then(() => {
            getAndSetCurrentWaterfall()
        })
    }

    const handleDeleteWaterfall = async () => {
        await deleteWaterfall(parseInt(waterfallId)).then(() => {
            getAndSetAllWaterfalls()
            navigate("/")
        })
    }

    return (
        <div>
            <Container>
                <Col xs={10} md={8} className="image-container">
                    {currentWaterfall ? (
                        <Image src={currentWaterfall.imageUrl} fluid className="img-waterfall-card" />
                        ) : (
                        <p>Loading image...</p> // Render a loading message
                    )}
                </Col>
            </Container>
            <Container>
                <div className="waterfall-detail-header">
                    <h1>{currentWaterfall.name}</h1>
                    {matchingUserWaterfall ? (
                            <Button variant="warning" onClick={handleRemoveFavorite}>
                                Remove Favorite
                            </Button>
                        ) : (
                            <Button variant="success" onClick={handleAddFavorite}>
                                Add to Favorites
                            </Button>
                        )
                    }
                </div>
                <h2>{currentWaterfall.location?.name}</h2>
                <p>{currentWaterfall.description}</p>
            </Container>
            <Container className="waterfall-btn-container">
                {currentUser.id === currentWaterfall.userId ? (
                    <>
                <Button className="waterfall-btn" variant="warning" onClick={() => navigate("edit")}>Edit Listing</Button>
                <Button className="waterfall-btn" variant="danger" onClick={handleDeleteWaterfall}>Delete Listing</Button>
                    </>
                ) : (
                    ""
                )}
            </Container>
        </div>
    )
}