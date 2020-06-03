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
export function updateName(id, data, token) {
    return axios.patch(`${host}/user/galleries/${id}/names`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
export function publishGallery(id, data, token) {
    return axios.patch(`${host}/user/galleries/${id}/publishes`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
export function deleteGallery(id) {
    return axios.delete(`${host}/user/galleries/${id}`)
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

export function deleteImages(id, data, token) {
    console.log('tokenAPi', token)
    return axios.delete(`${host}/user/galleries/${id}/images`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}