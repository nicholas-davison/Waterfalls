import { useEffect, useState } from 'react'
import { Alert, Button, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate, useParams } from 'react-router-dom'
import { getWaterfallById, saveNewWaterfall, updateExistingWaterfall } from '../../services/WaterfallService'


export const NewWaterfall = ({allLocations, currentUser, getAndSetAllWaterfalls}) => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const { waterfallId } = useParams()
    const [newWaterfall, setNewWaterfall] = useState({
        name: "",
        userId: 0,
        locationId: 0,
        difficultyLevelId: 0,
        description: "",
        imageUrl: "",
    })

    useEffect(() => {
        if (waterfallId) {
            getWaterfallById(waterfallId).then(existingWaterfall => {
                setNewWaterfall(existingWaterfall)
            })
        }
    }, [waterfallId])

    //alert
    if (show) {
        return (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Ruh Roh! You water complete the form!</Alert.Heading>
            <p>
              Please make sure all fields and dropdowns are completed before trying to submit your new waterfall.
            </p>
          </Alert>
        );
      }


    //update string-based properties of state 
    const handleTextChange = (event) => {
        const stateCopy = {...newWaterfall}
        stateCopy[event.target.name] = event.target.value
        setNewWaterfall(stateCopy)
    }
    //update integer-based properties of state 
    const handleIdChange = (event) => {
        const stateCopy = {...newWaterfall}
        stateCopy[event.target.name] = parseInt(event.target.value)
        stateCopy.userId = currentUser.id
        setNewWaterfall(stateCopy)
    }

    const handleSaveNewWaterfall = async (event) => {
        event.preventDefault()
        const allTruthy = (obj) => {
            return Object.values(obj).every(value => !!value);
          }
        if (allTruthy(newWaterfall)) {
            if (waterfallId) {
                 await updateExistingWaterfall(waterfallId, newWaterfall).then(() => {
                    getAndSetAllWaterfalls()
                    navigate("/profile")
                 })
            } else {
               await saveNewWaterfall(newWaterfall).then(() => {
                    getAndSetAllWaterfalls()
                    navigate("/profile")
            })
        }
        } else {
            setShow(true)
        }
    }

    return (
        <div>
        <h1>Add Waterfall</h1>
        <Form className='newresource-form'>
        <Form.Group className="mb-3" controlId="formWaterfallName">
          <Form.Label>Waterfall Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Waterfall Name" 
            value={newWaterfall.name} 
            name="name"
            onChange={handleTextChange}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocationSelect">
            <Form.Label>Location</Form.Label>
            <Form.Select aria-label="Waterfall location select" name="locationId" value={newWaterfall.locationId} onChange={handleIdChange}>
                <option>Choose a location</option>
                {allLocations.map(location => (
                    <option value={location.id} key={location.id}>{location.name}</option>
                ))}
            </Form.Select>
            <Button variant="outline-secondary" id="button-addon2" onClick={() => navigate('/newlocation')}>
          Don't see your location?
        </Button>
        </Form.Group>
{/* 
        <Form.Group className="mb-3" controlId="formRegionSelect">
            <Form.Label>Region</Form.Label>
            <Form.Select aria-label="Waterfall region select" name="regoinId" onChange={handleIdChange}>
                <option>Choose a region</option>
                <option value="1">West</option>
                <option value="2">Middle</option>
                <option value="3">East</option>
            </Form.Select>
        </Form.Group> */}

        <Form.Group className="mb-3" controlId="formDifficultySelect">
            <Form.Label>Difficulty Level</Form.Label>
            <Form.Select aria-label="Waterfall difficulty level select" name="difficultyLevelId" value={newWaterfall.difficultyLevelId} onChange={handleIdChange}>
                <option>Choose a Difficulty Level</option>
                <option value="1">Easy</option>
                <option value="2">Moderate</option>
                <option value="3">Difficult</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWaterfallDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
                className="form-description" 
                as="textarea" 
                placeholder="Waterfall Description" 
                value={newWaterfall.description}
                name="description"
                onChange={handleTextChange}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWaterfall Url">
            <Form.Label>Image URL</Form.Label>
            <Form.Control 
                className="form-url" 
                type="text" 
                placeholder="Image URL" 
                value={newWaterfall.imageUrl}
                name='imageUrl'
                onChange={handleTextChange}
                />
        </Form.Group>

        <Button variant="success" type="submit" onClick={handleSaveNewWaterfall}>
          Submit
        </Button>
      </Form>
      </div>
    )
}