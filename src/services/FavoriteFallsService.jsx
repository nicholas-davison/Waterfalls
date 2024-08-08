export const postNewFavorite = async (userWaterfall) => {
    return await fetch("https://fallsfinder-api-adhim.ondigitalocean.app/userWaterfalls", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userWaterfall)
    })
}

export const deleteFavoriteById = async (favoriteId) => {
    return await fetch(`https://fallsfinder-api-adhim.ondigitalocean.app/${favoriteId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
}