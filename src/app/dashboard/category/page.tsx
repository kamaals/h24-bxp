/* istanbul ignore file @preserve */

import React from "react";
import CategoriesTree from "@/components/molecules/tree/categories-tree";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories List",
  description: "Product CRUD Categories list",
};

function CategoryPage() {
  return (
    <section>
      <header>
        <h2>Categories List</h2>
      </header>
      <CategoriesTree />
    </section>
  );
}
export default CategoryPage;
