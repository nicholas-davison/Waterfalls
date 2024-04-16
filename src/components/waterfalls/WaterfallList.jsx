import { Button, Card, Container } from "react-bootstrap"
import "./Waterfall.css" 
import { getLocationById } from "../../services/LocationService"
import { FilterBar } from "./FilterBar"
import { useEffect, useState } from "react"


export const WaterfallList = ({allWaterfalls, allRegions}) => {
    const [filteredWaterfalls, setFilteredWaterfalls] = useState([])
    const [selectedRegionId, setSelectedRegionId] = useState(0)

    useEffect(() => {
        if (selectedRegionId === 0) {
            setFilteredWaterfalls(allWaterfalls)
        } else {
            const fallsByRegion = allWaterfalls.filter((waterfall) => waterfall.location.regionId === selectedRegionId)
            setFilteredWaterfalls(fallsByRegion)
        }
        
    }, [allRegions, allWaterfalls, selectedRegionId])
    
        // Function to get region name by region ID
        const getRegionNameById = (regionId) => {
            const region = allRegions.find(region => region.id === regionId);
            return region ? region.regionName : "Unknown Region";
        }

    return (
        <>
        
         <img src={"https://gisgeography.com/wp-content/uploads/2013/02/Tennessee-Map.jpg"} alt="Tenneessee Map" width="80%"/>
         <FilterBar allRegions={allRegions} setSelectedRegionId={setSelectedRegionId}/>
         <Container className="card-container">
            {filteredWaterfalls.map((waterfallObj) => {
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
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            )
        })}
        </Container>
        </>
    )
}