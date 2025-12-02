const BASE_URL = "http://localhost:3000";

export async function toggleLike(postId) {
  debugger
  const res = await fetch(`${BASE_URL}/api/post/${postId}/like`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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

