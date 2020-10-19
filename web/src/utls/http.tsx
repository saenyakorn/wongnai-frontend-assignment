import axios from "axios"

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  timeout: 5000
})

export default httpClient
