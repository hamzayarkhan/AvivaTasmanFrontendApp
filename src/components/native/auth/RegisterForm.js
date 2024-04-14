import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../layout/Logo";

function RegisterForm({
  validationMessage,
  firstName,
  lastName,
  phone,
  email,
  password,
  confirmPassword,
  errors,
  onChange,
  onSubmit,
}) {
  const navigation = useNavigation();

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

  // const inputStyle = (value, isPassword = false) => {
  //   let baseStyle = {
  //     padding: 15,
  //     borderWidth: 1,
  //     borderRadius: 20,
  //     borderColor: '#ccc',
  //     marginBottom: 10,
  //   };
  //   let errorStyle = { borderColor: 'red' };
  //   let validStyle = { borderColor: 'blue' };

  //   if (submitAttempted && !value) {
  //     return [baseStyle, errorStyle];
  //   }
  //   return [baseStyle, isPassword && passwordMismatch ? errorStyle : validStyle];
  // };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Logo />
      <Text style={styles.title}>Sign Up</Text>
      {/* Validation Message */}
      {validationMessage !== "" && (
        <Text style={styles.validationMessage}>{validationMessage}</Text>
      )}
      {/* Input Fields */}
      <View style={styles.flexInputContainer}>
        <TextInput
          style={[styles.input, errors.firstName ? styles.inputError : {}]}
          value={firstName}
          onChangeText={(text) => onChange("firstName", text)}
          placeholder="First name"
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}
      </View>
      <View style={styles.flexInputContainer}>
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => onChange("lastName", text)}
          style={[styles.input, errors.lastName ? styles.inputError : {}]}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        )}
      </View>
      <View style={styles.flexInputContainer}>
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : {}]}
          placeholder="Mobile"
          value={phone}
          onChangeText={(text) => onChange("phone", text)}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>
      <View style={styles.flexInputContainer}>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : {}]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => onChange("email", text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.flexInputContainer}>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : {}]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => onChange("password", text)}
          secureTextEntry={true}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.flexInputContainer}>
        <TextInput
          style={[
            styles.input,
            errors.confirmPassword ? styles.inputError : {},
          ]}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => onChange("confirmPassword", text)}
          secureTextEntry={true}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Already have an account?{" "}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  validationMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  flexInputContainer: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 15,
    borderRadius: 20,
    marginBottom: 5,
    marginRight: 5,
  },
  inputError: {
    borderColor: "red",
  },
  flexInput: {
    flex: 1,
    marginHorizontal: 0,
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#17588e",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#17588e",
  },
  loginLink: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
});

export default RegisterForm;
