export const getDifficultyLevels = async() => {
    return await fetch("https://fallsfinder-api-adhim.ondigitalocean.app/difficultyLevels").then(res => res.json())
}