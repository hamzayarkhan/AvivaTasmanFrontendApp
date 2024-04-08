import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {useNavigation} from "@react-navigation/native"

const ItemCard = ({ p }) => {
    const navigation = useNavigation();
    const handleDetails =(id) => {
        navigation.navigate("ItemDetailScreen",{id:id})
    }
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress= {()=> handleDetails(p.id)}>
                <View style={styles.card}>
                    <Image source={p.image_url} style={styles.image} />
                    <Text style={styles.title}>{p.title}</Text>
                    <Text style={styles.price}>{p.price}</Text>
                </View>
            </TouchableOpacity>
           
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1, // Ensure the card attempts to take up half the row
    },
    card: {
        backgroundColor: "#fff",
        padding: 10,
        alignItems: 'center',
    },
    image: {
        height: 150,
        width: "100%",
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 5,
    },
    price: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default ItemCard;
