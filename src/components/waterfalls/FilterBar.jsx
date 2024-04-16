import { Dropdown, DropdownButton } from "react-bootstrap"
import "./FilterBar.css"

export const FilterBar = ({allRegions, setSelectedRegionId}) => {
    

    const handleRegionChange = (regionId) => {
        setSelectedRegionId(regionId)
    }

    return (
        <div className="filterbar">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                    region
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRegionChange(0)}>All</Dropdown.Item>
                    {allRegions.map((region) => (
                        <Dropdown.Item key={region.id} onClick={() => handleRegionChange(region.id)}>{region.regionName}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}