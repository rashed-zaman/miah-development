import axios from "axios"

axios.defaults.withCredentials = true
export const axiosCredential = axios.create({
  baseURL: 'https://api.miah.shop/'
})


export const IMAGE_URL = 'https://images.miah.shop/product/'
export const BASE_URL = 'https://api.miah.shop/api/'
// export const BASE_URL = 'http://192.168.7.76:8000/api/'
export const ROOT_URL = 'https://miah.shop'

// export const BASE_URL = 'https://www.miahapi.amanatshahgroup.com/api/'
//export const BASE_URL = 'https://demoapi.miah.shop/api/'

// export const IMAGE_URL = 'http://images.blmtea.com/product/'
// export const BASE_URL = 'http://api.blmtea.com/api/'