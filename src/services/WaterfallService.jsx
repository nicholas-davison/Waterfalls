export const getWaterfalls = async () => {
    return await fetch("http://localhost:8088/waterfalls?_expand=difficultyLevel&_expand=location").then(res => res.json())
}

export const getWaterfallById = async (waterfallId) => {
    return await fetch(`http://localhost:8088/waterfalls/${waterfallId}?_expand=difficultyLevel&_expand=location&_embed=userWaterfalls`).then(res => res.json())
}

export const getUserWaterfallsByUserId = async (userId) => {
    return await fetch(`http://localhost:8088/userWaterfalls?_userId=${userId}`).then(res => res.json())
}

export const saveNewWaterfall = async (newWaterfall) => {
    return await fetch("http://localhost:8088/waterfalls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newWaterfall)
    })
}

export const deleteWaterfall = async (waterfallId) => {
    return await fetch(`http://localhost:8088/waterfalls/${waterfallId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}