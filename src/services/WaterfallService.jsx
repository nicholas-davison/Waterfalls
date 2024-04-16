export const getWaterfalls = async () => {
    const response = await fetch ("http://localhost:8088/waterfalls")
    return response.json()
}