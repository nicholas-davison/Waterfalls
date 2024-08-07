export const getWaterfalls = async () => {
    return await fetch("http://localhost:8088/waterfalls?_expand=difficultyLevel&_expand=location").then(res => res.json())
}

export const getExpandedWaterfallById = async (waterfallId) => {
    return await fetch(`http://localhost:8088/waterfalls/${waterfallId}?_expand=difficultyLevel&_expand=location&_embed=userWaterfalls`).then(res => res.json())
}

export const getWaterfallById = async (waterfallId) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/waterfalls/${waterfallId}`).then(res => res.json())
}

export const getWaterfallsByUserId = async (userId) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/waterfalls?userId=${userId}&_expand=difficultyLevel&_expand=location`).then(res => res.json())
}

export const getUserWaterfallsByUserId = async (userId) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/userWaterfalls?userId=${userId}`).then(res => res.json())
}

export const saveNewWaterfall = async (newWaterfall) => {
    return await fetch("https://fallsfinder-api-adhim.ondigitalocean.app/waterfalls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newWaterfall)
    })
}

export const deleteWaterfall = async (waterfallId) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/waterfalls/${waterfallId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export const updateExistingWaterfall = async (waterfallId, newWaterfall) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/waterfalls/${waterfallId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newWaterfall)
    })
}


export const checkWaterfallByName = async (waterfallName) => {
    const response = await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/waterfalls?name=${waterfallName}`).then(res => res.json())
    return response.length > 0
}