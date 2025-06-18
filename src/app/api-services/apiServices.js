import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiInstanceWithToken = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiInstanceWithoutToken = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

apiInstanceWithToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const handleResponseError = (error) => {
  console.log("API error:", error);
  return Promise.reject(error);
};

apiInstanceWithToken.interceptors.response.use(
  (response) => response,
  handleResponseError
);
apiInstanceWithoutToken.interceptors.response.use(
  (response) => response,
  handleResponseError
);

export const ApiService = {
  get: (endpoint, params = {}, withToken = true) => {
    const instance = withToken ? apiInstanceWithToken : apiInstanceWithoutToken;
    return instance.get(endpoint, { params });
  },

  post: (endpoint, data, withToken = true) => {
    const instance = withToken ? apiInstanceWithToken : apiInstanceWithoutToken;
    return instance.post(endpoint, data);
  },

  put: (endpoint, data, withToken = true) => {
    const instance = withToken ? apiInstanceWithToken : apiInstanceWithoutToken;
    return instance.put(endpoint, data);
  },

  delete: (endpoint, withToken = true) => {
    const instance = withToken ? apiInstanceWithToken : apiInstanceWithoutToken;
    return instance.delete(endpoint);
  },
};

export default ApiService;
