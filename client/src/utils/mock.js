// TEST before backend exists - run app without backend


import memes from "../mock/memes.json";
import { makeId } from "./makeId";

export function getMockPosts(page = 1, limit = 5) {
  const start = (page - 1) * limit;
  return memes.slice(start, start + limit);
}

export function createMockPost(post) {
  return {
    ...post,
    _id: makeId(),
    createdAt: new Date().toISOString(),
    likes: [],
    comments: [],
  };
}