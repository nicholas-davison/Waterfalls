export const getWaterfalls = async () => {
    return await fetch("http://localhost:8088/waterfalls?_expand=difficultyLevel&_expand=location").then(res => res.json())
}