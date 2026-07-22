import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function getFeed(){
    const response = await api.get("/posts/feed")
    return response.data
}

export async function createPost(formData){
    const response = await api.post("/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export async function likePost(postId){
    const response = await api.post(`/posts/like/${postId}`)
    return response.data
}