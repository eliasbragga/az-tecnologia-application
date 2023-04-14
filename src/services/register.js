import axios from 'axios'
import HTTPS from './https'


export function UserRegister(body) {
    return axios.post(`${HTTPS}/register`, body)
}




