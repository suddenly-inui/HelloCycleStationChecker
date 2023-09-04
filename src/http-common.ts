import axios from 'axios'

const apiClient = axios.create({
  // APIのURI
  baseURL: 'http://34.85.49.75/',
  // リクエストヘッダ
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
