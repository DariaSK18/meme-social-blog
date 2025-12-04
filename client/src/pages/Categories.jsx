import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";
import { getCategories } from "../api/categoryApi";
import "../styles/categories.css";
import SpotlightCard from "../component/SpotlightCard";
import ElectricBorder from "../component/ElectricBorder";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);
      } catch {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/?category=${categoryName}`);
  };

  return (
    <div className="categories-container">
      <SpotlightCard
        className="custom-spotlight-card"
        spotlightColor="rgba(0, 229, 255, 0.2)"
      >
        <div className="categories-header">
          <h1>Categories</h1>
        </div>
      </SpotlightCard>

      {categories.length === 0 ? (
        <div className="categories-empty">
          <p>No categories available yet</p>
        </div>
      ) : (
        <div className="categories-grid">
          {categories.map((category, index) => (
            <ElectricBorder
              color="#f66f303b"
              speed={1}
              chaos={0.4}
              thickness={2}
              style={{ borderRadius: 10 }}
            >
              <div
                key={index}
                className="category-card"
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="category-icon">
                  <FontAwesomeIcon icon={faTags} />
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} posts</p>
              </div>
            </ElectricBorder>
          ))}
        </div>
      )}
    </div>
  );
}
