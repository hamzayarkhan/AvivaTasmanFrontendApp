import React from 'react';
import { FlatList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from './ItemCard';
import { productsData } from '../../services/products';

const ItemsList = () => {
  const renderItem = ({ item }) => (
    <ItemCard key={item.id.toString()} p={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={productsData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2} // Display 2 items per row
        // If you have additional styles for spacing and alignment, they can be added here
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

  },
});

export default ItemsList;
