export const getDifficultyLevels = async() => {
    return await fetch("http://localhost:8088/difficultyLevels").then(res => res.json())
}