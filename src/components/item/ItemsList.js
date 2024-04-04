import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { productsData } from '../../services/products';
import ItemCard from './ItemCard';

// Helper function to group items into rows of 2
const groupItemsInPairs = (items) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
        pairs.push([items[i], items[i + 1] ? items[i + 1] : null]);
    }
    return pairs;
};

const ItemsList = () => {
    const itemPairs = groupItemsInPairs(productsData);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            {itemPairs.map((pair, index) => (
                <View key={index} style={styles.row}>
                    {pair.map((item, index) => 
                        item ? <ItemCard key={item.id} p={item}/> : <View key={index} ></View>
                    )}
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingBottom: 150,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // Adds spacing on the sides of the grid
    },
    placeholderCard: {
        flex: 1,
        margin: 5,
    },
});

export default ItemsList;
