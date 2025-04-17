import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Ensures cookies are included in requests
  });

console.log("Base Url: " + BASE_URL);
  
// Conditionally add Authorization header if `authRequired: true` is set in request config
apiClient.interceptors.request.use((config) => {
    if (config.authRequired) { 
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


const api = {
    user: {
        signin: (username, password) =>
        apiClient.post("/user/signin", { username, password }, { authRequired: false }),

        signup: (username, password, firstname, lastname) =>
        apiClient.post("/user/signup", { username, password, firstname, lastname }, { authRequired: false }),
    },

    file: {
        list: () => apiClient.get("/file/list", { authRequired: true }),
        
        upload: (formData) =>
        apiClient.post("/file/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            authRequired: true 
        }),

        share: (fileId) => apiClient.get(`/file/share?id=${fileId}`, { authRequired: true }),
    },
};

  export default api;