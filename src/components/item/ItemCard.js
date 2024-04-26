import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import resolveProductImage from '../../utils/customfunctions';

const ItemCard = ({ p }) => {
    const navigation = useNavigation();
    const handleDetails = (id) => {
        console.log(id)
        if (id) {
            navigation.navigate("ItemDetailScreen", { id: id });
        }
        else {
            Alert.alert("Item id not found")
        }
        
    };
    const productImage = resolveProductImage(p.name);


    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={() => handleDetails(p.id)} style={styles.touchArea}>
                <Image source={productImage} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{p.name}</Text>
                    <Text style={styles.price}> {p.variants ? p.variants[0].sales_price : "N/A"} PHP</Text>
                </View>
            </TouchableOpacity> 
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        padding: 5,
        flexDirection: 'column', // Ensures that the card uses a column layout
        alignItems: 'center',
        marginBottom:10// Center items horizontally in the container
    },
    touchArea: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: 'hidden', // Ensures that all content respects the border radius
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        width: '100%', // Ensures the touch area fills the container width
        alignItems: 'center', // Center items horizontally
    },
    image: {
        height: 150, // Fixed height for all images
        width: '100%', // Makes the image take the full width of the card
        resizeMode: 'cover', // Cover ensures the aspect ratio is maintained while filling the area
    },
    textContainer: {
        padding: 16, // Adds padding inside the text container
        alignItems: 'center', // Align text items to the center
        width: '100%', // Ensure the text container fills the width of the card
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8, // Adds space between the title and the price
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4CAF50", // Green text for price
        textAlign: "center",
    },
});

export default ItemCard;
