import axios from 'axios'
import HTTPS from './https'


export function getCandidates(page) {
    return axios.get(`${HTTPS}/users?q=axios&page=${page}&per_page=8`)
}

export function getCandidateById(id) {
    return axios.get(`${HTTPS}/users/${id}`)
}

export function createCandidate(body) {
    return axios.post(`${HTTPS}/users`, body)
}

export function updateCandidate(id, body) {
    return axios.put(`${HTTPS}/users/${id}`, body)
}

export function deleteCandidate(id) {
    return axios.delete(`${HTTPS}/users/${id}`)
}




