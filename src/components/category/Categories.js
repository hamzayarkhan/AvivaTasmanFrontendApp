// Categories.js
import { View, FlatList } from 'react-native';
import React from 'react';

import Category from './Category';
import { categoriesData } from '../../services/catagories';

const Categories = () => {
  const renderCategory = ({ item }) => {
    return <Category name={item.name} imageUrl={item.image} />;
  };

  return (
    <FlatList
      data={categoriesData}
      renderItem={renderCategory}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} // Adjust the number of columns as needed
      columnWrapperStyle={{ justifyContent: 'space-between' }}
    />
  );
};

export default Categories;
