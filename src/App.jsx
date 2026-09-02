/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import FilterNavigation from './components/FilterNavigation/FilterNavigation';
import './App.scss';
import ProductTable from './components/ProductTable/ProductTable';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const category = categoriesFromServer.find(
    cat => cat.id === product.categoryId,
  );
  const user = usersFromServer.find(u => u.id === category.ownerId);

  return {
    ...product,
    user,
    category,
  };
});

export const App = () => {
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const visibleProducts = products.filter(product => {
    const filterByOwner =
      selectedOwner === 0 || product.user?.id === selectedOwner;

    const filterByInput = product.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const filterByCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category.id);

    return filterByOwner && filterByInput && filterByCategory;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <FilterNavigation
            users={usersFromServer}
            categories={categoriesFromServer}
            selectedOwner={selectedOwner}
            onOwnerChange={setSelectedOwner}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedCategories={selectedCategories}
            onCategoryChange={setSelectedCategories}
          />
        </div>

        <div className="box table-container">
          <ProductTable products={visibleProducts} />
        </div>
      </div>
    </div>
  );
};
