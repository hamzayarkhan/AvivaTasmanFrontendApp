import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginForm({
    email,
    phoneNumber,
    password,
    onChange,
    onToggle,
    loginMethod,
    onLogin,
    errors,

}) {
    const navigation = useNavigation();
    // Function to handle toggling between login methods

    return (
        <View>
            <Text style={styles.title}>Login</Text>

            {/* Toggle switch for selecting login method */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleOption, loginMethod === 'email' && styles.activeToggle]}
                    onPress={() => onToggle('email')}>
                    <Text style={[styles.toggleText, loginMethod === 'email' && styles.activeToggleText]}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleOption, loginMethod === 'phone' && styles.activeToggle]}
                    onPress={() => onToggle('phone')}>
                    <Text style={[styles.toggleText, loginMethod === 'phone' && styles.activeToggleText]}>Mobile</Text>
                </TouchableOpacity>
            </View>
            {/* Your login form UI */}
            <View style={styles.flexInputContainer}>
                {
                    loginMethod === 'email' ?
                        (
                            <>
                                <TextInput
                                    style={[styles.input, errors.email ? styles.inputError : {}]}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={(text) => onChange('Email', text)}


                                />
                                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                            </>

                        ) :
                        (<>
                            <TextInput
                                style={[styles.input, errors.phoneNumber ? styles.inputError : {}]}
                                placeholder="Mobile Number"
                                value={phoneNumber}
                                onChangeText={(text) => onChange('Phone', text)}


                            />
                            {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                        </>)
                }



            </View>
            <View style={styles.flexInputContainer}>
                <TextInput
                    style={[styles.input, errors.password ? styles.inputError : {}]}
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => onChange('Password', text)}
                    secureTextEntry={true}

                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <View style={{ width: 350 }}>
                    <TouchableOpacity style={styles.button} onPress={onLogin}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    toggleOption: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        marginRight: 10,
    },
    activeToggle: {
        backgroundColor: '#17588e',
    },
    toggleText: {
        color: 'black',
    },
    activeToggleText: {
        color: 'white',
    },
    flexInputContainer: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 15,
        marginBottom: 5,
        marginRight: 5
    },
    inputError: {
        borderColor: 'red',
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
        backgroundColor: '#17588e',
        marginTop: 10,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    registerContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerText: {
        color: '#17588e',
        marginLeft: 5,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    forgotPassword: {
        color: '#17588e',
    },
    forgotPasswordContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default LoginForm;
