import axios from "axios";
import { BASE_URL } from "../serviceConfig";
export default {
  getData: async function (api) {
    try {
      const response = await axios.get(BASE_URL + api);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
  postData: async function (api, body) {
    const headers = {
      'Content-Type': 'application/json'}
    try {
      const response = await axios.post(BASE_URL + api , body, { headers : headers });
      return response;
    } catch (error) {
      throw error;
    }
  },
  authGetData: async function (api, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
    try {
      const response = await axios.get(BASE_URL + api,  { headers });
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear()
        location.href= "/signin"
      }
      throw error;
    }
  },
  postAuthData: async function (api, body, token) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }
    try {
      const response = await axios.post(BASE_URL + api,  body, {headers });
      return response;
    } catch (error) {
      throw error;
    }
  },
};




// import axios from "axios";
// import { BASE_URL } from "../serviceConfig";

// // Configure default timeout (in milliseconds)
// const API_TIMEOUT = 30000; // 30 seconds

// // Create axios instance with base configuration
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   timeout: API_TIMEOUT,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Token refresh handling
// let isRefreshing = false;
// let failedRequests = [];

// const refreshAuthToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) throw new Error('No refresh token available');
    
//     const response = await apiClient.post('/auth/refresh', { refreshToken });
//     localStorage.setItem('accessToken', response.data.accessToken);
//     localStorage.setItem('refreshToken', response.data.refreshToken);
//     return response.data.accessToken;
//   } catch (error) {
//     localStorage.clear();
//     window.location.href = '/signin';
//     throw error;
//   }
// };

// // Request interceptor for auth token
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => Promise.reject(error));

// // Response interceptor for token refresh
// apiClient.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
    
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           failedRequests.push(() => {
//             originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//             resolve(apiClient(originalRequest));
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const newToken = await refreshAuthToken();
//         apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         failedRequests.forEach(cb => cb());
//         failedRequests = [];
//         return apiClient(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default {
//   getData: async function(api) {
//     try {
//       const response = await apiClient.get(api);
//       return response.data.data;
//     } catch (error) {
//       throw error;
//     }
//   },

//   postData: async function(api, body) {
//     try {
//       const response = await apiClient.post(api, body);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   authGetData: async function(api, token) {
//     try {
//       const response = await apiClient.get(api, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return response;
//     } catch (error) {
//       if (error.response?.status === 401) {
//         localStorage.clear();
//         window.location.href = '/signin';
//       }
//       throw error;
//     }
//   },

//   postAuthData: async function(api, body, token) {
//     try {
//       const response = await apiClient.post(api, body, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   },

//   // Additional method with custom timeout
//   getDataWithTimeout: async function(api, timeout = API_TIMEOUT) {
//     try {
//       const response = await apiClient.get(api, { timeout });
//       return response.data.data;
//     } catch (error) {
//       if (axios.isCancel(error)) {
//         throw new Error('Request timed out');
//       }
//       throw error;
//     }
//   }
// };