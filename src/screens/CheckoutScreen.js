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
  const [currentStep, setCurrentStep] = useState('information');
  const [informationData, setInformationData] = useState(null);
  const [selectedShippingPrice, setSelectedShippingPrice] = useState(0);
  const [selectedShippingOption, setSelectedShippingOption] = useState('Standard');

  const shippingOptions = [
    { label: 'Standard', value: 'Standard', price: 0.00 },
    { label: 'Express', value: 'Express', price: 15.00 },
  ];
  const handleShippingSelection = (optionValue) => {
    const selectedOption = shippingOptions.find(option => option.value === optionValue);
    if (selectedOption) {
      setSelectedShippingPrice(selectedOption.price); // Update the state with the new price
      setSelectedShippingOption(selectedOption.value); // Save the selected option's value
    }
  };



  // Function to advance to the next step
  const handleNextStep = (data) => {
    console.log(data)
    if (currentStep === 'information') {
      setInformationData(data)
    }
    if (currentStep === 'shipping' && data && data.selectedShippingPrice) {
      setSelectedShippingPrice(data.selectedShippingPrice);
    }
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

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => {
      switch (prevStep) {
        case 'shipping':
          return 'information';
        case 'payment':
          return 'shipping';
        // Add cases for other steps if necessary
        default:
          return 'cart'; // or any other default step you prefer
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
      <Header />
      <ScrollView style={styles.container}>
        <CheckoutSummary
          cartItems={cartItems}
          selectedShippingPrice={selectedShippingPrice}
        />
        <CheckoutWizard
          currentStep={currentStep}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
          onShippingSelection={handleShippingSelection}
          selectedShippingOption={selectedShippingOption}
          selectedShippingPrice={selectedShippingPrice}// Pass the selected option
          informationData={informationData}
        />

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

  // Add other styles if necessary
});

export default CheckoutScreen;
