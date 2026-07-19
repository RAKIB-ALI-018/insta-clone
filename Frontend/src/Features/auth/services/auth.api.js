//  Auth se related jitna bhi authentication wala kaam hoga
//* uska pura code 'auth.api.js' mein likh rhe honge

import axios from 'axios'

const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",
    withCredentials: true //* in Axios tells the browser to include credentials (cookies, authorization headers, TLS client certificates) with cross-origin requests.
})


export async function register(username, email, password) {
    try {
        const response = await api.post("/register", {
            username, email, password
        }) 
        return response.data
    }catch (err) {
        throw err
    }


}
export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            username, password
        })
        return response.data
    }catch (err) {
        throw err
    }
}

export async function getMe(){
    try{
        const response = await api.get("/get-me")
        return response.data
    }catch(err){
        throw err
    }
}