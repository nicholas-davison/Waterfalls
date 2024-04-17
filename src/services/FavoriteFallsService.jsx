export const postNewFavorite = async (userWaterfall) => {
    return await fetch("http://localhost:8088/userWaterfalls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userWaterfall)
    })
}

export const deleteFavoriteById = async (favoriteId) => {
    return await fetch(`http://localhost:8088/userWaterfalls/${favoriteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}