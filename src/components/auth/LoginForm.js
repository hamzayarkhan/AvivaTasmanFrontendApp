import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [validationMessage, setValidationMessage] = useState(false);
    const [errors, setErrors] = useState({});
    const navigation = useNavigation()

    // // const handleChange = (name, value) => {
    // //     // Handle changes in state based on input name
    // //     switch (name) {
    // //         case 'username':
    // //             setEn(value);
    // //             break;
    // //         case 'password':
    // //             setPassword(value);
    // //             break;
    // //         // Handle other input fields similarly
    // //         default:
    // //             break;
    // //     }
    // // };

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleForgotPassword = () => {
        // Add functionality for Forgot password
        console.log('Forgot password');
    };

    const handleLogin = () => {
        // Add functionality for Login
        console.log('Login');
    };

    return (
        <View>
       
            <Text style={styles.title}>Login</Text>
            {/* Validation Message */}
            {validationMessage !== '' && (
                <Text style={styles.validationMessage}>{validationMessage}</Text>
            )}
            {/* Your login form UI */}
            
            <View style={styles.flexInputContainer}>
                            <TextInput
                                style={[styles.input, errors.email ? styles.inputError : {}]}
                                value={email}
                                onChangeText={text => setEmail(text)}
                                placeholder="First name"
                            />
                            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>
            {/* <TextInput
                style={styles.input}
                placeholder="Email"
                value={username}
                onChangeText={(text) => handleChange('username', text)}
            /> */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => handleChange('password', text)}
                secureTextEntry={true}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={rememberMe}
                    onValueChange={handleRememberMe}
                    style={styles.checkbox}
                    color={'#17588e'} // Set the color when the checkbox is selected
                />
                <Text style={styles.checkboxText}>Remember me</Text>

                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>



            </View>

            {/* Wrap the button in a view to set its width */}
            <View style={{ width: 200 }}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.registerContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                    <Text style={styles.registerText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    validationMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    flexInputContainer: {
        marginBottom: 5

    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 15,
        marginBottom: 5,
        marginRight: 5
    },
    flexInput: {
        flex: 1,
        marginHorizontal: 0,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },


    button: {
        padding: 10,
        backgroundColor: 'blue',
        marginTop: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
    },
    registerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerText: {
        color: 'blue',
        marginLeft: 5,
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 20, resizeMode: 'contain',

    },

    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    checkbox: {
        alignSelf: 'center',
        color: 'blue'
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    checkboxText: {
        color: 'black',
    },
    forgotPassword: {
        color: 'blue',
    },
});

export default LoginForm;
