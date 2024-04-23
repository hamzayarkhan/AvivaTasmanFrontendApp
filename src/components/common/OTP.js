import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthService } from '../../services/AuthService';


const OTP = ({ visible, onClose, loginMethod,email,password, phoneNumber }) => {
    const [otp, setOtp] = useState('');
    const [resendCooldown, setResendCooldown] = useState(false);
    const [cooldownTimer, setCooldownTimer] = useState(30);
    const navigation = useNavigation();

    useEffect(() => {
        let interval;
        if (resendCooldown && cooldownTimer > 0) {
            interval = setInterval(() => {
                setCooldownTimer((timer) => timer - 1);
            }, 1000);
        } else if (cooldownTimer === 0) {
            setResendCooldown(false);
            setCooldownTimer(30);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [resendCooldown, cooldownTimer]);

    const handleResendOTP = async () => {
        if (!resendCooldown) {
            setResendCooldown(true);
            // Assuming AuthService.resendOTP is the function to call your API

            const data = {   
                 loginWithEmail : loginMethod,
                 email:email,
                 password : password,
                 phoneNumber :phoneNumber,
                 IsAuthenticated: true

           }
           console.log(data)
             try {
              const response = await AuthService.ResendOTP(data);
                console.log('OTP resent successfully', response);
                Alert.alert(response.message);
             } catch (error) {
                 console.error('Failed to resend OTP:', error);
                Alert.alert("Failed", "Error resending OTP. Please try again later.");
             }
        }
    };

    const handleSubmit = async () => {
        if (otp.length !== 6 || isNaN(otp)) {
            Alert.alert("Invalid OTP", "OTP should be a 6-digit number.");
            return;
        }
        console.log('OTP Submitted:', otp);
        // Further API call to verify OTP can go here

        const data = {   
            email: email,
            otp: otp
        }
        console.log(data)
        try {
           const response = await AuthService.VerifyOTP(data); 
            
            console.log('OTP verified successfully', response);
            console.log(response)

            Alert.alert(response.message);
            if (response.status) 
            { navigation.navigate('HomeScreen');
                
            } else
            {alert.alert("OTP Wrong")}
            
        } catch (error) {
            console.error('Failed to verify OTP:', error);
            Alert.alert("Failed", "Error verifying OTP. Please try again later.");
        }

    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {}}
        >
            <TouchableOpacity style={styles.centeredView} activeOpacity={1}>
                <View style={styles.overlay} />
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Verify OTP</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter OTP"
                        value={otp}
                        onChangeText={text => setOtp(text)}
                        keyboardType="numeric"
                    />
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, resendCooldown ? styles.buttonDisabled : styles.buttonActive]}
                            onPress={handleResendOTP}
                            disabled={resendCooldown}
                        >
                            <Text style={styles.buttonText}>
                                Resend OTP {resendCooldown ? `(${cooldownTimer}s)` : ""}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
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
        paddingHorizontal: 10,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 8,
        flex: 1, // Each button will take up half the space
        marginHorizontal: 5,
        backgroundColor:'green'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonActive: {
        backgroundColor: '#17588e',
    },
});

export default OTP;
