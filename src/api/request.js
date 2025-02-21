import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.buttercms.com/v2', // Butter CMS API 地址
  timeout: 5000,
})

// 在请求拦截器中添加 auth_token
api.interceptors.request.use(
  (config) => {
    // e0f36dd51d2aa60e92d4db1123baed7e247e5707
    // 429373a7b8f11897a085ab4a769759108725b048
    const token = '429373a7b8f11897a085ab4a769759108725b048'
    if (token) {
      config.params = config.params || {}
      config.params.auth_token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
