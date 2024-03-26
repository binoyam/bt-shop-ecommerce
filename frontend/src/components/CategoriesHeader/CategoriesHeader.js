import "./CategoriesHeader.css";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import paths from "../../Paths";

function CategoriesHeader() {
  const [categoryName, setCategoryName] = useState("All");
  const location = useLocation();
  useEffect(() => {
    const pagePath = location.pathname;
    const category = Object.keys(paths).find((key) => paths[key] === pagePath);
    setCategoryName(category || "All");
  }, [location]);

  return (
    <div className="categories">
      <h2 className="categories-title">{categoryName}</h2>
      <ul className="category-links">
        {Object.keys(paths).map((key) => (
          <li key={key}>
            <Link
              className={`prd-category-link ${
                categoryName === key ? "selected" : ""
              }`}
              to={paths[key]}
              onClick={() => setCategoryName(key)}
            >
              {key}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesHeader;
