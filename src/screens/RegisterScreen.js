import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Logo from "../components/common/Logo";
import { AuthService } from "../services/AuthService";
import { useNavigation } from "@react-navigation/native";


const RegisterScreen = () => {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");

  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFields(prevFields => ({ ...prevFields, [name]: value }));
    if (name === 'email' && !validateEmail(value)) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email format" }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
    }

    if (['password', 'confirmPassword'].includes(name)) {
      validatePasswords();
    }
  };

  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(String(email).toLowerCase());
  };

  const validateField = (name, value) => {
    return value ? '' : 'This field is required';
  };

  const validatePasswords = () => {
    const { password, confirmPassword } = fields;
    let passwordError = password !== confirmPassword ? "Passwords do not match" : '';
    setErrors(prevErrors => ({ ...prevErrors, password: passwordError, confirmPassword: passwordError }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = {};
    Object.keys(fields).forEach(key => {
      const error = validateField(key, fields[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    validatePasswords();
    setErrors(newErrors);

    if (isValid && !newErrors.password) {
      try {
        const data = {
          firstName: fields['firstName'],
          lastName: fields['lastName'],
          phoneNumber: fields['phone'],
          email: fields['email'],
          password: fields['password']

        }
        console.log(data)
        const response = await AuthService.Register(data);
        setResponseType(response.isSuccess ? 'success' : 'error');
        setResponseMessage(response.message || "An error occurred during registration.");
      } catch (error) {
        setResponseMessage(error.message);
        setResponseType("error");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo />
      <Text style={[styles.responseText, responseType === 'success' ? styles.successText : styles.errorText]}>
        {responseMessage}
      </Text>
      <TextInput
        style={[styles.input, errors.firstName ? styles.inputError : null]}
        value={fields.firstName}
        onChangeText={(value) => handleChange('firstName', value)}
        placeholder="First Name"
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <TextInput
        style={[styles.input, errors.lastName ? styles.inputError : null]}
        value={fields.lastName}
        onChangeText={(value) => handleChange('lastName', value)}
        placeholder="Last Name"
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <TextInput
        style={[styles.input, errors.phone ? styles.inputError : null]}
        value={fields.phone}
        onChangeText={(value) => handleChange('phone', value)}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      <TextInput
        style={[styles.input, errors.email ? styles.inputError : null]}
        value={fields.email}
        onChangeText={(value) => handleChange('email', value)}
        placeholder="Email"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={[styles.input, errors.password ? styles.inputError : null]}
        value={fields.password}
        onChangeText={(value) => handleChange('password', value)}
        placeholder="Password"
        secureTextEntry={true}
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <TextInput
        style={[styles.input, errors.confirmPassword ? styles.inputError : null]}
        value={fields.confirmPassword}
        onChangeText={(value) => handleChange('confirmPassword', value)}
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.LoginLink} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.linkText}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#17588e',
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    alignSelf: 'flex-start',
    color: 'red',
    marginBottom: 5,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#17588e',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  responseText: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  successText: {
    color: 'green',
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  loginLink: {
    flex: 1,
    alignItems: "flex-start",
  },
  linkText: {
    color: "blue",
  },

});

export default RegisterScreen;
