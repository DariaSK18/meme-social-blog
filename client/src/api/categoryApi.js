const BASE_URL = import.meta.env.VITE_API_URL;

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/api/post?limit=1000`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to fetch categories");

  const data = await res.json();
  const posts = data.data?.posts || [];
  const categoryNames = posts.map(p => p.category).filter(Boolean);
  const categories = categoryNames.filter((name, index) => categoryNames.indexOf(name) === index);

  return categories.map(name => ({
    name,
    count: posts.filter(p => p.category === name).length
  }));
}

