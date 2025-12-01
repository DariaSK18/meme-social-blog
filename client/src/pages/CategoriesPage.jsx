import React from "react";
import "../styles/CategoriesPage.css";
import WeNeed from "../assets/weneed.png";


const TAGS = [
  "funny",
  "animals",
  "politics",
  "gaming",
  "sports",
  "school",
  "dark-humor",
  "wholesome",
  "anime"
];

function CategoriesPage() {
  return (
    <div className="categories-page">
<img src={WeNeed} alt="Category Icon" />

      <h2 className="title">Popular Tags</h2>

      <div className="tag-list">
        {TAGS.map((tag) => (
          <span key={tag} className="tag-pill">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;