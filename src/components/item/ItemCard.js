import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ItemCard = ({ p }) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Image source={p.image_url} style={styles.image} />
                <Text style={styles.title}>{p.title}</Text>
                <Text style={styles.price}>{p.price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        margin: 5, // Adjust the spacing between cards here
    },
    card: {
        borderWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#fff",
        padding: 10, // Space between card content and card borders
        alignItems: 'center', // Center content horizontally
    },
    image: {
        height: 150,
        width: "100%",
        resizeMode: 'contain', // Adjust based on how you want images to fit
    },
    title: {
        fontSize: 12,
        textAlign: "center",
        marginVertical: 5, // Adds space above and below the title
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default ItemCard;
