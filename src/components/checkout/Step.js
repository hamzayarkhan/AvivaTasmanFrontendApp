import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React from 'react'

const Step = ({ title, currentStep, stepName }) => {
    const isSelected = currentStep === stepName;
    const navigation = useNavigation(); // Hook to get the navigation object

    const handleStepPress = () => {
        if (stepName === 'cart') {
            navigation.navigate('CartScreen'); // Replace 'CartScreen' with your actual cart screen route name
        }
        // Add more conditions for other steps if necessary
    };

    return (
      <TouchableOpacity
        onPress={handleStepPress}
        style={[styles.stepContainer, isSelected && styles.selectedStepContainer]}>
        <Text style={[styles.stepText, isSelected && styles.selectedStepText]}>
          {title}
        </Text>
        {title !== "Payment" && <Text style={styles.arrowText}> {'>'} </Text>}
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    stepContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // Additional styles for the step container
    },
    stepText: {
      fontSize: 14,
      color: '#A9A9A9', // Unselected Step Color
      fontWeight: 'normal',
      // Additional styles may be needed
    },
    selectedStepText: {
      color: 'black', // Selected Step Color
      fontWeight: 'bold', // Underline color Ensure underline does not overlap text
    },
    arrowText: {
      fontSize: 18,
      color: '#A9A9A9', // Arrow color, set to same as unselected text color
      fontWeight: 'normal',
      paddingHorizontal: 4, // Space around the arrow
    },
    // Add other styles if necessary
  });
export default Step