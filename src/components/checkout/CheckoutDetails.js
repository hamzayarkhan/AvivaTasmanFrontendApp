import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CheckoutDetails = (currentStep, informationData) => {
    console.log(currentStep)
    console.log(informationData)
  return (
    <View style={styles.section}>
                <Text style={styles.label}>Contact</Text>
                <Text style={styles.content}>{informationData.contact}</Text>
                <Text style={styles.label}>Ship to</Text>
                <Text style={styles.content}></Text>
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