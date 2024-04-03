import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';


const Footer = () => {
    const [country, setCountry] = useState('Australia');
    const [language, setLanguage] = useState('English');

    const navigation = useNavigation();

    const handlePress = (screen) => {
        navigation.navigate(screen);
    };

    return (
        <View style={styles.footer}>
            


            <View style={styles.textContainer}>
                <Text style={styles.text}>© 2024, Aviva Tasman Powered by Aviva Tasman</Text>
            </View>
            <View style={styles.textContainer}>
                <TouchableOpacity style={styles.policyContainer} onPress={() => handlePress('RefundPolicy')}>
                    <Text style={styles.text}>Refund policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.policyContainer} onPress={() => handlePress('PrivacyPolicy')}>
                    <Text style={styles.text}>Privacy policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.policyContainer}>
                    <Text style={styles.text}>Terms of service</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        backgroundColor: '#ffffff',
        // Ensure footer sticks to the bottom
        // The flex styling should be adjusted in the parent Layout if needed
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 20,
    },
    picker: {
        height: 50, // Specific height to ensure visibility
        width: "50%",
        backgroundColor: "#fff",
        marginLeft: 10,
    },
    text: {
        fontSize: 12,
        marginVertical: 2,
        color: "#000000"
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 2
    },
    policyContainer: {
        marginLeft: 10,
    },
});

export default Footer;
