import axios from 'axios'

const apiClient = axios.create({
  // APIのURI
  baseURL: 'http://localhost:8000',
  // リクエストヘッダ
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
