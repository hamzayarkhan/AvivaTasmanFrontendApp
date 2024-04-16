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

  const navigation = useNavigation()

  const handleChange = (name, value) => {
    // Set the value first
    setFields(prevFields => ({ ...prevFields, [name]: value }));

    // Validate the email when the 'email' field is changed
    if (name === 'email') {
      validateEmail(value);
    }
  };
  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(String(email).toLowerCase())) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email format" }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: '' })); // Clear the email error if valid
    }
  };

  const validateField = (fields, name, value) => {
    let newErrors = { ...errors };
    // Check if the field is empty
    if (!value) {
      newErrors[name] = "This field is required";
    } else {
      delete newErrors[name];
    }

    // Specific validation for the password fields
    if (name === "password" || name === "confirmPassword") {
      if (!value) {
        newErrors[name] = "This field is required";
      }
      else if (fields.password !== fields.confirmPassword) {
        newErrors['password'] = "Passwords do not match";
        newErrors['confirmPassword'] = "Passwords do not match";
      } else {
        delete newErrors['password'];
        delete newErrors['confirmPassword'];
      }
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    let validationErrors = {};
    Object.keys(fields).forEach(key => {
      validationErrors = { ...validationErrors, ...validateField(fields, key, fields[key]) };
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      const data = {
        firstName: fields['firstName'],
        lastName: fields['lastName'],
        email: fields['email'],
        phoneNumber: fields['phone'],
        password: fields['password'],


      }
      console.log(data);
      try {
        const response = await AuthService.Register(data);
        console.log(response);
        if (!response.isSuccess) {
          setResponseMessage(response.message || "An error occurred during registration.");
          setResponseType("error");
        }
        else {
          setResponseMessage(response.message);
          setResponseType("success");
        }

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
