import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import LoginForm from '../components/auth/LoginForm';


const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/images/logo.png")} // Replace with your logo URL
                    style={styles.logo}
                />

            </View>
            <LoginForm />
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
        // Adjust these values according to your logo's size
        width: 130,
        height: 130,
        resizeMode: 'contain',
        alignItems: "center" // This ensures your logo scales properly
    },
});

export default LoginScreen;
