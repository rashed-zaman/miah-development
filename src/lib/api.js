import axios from 'axios'

// Central axios instance for the app
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token from localStorage for client requests
api.interceptors.request.use(
  (config) => {
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
      }
    } catch (e) {
      // ignore
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Helper to set or clear Authorization header (useful after login/logout)
api.setToken = (token) => {
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.Authorization
  }
}

export default api
