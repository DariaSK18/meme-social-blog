import { apiGet } from "../axiosapi";

export function fetchPosts(page, limit) {
  return apiGet(`/api/posts?page=${page}&limit=${limit}`);
}