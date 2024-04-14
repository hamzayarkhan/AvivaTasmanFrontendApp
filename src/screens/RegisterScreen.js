import { View, Text, Image, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import RegisterForm from "../components/native/auth/RegisterForm";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({});

  console.log(Platform.os);

  const handleChange = (name, value) => {
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
    // Reset validation messages and flags when user starts typing
    if (validationMessage !== "") setValidationMessage("");
    if (passwordMismatch) setPasswordMismatch(false);
    if (submitAttempted) setSubmitAttempted(false);
  };
  const handleValidation = () => {
    let newErrors = {};
    let isValid = true;

    // Simple validation: Check if any of the required fields are empty
    const requiredFields = {
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword,
    };
    Object.entries(requiredFields).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    console.log("here");
    if (!handleValidation()) {
      return; // Stop the form submission if validation fails
    }

    // Proceed with form submission logic here
  };

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <View>
          <Text>This is web</Text>
        </View>
      ) : (
        <View>
          <RegisterForm
            validationMessage={validationMessage}
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            errors={errors}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    justifyContent: "center",
    flexDirection: "row",
  },

  logo: {
    // Adjust these values according to your logo's size
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginTop: 30,
  },
});
export default RegisterScreen;
