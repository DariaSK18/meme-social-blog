import React, { useEffect, useState } from "react";
import { apiGet } from "../axiosapi";
import MemeCard from "../components/MemeCard";
import { useSearchParams } from "react-router-dom";
import "../styles/Search.css";


export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q")?.trim() || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!q) {
      setResults([]);
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await apiGet(`/api/memes/search?q=${encodeURIComponent(q)}`);
        setResults(res.memes || []);
      } catch (err) {
        setError("Something went wrong while searching.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [q]);

  return (
    <div className="search-page">
      <h2>Search results for "{q}"</h2>

      {loading && <p className="info">Loading...</p>}
      
      {error && <p className="error">{error}</p>}

      {!loading && !error && results.length === 0 && (
        
        <p className="no-results">No results found.</p>
      )}

      <div className="search-results-grid">
        {results.map((meme) => (
          <MemeCard key={meme.id} meme={meme} />
        ))}
      </div>
    </div>
  );
}