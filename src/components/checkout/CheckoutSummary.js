import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CheckoutSummary = ({ cartItems }) => {
    const calculateTotal = () => {
        return cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0).toFixed(2);
    };

    return ( 
        <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Checkout Summary</Text>
            {cartItems.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                    <View style={styles.imageContainer}>
                        <Image source={item.image_url} style={styles.productImage} />
                        <View style={styles.quantityContainer}>
                            <Text style={styles.quantity}>{item.quantity}</Text>
                        </View>
                    </View>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Text style={styles.itemPrice}>${parseFloat(item.price).toFixed(2)}</Text>
                    
                </View>
                
                
            ))}
              <View style={styles.subTotalRow}>
                <Text style={styles.subTotalLabel}>Subtotal</Text>
                <Text style={styles.subTotalValue}>${calculateTotal()}</Text>
            </View>
            <View style={styles.totalRow}>
                <Text >Shipping</Text>
                <Text>Calculated at next step</Text>
            </View>
            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>AUD ${calculateTotal()}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    summaryContainer: {
        padding: 10,
        paddingVertical :-10
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    imageContainer: {
        position: 'relative',
    },
    productImage: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    quantityContainer: {
        position: 'absolute',
        top: -10,
        right: -3,
        backgroundColor: 'gray', // Change the color as needed
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantity: {
        color: 'white',
        fontWeight: 'bold',
    },
    itemName: {
        flex: 1,
        marginLeft: 10, // Adjust the spacing as needed
    },
    itemPrice: {
        
    },
    subTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        
    },
    totalLabel: {
        fontWeight: 'bold',

    },
    subTotalValue:{
        fontWeight: 'bold',
    },
    totalValue: {
        fontWeight: 'bold',
        fontSize:18
    },
    // ... any other styles you have
});

export default CheckoutSummary;
