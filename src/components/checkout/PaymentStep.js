import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import CheckoutDetails from './CheckoutDetails';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"
import CreditCardDetails from './payment-methods/CreditCardDetails';

const PaymentStep = ({ onNext, onPrevious, informationData, selectedShippingOption, selectedShippingPrice }) => {
    const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod"); // default to "cod"
    const handleCreditCardChange = (data) => {
        console.log('Credit Card Data:', data);
        // You can also handle state updates or validations here if needed
    };

    console.log(informationData)
    console.log('payment components')
    return (
        <View style={styles.container}>
            <CheckoutDetails
                currentStep='payment'
                informationData={informationData}
                selectedShippingOption={selectedShippingOption}
                selectedShippingPrice={selectedShippingPrice}
            />
            <View style={styles.section}>
                <Text style={styles.header}>Payment Method</Text>
                <RadioButtonGroup
                    containerStyle={styles.radioContainer}
                    selected={selectedPaymentMethod}
                    onSelected={setSelectedPaymentMethod}
                    radioBackground="#17588e"
                >
                    <RadioButtonItem value="cod" label={
                            <View style={styles.radioLabelContainer}>
                                <Text style={styles.radioLabel}>Cash on Delivery(COD)</Text>
                            </View>
                        
                        }/>
                    <RadioButtonItem
                        value="UCCS"
                        label={
                            <View style={styles.radioLabelContainer}>
                                <Text style={styles.radioLabel}>UCCS</Text>
                            </View>
                        }
                    />
                    <RadioButtonItem
                        value="creditCard"
                        label={
                            <View style={styles.radioLabelContainer}>
                                <Text style={styles.radioLabel}>Credit Card</Text>
                            </View>
                        }
                    />
                </RadioButtonGroup>
                <View>
                    {selectedPaymentMethod === 'creditCard' && <CreditCardDetails onCreditCardChange={handleCreditCardChange} />}
                </View>
                
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={onPrevious}>
                    <Text style={styles.buttonOutlineText}>Return to payment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonFilled]} onPress={onNext}>
                    <Text style={styles.buttonText}>Complete Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioContainer: {
        borderWidth: 1,
        borderColor: '#eee',
        padding: 10
    },
    radioLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Push label left and price right
        alignItems: 'center', // Align items vertically
        paddingVertical: 8, // Add padding between radio items
    },
    radioLabel: {
        flex: 0.9,
        marginRight: 5
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 15,
        flex: 1, // Each button will take up half the space
        marginHorizontal: 5,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#17588e',
    },
    buttonOutlineText: {
        color: '#17588e',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonFilled: {
        backgroundColor: '#17588e',
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    // Add additional styles as needed
});

export default PaymentStep