import "./Categories.css";
import CategoriesHeader from "../CategoriesHeader/CategoriesHeader";
import { Outlet } from "react-router-dom";
function Categories() {
  return (
    <div className="categories-page">
      <CategoriesHeader />
      <Outlet />
    </div>
  );
}

export default Categories;
