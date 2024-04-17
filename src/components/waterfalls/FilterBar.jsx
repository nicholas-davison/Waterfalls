import { Dropdown, DropdownButton } from "react-bootstrap"
import "./FilterBar.css"

export const FilterBar = ({allRegions, selectedRegion, setSelectedRegion}) => {

    const handleRegionChange = (region) => {
        setSelectedRegion(region)
    }

    return (
        <div className="filterbar">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" title={selectedRegion?.regionName || "Select a Region"}>
                {selectedRegion?.regionName || "Select a Region"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRegionChange(null)}>All</Dropdown.Item>
                    {allRegions.map((region) => (
                        <Dropdown.Item key={region.id} onClick={() => handleRegionChange(region)}>{region.regionName}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}