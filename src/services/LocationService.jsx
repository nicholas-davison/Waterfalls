export const getLocations = async () => {
    return await fetch("https://fallsfinder-api-adhim.ondigitalocean.app/locations?_expand=region").then(res => res.json())
}

export const getLocationById = async (locationId) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/locations/${locationId}?_expand=region`).then(res => res.json())
}

export const getAllRegions = async () => {
    return await fetch("https://fallsfinder-api-adhim.ondigitalocean.app/regions").then(res => res.json())
}

export const saveNewLocation = async (newLocation) => {
    return await fetch("https://fallsfinder-api-adhim.ondigitalocean.app/locations", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newLocation)
    })
}