import React, { createContext, useState } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // استبدل هذا بجلب بياناتك
    const fetchCategories = async () => {
      const response = await fetch("/api/categories"); // مثلاً، قم بتحديث هذا المسار
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
