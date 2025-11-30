
// GET request

export async function mockFetchPosts(page = 1, limit = 5) {
const start = (page - 1) * limit;
const end = start + limit;
return mockMemes.slice(start, end);
}