import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button"

const Shipping = ({ onNext, onPrevious, onShippingSelection, selectedShippingOption, informationData }) => {
    const [selectedOption, setSelectedOption] = useState(selectedShippingOption);
    const handleSelectionChange = (value) => {
        setSelectedOption(value); // This updates the local state
        onShippingSelection(value); // This updates the parent state, preserving selection across navigation
    };
    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.label}>Contact</Text>
                <Text style={styles.content}>{informationData.contact}</Text>
                <Text style={styles.label}>Ship to</Text>
                <Text style={styles.content}>{informationData.addressDetails.address + ', ' + informationData.addressDetails.city + ', ' + informationData.addressDetails.postCode + ', ' + informationData.addressDetails.country}</Text>
            </View>


            <View style={styles.section}>
                <Text style={styles.header}>Shipping method</Text>
                <RadioButtonGroup
                    containerStyle={styles.radioContainer}
                    onSelected={handleSelectionChange}
                    selected={selectedOption}
                    radioBackground="#17588e"
                >
                    <RadioButtonItem
                        value="Standard"
                        onSelected={handleSelectionChange}
                        selected={selectedOption}
                        label={
                            <View style={styles.radioLabelContainer}>
                                <Text style={styles.radioLabel}>Standard</Text>
                                <Text style={styles.price}>Free</Text>
                            </View>
                        }
                    />
                    <RadioButtonItem
                        value="Express"
                        label={
                            <View style={styles.radioLabelContainer}>
                                <Text style={styles.radioLabel}>Express</Text>
                                <Text style={styles.price}>$15.00</Text>
                            </View>
                        }
                    />
                </RadioButtonGroup>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={onPrevious}>
                    <Text style={styles.buttonText}>Return to information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.continueButton]} onPress={() => onNext('payment')}>
                    <Text style={styles.continueButton}>Continue to payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        padding: 10,
    },
    section: {
        marginBottom: 5,
        marginTop: 5
    },
    sectionRow: {
        flexDirection: 'row',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
        marginRight: 5
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        marginBottom: 8,
    },
    changeText: {
        color: '#17588e',
        marginBottom: 8,
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
    price: {
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#17588e',
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: '#17588e',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    continueButton: {
        backgroundColor: '#17588e',
        borderColor: '#17588e',
        color: '#ffffff',
        fontWeight: 'bold'

    },
    // Add any additional styling you need
});


export default Shipping