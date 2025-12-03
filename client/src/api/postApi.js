const BASE_URL = "http://localhost:3000";

export async function toggleLike(postId) {
  const res = await fetch(`${BASE_URL}/api/post/${postId}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.msg) {
      throw new Error(errorData.msg);
    }
    throw new Error("Failed to toggle like");
  }

  return res.json();
}

export async function createPost(postData) {
  const res = await fetch(`${BASE_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    if (errorData.msg) {
      throw new Error(errorData.msg);
    }
    throw new Error("Failed to create post");
  }

  return res.json();
}