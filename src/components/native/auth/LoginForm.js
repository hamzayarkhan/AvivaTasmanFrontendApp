import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

function LoginForm({
    email,
    onChange,
    phoneNumber,
    password,
    loginMethod,
    handleLogin,
    validationMessage,
    errors,

}) {

    const navigation = useNavigation()
    return (
        <View>
            <Text style={styles.title}>Login</Text>
           
            {/* Toggle switch for selecting login method */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleOption, loginMethod === 'email' && styles.activeToggle]}
                    onPress={() => setLoginMethod('email')}>
                    <Text style={[styles.toggleText, loginMethod === 'email' && styles.activeToggleText]}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.toggleOption, loginMethod === 'phone' && styles.activeToggle]}
                    onPress={() => setLoginMethod('phone')}>
                    <Text style={[styles.toggleText, loginMethod === 'phone' && styles.activeToggleText]}>Mobile</Text>
                </TouchableOpacity>
            </View>
            {/* Your login form UI */}
            <View style={styles.flexInputContainer}>
                <TextInput
                    style={[styles.input, loginMethod === 'phone' && styles.phoneInput]}
                    value={loginMethod === 'email' ? email : phoneNumber}
                    onChangeText={text => loginMethod === 'email' ? onChange('Email',text) : onChange('Phone',text)}
                    placeholder={loginMethod === 'email' ? 'Email' : 'Phone Number'}
                    keyboardType={loginMethod === 'phone' ? 'numeric' : 'default'}
                />
                {errors[loginMethod] && <Text style={styles.errorText}>{errors[loginMethod]}</Text>}
            </View>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={(text) => onChange('Password',text)}
                secureTextEntry={true}
            />
            <View style={styles.checkboxContainer}>
                {/* <CheckBox
                    value={rememberMe}
                    onValueChange={handleRememberMe}
                    style={styles.checkbox}
                    color={'#17588e'}
                />
                <Text style={styles.checkboxText}>Remember me</Text> */}
                <TouchableOpacity  style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                {/* Wrap the button in a view to set its width */}
                <View style={{ width: 350 }}>
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
    validationMessage: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
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
        marginRight: 5,
    },
    phoneInput: {
        borderWidth: 2,
        borderColor: '#17588e',
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
    checkbox: {
        alignSelf: 'center',
        color: '#17588e',
    },
    checkboxText: {
        color: 'black',
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
