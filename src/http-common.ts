import axios from 'axios'

const apiClient = axios.create({
  // APIのURI
  baseURL: 'https://daed-133-27-186-11.ngrok-free.app',
  // リクエストヘッダ
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
