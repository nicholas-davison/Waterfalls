import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getWaterfallById } from "../../services/WaterfallService"

export const WaterfallDetail = () => {
    const { waterfallId } = useParams()
    const [currentWaterfall, setCurrentWaterfall] = useState({})

    useEffect(() => {
        getWaterfallById(waterfallId).then(res => setCurrentWaterfall(res))
    }, [])
    
    return (
        <div>
            {waterfallId}
        </div>
    )
}