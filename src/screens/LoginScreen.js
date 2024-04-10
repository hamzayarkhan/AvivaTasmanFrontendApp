import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LoginForm from '../components/native/auth/LoginForm';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginMethod, setLoginMethod] = useState('email');
    const [validationMessage, setValidationMessage] = useState('');
    const [errors, setErrors] = useState({}); // Define errors state

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleLogin = () => {
        console.log('Login');
    };

    const handleChange = (name, value) => {
        switch (name) {
            case 'Password':
              setPassword(value);
              break;
            case 'Email':
              setEmail(value);
              break;
            case 'Phone':
              setPhoneNumber(value.replace(/[^0-9]/g, ''));
              break;
            case 'email':
              setEmail(value);
              break;
            case 'password':
              setPassword(value);
              break;
            case 'confirmPassword':
              setConfirmPassword(value);
              break;
            default:
              break;
          } 

    };

    const handlePhoneNumberChange = (text) => {
        const formattedPhoneNumber = text.replace(/[^0-9]/g, '');
        setPhoneNumber(formattedPhoneNumber);
    };
    const handleForgotPassword = () => {
        // Handle forgot password logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/logo.png")}
                    style={styles.logo}
                />
            </View>
            <LoginForm
                email={email}
                onChange= {handleChange}
                phoneNumber={phoneNumber}
                password={password}
                rememberMe={rememberMe}
                loginMethod={loginMethod}
                handleLogin={handleLogin}
                handleRememberMe={handleRememberMe} 
                validationMessage={validationMessage}
                errors={errors} // Pass errors state as prop
                handleForgotPassword={handleForgotPassword}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff'
    },
    imageContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    logo: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
        alignItems: "center"
    },
});

export default LoginScreen;
