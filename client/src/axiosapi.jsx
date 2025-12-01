import axios from "axios";

//  No hardcoded backend IP as frontend do not need URL - just leave empty for same-origin backend url
// Instead of repeating fetch() everywhere with headers + error handling, api.jsx wraps all of that into one reusable helper.
const API_BASE = "";

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// Attach token automatically when provided
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message;
    return Promise.reject(new Error(msg));
  }
);

// this function builds the full url-  General request
export const apiFetch = (path, { method = "GET", body, token } = {}) => {
  const isFormData = body instanceof FormData;

  return api({
    url: path,
    method,
    data: body,
    headers: isFormData
      ? {} 
      : { "Content-Type": "application/json" },
  }).then((res) => res.data);
};

/* GET */
export const apiGet = (path, token) =>
  apiFetch(path, { method: "GET", token });

/* POST */
export const apiPost = (path, body, token) =>
  apiFetch(path, { method: "POST", body, token });

/* PUT */
export const apiPut = (path, body, token) =>
  apiFetch(path, { method: "PUT", body, token });

/* DELETE */
export const apiDelete = (path, token) =>
  apiFetch(path, { method: "DELETE", token });




// These go through the backend - File Upload- need to check the Cloudinary setup 
export const apiUpload = (path, formData, token) =>
  apiFetch(path, { method: "POST", body: formData, token });
