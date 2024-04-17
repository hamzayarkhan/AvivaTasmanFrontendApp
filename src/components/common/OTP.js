import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';

const OTP = ({ visible, onClose, email }) => {
    const [otp, setOtp] = useState('');

    // State for handling resend cooldown logic
    const [resendCooldown, setResendCooldown] = useState(false);
    const [cooldownTimer, setCooldownTimer] = useState(0);

    useEffect(() => {

    }, []);

    const handleSubmit = async () => {
        if (otp.length !== 6 || !/^\d+$/.test(otp)) {
            showAlert("Error", "OTP must be a 6-digit number.");
            return;
        }

        //verifyOTP function
        const verifyResult = await verifyOTP({ email, otp });

        if (verifyResult.success) {
            showAlert("Success", "OTP verified successfully!");

        } else {
            showAlert("Error", verifyResult.error || "Verification failed. Please try again.");
        }
    };

    const handleResendOTP = () => {
        if (resendCooldown) return; // If currently in cooldown, do nothing
        setResendCooldown(true);
        setCooldownTimer(30); // Example cooldown period of 30 seconds



        showAlert("Info", 'OTP resent successfully!');

        // Countdown logic to end cooldown
        const countdown = setInterval(() => {
            setCooldownTimer(prevTimer => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setResendCooldown(false);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const showAlert = (title, message) => {
        Alert.alert(
            title,
            message,
            [{ text: "OK" }],
            { cancelable: false }
        );
    };

    //function for OTP verification
    const verifyOTP = async ({ email, otp }) => {




        return { success: true };
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.centeredView} onPress={onClose}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Verify OTP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        value={otp}
                        onChangeText={text => setOtp(text)}
                    />
                    
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleResendOTP}>
                            <Text style={styles.buttonOutlineText}>Resend OTP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonFilled]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>


        </Modal>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: '80%',
        height: '25%',
        padding: 20,
        alignItems: 'center',
        elevation: 2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#17588e',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
        width: '100%',
    },
    buttonResend: {
        backgroundColor: '#2196F3',
    },
    buttonSubmit: {
        backgroundColor: 'green',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 8,
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
});

export default OTP



