import { Button, Card, Container } from "react-bootstrap"
import "./Waterfall.css" 
import { getLocationById } from "../../services/LocationService"
import { FilterBar } from "./FilterBar"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const WaterfallList = ({allWaterfalls, allRegions, allDifficultyLevels, getRegionNameById}) => {
    const [filteredWaterfalls, setFilteredWaterfalls] = useState([])
    const [selectedRegion, setSelectedRegion] = useState(null)
    const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate()

    //useEffect to set filtered waterfalls by filterbar
    useEffect(() => {
        let filteredFalls = allWaterfalls;

        // Filter by region
        if (selectedRegion) {
            filteredFalls = filteredFalls.filter((waterfall) => waterfall.location.regionId === selectedRegion.id);
        }

        // Filter by difficulty level
        if (selectedDifficultyLevel) {
            filteredFalls = filteredFalls.filter((waterfall) => waterfall.difficultyLevel.id === selectedDifficultyLevel.id);
        }

         // Filter by search term
        if (searchTerm) {
            filteredFalls = filteredFalls.filter((waterfall) =>
                waterfall.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredWaterfalls(filteredFalls);
        }, [allWaterfalls, selectedRegion, selectedDifficultyLevel, searchTerm])

    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img className="image" src={"https://gisgeography.com/wp-content/uploads/2013/02/Tennessee-Satellite-Map.jpg"} alt="Tenneessee Map" width="80%"/>
        </div>
        <h1 className="site-header">Falls Finder</h1>
         <FilterBar 
            allRegions={allRegions} 
            setSelectedRegion={setSelectedRegion} 
            selectedRegion={selectedRegion} 
            allDifficultyLevels={allDifficultyLevels} 
            selectedDifficultyLevel={selectedDifficultyLevel} 
            setSelectedDifficultyLevel={setSelectedDifficultyLevel}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            />
         <Container className="card-container">
            {filteredWaterfalls.map((waterfallObj) => {
                 // Get region name for this waterfall
            const regionName = getRegionNameById(waterfallObj.location.regionId);
            

            return (
                <Card className="card-waterfall" style={{ width: '18rem' }} key={waterfallObj.id}>
                <Card.Img 
                    className="img-waterfall-card" 
                    variant="top" 
                    src={waterfallObj.imageUrl}
                    />
                <Card.Body className="card-waterfall-detail">
                  <Card.Title>{waterfallObj.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{regionName} Tennessee</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{waterfallObj.location.name}</Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">{waterfallObj.difficultyLevel.type}</Card.Subtitle>
                  <Button variant="outline-success" onClick={() => navigate(`/${waterfallObj.id}`)}>View Details</Button>
                </Card.Body>
              </Card>
            )
        })}
        </Container>
        </>
    )
}