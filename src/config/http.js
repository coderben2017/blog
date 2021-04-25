import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3001'
})

http.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      alert('服务器繁忙，请稍后再试')
    }
    return response
  },
  error => {
    alert('网络异常，请稍后再试')
    return Promise.reject(error)
  }
)

export default http