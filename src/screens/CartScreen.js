import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';



const CartScreen = () => {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            title: 'Food Package',
            price: 81.00,
            quantity: 1,
            image_url: require('../../assets/images/FoodPackage.png') // Replace with your image require
        },
        {
            id: 2,
            title: 'Food Package',
            price: 81.00,
            quantity: 1,
            image_url: require('../../assets/images/FoodPackage.png') // Replace with your image require
        },

        // ... other cart items if needed
    ]);

    const handleQuantityChange = (id, delta) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            }).filter((item) => item.quantity > 0) // This will filter out items with 0 quantity
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <>
            <Header />
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Your cart</Text>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}></Text>
                            <Text style={styles.tableHeader}>PRODUCT</Text>
                            <Text style={styles.tableHeader}>QUANTITY</Text>
                            <Text style={styles.tableHeader}>TOTAL</Text>
                        </View>

                        {/* Table Rows */}
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.tableRow}>
                            <Image source={item.image_url} style={styles.productImage} />
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <View style={styles.quantityContainer}>
                              <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)}>
                                <FontAwesome name="minus" style={styles.quantityButton} />
                              </TouchableOpacity>
                              <Text style={styles.quantityText}>{item.quantity}</Text>
                              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                                <FontAwesome name="plus" style={styles.quantityButton} />
                              </TouchableOpacity>
                              <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                                <FontAwesome name="trash" style={styles.deleteButton} />
                              </TouchableOpacity>
                            </View>
                            <Text style={styles.totalPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                          </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={styles.checkoutContainer}>
                    <Text style={styles.estimatedTotal}>Estimated total</Text>
                    <Text style={styles.totalPrice}>${calculateTotal()} AUD</Text>
                    <Text style={styles.taxesShipping}>Taxes, Discounts and shipping calculated at checkout</Text>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Check out</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.continueShoppingButton}>
                    <Text style={styles.continueShoppingText}>Continue shopping</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    // ... other styles
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
    tableHeader: {
        fontWeight: 'bold',
        flex: 1,
        
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        resizeMode: 'contain',
    },
    deleteButton: {
        padding: 5,
        fontSize: 16,
        color: '#FF0000',
        minWidth: 40, // Ensure the touch area is large enough
        textAlign: 'center', // Center the icon text
      },
      productTitle: {
        flex: 2,
        fontSize: 16, // Your preferred font size
        textAlign: 'left', // Align text to the left
        marginRight: 10, // Add some margin if needed
      },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Adjust spacing between minus, quantity, and plus
        flex: 1, // Take up the full flex container
        paddingVertical: 10,
      },
      quantityButton: {
        padding: 5,
        fontSize: 16,
        color: '#17588e',
        minWidth: 40, // Ensure the touch area is large enough
        textAlign: 'center', // Center the icon text
      },
      quantityText: {
        fontSize: 16,
        minWidth: 40, // To ensure alignment and proper spacing
        textAlign: 'center', // Center the quantity number
      },
    totalPrice: {
        flex: 1,
        textAlign: 'right',
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    scrollView: {
        flex: 1,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    itemTitle: {
        fontSize: 16,
        flex: 1,
        paddingHorizontal: 10,
    },
    itemPrice: {
        fontSize: 16,
        color: '#333',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    quantityButton: {
        fontSize: 10,
        color: '#17588e',
        marginHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
    },
    totalPrice: {
        fontSize: 16,
        color: '#333',
    },
    checkoutContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 20,
    },
    estimatedTotal: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    taxesShipping: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
    },
    checkoutButton: {
        backgroundColor: '#17588e',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 15
    },
    checkoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    continueShoppingButton: {
        // Style for the continue shopping button if needed
    },
    continueShoppingText: {
        fontSize: 16,
        color: 'black',
        fontStyle: "italic",
        textAlign: 'right',
    },
});

export default CartScreen;
