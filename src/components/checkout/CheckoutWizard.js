import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Step from './Step';
import InformationForm from './InformationForm';
import Shipping from './Shipping';
import Payment from './Payment';

const CheckoutWizard = ({ currentStep, onNext, onPrevious, onShippingSelection, selectedShippingOption,selectedShippingPrice, informationData }) => {
  
    return (
        <>
            <View style={styles.headerContainer}>
                <Step title="Cart" currentStep={currentStep} stepName="cart" />
                <Step title="Information" currentStep={currentStep} stepName="information" />
                <Step title="Shipping" currentStep={currentStep} stepName="shipping" />
                <Step title="Payment" currentStep={currentStep} stepName="payment" />
            </View>
            <View>
                {currentStep === "information" && <InformationForm onNext={onNext} informationData={informationData} />}
                {currentStep === "shipping" && (
                    <Shipping
                        onNext={() => onNext('payment')}
                        onPrevious={onPrevious}
                        onShippingSelection={onShippingSelection}
                        selectedShippingOption={selectedShippingOption}
                        informationData={informationData}
                    />
                )}
                {currentStep === 'payment' && (

                    <Payment
                        onNext={() => onNext('complete')}
                        onPrevious={onPrevious}
                        informationData={informationData}
                        selectedShippingOption={selectedShippingOption}
                        selectedShippingPrice = {selectedShippingPrice}                   
                    />
                )
                
                }
            </View>
        </>


    );
};



const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Changed to 'flex-start' to align at the start
        padding: 10,
        // Additional styles may be needed
    },
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

export default CheckoutWizard;
