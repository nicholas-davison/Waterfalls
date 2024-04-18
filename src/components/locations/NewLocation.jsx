import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { saveNewLocation } from "../../services/LocationService"
import { useNavigate } from "react-router-dom"

export const Newlocation = ({getAndSetAllLocations}) => {
    const [newLocationInput, setNewLocationInput] = useState({"name": "", "regionId": 0})
    const navigate = useNavigate()
    
    const handleLocationInputChange = (event) => {
        const locationInputCopy = {...newLocationInput}
        locationInputCopy.name = event.target.value
        setNewLocationInput(locationInputCopy)
    }

    const handleRegionChange = (event) => {
        const locationInputCopy = {...newLocationInput}
        locationInputCopy.regionId = parseInt(event.target.value)
        setNewLocationInput(locationInputCopy)
    }

    const handleSavenNewLocation = async (event) => {
        event.preventDefault()
        await saveNewLocation(newLocationInput).then(
            getAndSetAllLocations()
        )
        navigate("/newfalls")
    }


    return (
        <div>
            <h1>Add Location</h1>
            <Form className="newresource-form">
                <Form.Group className="mb-3" controlId="formlocation name">
                    <Form.Label>Location Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter location name" onChange={handleLocationInputChange}/>
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