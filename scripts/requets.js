const baseUrl = "https://m2-api-living.herokuapp.com/news"

export async function getAllPosts (page) {
    try {
        const request = await fetch(`${baseUrl}?page=${page}`, {
            method: "GET",
        })
        if (request.ok){
            const allPosts = await request.json()
            return allPosts
        } else {
            throw request
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getPostById (postId) {
    try {
        const request = await fetch(`${baseUrl}/${postId}`,{
            method: "GET",
        })
        if (request.ok){
            const post = request.json()
            return post
        } else {
            throw request
        }
    } catch (error) {
        console.log(error)
    }
}