import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import LoginForm from '../components/native/auth/LoginForm';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loginMethod, setLoginMethod] = useState('email');
    const [errors, setErrors] = useState({}); // Define errors state

    const handleToggle = (method) => {
        setLoginMethod(method);
    };

    const validateAndLogin = () => {
        let newErrors = {};
        let isValid = true;
        let requiredFields = {}
        // Simple validation: Check if any of the required fields are empty
        if(loginMethod === 'email'){
            requiredFields= {email, password}
        }
        else{
            requiredFields ={phoneNumber,password}
        }        
        console.log(requiredFields)

        Object.entries(requiredFields).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            data = {
                email : email,
                password :password,
                phoneNumber: phoneNumber
            }
            console.log(data)
            
        }
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
                phoneNumber={phoneNumber}
                password={password}
                onChange= {handleChange}
                onToggle={handleToggle}
                loginMethod={loginMethod}
                onLogin={validateAndLogin}
                errors={errors} // Pass errors state as prop       
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
