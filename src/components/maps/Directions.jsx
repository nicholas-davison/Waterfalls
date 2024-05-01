import { Map } from "./Map"
import "./maps.css"
export const Directions = ({allWaterfalls, allLocations, itinerary, directionsRequestObj}) => {
    
const waterfallDestination = allWaterfalls.find((waterfall) => waterfall.location.lat === directionsRequestObj.destination.lat && waterfall.location.lng === directionsRequestObj.destination.lng)
const waterfallName = waterfallDestination.name


    return (
        <>
            <h1 className="page-header">Trip Directions ending at {waterfallName}</h1>
            <div className="map-container">
                {<Map directionsRequestObj={directionsRequestObj}/>}
            </div>
        </>
    )
}
      
