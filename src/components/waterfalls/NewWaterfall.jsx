import { Button, InputGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'


export const NewWaterfall = ({allLocations}) => {
    const navigate = useNavigate()

    return (
        <div>
        <h1>Add Waterfall</h1>
        <Form className='newresource-form'>
        <Form.Group className="mb-3" controlId="formWaterfallName">
          <Form.Label>Waterfall Name</Form.Label>
          <Form.Control type="text" placeholder="Waterfall Name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocationSelect">
            <Form.Label>Location</Form.Label>
            <Form.Select aria-label="Waterfall location select">
                <option>Choose a location</option>
                {allLocations.map(location => (
                    <option value="1" key={location.id}>{location.name}</option>
                ))}
            </Form.Select>
            <Button variant="outline-secondary" id="button-addon2" onClick={() => navigate('/newlocation')}>
          Don't see your location?
        </Button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRegionSelect">
            <Form.Label>Region</Form.Label>
            <Form.Select aria-label="Waterfall region select">
                <option>Choose a region</option>
                <option value="1">West</option>
                <option value="2">Middle</option>
                <option value="3">East</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDifficultySelect">
            <Form.Label>Difficulty Level</Form.Label>
            <Form.Select aria-label="Waterfall difficulty level select">
                <option>Choose a Difficulty Level</option>
                <option value="1">Easy</option>
                <option value="2">Moderate</option>
                <option value="3">Difficult</option>
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWaterfallDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control className="form-description" as="textarea" placeholder="Waterfall Description" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWaterfall Url">
            <Form.Label>Image URL</Form.Label>
            <Form.Control className="form-url" type="text" placeholder="Image URL" />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    )
}