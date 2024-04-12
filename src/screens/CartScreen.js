import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Header from '../components/layout/Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemDetail from './ItemDetailScreen';


const CartScreen = () => {
    const navigation = useNavigation();
    const [cartItems, setCartItems] = useState([]);
    const isCartEmpty = cartItems?.length === 0;

    useEffect(() => {
        // Fetch cart items from AsyncStorage when the component mounts
        const fetchCartItems = async () => {
            const cartJSON = await AsyncStorage.getItem('cart');
            const cart = cartJSON ? JSON.parse(cartJSON) : [];
            setCartItems(cart);
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        // Update AsyncStorage whenever cartItems changes
        const updateCartStorage = async () => {
            await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        };

        updateCartStorage().catch(console.error);
    }, [cartItems]);
    
    

    const handleQuantityChange = (id, delta) => {
        const updatedCartItems = cartItems.map(item => {
            if (item.id === id) {
                let newQuantity = item.quantity + delta;
                // Ensure the quantity never drops below 1
                newQuantity = Math.max(1, newQuantity);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };
    const handleQuantityInputChange = (id, text) => {
        const quantity = parseInt(text, 10);
        // Check if the quantity is a number and is greater than zero
        if (!isNaN(quantity) && quantity > 0) {
            const updatedCartItems = cartItems.map(item => {
                if (item.id === id) {
                    return { ...item, quantity };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            // Optionally handle invalid input here, such as setting it back to previous valid quantity
            const updatedCartItems = cartItems.map(item => {
                if (item.id === id) {
                    // Keep the quantity the same if the input is not a valid number
                    return item; 
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    };
    

    const handleRemoveItem = (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
    };

    const calculateTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
        return total.toFixed(2);
    };

    return (
        <>
            <Header />
            {isCartEmpty ? (<View style={styles.emptyCartContainer}>
                <Text style={styles.emptyCartMessage}>Your cart is empty</Text>
                <TouchableOpacity
                    style={styles.continueShoppingButton}
                    onPress={() => navigation.navigate('HomeScreen')} // Adjust 'Shop' to the actual route name where you want to navigate
                >
                    <Text style={styles.continueShoppingText}>Continue shopping</Text>
                </TouchableOpacity>
            </View>
            ) : (<View style={styles.container}>
                <Text style={styles.headerTitle}>Your cart</Text>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Table Header */}
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableHeader, styles.tableHeaderTitle]}>PRODUCT</Text>
                        <Text style={[styles.tableHeader, styles.tableHeaderQuantity]}>QUANTITY</Text>
                        <Text style={[styles.tableHeader, styles.tableHeaderTotal]}>TOTAL</Text>
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
                                <TextInput
                                    style={styles.quantityInput}
                                    value={item.quantity.toString()}
                                    onChangeText={(text) => handleQuantityInputChange(item.id, text)}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    maxLength={3}
                                />
                                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)}>
                                    <FontAwesome name="plus" style={styles.quantityButton} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleRemoveItem(item.id)}>
                                    <FontAwesome name="trash" style={styles.deleteButton} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.totalPrice}>${(parseFloat(item.price) * parseInt(item.quantity))}</Text>
                        </View>
                    ))}
                </ScrollView>
                <View style={styles.checkoutContainer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.estimatedTotal}>Estimated total</Text>
                        <Text style={styles.estimatedPrice}>${calculateTotal()} AUD</Text>
                    </View>
            
                    <Text style={styles.taxesShipping}>Taxes, Discounts and shipping calculated at checkout</Text>
                    <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('CheckoutScreen')}>
                        <Text style={styles.checkoutButtonText}>Check out</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.continueShoppingButton}>
                    <Text style={styles.continueShoppingText} onPress={() => navigation.navigate('HomeScreen')} >Continue shopping</Text>
                </TouchableOpacity>
            </View>)}
        </>
      );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    scrollView: {
        marginBottom: 20,
    },
    table: {
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeader: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    productTitle: {
        flex: 1,
        fontSize: 16,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButton: {
        padding: 6,
        fontSize: 14,
        color: '#17588e',
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    totalPrice: {
        fontSize: 16,
        color: 'black',
        width: 60, // Fixed width for better alignment
        textAlign: 'right', // Aligns the text to the right
    },
    checkoutContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        paddingVertical: 20,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
      estimatedTotal: {
        fontSize: 16,
          fontWeight: 'bold',
        marginRight:10
      },
      estimatedPrice: {
        fontSize: 16,
        color:"green"
      },
    taxesShipping: {
        fontSize: 12,
        color: '#777',
        marginBottom: 10,
    },
    checkoutButton: {
        backgroundColor: '#17588e',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        
    },
    checkoutButtonText: {

        fontWeight: 'bold',
        color: 'white',
    },
 
    continueShoppingText: {
    
        color: '#17588e',
        textAlign: 'center',
    },
    // Explicit widths to align headers with columns
    tableHeaderProduct: {
        width: 60, // Adjust based on the size of your product image
        marginRight: 10,
    },
    tableHeaderTitle: {
        flex: 1, // Takes the rest of the space
        marginLeft: 10,
    },
    tableHeaderQuantity: {
        width: 140, // Adjust based on the width of your quantity container
        marginLeft: 0,
        
    },
    tableHeaderTotal: {
        width: 80, // Adjust based on your layout
        marginRight: 0,
        textAlign: 'right',
    },
    deleteButton: {
        fontSize: 18,
        color: 'red',
        marginLeft: 10,
    },
    quantityInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        width: 50,  // Ensuring it does not expand too much
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        backgroundColor: '#ffffff',
      },
      emptyCartMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
      },
     
});


export default CartScreen;
