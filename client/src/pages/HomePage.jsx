// src/pages/HomePage.jsx
import React from "react";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { fetchPosts } from "../services/fetchPosts";
import { useSession } from "../context/SessionContext";


import PostComposer from "../components/PostComposer";
import MemeCard from "../components/MemeCard";
import RandomMeme from "../components/RandomMeme";
import CategoriesPage from "../pages/CategoriesPage";
import "../styles/Home.css";


export default function HomePage() {

  const { user } = useSession();

  const {
    items: memes,
    loading,
    hasMore,
    loadMore,
  } = usePaginatedFetch(fetchPosts, 5);

  return (
    <div className="home-container">
      {/* Main left Column */}
      <div className="main-left">

      {/* Only log-in user sees composer */}
      {user && (
        <PostComposer
          onPost={(newPost) =>
            console.log("Post created (mock for now):", newPost)

          }
        />
        )}

        {/* Render post cards- limits memecard to first 5 memes*/}
          {memes.slice(0, 5).map((meme, index) => (
            <MemeCard key={meme._id || meme.id || index} meme={meme} />
        ))}

        {/* Load more */}

        {hasMore && (
          <button
            disabled={loading}
            onClick={loadMore}
            className="load-more-btn"
          >
            {loading ? "Loading..." : "I want to see more "}
          </button>
        )}
      </div>


      {/* Main right Column */}
      <div className="main-right">
        <RandomMeme memes={memes} />
        <CategoriesPage />
      </div>
    </div>
  );
}
