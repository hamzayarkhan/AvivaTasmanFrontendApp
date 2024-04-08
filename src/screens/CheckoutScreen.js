// CheckoutScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckoutSummary from '../components/checkout/CheckoutSummary';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CheckoutWizard from '../components/checkout/CheckoutWizard';

const CheckoutScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [currentStep, setCurrentStep] = useState('information'); // 'cart', 'information', 'shipping', 'payment'

  // Function to advance to the next step
  const handleNextStep = () => {
    setCurrentStep(prevStep => {
      switch (prevStep) {
        case 'cart':
          return 'information';
        case 'information':
          return 'shipping';
        case 'shipping':
          return 'payment';
        case 'payment':
          // Handle the completion of the checkout process here
          return 'complete'; // or navigate to a different screen
        default:
          return 'cart'; // Loop back to the start or handle as needed
      }
    });
  };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartJSON = await AsyncStorage.getItem('cart');
                const cart = cartJSON ? JSON.parse(cartJSON) : [];
                setCartItems(cart);
            } catch (error) {
                Alert.alert('Error', 'Failed to load cart items.');
            }
        };

        fetchCartItems();
    }, []);



    return (
        <>
            <Header/>
            <ScrollView style={styles.container}>
                <CheckoutSummary cartItems={cartItems} />
            <CheckoutWizard currentStep={currentStep} onNext={handleNextStep}/>

            </ScrollView>
            {/* <Footer/> */}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    // Add other styles if necessary
});

export default CheckoutScreen;
