import axios from "axios";
import HTTPS from "./https";

export function UserLogin(body) {
  return axios.post(`${HTTPS}/login`, body);
}
