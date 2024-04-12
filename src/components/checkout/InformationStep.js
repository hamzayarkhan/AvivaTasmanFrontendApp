import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const InformationStep = ({ onNext, informationData }) => {
    const [errors, setErrors] = useState({});
    const [isSelected, setSelection] = useState(false);
    const [firstName, setFirstName] = useState(informationData?.addressDetails?.firstName || '');
    const [lastName, setLastName] = useState(informationData?.addressDetails?.lastName || '');
    const [address, setAddress] = useState(informationData?.addressDetails?.address || '');
    const [apartment, setApartment] = useState(informationData?.addressDetails?.apartment || '');
    const [city, setCity] = useState(informationData?.addressDetails?.city || '');
    const [state, setState] = useState();
    const [postCode, setPostCode] = useState(informationData?.addressDetails?.postCode || '');
    const [country, setCountry] = useState('Australia');
    const contact = 'Hamza Yar Khan (hamzakhanofficial@yahoo.com)';
    const navigation = useNavigation();



    const validateAndContinue = () => {
        let newErrors = {};
        let isValid = true;

        // Simple validation: Check if any of the required fields are empty
        const requiredFields = { firstName, lastName, address, city, postCode, country };
        Object.entries(requiredFields).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = "This field is required";
                isValid = false;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            onNext({
                contact,
                isSelected,
                addressDetails: {
                    firstName,
                    lastName,
                    address,
                    apartment,
                    city,
                    state,
                    postCode,
                    country,
                },
            });
        }
    };

    const handleReturnToCart = () => {
        navigation.goBack(); // Only works if you have a navigation stack
    };


    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.headerText}>Contact</Text>
                {/* need to change this */}
                <Text style={styles.contact}>{contact}</Text>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isSelected}
                        onValueChange={setSelection}
                        style={styles.checkbox}
                        color={isSelected ? "#17588e" : undefined}
                    />
                    <Text style={styles.checkboxLabel}>Email me with news and offers</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.headerText}>Shipping address</Text>
                <View>
                    <Text style={styles.label}>Country/Region</Text>
                    <Picker
                        selectedValue={country}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
                        <Picker.Item label="Australia" value="Australia" />
                        <Picker.Item label="Philippines" value="Philippines" />
                    </Picker>
                    <View style={styles.row}>
                        <View style={styles.flexInputContainer}>
                            <TextInput
                                style={[styles.input, errors.firstName ? styles.inputError : {}]}
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                                placeholder="First name"
                            />
                            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
                        </View>
                        <View style={styles.flexInputContainer}>
                            <TextInput
                                style={[styles.input, errors.lastName ? styles.inputError : {}]}
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                                placeholder="Last name"
                            />
                            {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                        </View>
                    </View>
                    <View style={styles.flexInputContainer}>
                        <TextInput
                            style={[styles.input, errors.address ? styles.inputError : {}]}
                            value={address}
                            onChangeText={(text) => setAddress(text)}
                            placeholder="Address"
                        />
                        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                    </View>

                    <TextInput
                        style={styles.input}
                        value={apartment}
                        onChangeText={(text) => setApartment(text)}
                        placeholder="Apartment,suite,etc. (optional)"
                    />


                    <Text style={styles.label}>{country === 'Australia' ? 'State/territory' : 'Region'}</Text>
                    <Picker
                        selectedValue={state}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) => setState(itemValue)}>
                        <Picker.Item label="Test 1" value="Test 1" />
                        <Picker.Item label="Test 2" value="Test 2" />
                    </Picker>
                    <View style={styles.row}>
                        <View style={styles.flexInputContainer}>

                            <TextInput
                                style={[styles.input, errors.firstName ? styles.inputError : {}]}
                                value={city}
                                onChangeText={(text) => setCity(text)}
                                placeholder="City"
                            />
                            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}

                        </View>
                        <View style={styles.flexInputContainer}>

                            <TextInput
                                style={[styles.input, errors.firstName ? styles.inputError : {}]}
                                value={postCode}
                                onChangeText={(text) => setPostCode(text)}
                                placeholder="Postal code"
                            />
                            {errors.postCode && <Text style={styles.errorText}>{errors.postCode}</Text>}

                        </View>


                    </View>

                </View>






            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={handleReturnToCart}>
                    <Text style={styles.buttonOutlineText}>Return to cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.buttonFilled]} onPress={validateAndContinue}>
                    <Text style={styles.buttonText}>Continue to shipping</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    section: {
        marginBottom: 5,
        marginTop: 5
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    contact: {
        marginBottom: 10
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linkText: {
        color: '#17588e',
        textAlign: 'right',
        marginBottom: 10,
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
    button: {
        backgroundColor: '#17588e',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    label: {
        marginBottom: 5,
    },
    picker: {
        borderWidth: 1,
        borderColor: '#cccccc',
        padding: 10,
        borderRadius: 15,
        marginBottom: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        padding: 10,
        borderRadius: 15,
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
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },
    flexInputContainer: {
        flex: 1,
        marginBottom: 5

    },



    // Add styles for checkbox and dropdown components
});

export default InformationStep;
