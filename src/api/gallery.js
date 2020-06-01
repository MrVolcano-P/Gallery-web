import axios from "axios"

const host = "http://localhost:8080"
export function listGallery() {
    return axios.get(`${host}/gallerys`)
}
export function addGallery(data) {
    return axios.post(`${host}/gallerys`, data)
}
export function deleteGallery(id) {
    return axios.delete(`${host}/gallerys/${id}`)
}
export function login(data) {
    return axios.post(`${host}/login`, data)
}
export function upload(id, formdata, token) {
    return axios.post(`${host}/gallerys/${id}/images`, formdata, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}