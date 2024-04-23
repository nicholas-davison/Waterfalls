import { useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { saveNewLocation } from "../../services/LocationService"
import { useNavigate } from "react-router-dom"
import { MapSearch } from "../maps/MapSearch"

export const Newlocation = ({getAndSetAllLocations}) => {
    const [newLocationInput, setNewLocationInput] = useState({"name": "", "regionId": 0, "lat": 0, "lng": 0})
    const navigate = useNavigate()
    const inputRef = useRef(null)

    const handleRegionChange = (event) => {
        const locationInputCopy = {...newLocationInput}
        locationInputCopy.regionId = parseInt(event.target.value)
        setNewLocationInput(locationInputCopy)
    }

    const handleSavenNewLocation = async (event) => {
        event.preventDefault()
        const allTruthy = (obj) => {
            return Object.values(obj).every(value => !!value);
          }
        if (allTruthy(newLocationInput)) {
                await saveNewLocation(newLocationInput).then(
                    getAndSetAllLocations()
                )
                navigate("/newfalls")
        
        } else {
            window.alert("Please complete form!")
        }
    }


    return (
        <div>
            <h1>Add Location</h1>
            <MapSearch inputRef={inputRef} setNewLocationInput={setNewLocationInput} newLocationInput={newLocationInput}/>
            <Form className="newresource-form">
                <Form.Group className="mb-3" controlId="formlocation name">
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter location name" ref={inputRef}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRegion">
                    <Form.Label>Region</Form.Label>
                    <Form.Select aria-label="Waterfall region select" onChange={handleRegionChange}>
                        <option>Choose a region</option>
                        <option value="1">West</option>
                        <option value="2">Middle</option>
                        <option value="3">East</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit" onClick={handleSavenNewLocation}>
                    Save New Location
                </Button>
            </Form>
        </div>
    )
}