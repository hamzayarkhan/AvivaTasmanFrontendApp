import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CreditCardDetails = ({ onCreditCardChange }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');

    useEffect(() => {
        onCreditCardChange({
            cardNumber,
            expiryDate,
            cvv,
            cardholderName
        });
    }, [cardNumber, expiryDate, cvv, cardholderName]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Credit Card Details</Text>
            <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Expiry Date (MM/YY)"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={setExpiryDate}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
            />
            <TextInput
                style={styles.input}
                placeholder="Cardholder Name"
                value={cardholderName}
                onChangeText={setCardholderName}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    }
});

export default CreditCardDetails;
