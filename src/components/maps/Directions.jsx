import { Map } from "./Map"
import "./maps.css"
export const Directions = ({allWaterfalls, allLocations, itinerary, directionsRequestObj}) => {
    

    return (
        <>
            <h1 className="page-header">Waterfall Trip Yeah!</h1>
            <div className="map-container">
                {<Map directionsRequestObj={directionsRequestObj}/>}
            </div>
        </>
    )
}
      
