// TEST mock IDs before backend exists

export function formatDate(dateString) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString();
}
