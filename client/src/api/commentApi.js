const BASE_URL = import.meta.env.VITE_API_URL;

//get comments for a post
export async function getComments(postId) {
  const res = await fetch(`${BASE_URL}/api/comment/${postId}`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.msg) {
      throw new Error(errorData.msg);
    }
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}

//create a new comment for a post
export async function createComment(postId, text) {
  const res = await fetch(`${BASE_URL}/api/comment/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.msg) {
      throw new Error(errorData.msg);
    }
    throw new Error("Failed to create comment");
  }

  return res.json();
}

