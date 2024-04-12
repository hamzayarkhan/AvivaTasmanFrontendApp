import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CheckoutDetails = ({ currentStep, informationData, selectedShippingOption, selectedShippingPrice }) => {
    console.log(parseFloat(selectedShippingPrice).toFixed(2))
    console.log("Checkout")

    return (
        <View style={styles.section}>
            <Text style={styles.label}>Contact</Text>
            <Text style={styles.content}>{informationData.contact}</Text>
            <Text style={styles.label}>Ship to</Text>
            <Text style={styles.content}>{informationData.addressDetails.address + ', ' + informationData.addressDetails.city + ', ' + informationData.addressDetails.postCode + ', ' + informationData.addressDetails.country}</Text>
            {currentStep === 'payment' && (
                <>
                    <Text style={styles.label}>Shipment Method</Text>
                    <Text style={styles.content}>{`${selectedShippingOption} ($${parseFloat(selectedShippingPrice)})`}</Text>

                </>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        marginBottom: 5,
        marginTop: 5
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 8,
        marginRight: 5
    },
    content: {
        marginBottom: 8,
    },
})

export default CheckoutDetails