import axios from "axios"

export const host = "http://localhost:8080"
export function listAllGalleries() {
    return axios.get(`${host}/galleries`)
}
export function getGalleryByid(id) {
    return axios.get(`${host}/galleries/${id}`)
}
export function getImagesByGalleryID(id) {
    return axios.get(`${host}/galleries/${id}/images`)
}
export function addGallery(data, token) {
    return axios.post(`${host}/user/galleries`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
export function deleteGallery(id) {
    return axios.delete(`${host}/gallerys/${id}`)
}
export function login(data) {
    return axios.post(`${host}/login`, data)
}
export function upload(id, formdata, token) {
    return axios.post(`${host}/user/galleries/${id}/images`, formdata, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}