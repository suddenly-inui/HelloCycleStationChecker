import axios from 'axios'

const apiClient = axios.create({
  // APIのURI
  baseURL: 'https://60cd-240d-1a-55c-1403-80a0-d628-1d9d-52a5.ngrok-free.app',
  // リクエストヘッダ
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
