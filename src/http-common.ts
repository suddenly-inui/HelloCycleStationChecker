import axios from 'axios'

const apiClient = axios.create({
  // APIのURI
  baseURL: 'https://inui.jn.sfc.keio.ac.jp',
  // リクエストヘッダ
  headers: {
    'Content-type': 'application/json'
  }
})

export default apiClient
