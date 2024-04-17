export const getLocations = async () => {
    return await fetch("http://localhost:8088/locations?_expand=region").then(res => res.json())
}

export const getLocationById = async (locationId) => {
    return await fetch(`http://localhost:8088/locations/${locationId}?_expand=region`).then(res => res.json())
}

export const getAllRegions = async () => {
    return await fetch("http://localhost:8088/regions").then(res => res.json())
}