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

  const visibleProducts = products.filter(product => {
    if (selectedOwner === 0) {
      return true;
    }

    return product.user?.id === selectedOwner;
  });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <FilterNavigation
            users={usersFromServer}
            selectedOwner={selectedOwner}
            onOwnerChange={setSelectedOwner}
          />
        </div>

        <div className="box table-container">
          <ProductTable products={visibleProducts} />
        </div>
      </div>
    </div>
  );
};
