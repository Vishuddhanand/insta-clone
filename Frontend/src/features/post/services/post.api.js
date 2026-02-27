import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get("/api/posts/feed")
    return response.data

}

export async function createPost(caption, postImage) {

    const formData = new FormData()
    formData.append("image", postImage)
    formData.append("caption", caption)

    const response = await api.post("/api/posts", formData)
}