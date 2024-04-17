import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getWaterfallById } from "../../services/WaterfallService"
import { Button, Col, Container, Image } from "react-bootstrap"


export const WaterfallDetail = () => {
    const { waterfallId } = useParams()
    const [currentWaterfall, setCurrentWaterfall] = useState({})

    useEffect(() => {
        getWaterfallById(waterfallId).then(res => setCurrentWaterfall(res))
    }, [waterfallId])

    return (
        <div>
            <Container>
                <Col xs={10} md={8} className="image-container">
                    {currentWaterfall ? (
                        <Image src={currentWaterfall.imageUrl} fluid />
                        ) : (
                        <p>Loading image...</p> // Render a loading message
                    )}
                </Col>
            </Container>
            <Container>
                <div className="waterfall-detail-header">
                    <h1>{currentWaterfall.name}</h1>
                    <Button variant="success">
                        Add to Favorites
                    </Button>
                </div>
                <h2>{currentWaterfall.location?.name}</h2>
                <p>{currentWaterfall.description}</p>
            </Container>
            <Container className="waterfall-btn-container">
                <Button className="waterfall-btn" variant="warning">Edit Listing</Button>
                <Button className="waterfall-btn" variant="danger">Delete Listing</Button>
            </Container>
        </div>
    )
}