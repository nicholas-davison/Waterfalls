import { Button, Dropdown, DropdownButton, Form, InputGroup } from "react-bootstrap"
import "./FilterBar.css"

export const FilterBar = ({allRegions, selectedRegion, setSelectedRegion, allDifficultyLevels, selectedDifficultyLevel, setSelectedDifficultyLevel, searchTerm, setSearchTerm}) => {

    const handleRegionChange = (region) => {
        setSelectedRegion(region)
    }

    const handleDifficultyLevelChange = (difficultyLevel) => {
        setSelectedDifficultyLevel(difficultyLevel)
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleClearSearch = () => {
        setSelectedRegion(null)
        setSelectedDifficultyLevel(null)
        setSearchTerm("")
    }

    return (
        <div className="filterbar">
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" title={selectedRegion?.regionName || "Select a Region"}>
                {selectedRegion?.regionName || "Select a Region"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRegionChange(null)}>All</Dropdown.Item>
                    {allRegions.map((region) => (
                        <Dropdown.Item key={region.id} onClick={() => handleRegionChange(region)}>{region.regionName}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic" title={selectedDifficultyLevel?.type || "Difficulty Level"}>
                {selectedDifficultyLevel?.type || "Difficulty Level"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleDifficultyLevelChange(null)}>Clear Selection</Dropdown.Item>
                    {allDifficultyLevels.map((level) => (
                        <Dropdown.Item key={level.id} onClick={() => handleDifficultyLevelChange(level)}>{level.type}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Search
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
            </InputGroup>
            <Button variant="warning"  onClick={handleClearSearch}>Clear Search</Button>
        </div>
    )
}