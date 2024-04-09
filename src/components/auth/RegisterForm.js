import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phone':
        setPhone(value);
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
    // Reset validation messages and flags when user starts typing
    if (validationMessage !== '') setValidationMessage('');
    if (passwordMismatch) setPasswordMismatch(false);
    if (submitAttempted) setSubmitAttempted(false);
  };

  const handleValidation = () => {
    let newErrors = {};
    let isValid = true;

    // Simple validation: Check if any of the required fields are empty
    const requiredFields = { firstName, lastName, phone, email, password, confirmPassword };
    Object.entries(requiredFields).forEach(([key, value]) => {
        if (!value) {
            newErrors[key] = "This field is required";
            isValid = false;
        }
    });

    setErrors(newErrors);

    if (isValid) {
        console.log("isValid")
    
    }
};

//   const validateForm = () => {
//     setSubmitAttempted(true); // Mark that a submit attempt has been made

//     // Check if any field is empty or passwords do not match
//     if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
//       setValidationMessage('Please complete all fields to proceed');
//       return false;
//     }
//     if (password !== confirmPassword) {
//       setPasswordMismatch(true);
//       setValidationMessage('Passwords do not match');
//       return false;
//     }
//     return true;
//   };

  const handleSubmit = async () => {
    if (!validateAndContinue()) {
      return; // Stop the form submission if validation fails
    }

    // Proceed with form submission logic here
  };

  const inputStyle = (value, isPassword = false) => {
    let baseStyle = {
      padding: 10,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#ccc',
      marginBottom: 10,
    };
    let errorStyle = { borderColor: 'red' };
    let validStyle = { borderColor: 'blue' };

    if (submitAttempted && !value) {
      return [baseStyle, errorStyle];
    }
    return [baseStyle, isPassword && passwordMismatch ? errorStyle : validStyle];
  };

  const styles = StyleSheet.create({

    title: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    validationMessage: {
      color: 'red',
      textAlign: 'center',
      marginBottom: 10,
    },
    input: {
      ...inputStyle('', false)[0], // Default input style
    },
    errorInput: {
      ...inputStyle('', true)[1], // Error input style
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
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
    },
    loginText: {
      textAlign: 'center',
      marginTop: 20,
    },
    loginLink: {
      color: '#007bff',
      textDecorationLine: 'underline',
    },
  });

  return (
    <View style={styles.container}>
      
        <Text style={styles.title}>Sign Up</Text>
        {/* Validation Message */}
        {validationMessage !== '' && (
          <Text style={styles.validationMessage}>{validationMessage}</Text>
        )}
        {/* Input Fields */}
        <View style={styles.flexInputContainer}>
                            <TextInput
                                style={[styles.input, errors.firstName ? styles.inputError : {}]}
                                value={firstName}
                                onChangeText={text => setFirstName(text)}
                                placeholder="First name"
                            />
                            {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
        </View>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => handleChange('lastName', text)}
          style={[styles.input, inputStyle(lastName)[0]]}
        />
        <TextInput
          placeholder="Mobile"
          value={phone}
          onChangeText={(text) => handleChange('phone', text)}
          style={[styles.input, inputStyle(phone)[0]]}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => handleChange('email', text)}
          style={[styles.input, inputStyle(email)[0]]}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => handleChange('password', text)}
          style={[styles.input, inputStyle(password, true)[0]]}
          secureTextEntry={true}
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          style={[styles.input, inputStyle(confirmPassword, true)[0]]}
          secureTextEntry={true}
        />
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            Log In
          </Text>
        </Text>
    
    </View>
  );
}

export default RegisterForm;
