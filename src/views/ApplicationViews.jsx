import { useDebugValue, useEffect, useState } from "react"
import { WaterfallList } from "../components/waterfalls/WaterfallList"
import { getWaterfalls } from "../services/WaterfallService"
import { Outlet, Route, Routes } from "react-router-dom"
import { getAllRegions } from "../services/LocationService"
import { NavBar } from "../components/nav/NavBar"

export const ApplicationViews = () => {
    const [allWaterfalls, setAllWaterfalls] = useState([])
    const [allRegions, setAllRegions] = useState([])

    //setter function for waterfalls with useEffect below
    const getAndSetAllWaterfalls = async () => {
        await getWaterfalls().then(res => setAllWaterfalls(res))
    }
    useEffect(() => {
        getAndSetAllWaterfalls()
    }, [])

  //get and set all regions in useeffect
    useEffect(() => {
        getAllRegions().then(res => setAllRegions(res))
    }, [])

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }> 
                <Route index element={<WaterfallList allWaterfalls={allWaterfalls} allRegions={allRegions}/>}/>
            </Route>
        </Routes>
    )
}

