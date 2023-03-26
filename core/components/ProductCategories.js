import { useCategory } from "@/contexts/CategoriesContexts";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/config/urls";

const ProductCategories = () => {
  const [allCategories, setAllCategories] = useState([]);
  const { category, setCategory } = useCategory();

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${API_URL}/categories/`);
      const data = await res.json();
      setAllCategories(data);
    };

    getCategories();
  }, []);
  return (
    <div class="mega-category-menu">
      <span class="cat-button">
        <i class="lni lni-menu"></i>
        {category === "" ? "ALL CATEGORIES" : category.toUpperCase()}
      </span>
      <ul class="sub-category">
        <li onClick={() => setCategory("")}>
          <a>
            ALL CATEGORIES <i class="lni lni-chevron-right"></i>
          </a>
        </li>
        {allCategories.map((cat) => (
          <li onClick={() => setCategory(cat.name)}>
            <a>
              {cat.name.toUpperCase()} <i class="lni lni-chevron-right"></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
