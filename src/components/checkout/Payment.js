import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CheckoutDetails from './CheckoutDetails';

const Payment = ({onNext, onPrevious, informationData, selectedShippingOption,selectedShippingPrice}) => {
  return (
    <View style={styles.container}>
          <CheckoutDetails
              currentStep={'payment'}
              informationData={informationData}
              selectedShippingOption={selectedShippingOption}
              selectedShippingPrice={selectedShippingPrice}
          />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    
    paymentHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    paymentOption: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
    },
    billingHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    backButton: {
      marginBottom: 10,
    },
    completeOrderButton: {
      backgroundColor: '#17588e',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    completeOrderButtonText: {
      color: '#ffffff',
      fontWeight: 'bold',
    },
    // Add additional styles as needed
  });

export default Payment