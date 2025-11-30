import { useState, useEffect } from "react";

export default function usePaginatedFetch(fetchFn, pageSize = 5) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function loadPage(p = page) {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetchFn(p, pageSize);
      const data = res.data || res;

      if (!data.length) {
        setHasMore(false);
        return;
      }

      setItems((prev) => [...prev, ...data]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPage(page);
  }, [page]);

  return {
    items,
    loading,
    hasMore,
    loadMore: () => setPage((prev) => prev + 1),
    reset: () => {
      setItems([]);
      setPage(1);
      setHasMore(true);
    },
  };
}
