import { useDebugValue, useEffect, useState } from "react"
import { WaterfallList } from "../components/waterfalls/WaterfallList"
import { getWaterfalls } from "../services/WaterfallService"
import { Outlet, Route, Routes } from "react-router-dom"
import { getAllRegions, getLocations } from "../services/LocationService"
import { NavBar } from "../components/nav/NavBar"
import { getDifficultyLevels } from "../services/DifficultyLevelService"
import { WaterfallDetail } from "../components/waterfalls/WaterfallDetail"
import { FavoriteFalls } from "../components/waterfalls/FavoriteFalls"
import { NewWaterfall } from "../components/waterfalls/NewWaterfall"
import { Newlocation } from "../components/locations/NewLocation"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})
    const [allWaterfalls, setAllWaterfalls] = useState([])
    const [allRegions, setAllRegions] = useState([])
    const [allDifficultyLevels, setAllDifficultyLevels] = useState([])
    const [allLocations, setAllLocations] = useState([])

    //setting current user
    useEffect(() => {
        const localLearningUser = localStorage.getItem("waterfall_user")
        const learningUserObject = JSON.parse(localLearningUser)
        setCurrentUser(learningUserObject)
    }, [])

    //setter function for waterfalls with useEffect below
    const getAndSetAllWaterfalls = async () => {
        await getWaterfalls().then(res => setAllWaterfalls(res))
    }
    useEffect(() => {
        getAndSetAllWaterfalls()
    }, [])

    //get and set all regions in useEffect
    useEffect(() => {
        getAllRegions().then(res => setAllRegions(res))
    }, [])

    //get and set all difficultyLevels in useEffect
    useEffect(() => {
        getDifficultyLevels().then(res => setAllDifficultyLevels(res))
    }, [])

    // Function to get region name by region ID
    const getRegionNameById = (regionId) => {
        const region = allRegions.find(region => region.id === regionId);
        return region ? region.regionName : "Unknown Region";
    }

    //get and set all locations function and use effect
    const getAndSetAllLocations = async () => {
        await getLocations().then(res=> setAllLocations(res))
    }
    useEffect(() => {
        getAndSetAllLocations()
    }, [])

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }> 
                <Route index element={<WaterfallList allWaterfalls={allWaterfalls} allRegions={allRegions} allDifficultyLevels={allDifficultyLevels} getRegionNameById={getRegionNameById}/>}/>
                <Route path=":waterfallId" element={<WaterfallDetail currentUser={currentUser} getAndSetAllWaterfalls={getAndSetAllWaterfalls}/>}/>
                <Route path="favorites" element={<FavoriteFalls currentUser={currentUser} allWaterfalls={allWaterfalls} getRegionNameById={getRegionNameById}/>}/>
                <Route path="newfalls" element={<NewWaterfall allLocations={allLocations} currentUser={currentUser} getAndSetAllWaterfalls={getAndSetAllWaterfalls}/>}/>
                <Route path="newlocation" element={<Newlocation getAndSetAllLocations={getAndSetAllLocations}/>}/>
                <Route path="profile" element={<>Hello</>}/>

            </Route>
        </Routes>
    )
}

