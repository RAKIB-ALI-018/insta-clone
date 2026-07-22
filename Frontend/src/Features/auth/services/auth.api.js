import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.PROD ? "/api/auth" : "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function register(username, email, password) {
    try {
        const response = await api.post("/register", {
            username, email, password
        })
        return response.data
    } catch (err) {
        throw err
    }
}

export async function login(usernameOrEmail, password) {
    try {
        const response = await api.post("/login", {
            username: usernameOrEmail,
            email: usernameOrEmail,
            password
        })
        return response.data
    } catch (err) {
        throw err
    }
}

export async function getMe() {
    try {
        const response = await api.get("/get-me")
        return response.data
    } catch (err) {
        throw err
    }
}