import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import ItemCard from './ItemCard';
import { ProductService } from '../../services/ProductService';

// Helper function to group items into rows of 2
const groupItemsInPairs = (items) => {
    const pairs = [];
    for (let i = 0; i < items.length; i += 2) {
        pairs.push([items[i], items[i + 1] ? items[i + 1] : null]);
    }
    return pairs;
};

const ItemsList = () => {
    
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setError("");
                const response = await ProductService.FetchProducts()
                const sortedData = response.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
                setItems(sortedData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    const itemPairs = groupItemsInPairs(items);
    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            {itemPairs.map((pair, index) => (
                <View key={index} style={styles.row}>
                    {pair.map((item, index) => 
                        item ? <ItemCard key={item.id} p={item}/> : <View key={index} style={styles.placeholderCard}></View>
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
