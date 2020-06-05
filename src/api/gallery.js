import axios from "axios"

export const host = "http://localhost:8080"

export function listAllGalleries() {
    return axios.get(`${host}/galleries`)
}
export function getGalleryByid(id) {
    return axios.get(`${host}/galleries/${id}`)
}
export function getGalleryByidAndCheckAuth(id, token) {
    return axios.get(`${host}/user/galleries/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function getGalleryByToken(token) {
    return axios.get(`${host}/user/galleries`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function getImagesByGalleryID(id) {
    return axios.get(`${host}/galleries/${id}/images`)
}
export function addGallery(data, token) {
    return axios.post(`${host}/user/galleries`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function updateName(id, data, token) {
    return axios.patch(`${host}/user/galleries/${id}/names`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function publishGallery(id, data, token) {
    return axios.patch(`${host}/user/galleries/${id}/publishes`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function deleteGallery(id, token) {
    return axios.delete(`${host}/user/galleries/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function signup(data) {
    return axios.post(`${host}/signup`, data)
}
export function login(data) {
    return axios.post(`${host}/login`, data)
}
export function logout(token) {
    console.log('tokenAPi', token)
    return axios.post(`${host}/logout`, {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function upload(id, formdata, token) {
    return axios.post(`${host}/user/galleries/${id}/images`, formdata, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function getProfile(token) {
    return axios.get(`${host}/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function updateProfile(data, token) {
    return axios.post(`${host}/user/profile`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function deleteImages(id, data, token) {
    console.log('tokenAPi', token)
    return axios.delete(`${host}/user/galleries/${id}/images`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data
    })
}
export function deleteImage(id, filename, token) {
    console.log('tokenAPi', token)
    return axios.delete(`${host}/user/galleries/${id}/images/${filename}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}